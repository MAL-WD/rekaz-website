import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '', banner: '', des: '', content: '', tags: '', author: '', authorImage: '', readTime: '', draft: false
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/blogs');
      setBlogs(res.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        ...blog,
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || ''
      });
    } else {
      setEditingBlog(null);
      setFormData({ title: '', banner: '', des: '', content: '', tags: '', author: '', authorImage: '', readTime: '', draft: false });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBlog(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editingBlog) {
        await API.put(`/blogs/${editingBlog.blog_id}`, payload);
        toast.success('Blog updated successfully');
      } else {
        await API.post('/blogs', payload);
        toast.success('Blog created successfully');
      }
      closeModal();
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  };

  const columns = [
    {
      header: 'Title',
      accessor: (row) => (
        <div className="flex items-center gap-3">
          {row.banner ? (
            <img src={row.banner} alt={row.title} className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-muted">
              <ImageIcon size={20} />
            </div>
          )}
          <span className="font-medium text-dark">{row.title}</span>
        </div>
      )
    },
    { header: 'Author', accessor: 'author' },
    {
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${row.draft ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
          {row.draft ? 'Draft' : 'Published'}
        </span>
      )
    },
    {
      header: 'Tags',
      accessor: (row) => (
        <div className="flex flex-wrap gap-1">
          {Array.isArray(row.tags) ? row.tags.map(t => (
            <span key={t} className="px-2 py-0.5 text-xs bg-surface border border-border rounded-md text-muted">{t}</span>
          )) : row.tags}
        </div>
      )
    },
    { header: 'Date', accessor: (row) => new Date(row.createdAt || Date.now()).toLocaleDateString() }
  ];

  const actions = (row) => (
    <div className="flex items-center gap-2">
      <button onClick={() => openModal(row)} className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
        <Edit size={18} />
      </button>
      <button onClick={() => handleDelete(row.blog_id)} className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Articles</h1>
          <p className="text-muted text-sm mt-1">Manage blog articles and publications.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus size={20} />
          New Article
        </button>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={blogs}
          searchKey="title"
          actions={actions}
          loading={loading}
          emptyMessage="No articles found."
          pageSize={10}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title={editingBlog ? 'Edit Article' : 'New Article'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Author</label>
              <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Banner URL</label>
              <input type="url" value={formData.banner} onChange={(e) => setFormData({...formData, banner: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Author Image URL</label>
              <input type="url" value={formData.authorImage} onChange={(e) => setFormData({...formData, authorImage: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Read Time</label>
              <input type="text" placeholder="e.g. 5 min" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Tags (comma-separated)</label>
              <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Description</label>
            <textarea rows={3} value={formData.des} onChange={(e) => setFormData({...formData, des: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Content (JSON)</label>
            <textarea rows={6} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-y" />
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="draft" checked={formData.draft} onChange={(e) => setFormData({...formData, draft: e.target.checked})} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
            <label htmlFor="draft" className="text-sm font-medium text-dark">Save as Draft</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-dark hover:bg-background rounded-xl transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Blogs;
