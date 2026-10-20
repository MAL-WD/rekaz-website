import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  PenTool,
  Columns,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Trash2,
  Clock,
  CheckCircle2,
  Settings,
  X,
  Plus,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlertCircle,
  Link as LinkIcon,
  Minus,
  Globe,
  Save,
  Send,
  ExternalLink,
} from 'lucide-react';
import { compressImage, calculateReadTime } from '../utils/imageHelper';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const POPULAR_TAGS = [
  'BAC 2025',
  'BEM 2025',
  'Mathématiques',
  'Physique',
  'Orientation',
  'Méthodes de révision',
  'Sciences',
  'Formations',
  'Langues',
  'Conseils',
];

const BlogEditorStudio = () => {
  const navigate = useNavigate();
  const { blog_id } = useParams();
  const isEditing = Boolean(blog_id);

  // Editor states
  const [viewMode, setViewMode] = useState('edit'); // 'edit' | 'split' | 'preview'
  const [isRTL, setIsRTL] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  // Blog data state
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState('');
  const [bannerCaption, setBannerCaption] = useState('');
  const [des, setDes] = useState('');
  const [author, setAuthor] = useState('Rēkāz Academic Team');
  const [authorImage, setAuthorImage] = useState('');
  const [readTime, setReadTime] = useState('4 min read');
  const [tags, setTags] = useState(['BAC 2025']);
  const [tagInput, setTagInput] = useState('');
  const [isDraft, setIsDraft] = useState(false);

  // Content blocks state
  const [blocks, setBlocks] = useState([
    {
      type: 'paragraph',
      data: { text: '' },
    },
  ]);

  const editorTextareaRef = useRef(null);

  // ─── 1. Load Existing Blog if Editing ──────────────────────────────────────
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      axios
        .get(`${API}/blogs/${blog_id}`)
        .then(({ data }) => {
          const blog = data.data;
          if (blog) {
            setTitle(blog.title || '');
            setBanner(blog.banner || '');
            setDes(blog.des || '');
            setAuthor(blog.author || 'Rēkāz Academic Team');
            setAuthorImage(blog.authorImage || '');
            setReadTime(blog.readTime || '4 min read');
            setTags(Array.isArray(blog.tags) ? blog.tags : []);
            setIsDraft(Boolean(blog.draft));

            // Load blocks
            if (blog.content?.blocks && Array.isArray(blog.content.blocks)) {
              setBlocks(blog.content.blocks);
            } else if (typeof blog.content === 'string' && blog.content) {
              // Convert plain text into paragraph blocks
              const paragraphs = blog.content.split('\n\n').filter(Boolean);
              setBlocks(paragraphs.map((p) => ({ type: 'paragraph', data: { text: p } })));
            }
          }
        })
        .catch((err) => {
          toast.error('Failed to load article');
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      // Check local auto-saved draft
      const savedDraft = localStorage.getItem('rekaz_blog_local_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed.title || (parsed.blocks && parsed.blocks.length > 1)) {
            // Restore draft prompt
            toast(
              (t) => (
                <div className="flex items-center gap-3">
                  <span className="text-xs">Unsaved draft found. Restore?</span>
                  <button
                    onClick={() => {
                      setTitle(parsed.title || '');
                      setBanner(parsed.banner || '');
                      setDes(parsed.des || '');
                      setAuthor(parsed.author || 'Rēkāz Academic Team');
                      setTags(parsed.tags || ['BAC 2025']);
                      if (parsed.blocks) setBlocks(parsed.blocks);
                      toast.dismiss(t.id);
                      toast.success('Draft restored!');
                    }}
                    className="px-2 py-1 bg-rekaz-blue text-white rounded text-xs font-semibold"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('rekaz_blog_local_draft');
                      toast.dismiss(t.id);
                    }}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                  >
                    Discard
                  </button>
                </div>
              ),
              { duration: 8000 }
            );
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, [blog_id, isEditing]);

  // ─── 2. Auto-save to LocalStorage & Auto-Calculate Read Time ─────────────────
  useEffect(() => {
    if (!isEditing && title.trim()) {
      const draftData = { title, banner, des, author, tags, blocks, savedAt: Date.now() };
      localStorage.setItem('rekaz_blog_local_draft', JSON.stringify(draftData));
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }

    // Auto calculate read time based on blocks
    const calculated = calculateReadTime({ blocks }, isRTL ? 'ar' : 'en');
    setReadTime(calculated);
  }, [title, banner, des, author, tags, blocks, isRTL, isEditing]);

  // ─── 3. Banner Upload Handler ──────────────────────────────────────────────
  const handleBannerFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Optimizing & uploading image...');
    try {
      const optimizedUrl = await compressImage(file, 1600, 1000, 0.85);
      setBanner(optimizedUrl);
      toast.success('Cover image ready!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to process image', { id: toastId });
    }
  };

  // ─── 4. Block Manipulation Helpers ────────────────────────────────────────
  const updateBlockText = (index, text) => {
    setBlocks((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        data: { ...updated[index].data, text },
      };
      return updated;
    });
  };

  const addBlock = (type = 'paragraph', data = { text: '' }, afterIndex = blocks.length - 1) => {
    setBlocks((prev) => {
      const updated = [...prev];
      updated.splice(afterIndex + 1, 0, { type, data });
      return updated;
    });
  };

  const removeBlock = (index) => {
    if (blocks.length <= 1) {
      setBlocks([{ type: 'paragraph', data: { text: '' } }]);
      return;
    }
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveBlock = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    setBlocks((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const handleInsertImageBlock = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Optimizing image...');
    try {
      const optimizedUrl = await compressImage(file, 1200, 800, 0.85);
      addBlock('image', { url: optimizedUrl, caption: '' }, index);
      toast.success('Image inserted!', { id: toastId });
    } catch (err) {
      toast.error('Failed to insert image', { id: toastId });
    }
  };

  // ─── 5. Tag Management ────────────────────────────────────────────────────
  const addTag = (tagToAdd) => {
    const clean = tagToAdd.trim();
    if (!clean || tags.includes(clean)) return;
    if (tags.length >= 6) {
      return toast.error('Maximum 6 tags allowed');
    }
    setTags((prev) => [...prev, clean]);
    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // ─── 6. Save & Publish Handlers ───────────────────────────────────────────
  const handleSave = async (draftMode = false) => {
    if (!title.trim()) {
      return toast.error('Please enter an article title');
    }

    const payload = {
      title: title.trim(),
      banner,
      des: des.trim() || title.trim(),
      content: {
        time: Date.now(),
        blocks,
        version: '2.31.0',
      },
      tags: tags.length ? tags : ['Education'],
      author: author.trim() || 'Rēkāz Academic Team',
      authorImage,
      readTime,
      draft: draftMode,
    };

    setSaving(true);
    const toastId = toast.loading(draftMode ? 'Saving draft...' : 'Publishing article...');

    try {
      const token = localStorage.getItem('rekaz_admin_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      let response;
      if (isEditing) {
        response = await axios.put(`${API}/blogs/${blog_id}`, payload, { headers });
      } else {
        response = await axios.post(`${API}/blogs`, payload, { headers });
      }

      toast.success(draftMode ? 'Draft saved successfully!' : 'Article published live!', {
        id: toastId,
      });

      // Clear local draft cache
      localStorage.removeItem('rekaz_blog_local_draft');

      const savedBlogId = response.data?.data?.blog_id || blog_id;

      // Navigate after brief delay
      setTimeout(() => {
        if (draftMode) {
          navigate('/admin/blogs');
        } else {
          navigate(`/blogs/${savedBlogId}`);
        }
      }, 700);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to save article', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f8f9fa] flex flex-col font-dm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Toaster position="top-center" />

      {/* ── Top Header Navigation Bar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-rekaz-border/80 px-4 sm:px-8 h-16 flex items-center justify-between shadow-xs">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-rekaz-border hover:bg-rekaz-bg text-rekaz-dark text-xs font-satoshi font-semibold transition-colors"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isRTL ? 'مقالات الإدارة' : 'Admin Articles'}</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-rekaz-muted font-medium">
            <span>/</span>
            <span className="text-rekaz-dark font-semibold">
              {isEditing ? (isRTL ? 'تعديل المقال' : 'Edit Article') : isRTL ? 'مقال جديد' : 'New Article'}
            </span>
            {lastSavedTime && !isEditing && (
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full ms-2">
                <CheckCircle2 className="w-3 h-3" />
                {isRTL ? `محفوظ ${lastSavedTime}` : `Saved locally ${lastSavedTime}`}
              </span>
            )}
          </div>
        </div>

        {/* Center: View Switcher & Direction Toggle */}
        <div className="flex items-center gap-2">
          {/* RTL / LTR Toggle */}
          <button
            onClick={() => setIsRTL(!isRTL)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-satoshi font-semibold border transition-all ${
              isRTL
                ? 'bg-rekaz-blue/10 border-rekaz-blue text-rekaz-blue'
                : 'bg-white border-rekaz-border text-rekaz-grey hover:text-rekaz-dark'
            }`}
            title="Toggle Arabic / RTL layout"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isRTL ? 'العربية (RTL)' : 'LTR'}</span>
          </button>

          {/* View Modes */}
          <div className="flex items-center bg-rekaz-bg p-1 rounded-xl border border-rekaz-border">
            <button
              onClick={() => setViewMode('edit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-satoshi font-semibold transition-all ${
                viewMode === 'edit'
                  ? 'bg-white text-rekaz-dark shadow-xs'
                  : 'text-rekaz-grey hover:text-rekaz-dark'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isRTL ? 'تحرير' : 'Edit'}</span>
            </button>

            <button
              onClick={() => setViewMode('split')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-satoshi font-semibold transition-all ${
                viewMode === 'split'
                  ? 'bg-white text-rekaz-dark shadow-xs'
                  : 'text-rekaz-grey hover:text-rekaz-dark'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{isRTL ? 'عرض مقسوم' : 'Split'}</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-satoshi font-semibold transition-all ${
                viewMode === 'preview'
                  ? 'bg-white text-rekaz-dark shadow-xs'
                  : 'text-rekaz-grey hover:text-rekaz-dark'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isRTL ? 'معاينة' : 'Preview'}</span>
            </button>
          </div>
        </div>

        {/* Right: Settings & Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Settings / Metadata Drawer Trigger */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rekaz-border bg-white text-rekaz-dark text-xs font-satoshi font-semibold hover:border-rekaz-blue transition-colors cursor-pointer"
            title="Article Settings & SEO"
          >
            <Settings className="w-4 h-4 text-rekaz-grey" />
            <span className="hidden sm:inline">{isRTL ? 'الإعدادات' : 'Settings'}</span>
          </button>

          {/* Save Draft */}
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rekaz-border bg-white hover:bg-gray-50 text-rekaz-dark text-xs font-satoshi font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-rekaz-grey" />
            <span>{isRTL ? 'حفظ مسودة' : 'Save Draft'}</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rekaz-blue hover:bg-rekaz-blue/90 text-white text-xs font-satoshi font-bold shadow-sm shadow-rekaz-blue/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>
              {isEditing
                ? isRTL ? 'تحديث المقال' : 'Update Article'
                : isRTL ? 'نشر الآن' : 'Publish Article'}
            </span>
          </button>
        </div>
      </header>

      {/* ── Main Workspace ─────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex gap-8">
        {/* Left Column: Editor / Canvas */}
        <div
          className={`flex-1 transition-all ${
            viewMode === 'preview' ? 'hidden' : 'block'
          } ${viewMode === 'split' ? 'lg:w-1/2' : 'max-w-4xl mx-auto w-full'}`}
        >
          <div className="bg-white rounded-3xl border border-rekaz-border/80 shadow-xs p-6 sm:p-10 space-y-8">
            {/* ── 1. Cover Banner Block ───────────────────────────────────── */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-grey">
                  {isRTL ? 'صورة الغلاف' : 'Cover Banner'}
                </label>
                {banner && (
                  <button
                    onClick={() => setBanner('')}
                    className="text-xs font-satoshi text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {isRTL ? 'حذف الصورة' : 'Remove'}
                  </button>
                )}
              </div>

              {banner ? (
                <div className="relative group aspect-[16/9] w-full rounded-2xl overflow-hidden border border-rekaz-border bg-rekaz-bg">
                  <img src={banner} alt="Article cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <label className="px-4 py-2 bg-white text-rekaz-dark rounded-xl text-xs font-satoshi font-bold cursor-pointer hover:bg-gray-100 shadow-md">
                      {isRTL ? 'تغيير الصورة' : 'Change Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-rekaz-border hover:border-rekaz-blue/50 rounded-2xl p-8 text-center transition-colors bg-[#fafafc]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-rekaz-blue/10 text-rekaz-blue flex items-center justify-center mx-auto mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-satoshi font-semibold text-rekaz-dark">
                    {isRTL ? 'انقر أو اسحب صورة الغلاف إلى هنا' : 'Click or drag cover image here'}
                  </p>
                  <p className="text-xs text-rekaz-muted mt-1">
                    {isRTL ? 'الأبعاد المثالية: 1600 × 900 (PNG, JPG, WebP)' : 'Recommended: 1600 × 900px (PNG, JPG, WebP)'}
                  </p>
                </div>
              )}
            </div>

            {/* ── 2. Title & Read Time ────────────────────────────────────── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-rekaz-muted font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime}
                </span>
                <span>{title.length} / 120</span>
              </div>

              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isRTL ? 'عنوان المقال الرئيسي...' : 'Enter article title...'}
                rows={2}
                className="w-full text-2xl sm:text-3xl lg:text-4xl font-satoshi font-bold text-rekaz-dark placeholder:text-rekaz-muted/40 outline-none resize-none border-b border-transparent focus:border-rekaz-blue/20 transition-colors leading-tight"
              />

              {/* Subtitle / Excerpt input */}
              <input
                type="text"
                value={des}
                onChange={(e) => setDes(e.target.value)}
                placeholder={
                  isRTL
                    ? 'ملخص قصير أو وصف تشويقي للمقال (يظهر في بطاقة المقال والبحث)...'
                    : 'Short description or hook summary (appears on preview card)...'
                }
                className="w-full font-dm text-sm sm:text-base text-rekaz-grey placeholder:text-rekaz-muted/50 outline-none py-1 border-b border-rekaz-border/40 focus:border-rekaz-blue/40 transition-colors"
              />
            </div>

            {/* ── 3. Quick Toolbar ────────────────────────────────────────── */}
            <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-rekaz-border/80 shadow-xs flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-satoshi font-bold uppercase tracking-wider text-rekaz-muted px-2">
                {isRTL ? 'إدراج' : 'Insert'}:
              </span>

              <button
                type="button"
                onClick={() => addBlock('paragraph', { text: '' })}
                className="px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border"
                title="Add Paragraph"
              >
                P
              </button>

              <button
                type="button"
                onClick={() => addBlock('header', { level: 2, text: '' })}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border"
                title="Add Section Heading"
              >
                <Heading2 className="w-3.5 h-3.5" />
                H2
              </button>

              <button
                type="button"
                onClick={() => addBlock('header', { level: 3, text: '' })}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border"
                title="Add Subsection Heading"
              >
                <Heading3 className="w-3.5 h-3.5" />
                H3
              </button>

              <button
                type="button"
                onClick={() => addBlock('quote', { text: '', caption: 'Adel, CEO' })}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border"
                title="Add Quote"
              >
                <Quote className="w-3.5 h-3.5" />
                Quote
              </button>

              <button
                type="button"
                onClick={() =>
                  addBlock('callout', {
                    title: isRTL ? 'نصيحة هامة' : 'Important Tip',
                    text: '',
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-amber-700 hover:bg-amber-50 border border-transparent hover:border-amber-200"
                title="Add Tip Callout"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Tip Box
              </button>

              <button
                type="button"
                onClick={() =>
                  addBlock('list', {
                    style: 'unordered',
                    items: ['Point 1', 'Point 2', 'Point 3'],
                  })
                }
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border"
                title="Add Bullet List"
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>

              <label
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border cursor-pointer"
                title="Insert Image"
              >
                <Upload className="w-3.5 h-3.5 text-rekaz-blue" />
                Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInsertImageBlock(e, blocks.length - 1)}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => addBlock('delimiter')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-satoshi font-semibold text-rekaz-dark hover:bg-rekaz-bg border border-transparent hover:border-rekaz-border"
                title="Add Divider"
              >
                <Minus className="w-3.5 h-3.5" />
                Divider
              </button>
            </div>

            {/* ── 4. Interactive Content Blocks Canvas ────────────────────── */}
            <div className="space-y-6 pt-2">
              {blocks.map((block, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl p-3 sm:p-4 border border-transparent hover:border-rekaz-border/80 hover:bg-[#fafafc] transition-all"
                >
                  {/* Block Controls floating on top right / left */}
                  <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white p-1 rounded-lg border border-rekaz-border shadow-xs z-10">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, -1)}
                      disabled={index === 0}
                      className="p-1 text-rekaz-muted hover:text-rekaz-dark disabled:opacity-30 text-xs"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 1)}
                      disabled={index === blocks.length - 1}
                      className="p-1 text-rekaz-muted hover:text-rekaz-dark disabled:opacity-30 text-xs"
                      title="Move Down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Block Type Renderers in Editor */}
                  {block.type === 'paragraph' && (
                    <textarea
                      value={block.data.text || ''}
                      onChange={(e) => updateBlockText(index, e.target.value)}
                      placeholder={
                        isRTL
                          ? 'اكتب فقرتك هنا... يمكنك مشاركة معلومات قيمة للطلاب والأولياء.'
                          : 'Write paragraph text here... You can also use Markdown (# Heading, - List, **bold**).'
                      }
                      rows={Math.max(2, (block.data.text?.length || 0) / 80)}
                      className="w-full font-dm text-base sm:text-lg leading-relaxed text-rekaz-dark placeholder:text-rekaz-muted/40 bg-transparent outline-none resize-y"
                    />
                  )}

                  {block.type === 'header' && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-satoshi font-bold text-rekaz-blue bg-rekaz-blue/10 px-2 py-0.5 rounded">
                        H{block.data.level || 2}
                      </span>
                      <input
                        type="text"
                        value={block.data.text || ''}
                        onChange={(e) => updateBlockText(index, e.target.value)}
                        placeholder={isRTL ? 'عنوان الفقرة...' : 'Heading text...'}
                        className="flex-1 font-satoshi font-bold text-xl sm:text-2xl text-rekaz-dark placeholder:text-rekaz-muted/40 bg-transparent outline-none"
                      />
                    </div>
                  )}

                  {block.type === 'quote' && (
                    <div className="border-s-4 border-rekaz-blue ps-4 space-y-2">
                      <textarea
                        value={block.data.text || ''}
                        onChange={(e) => updateBlockText(index, e.target.value)}
                        placeholder={isRTL ? 'نص الاقتباس أو المقولة...' : 'Quote text...'}
                        rows={2}
                        className="w-full font-dm italic text-lg text-rekaz-dark bg-transparent outline-none resize-none"
                      />
                      <input
                        type="text"
                        value={block.data.caption || ''}
                        onChange={(e) => {
                          const updated = [...blocks];
                          updated[index].data.caption = e.target.value;
                          setBlocks(updated);
                        }}
                        placeholder={isRTL ? 'صاحب المقولة (مثال: أستاذ عادل)...' : 'Quote author / citation...'}
                        className="w-full text-xs font-satoshi font-semibold text-rekaz-blue bg-transparent outline-none"
                      />
                    </div>
                  )}

                  {block.type === 'callout' && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 space-y-2">
                      <input
                        type="text"
                        value={block.data.title || ''}
                        onChange={(e) => {
                          const updated = [...blocks];
                          updated[index].data.title = e.target.value;
                          setBlocks(updated);
                        }}
                        placeholder="Tip / Callout Title"
                        className="w-full font-satoshi font-bold text-sm text-amber-900 bg-transparent outline-none"
                      />
                      <textarea
                        value={block.data.text || ''}
                        onChange={(e) => updateBlockText(index, e.target.value)}
                        placeholder="Write tip or advice for students..."
                        rows={2}
                        className="w-full font-dm text-sm text-amber-900/90 bg-transparent outline-none resize-none"
                      />
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div className="space-y-2">
                      <div className="rounded-xl overflow-hidden border border-rekaz-border max-h-80 bg-rekaz-bg">
                        <img
                          src={block.data.url}
                          alt="Block item"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={block.data.caption || ''}
                        onChange={(e) => {
                          const updated = [...blocks];
                          updated[index].data.caption = e.target.value;
                          setBlocks(updated);
                        }}
                        placeholder={isRTL ? 'تعليق أو وصف الصورة...' : 'Image caption (optional)...'}
                        className="w-full text-center text-xs font-dm text-rekaz-muted bg-transparent outline-none"
                      />
                    </div>
                  )}

                  {block.type === 'list' && (
                    <div className="space-y-2">
                      <span className="text-xs font-satoshi font-bold text-rekaz-grey">
                        {isRTL ? 'عناصر القائمة:' : 'List items (one per line):'}
                      </span>
                      <textarea
                        value={
                          Array.isArray(block.data.items)
                            ? block.data.items.join('\n')
                            : ''
                        }
                        onChange={(e) => {
                          const updated = [...blocks];
                          updated[index].data.items = e.target.value.split('\n');
                          setBlocks(updated);
                        }}
                        rows={3}
                        className="w-full font-dm text-sm text-rekaz-dark bg-white border border-rekaz-border rounded-xl p-3 outline-none"
                      />
                    </div>
                  )}

                  {block.type === 'delimiter' && (
                    <div className="py-2 flex items-center justify-center gap-2 text-rekaz-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-rekaz-blue/30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-rekaz-blue/60" />
                      <span className="w-1.5 h-1.5 rounded-full bg-rekaz-blue/30" />
                    </div>
                  )}
                </div>
              ))}

              {/* Bottom Quick Add Paragraph */}
              <button
                type="button"
                onClick={() => addBlock('paragraph', { text: '' })}
                className="w-full py-4 border-2 border-dashed border-rekaz-border hover:border-rekaz-blue/40 rounded-2xl text-xs font-satoshi font-semibold text-rekaz-grey hover:text-rekaz-blue transition-colors flex items-center justify-center gap-2 cursor-pointer bg-[#fafafc]"
              >
                <Plus className="w-4 h-4" />
                <span>{isRTL ? 'إضافة فقرة جديدة' : 'Add another paragraph'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Preview (Visible in 'split' or 'preview' modes) */}
        <div
          className={`flex-1 transition-all ${
            viewMode === 'edit' ? 'hidden' : 'block'
          } ${viewMode === 'split' ? 'lg:w-1/2' : 'max-w-4xl mx-auto w-full'}`}
        >
          <div className="sticky top-20 bg-white rounded-3xl border border-rekaz-border/80 shadow-md p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-rekaz-border/60">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rekaz-blue/10 text-rekaz-blue text-xs font-satoshi font-bold">
                <Eye className="w-3.5 h-3.5" />
                {isRTL ? 'معاينة القارئ المباشرة' : 'Live Reader Preview'}
              </span>
              <span className="text-xs text-rekaz-muted font-medium">{readTime}</span>
            </div>

            {/* Simulated Reader Article View */}
            <div className="space-y-6">
              {tags.length > 0 && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-satoshi font-bold bg-rekaz-blue/10 text-rekaz-blue">
                  {tags[0]}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl font-satoshi font-bold text-rekaz-dark leading-snug">
                {title || (isRTL ? 'عنوان المقال التجريبي' : 'Your Article Title Will Appear Here')}
              </h1>

              {des && (
                <p className="font-dm text-base text-rekaz-grey leading-relaxed border-s-2 border-rekaz-blue/40 ps-3">
                  {des}
                </p>
              )}

              {/* Author & Date */}
              <div className="flex items-center gap-3 pt-3 border-t border-rekaz-border/60">
                {authorImage ? (
                  <img
                    src={authorImage}
                    alt={author}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-rekaz-gradient flex items-center justify-center text-white text-xs font-bold">
                    {author?.charAt(0) || 'R'}
                  </div>
                )}
                <div>
                  <p className="text-xs font-satoshi font-bold text-rekaz-dark">
                    {author || 'Rēkāz Team'}
                  </p>
                  <p className="text-[11px] text-rekaz-muted">
                    {new Date().toLocaleDateString(isRTL ? 'ar-DZ' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {banner && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-rekaz-bg">
                  <img src={banner} alt={title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Render Blocks in Preview */}
              <div className="space-y-5 pt-4">
                {blocks.map((block, i) => {
                  if (block.type === 'header') {
                    return (
                      <h3
                        key={i}
                        className="font-satoshi font-bold text-xl sm:text-2xl text-rekaz-dark mt-6"
                      >
                        {block.data.text}
                      </h3>
                    );
                  }
                  if (block.type === 'paragraph') {
                    return (
                      <p
                        key={i}
                        className="font-dm text-base leading-relaxed text-rekaz-dark/85"
                      >
                        {block.data.text}
                      </p>
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <blockquote
                        key={i}
                        className="border-s-4 border-rekaz-blue ps-4 py-2 italic font-dm text-lg text-rekaz-dark"
                      >
                        "{block.data.text}"
                        {block.data.caption && (
                          <cite className="block text-xs font-satoshi font-semibold text-rekaz-blue mt-1">
                            — {block.data.caption}
                          </cite>
                        )}
                      </blockquote>
                    );
                  }
                  if (block.type === 'callout') {
                    return (
                      <div
                        key={i}
                        className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-950"
                      >
                        <h5 className="font-satoshi font-bold text-sm text-amber-900 mb-1">
                          {block.data.title}
                        </h5>
                        <p className="font-dm text-sm">{block.data.text}</p>
                      </div>
                    );
                  }
                  if (block.type === 'image' && block.data.url) {
                    return (
                      <figure key={i} className="my-4">
                        <img
                          src={block.data.url}
                          alt="preview"
                          className="rounded-xl w-full object-cover max-h-72"
                        />
                        {block.data.caption && (
                          <figcaption className="text-center text-xs text-rekaz-muted mt-1.5">
                            {block.data.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  if (block.type === 'list' && Array.isArray(block.data.items)) {
                    return (
                      <ul key={i} className="space-y-2 ps-4 list-disc font-dm text-base">
                        {block.data.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Settings & SEO Drawer Modal ────────────────────────────────────── */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-rekaz-border shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-rekaz-border">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-rekaz-blue" />
                <h3 className="font-satoshi font-bold text-lg text-rekaz-dark">
                  {isRTL ? 'إعدادات النشر والكلمات المفتاحية' : 'Publishing & Meta Settings'}
                </h3>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1.5 rounded-lg text-rekaz-muted hover:text-rekaz-dark hover:bg-rekaz-bg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author Settings */}
            <div className="space-y-3">
              <label className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-grey">
                {isRTL ? 'اسم الكاتب أو الأستاذ' : 'Author Name'}
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Rēkāz Academic Team"
                className="w-full px-4 py-2.5 rounded-xl border border-rekaz-border text-sm font-dm text-rekaz-dark outline-none focus:border-rekaz-blue"
              />
            </div>

            {/* Tags / Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-grey">
                  {isRTL ? 'التصنيفات والوسوم' : 'Tags & Topics'} ({tags.length}/6)
                </label>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-satoshi font-bold bg-rekaz-blue/10 text-rekaz-blue"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Popular quick presets */}
              <div className="pt-1">
                <p className="text-[11px] text-rekaz-muted mb-1.5">
                  {isRTL ? 'اختر تصنيفاً سريعاً:' : 'Quick suggestions:'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_TAGS.map((popTag) => (
                    <button
                      key={popTag}
                      type="button"
                      onClick={() => addTag(popTag)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-satoshi font-medium bg-rekaz-bg border border-rekaz-border hover:border-rekaz-blue hover:text-rekaz-blue transition-colors"
                    >
                      +{popTag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add custom tag */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(tagInput);
                    }
                  }}
                  placeholder={isRTL ? 'اكتب وسماً واضغط Enter...' : 'Type custom tag and press Enter...'}
                  className="flex-1 px-4 py-2 rounded-xl border border-rekaz-border text-xs font-dm outline-none focus:border-rekaz-blue"
                />
                <button
                  type="button"
                  onClick={() => addTag(tagInput)}
                  className="px-4 py-2 rounded-xl bg-rekaz-blue text-white text-xs font-satoshi font-semibold hover:bg-rekaz-blue/90"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Read Time Override */}
            <div className="space-y-2">
              <label className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-grey">
                {isRTL ? 'زمن القراءة المتوقع' : 'Estimated Read Time'}
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="4 min read"
                className="w-full px-4 py-2.5 rounded-xl border border-rekaz-border text-sm font-dm text-rekaz-dark outline-none focus:border-rekaz-blue"
              />
            </div>

            <div className="pt-4 border-t border-rekaz-border flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-rekaz-blue text-white font-satoshi font-bold text-xs hover:bg-rekaz-blue/90"
              >
                {isRTL ? 'حفظ وإغلاق' : 'Apply & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditorStudio;
