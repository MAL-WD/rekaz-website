import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { DEFAULT_BLOGS } from '../data/defaultBlogs';
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  X,
  Compass,
  GraduationCap,
  Calculator,
  Briefcase,
  Layers,
  Heart,
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Curated Categories with icons & localized labels
const CATEGORIES = [
  { id: 'all', labelEn: 'All Topics', labelAr: 'جميع المواضيع', icon: Layers },
  { id: 'BAC', labelEn: 'BAC & Lycée', labelAr: 'بكالوريا وثانوي', icon: GraduationCap },
  { id: 'BEM', labelEn: 'BEM & CEM', labelAr: 'بيام ومتوسط', icon: BookOpen },
  { id: 'Orientation', labelEn: 'Orientation & Tips', labelAr: 'توجيه ونصائح', icon: Compass },
  { id: 'Math', labelEn: 'Math & Sciences', labelAr: 'رياضيات وعلوم', icon: Calculator },
  { id: 'Formations', labelEn: 'Skills & Careers', labelAr: 'دورات وتطوير', icon: Briefcase },
];

// ─── Featured Spotlight Article ───────────────────────────────────────────────
const FeaturedBlogHero = ({ blog, isRTL }) => {
  if (!blog) return null;

  const date = new Date(blog.createdAt || Date.now()).toLocaleDateString(
    isRTL ? 'ar-DZ' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    <div className="relative mb-16 group">
      <div className="relative overflow-hidden rounded-[28px] border border-rekaz-border/80 bg-white shadow-xl shadow-rekaz-blue/5 transition-all duration-300 hover:shadow-2xl hover:shadow-rekaz-blue/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Banner */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-rekaz-bg">
            {blog.banner ? (
              <img
                src={blog.banner}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full min-h-[340px] bg-gradient-to-br from-rekaz-blue/10 via-rekaz-cyan/15 to-rekaz-violet/20 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-rekaz-blue/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
            
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-rekaz-border">
              <Sparkles className="w-3.5 h-3.5 text-rekaz-blue animate-pulse" />
              <span className="text-xs font-satoshi font-bold text-rekaz-dark uppercase tracking-wider">
                {isRTL ? 'مقال مميز' : 'Featured Post'}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-5 p-7 md:p-10 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              {/* Tags & Read Time */}
              <div className="flex flex-wrap items-center gap-2">
                {blog.tags && blog.tags.length > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rekaz-blue/10 text-rekaz-blue">
                    {blog.tags[0]}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-xs text-rekaz-grey font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime || '4 min read'}
                </span>
              </div>

              {/* Title */}
              <Link to={`/blogs/${blog.blog_id}`}>
                <h2 className="text-2xl md:text-3xl font-satoshi font-bold text-rekaz-dark leading-snug group-hover:text-rekaz-blue transition-colors line-clamp-3">
                  {blog.title}
                </h2>
              </Link>

              {/* Description */}
              {blog.des && (
                <p className="text-rekaz-grey font-dm text-sm md:text-base leading-relaxed line-clamp-3">
                  {blog.des}
                </p>
              )}
            </div>

            {/* Author & CTA */}
            <div className="pt-6 mt-6 border-t border-rekaz-border/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {blog.authorImage ? (
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-10 h-10 rounded-full object-cover border border-rekaz-border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rekaz-gradient flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {blog.author?.charAt(0) || 'R'}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-satoshi font-semibold text-rekaz-dark leading-tight">
                    {blog.author || 'Rēkāz Team'}
                  </h4>
                  <p className="text-xs text-rekaz-muted flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {date}
                  </p>
                </div>
              </div>

              <Link
                to={`/blogs/${blog.blog_id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rekaz-blue text-white text-sm font-satoshi font-semibold hover:bg-rekaz-blue/90 shadow-sm transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                <span>{isRTL ? 'قراءة' : 'Read'}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Blog Card ───────────────────────────────────────────────────────────────
const BlogCard = ({ blog, isRTL }) => {
  const date = new Date(blog.createdAt || Date.now()).toLocaleDateString(
    isRTL ? 'ar-DZ' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-rekaz-border/80 hover:border-rekaz-blue/30 hover:shadow-xl hover:shadow-rekaz-blue/5 transition-all duration-300 overflow-hidden">
      {/* Banner */}
      <Link to={`/blogs/${blog.blog_id}`} className="relative aspect-[16/10] w-full overflow-hidden bg-rekaz-bg block">
        {blog.banner ? (
          <img
            src={blog.banner}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rekaz-bg via-rekaz-blue/5 to-rekaz-cyan/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-rekaz-blue/20" />
          </div>
        )}

        {/* Tag on image */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-1 text-[11px] font-satoshi font-bold rounded-lg bg-white/95 backdrop-blur-md text-rekaz-dark shadow-sm border border-rekaz-border/60">
              {blog.tags[0]}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Read time and likes */}
        <div className="flex items-center justify-between text-xs text-rekaz-muted mb-3">
          <span className="inline-flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-rekaz-grey" />
            {blog.readTime || '4 min read'}
          </span>
          {blog.activity?.total_likes > 0 && (
            <span className="inline-flex items-center gap-1 text-red-500 font-medium">
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              {blog.activity.total_likes}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/blogs/${blog.blog_id}`} className="block mb-2">
          <h3 className="text-lg font-satoshi font-bold text-rekaz-dark leading-snug group-hover:text-rekaz-blue transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {blog.des && (
          <p className="text-rekaz-grey font-dm text-sm leading-relaxed line-clamp-2 mb-4">
            {blog.des}
          </p>
        )}

        {/* Author / Date footer */}
        <div className="mt-auto pt-4 border-t border-rekaz-border/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {blog.authorImage ? (
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-7 h-7 rounded-full object-cover border border-rekaz-border shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-rekaz-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {blog.author?.charAt(0) || 'R'}
              </div>
            )}
            <span className="text-xs font-satoshi font-semibold text-rekaz-dark truncate">
              {blog.author || 'Rēkāz Team'}
            </span>
          </div>

          <span className="text-xs font-dm text-rekaz-muted whitespace-nowrap">
            {date}
          </span>
        </div>
      </div>
    </article>
  );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────
