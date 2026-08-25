import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { EditorContext } from '../pages/EditorPage';
import { useStateContext } from '../contexts/ContextProvider';
import AnimationWrapper from './AnimationWrapper';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TAG_LIMIT = 5;
const CHAR_LIMIT = 200;

const PublishForm = () => {
  const { blog, setBlog, setEditorState } = useContext(EditorContext);
  const { userAuth } = useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setEditorState('editor');

  const handleTagKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (!tag) return;
      if (blog.tags.length >= TAG_LIMIT) {
        return toast.error(`Maximum ${TAG_LIMIT} tags allowed`);
      }
      if (blog.tags.includes(tag)) {
        return toast.error('Tag already added');
      }
      setBlog({ ...blog, tags: [...blog.tags, tag] });
      e.target.value = '';
    }
  };

  const removeTag = (tagToRemove) => {
    setBlog({ ...blog, tags: blog.tags.filter((t) => t !== tagToRemove) });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!blog.title.trim()) return toast.error('Title is required');
    if (!blog.des.trim()) return toast.error('Add a short description');
    if (blog.tags.length === 0) return toast.error('Add at least one tag');

    setLoading(true);
    const loadingToast = toast.loading('Publishing...');

    try {
      const payload = {
        title: blog.title,
        banner: blog.banner,
        des: blog.des,
        content: blog.content,
        tags: blog.tags,
        author: blog.author || 'Rekaz Team',
        authorImage: blog.authorImage || '',
        draft: false,
      };

      await axios.post(`${API}/blogs`, payload, {
        headers: { Authorization: `Bearer ${userAuth?.access_token}` },
      });

      toast.dismiss(loadingToast);
      toast.success('Published successfully!');
      setTimeout(() => navigate('/blogs'), 800);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.error || 'Publish failed');
    } finally {
      setLoading(false);
    }
  };


  return (
      <div className="min-h-screen bg-white overflow-y-auto">
        <Toaster position="top-center" />

        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-rekaz-border">
          <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-rekaz-grey hover:text-rekaz-dark transition-colors font-satoshi text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Editor
            </button>
            <h3 className="font-satoshi font-semibold text-rekaz-dark">Review & Publish</h3>
            <div className="w-24" />
          </div>
        </header>

        {/* Form */}
        <main className="max-w-2xl mx-auto px-5 py-10 pb-32">
          <form id="publish-form" onSubmit={handlePublish} className="flex flex-col gap-8">

            {/* Preview card */}
            <div className="bg-rekaz-bg rounded-card-sm border border-rekaz-border p-6">
              <p className="text-rekaz-muted font-dm text-xs uppercase tracking-wider mb-3">Preview</p>
              {blog.banner && (
                <img
                  src={blog.banner}
                  alt="Banner"
                  className="w-full aspect-video object-cover rounded-card-sm mb-4"
                />
              )}
              <h2 className="font-satoshi font-bold text-xl text-rekaz-dark">{blog.title}</h2>
            </div>

            {/* Description */}
            <div>
              <label className="font-satoshi text-sm font-medium text-rekaz-dark mb-1.5 block">
                Short Description
              </label>
              <textarea
                value={blog.des}
                onChange={(e) => {
                  if (e.target.value.length <= CHAR_LIMIT) {
                    setBlog({ ...blog, des: e.target.value });
                  }
                }}
                placeholder="Brief summary of your article…"
                rows={3}
                className="w-full px-4 py-3 rounded-btn border border-rekaz-border font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/50 outline-none resize-none focus:border-rekaz-blue focus:ring-2 focus:ring-rekaz-blue/10 transition-all"
              />
              <p className="text-xs text-rekaz-muted font-dm mt-1 text-right">
                {blog.des.length}/{CHAR_LIMIT}
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="font-satoshi text-sm font-medium text-rekaz-dark mb-1.5 block">
                Tags <span className="text-rekaz-muted font-normal">({blog.tags.length}/{TAG_LIMIT})</span>
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 bg-rekaz-blue/10 text-rekaz-blue font-satoshi text-xs font-medium px-3 py-1.5 rounded-pill"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type a tag and press Enter"
                onKeyDown={handleTagKeyDown}
                className="w-full px-4 py-3 rounded-btn border border-rekaz-border font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/50 outline-none focus:border-rekaz-blue focus:ring-2 focus:ring-rekaz-blue/10 transition-all"
              />
            </div>

            {/* Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-satoshi text-sm font-medium text-rekaz-dark mb-1.5 block">
                  Author Name
                </label>
                <input
                  type="text"
                  value={blog.author}
                  onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                  placeholder="Author name"
                  className="w-full px-4 py-3 rounded-btn border border-rekaz-border font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/50 outline-none focus:border-rekaz-blue focus:ring-2 focus:ring-rekaz-blue/10 transition-all"
                />
              </div>
              <div>
                <label className="font-satoshi text-sm font-medium text-rekaz-dark mb-1.5 block">
                  Author Image URL <span className="text-rekaz-muted font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={blog.authorImage}
                  onChange={(e) => setBlog({ ...blog, authorImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-btn border border-rekaz-border font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/50 outline-none focus:border-rekaz-blue focus:ring-2 focus:ring-rekaz-blue/10 transition-all"
                />
              </div>
            </div>
          </form>
        </main>

        {/* Sticky publish button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-rekaz-border px-5 py-4 z-10">
          <div className="max-w-2xl mx-auto">
            <button
              type="submit"
              form="publish-form"
              disabled={loading}
              className="w-full py-3.5 rounded-btn font-satoshi font-semibold text-sm text-white bg-rekaz-blue hover:bg-rekaz-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_12px_rgba(4,18,250,0.3)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </span>
              ) : (
                'Publish Article'
              )}
            </button>
          </div>
        </div>
      </div>
  );
};

export default PublishForm;
