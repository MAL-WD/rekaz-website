import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Blog Card ───────────────────────────────────────────────────────────────
const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      to={`/blogs/${blog.blog_id}`}
      className="group flex flex-col bg-white rounded-card border border-rekaz-border hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Cover image */}
      <div className="aspect-video w-full overflow-hidden bg-rekaz-bg">
        {blog.banner ? (
          <img
            src={blog.banner}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rekaz-bg to-rekaz-violet/20" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium font-satoshi text-rekaz-blue bg-rekaz-blue/10 px-3 py-1 rounded-pill"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-rekaz-dark font-satoshi font-semibold text-lg leading-snug line-clamp-2 group-hover:text-rekaz-blue transition-colors">
          {blog.title}
        </h3>

        {/* Description */}
        {blog.des && (
          <p className="text-rekaz-grey font-dm text-sm leading-relaxed line-clamp-2">
            {blog.des}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-rekaz-border">
          {blog.authorImage ? (
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-rekaz-gradient flex items-center justify-center text-white text-xs font-bold">
              {blog.author?.charAt(0) || 'R'}
            </div>
          )}
          <span className="text-rekaz-dark font-satoshi text-sm font-medium flex-1 truncate">
            {blog.author}
          </span>
          <span className="text-rekaz-grey font-dm text-xs whitespace-nowrap">
            {blog.readTime}
          </span>
          <span className="text-rekaz-grey/60 text-xs">·</span>
          <span className="text-rekaz-grey font-dm text-xs whitespace-nowrap">{date}</span>
        </div>
      </div>
    </Link>
  );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="flex flex-col bg-white rounded-card border border-rekaz-border overflow-hidden animate-pulse">
    <div className="aspect-video bg-rekaz-bg" />
    <div className="flex flex-col gap-3 p-6">
      <div className="h-4 bg-rekaz-bg rounded-pill w-20" />
      <div className="h-5 bg-rekaz-bg rounded w-full" />
      <div className="h-5 bg-rekaz-bg rounded w-3/4" />
      <div className="h-4 bg-rekaz-bg rounded w-full mt-1" />
      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-rekaz-border">
        <div className="w-7 h-7 rounded-full bg-rekaz-bg" />
        <div className="h-4 bg-rekaz-bg rounded w-24" />
      </div>
    </div>
  </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────
const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchBlogs = async (page = 1, searchQuery = '') => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 9 };
      if (searchQuery) params.search = searchQuery;
      const { data } = await axios.get(`${API}/blogs`, { params });
      setBlogs(data.data);
      setPagination(data.pagination);
    } catch {
      setError('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1, query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-5 text-center">
        <div className="max-w-container mx-auto flex flex-col items-center gap-6">
          {/* Label */}
          <span className="inline-flex items-center gap-2 border border-rekaz-border rounded-pill px-4 py-1.5 text-sm font-satoshi text-rekaz-grey">
            <span className="w-1.5 h-1.5 rounded-full bg-rekaz-blue inline-block" />
            Rekaz Blog
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-semibold text-rekaz-dark leading-tight tracking-tight max-w-3xl">
            Insights for Students &amp; Families
          </h1>

          <p className="text-rekaz-grey font-dm text-lg max-w-xl leading-relaxed">
            Tips, guides, and updates to help you navigate your educational journey with confidence.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-md bg-rekaz-bg border border-rekaz-border rounded-2xl overflow-hidden mt-2"
          >
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent px-5 py-3.5 font-dm text-rekaz-dark placeholder:text-rekaz-muted outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-rekaz-blue text-white font-satoshi font-medium text-sm px-5 py-3.5 hover:bg-rekaz-blue/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div className="w-full h-px bg-rekaz-border" />

      {/* ── Blog grid ───────────────────────────────────────────────────── */}
      <section className="py-16 px-5">
        <div className="max-w-container mx-auto">
          {error && (
            <div className="text-center py-20 text-rekaz-grey font-dm">{error}</div>
          )}

          {!error && (
            <>
              {/* result count */}
              {!loading && (
                <p className="text-rekaz-grey font-dm text-sm mb-8">
                  {pagination.total} article{pagination.total !== 1 ? 's' : ''} found
                  {query ? ` for "${query}"` : ''}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                  ? Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} />)
                  : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
              </div>

              {/* Empty state */}
              {!loading && blogs.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-24 text-center">
                  <svg className="w-16 h-16 text-rekaz-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-rekaz-grey font-dm text-lg">No articles found.</p>
                  {query && (
                    <button
                      onClick={() => { setSearch(''); setQuery(''); }}
                      className="text-rekaz-blue font-satoshi text-sm underline"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => fetchBlogs(p, query)}
                      className={`w-9 h-9 rounded-btn text-sm font-satoshi transition-colors ${
                        p === pagination.page
                          ? 'bg-rekaz-blue text-white'
                          : 'border border-rekaz-border text-rekaz-grey hover:border-rekaz-blue hover:text-rekaz-blue'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="px-5 pb-20">
        <div className="max-w-container mx-auto">
          <div className="relative bg-rekaz-gradient rounded-card overflow-hidden px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* BG lines */}
            <img
              src="https://framerusercontent.com/images/eedO7OqcUJCZYRYF2Q9g5B8o.svg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-white font-satoshi font-semibold text-3xl md:text-4xl leading-tight max-w-lg">
                Your Future Starts With One Decision
              </h2>
              <p className="text-white/70 font-dm text-base">
                Join thousands of students already on their journey with Rekaz.
              </p>
            </div>
            <Link
              to="/consultation"
              className="relative shrink-0 bg-white text-rekaz-dark font-satoshi font-semibold text-sm px-7 py-4 rounded-btn hover:bg-white/90 transition-colors"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