const BlogSkeleton = () => (
  <div className="flex flex-col bg-white rounded-2xl border border-rekaz-border overflow-hidden animate-pulse">
    <div className="aspect-[16/10] bg-rekaz-bg" />
    <div className="flex flex-col gap-3 p-6 flex-1">
      <div className="h-4 bg-rekaz-bg rounded-full w-24" />
      <div className="h-6 bg-rekaz-bg rounded-lg w-full" />
      <div className="h-6 bg-rekaz-bg rounded-lg w-3/4" />
      <div className="h-4 bg-rekaz-bg rounded-md w-full mt-2" />
      <div className="mt-auto pt-4 border-t border-rekaz-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-rekaz-bg" />
          <div className="h-4 bg-rekaz-bg rounded w-20" />
        </div>
        <div className="h-3 bg-rekaz-bg rounded w-16" />
      </div>
    </div>
  </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────
const BlogsPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchBlogs = async (page = 1, searchQuery = '', tagQuery = '') => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: 10 };
      if (searchQuery) params.search = searchQuery;
      if (tagQuery && tagQuery !== 'all') params.tag = tagQuery;

      const { data } = await axios.get(`${API}/blogs`, { params, timeout: 12000 });
      if (data.data && data.data.length > 0) {
        setBlogs(data.data);
        setPagination(data.pagination || { page: 1, pages: 1, total: data.data.length });
      } else {
        // Fallback to default blogs if server returned empty list
        let fallback = DEFAULT_BLOGS;
        if (tagQuery && tagQuery !== 'all') {
          fallback = fallback.filter((b) => b.tags.some((t) => t.toLowerCase().includes(tagQuery.toLowerCase())));
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          fallback = fallback.filter((b) => b.title.toLowerCase().includes(q) || b.des?.toLowerCase().includes(q));
        }
        setBlogs(fallback);
        setPagination({ page: 1, pages: 1, total: fallback.length });
      }
    } catch {
      // Gracefully show default curated blogs during cold start or offline
      let fallback = DEFAULT_BLOGS;
      if (tagQuery && tagQuery !== 'all') {
        fallback = fallback.filter((b) => b.tags.some((t) => t.toLowerCase().includes(tagQuery.toLowerCase())));
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        fallback = fallback.filter((b) => b.title.toLowerCase().includes(q) || b.des?.toLowerCase().includes(q));
      }
      setBlogs(fallback);
      setPagination({ page: 1, pages: 1, total: fallback.length });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBlogs(1, search, activeCategory);
  }, [activeCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs(1, search, activeCategory);
  };

  const handleClearFilters = () => {
    setSearch('');
    setActiveCategory('all');
    fetchBlogs(1, '', 'all');
  };

  // If on first page with no search or tag, feature the first blog
  const featuredBlog =
    !search && activeCategory === 'all' && pagination.page === 1 && blogs.length > 0
      ? blogs[0]
      : null;

  const gridBlogs = featuredBlog ? blogs.slice(1) : blogs;

  return (
    <div className="min-h-screen bg-[#fafafc]">
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 px-5 overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-rekaz-blue/10 via-rekaz-cyan/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-container mx-auto flex flex-col items-center text-center gap-6">
          {/* Label Pill */}
          <div className="inline-flex items-center gap-2 border border-rekaz-border/80 bg-white/80 backdrop-blur-md rounded-full px-4 py-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-rekaz-blue animate-pulse" />
            <span className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-dark">
              {t('blogsPage.label')}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-dark tracking-tight leading-[1.15] max-w-3xl">
            {isRTL ? (
              <span>
                رؤى وأدلة تعليمية <span className="gradient-text">للتفوق والنجاح</span>
              </span>
            ) : (
              <span>
                Inspiring Knowledge for <span className="gradient-text">Excellence</span>
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-rekaz-grey font-dm text-base sm:text-lg max-w-2xl leading-relaxed">
            {t('blogsPage.desc')}
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-lg mt-3 flex items-center bg-white border border-rekaz-border rounded-2xl shadow-sm hover:border-rekaz-blue/40 focus-within:border-rekaz-blue focus-within:ring-4 focus-within:ring-rekaz-blue/10 transition-all p-1.5"
          >
            <div className="pl-3.5 pr-2 text-rekaz-muted">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder={t('blogsPage.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent py-2.5 px-2 font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/70 outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  fetchBlogs(1, '', activeCategory);
                }}
                className="p-2 text-rekaz-muted hover:text-rekaz-dark"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rekaz-blue text-white font-satoshi font-semibold text-sm hover:bg-rekaz-blue/90 shadow-sm transition-colors"
            >
              {t('blogsPage.searchButton')}
            </button>
          </form>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-satoshi font-semibold transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-rekaz-blue text-white border-rekaz-blue shadow-md shadow-rekaz-blue/20 scale-105'
                      : 'bg-white text-rekaz-grey border-rekaz-border hover:border-rekaz-blue/40 hover:text-rekaz-dark hover:bg-rekaz-bg'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rekaz-muted'}`} />
                  <span>{isRTL ? cat.labelAr : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main Content Area ───────────────────────────────────────────── */}
      <section className="pb-24 px-5">
        <div className="max-w-container mx-auto">
          {error && (
            <div className="text-center py-20 bg-white rounded-3xl border border-rekaz-border p-8">
              <p className="text-red-500 font-dm mb-4">{error}</p>
              <button
                onClick={() => fetchBlogs(1, search, activeCategory)}
                className="px-4 py-2 rounded-xl bg-rekaz-blue text-white text-sm font-satoshi font-semibold hover:bg-rekaz-blue/90"
              >
                Retry
              </button>
            </div>
          )}

          {!error && (
            <>
              {/* Featured post (only on first page when not filtering search) */}
              {!loading && featuredBlog && (
                <FeaturedBlogHero blog={featuredBlog} isRTL={isRTL} />
              )}

              {/* Result Count / Active Filters */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <h3 className="font-satoshi font-bold text-lg text-rekaz-dark">
                    {activeCategory === 'all'
                      ? isRTL ? 'أحدث المقالات' : 'Latest Articles'
                      : isRTL ? `مقالات تصنيف: ${activeCategory}` : `Category: ${activeCategory}`}
                  </h3>
                  {!loading && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-satoshi font-semibold bg-rekaz-bg border border-rekaz-border text-rekaz-grey">
                      {pagination.total}
                    </span>
                  )}
                </div>

                {(search || activeCategory !== 'all') && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs font-satoshi font-medium text-rekaz-blue hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    {isRTL ? 'إلغاء التصفية' : 'Reset filters'}
                  </button>
                )}
              </div>

              {/* Grid of articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
                  : gridBlogs.map((blog) => (
                      <BlogCard key={blog.blog_id || blog._id} blog={blog} isRTL={isRTL} />
                    ))}
              </div>

              {/* Empty state */}
              {!loading && blogs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border border-rekaz-border/80 text-center max-w-xl mx-auto shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-rekaz-blue/10 flex items-center justify-center text-rekaz-blue mb-4">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-satoshi font-bold text-rekaz-dark mb-2">
                    {t('blogsPage.noArticles')}
                  </h4>
                  <p className="text-rekaz-grey font-dm text-sm max-w-md mb-6 leading-relaxed">
                    {isRTL
                      ? 'لم نعثر على أي مقالات تطابق بحثك الحالي. جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.'
                      : 'No articles match your current search or category filter. Try clearing the filter or search with different keywords.'}
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="px-5 py-2.5 rounded-xl bg-rekaz-blue text-white font-satoshi font-semibold text-sm hover:bg-rekaz-blue/90 shadow-sm transition-colors cursor-pointer"
                  >
                    {t('blogsPage.clearSearch')}
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-16">
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => fetchBlogs(pagination.page - 1, search, activeCategory)}
                    className="p-2.5 rounded-xl border border-rekaz-border bg-white text-rekaz-grey hover:border-rekaz-blue hover:text-rekaz-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </button>

                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => fetchBlogs(p, search, activeCategory)}
                      className={`w-10 h-10 rounded-xl text-sm font-satoshi font-semibold transition-all cursor-pointer ${
                        p === pagination.page
                          ? 'bg-rekaz-blue text-white shadow-md shadow-rekaz-blue/25 scale-105'
                          : 'bg-white border border-rekaz-border text-rekaz-grey hover:border-rekaz-blue hover:text-rekaz-blue'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => fetchBlogs(pagination.page + 1, search, activeCategory)}
                    className="p-2.5 rounded-xl border border-rekaz-border bg-white text-rekaz-grey hover:border-rekaz-blue hover:text-rekaz-blue disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Consultation CTA Banner ─────────────────────────────────────────── */}
      <section className="px-5 pb-20">
        <div className="max-w-container mx-auto">
          <div className="relative bg-gradient-to-br from-rekaz-black via-[#0412fa] to-[#00a5ff] rounded-3xl overflow-hidden px-8 md:px-14 py-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="relative z-10 flex flex-col gap-3 text-center md:text-left rtl:md:text-right">
              <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-satoshi font-medium backdrop-blur-sm self-center md:self-start rtl:md:self-start">
                <Sparkles className="w-3.5 h-3.5 text-rekaz-gold" />
                {isRTL ? 'انضم إلى نخبة المتفوقين' : 'Join Top Achievers'}
              </span>
              <h2 className="text-white font-satoshi font-bold text-2xl sm:text-3xl md:text-4xl leading-tight max-w-xl">
                {t('blogsPage.ctaTitle')}
              </h2>
              <p className="text-white/80 font-dm text-sm sm:text-base max-w-lg">
                {t('blogsPage.ctaDesc')}
              </p>
            </div>
            <Link
              to="/inscription"
              className="relative z-10 shrink-0 bg-white text-rekaz-dark font-satoshi font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/90 hover:shadow-lg transition-all"
            >
              {t('blogsPage.ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
