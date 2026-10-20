import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Edit3,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  FileText,
  CheckCircle2,
  Clock,
  Heart,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import DataTable from '../components/DataTable';
import StatsCard from '../components/StatsCard';

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'published' | 'draft'
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        await API.delete(`/blogs/${id}`);
        toast.success('Article deleted successfully');
        fetchBlogs();
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  };

  const handleToggleDraft = async (blog) => {
    try {
      const newDraftState = !blog.draft;
      await API.put(`/blogs/${blog.blog_id}`, { draft: newDraftState });
      toast.success(newDraftState ? 'Moved to drafts' : 'Published live!');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Stats calculation
  const totalArticles = blogs.length;
  const publishedCount = blogs.filter((b) => !b.draft).length;
  const draftCount = blogs.filter((b) => b.draft).length;
  const totalLikes = blogs.reduce((acc, b) => acc + (b.activity?.total_likes || 0), 0);

  // Filtered list
  const filteredBlogs = blogs.filter((blog) => {
    if (filterStatus === 'published' && blog.draft) return false;
    if (filterStatus === 'draft' && !blog.draft) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = blog.title?.toLowerCase().includes(q);
      const matchAuthor = blog.author?.toLowerCase().includes(q);
      const matchTag = Array.isArray(blog.tags) && blog.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchAuthor || matchTag;
    }
    return true;
  });

  const columns = [
    {
      header: 'Article',
      accessor: (row) => (
        <div className="flex items-center gap-3 max-w-md">
          {row.banner ? (
            <img
              src={row.banner}
              alt={row.title}
              className="w-12 h-12 rounded-xl object-cover border border-border shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-muted shrink-0">
              <ImageIcon size={20} />
            </div>
          )}
          <div className="min-w-0">
            <h4 className="font-semibold text-dark text-sm truncate hover:text-primary transition-colors">
              {row.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
              <span>{row.author || 'Rekaz Team'}</span>
              <span>•</span>
              <span>{row.readTime || '4 min read'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (row) => (
        <button
          onClick={() => handleToggleDraft(row)}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
            row.draft
              ? 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20'
              : 'bg-success/10 text-success border-success/20 hover:bg-success/20'
          }`}
          title="Click to toggle status"
        >
          {row.draft ? 'Draft' : 'Published'}
        </button>
      ),
    },
    {
      header: 'Tags',
      accessor: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {Array.isArray(row.tags) && row.tags.length > 0 ? (
            row.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] bg-surface border border-border rounded-md text-muted font-medium"
              >
                {t}
              </span>
            ))
          ) : (
            <span className="text-xs text-muted">—</span>
          )}
        </div>
      ),
    },
    {
      header: 'Engagement',
      accessor: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Heart size={14} className={row.activity?.total_likes ? 'text-red-500 fill-red-500' : ''} />
          <span>{row.activity?.total_likes || 0}</span>
        </div>
      ),
    },
    {
      header: 'Date',
      accessor: (row) => (
        <span className="text-xs text-muted">
          {new Date(row.createdAt || Date.now()).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = (row) => (
    <div className="flex items-center gap-1.5">
      {/* View Live Article */}
      <a
        href={`/blogs/${row.blog_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
        title="View live article"
      >
        <ExternalLink size={16} />
      </a>

      {/* Edit in Studio */}
      <a
        href={`/editor/${row.blog_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-secondary hover:bg-secondary/10 rounded-xl transition-colors"
        title="Edit in Visual Studio"
      >
        <Edit3 size={16} />
      </a>

      {/* Delete */}
      <button
        onClick={() => handleDelete(row.blog_id)}
        className="p-2 text-error hover:bg-error/10 rounded-xl transition-colors"
        title="Delete article"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* ── Top Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark tracking-tight">Articles Studio</h1>
          <p className="text-muted text-sm mt-1">
            Create, edit, and publish blogs with the visual writing studio.
          </p>
        </div>

        {/* Primary New Article Button */}
        <a
          href="/editor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 shadow-md shadow-primary/20 transition-all cursor-pointer"
        >
          <Plus size={18} />
          Create New Article
        </a>
      </div>

      {/* ── Stats Overview ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={FileText} label="Total Articles" value={totalArticles} color="primary" />
        <StatsCard icon={CheckCircle2} label="Published" value={publishedCount} color="success" />
        <StatsCard icon={Clock} label="Drafts" value={draftCount} color="warning" />
        <StatsCard icon={Heart} label="Total Likes" value={totalLikes} color="secondary" />
      </div>

      {/* ── Filter Tabs & Search ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-3 rounded-2xl border border-border">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-background p-1 rounded-xl border border-border">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-surface text-dark shadow-xs'
                : 'text-muted hover:text-dark'
            }`}
          >
            All ({totalArticles})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'published'
                ? 'bg-surface text-dark shadow-xs'
                : 'text-muted hover:text-dark'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'draft'
                ? 'bg-surface text-dark shadow-xs'
                : 'text-muted hover:text-dark'
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by title, author, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-sm text-dark placeholder:text-muted/60 outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* ── Table Container ─────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl shadow-xs overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredBlogs}
          actions={actions}
          loading={loading}
          emptyMessage="No articles found. Click 'Create New Article' to write your first post!"
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default Blogs;
