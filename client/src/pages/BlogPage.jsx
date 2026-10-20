import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { DEFAULT_BLOGS } from '../data/defaultBlogs';
import ShareModal from '../components/ShareModal';
import CommentsSection from '../components/CommentsSection';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Quote as QuoteIcon,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';


const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Block Content Renderer ──────────────────────────────────────────────────
const ContentBlock = ({ block, isRTL }) => {
  const { type, data } = block;

  if (type === 'header') {
    const level = data.level || 2;
    const baseClasses = 'font-satoshi font-bold text-rekaz-dark tracking-tight scroll-mt-24';
    
    if (level === 1) {
      return (
        <h2 className={`${baseClasses} text-2xl sm:text-3xl mt-12 mb-4 pt-4 border-t border-rekaz-border/60`}>
          {data.text}
        </h2>
      );
    }
    if (level === 2) {
      return (
        <h3 className={`${baseClasses} text-xl sm:text-2xl mt-10 mb-3`}>
          {data.text}
        </h3>
      );
    }
    return (
      <h4 className={`${baseClasses} text-lg sm:text-xl mt-8 mb-2 text-rekaz-dark/90`}>
        {data.text}
      </h4>
    );
  }

  if (type === 'paragraph') {
    return (
      <p
        className="font-dm text-rekaz-dark/85 text-base sm:text-lg leading-[1.85] mb-6 tracking-normal"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    );
  }

  if (type === 'image') {
    const imageUrl = data.file?.url || data.url;
    if (!imageUrl) return null;
    return (
      <figure className="my-10">
        <div className="overflow-hidden rounded-2xl border border-rekaz-border/80 bg-rekaz-bg shadow-sm">
          <img
            src={imageUrl}
            alt={data.caption || 'Article illustration'}
            className="w-full max-h-[500px] object-cover"
            loading="lazy"
          />
        </div>
        {data.caption && (
          <figcaption className="text-center text-rekaz-muted font-dm text-xs sm:text-sm mt-3 px-4">
            {data.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (type === 'quote') {
    return (
      <div className="my-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-rekaz-blue/5 via-rekaz-cyan/5 to-transparent border-s-4 border-rekaz-blue p-6 sm:p-8">
        <QuoteIcon className="w-8 h-8 text-rekaz-blue/20 absolute top-4 end-4 pointer-events-none" />
        <blockquote className="font-dm text-rekaz-dark text-lg sm:text-xl italic font-medium leading-relaxed">
          "{data.text}"
        </blockquote>
        {data.caption && (
          <p className="mt-3 text-sm font-satoshi font-semibold text-rekaz-blue flex items-center gap-1.5">
            — {data.caption}
          </p>
        )}
      </div>
    );
  }

  if (type === 'callout' || type === 'alert' || type === 'warning') {
    return (
      <div className="my-8 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 sm:p-6 text-amber-950 flex items-start gap-4">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-700 shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          {data.title && <h5 className="font-satoshi font-bold text-sm text-amber-900">{data.title}</h5>}
          <p className="font-dm text-sm leading-relaxed text-amber-900/90" dangerouslySetInnerHTML={{ __html: data.text || data.message }} />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    const isOrdered = data.style === 'ordered';
    const ListTag = isOrdered ? 'ol' : 'ul';
    return (
      <ListTag
        className={`my-6 space-y-3 font-dm text-rekaz-dark/85 text-base sm:text-lg leading-relaxed ${
          isOrdered ? 'list-decimal ps-6' : 'space-y-3'
        }`}
      >
        {data.items?.map((item, i) => {
          const itemText = typeof item === 'string' ? item : item.content || '';
          if (isOrdered) {
            return <li key={i} dangerouslySetInnerHTML={{ __html: itemText }} />;
          }
          return (
            <li key={i} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-rekaz-blue mt-2.5 shrink-0" />
              <span className="flex-1" dangerouslySetInnerHTML={{ __html: itemText }} />
            </li>
          );
        })}
      </ListTag>
    );
  }

  if (type === 'delimiter') {
    return (
      <div className="flex items-center justify-center gap-2 my-12 text-rekaz-border">
        <span className="w-2 h-2 rounded-full bg-rekaz-blue/30" />
        <span className="w-2 h-2 rounded-full bg-rekaz-blue/60" />
        <span className="w-2 h-2 rounded-full bg-rekaz-blue/30" />
      </div>
    );
  }

  return null;
};

// ─── Reading Progress Bar ────────────────────────────────────────────────────
const ReadingProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-rekaz-blue via-rekaz-cyan to-rekaz-violet transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// ─── Blog Skeleton ───────────────────────────────────────────────────────────
const PostSkeleton = () => (
  <div className="animate-pulse max-w-3xl mx-auto px-5 pt-36 pb-20">
    <div className="h-4 w-28 bg-rekaz-border rounded-full mb-6" />
    <div className="h-10 bg-rekaz-border rounded-xl w-full mb-3" />
    <div className="h-10 bg-rekaz-border rounded-xl w-3/4 mb-6" />
    <div className="flex items-center gap-3 mb-10">
      <div className="w-11 h-11 rounded-full bg-rekaz-border" />
      <div className="space-y-1.5">
        <div className="h-4 w-32 bg-rekaz-border rounded" />
        <div className="h-3 w-24 bg-rekaz-border rounded" />
      </div>
    </div>
    <div className="aspect-[16/9] bg-rekaz-border rounded-2xl mb-12" />
    <div className="space-y-4">
      <div className="h-4 bg-rekaz-border rounded w-full" />
      <div className="h-4 bg-rekaz-border rounded w-full" />
      <div className="h-4 bg-rekaz-border rounded w-5/6" />
    </div>
  </div>
);

// ─── Blog Page Component ─────────────────────────────────────────────────────
const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { blog_id } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);

  const scrollToComments = () => {
    const el = document.getElementById('comments-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const textarea = el.querySelector('textarea, input');
        if (textarea) textarea.focus();
      }, 500);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError('');
      window.scrollTo(0, 0);

      try {
        const { data } = await axios.get(`${API}/blogs/${blog_id}`, { timeout: 12000 });
        if (data.data) {
          setBlog(data.data);
          setLikes(data.data?.activity?.total_likes || 0);
          setCommentsCount(data.data?.activity?.total_comments || 0);
        } else {
          throw new Error('Not found');
        }

        // Fetch related posts
        try {
          const relatedRes = await axios.get(`${API}/blogs?limit=4`, { timeout: 8000 });
          const fetchedRelated = (relatedRes.data?.data || []).filter((b) => b.blog_id !== blog_id).slice(0, 3);
          setRelatedBlogs(fetchedRelated.length > 0 ? fetchedRelated : DEFAULT_BLOGS.filter((b) => b.blog_id !== blog_id).slice(0, 3));
        } catch {
          setRelatedBlogs(DEFAULT_BLOGS.filter((b) => b.blog_id !== blog_id).slice(0, 3));
        }
      } catch {
        const fallback = DEFAULT_BLOGS.find((b) => b.blog_id === blog_id || b.title === blog_id);
        if (fallback) {
          setBlog(fallback);
          setLikes(fallback.activity?.total_likes || 0);
          setCommentsCount(fallback.activity?.total_comments || 0);
          setRelatedBlogs(DEFAULT_BLOGS.filter((b) => b.blog_id !== fallback.blog_id).slice(0, 3));
        } else {
          setError(t('blogPage.notFound') || 'Article not found');
        }
      } finally {
        setLoading(false);
      }


    };

    fetchArticle();
  }, [blog_id]);

  const handleLike = async () => {
    const newLiked = !hasLiked;
    setHasLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      await axios.post(`${API}/blogs/${blog_id}/like`, { liked: newLiked });
    } catch {
      // Revert if API failed
      setHasLiked(hasLiked);
      setLikes((prev) => (newLiked ? prev - 1 : prev + 1));
      toast.error('Could not register like');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success(isRTL ? 'تم نسخ الرابط!' : 'Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) return <PostSkeleton />;

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-5 bg-[#fafafc]">
        <div className="w-16 h-16 rounded-2xl bg-rekaz-blue/10 flex items-center justify-center text-rekaz-blue">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-satoshi font-bold text-rekaz-dark">
          {error || t('blogPage.notFound')}
        </h2>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rekaz-blue text-white font-satoshi font-semibold text-sm hover:bg-rekaz-blue/90 shadow-sm transition-all"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{t('blogPage.back')}</span>
        </Link>
      </div>
    );
  }

  const date = new Date(blog.createdAt || Date.now()).toLocaleDateString(
    isRTL ? 'ar-DZ' : 'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );

  const blocks = blog.content?.blocks || [];
  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog.title);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Reading Progress */}
      <ReadingProgressBar />

      {/* ── Breadcrumb & Meta Header ───────────────────────────────────── */}
      <header className="pt-32 pb-8 px-5 bg-gradient-to-b from-[#f9f9fc] to-white border-b border-rekaz-border/40">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-satoshi font-semibold text-rekaz-grey hover:text-rekaz-blue transition-colors group"
            >
              {isRTL ? (
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              )}
              <span>{t('blogPage.allArticles')}</span>
            </Link>

            {blog.tags && blog.tags.length > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-satoshi font-bold bg-rekaz-blue/10 text-rekaz-blue">
                {blog.tags[0]}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-satoshi font-bold text-rekaz-dark leading-[1.2] tracking-tight">
            {blog.title}
          </h1>

          {/* Subtitle / Excerpt */}
          {blog.des && (
            <p className="font-dm text-base sm:text-lg text-rekaz-grey leading-relaxed">
              {blog.des}
            </p>
          )}

          {/* Author Byline & Date */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-rekaz-border/60">
            <div className="flex items-center gap-3">
              {blog.authorImage ? (
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-11 h-11 rounded-full object-cover border border-rekaz-border shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-rekaz-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                  {blog.author?.charAt(0) || 'R'}
                </div>
              )}
              <div>
                <p className="text-xs text-rekaz-muted font-dm">{t('blogPage.writtenBy')}</p>
                <p className="text-sm font-satoshi font-bold text-rekaz-dark">
                  {blog.author || 'Rēkāz Academic Team'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-dm text-rekaz-grey">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {blog.readTime || '4 min read'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Cover Banner ─────────────────────────────────────────── */}
      {blog.banner && (
        <section className="px-5 my-10">
          <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-rekaz-border/80 shadow-md">
            <img
              src={blog.banner}
              alt={blog.title}
              className="w-full max-h-[520px] object-cover"
            />
          </div>
        </section>
      )}

      {/* ── Article Content & Sticky Engagement Bar ──────────────────── */}
      <div className="max-w-4xl mx-auto px-5 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Floating Action Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 flex flex-col items-center gap-4 py-4 px-2 rounded-2xl bg-white border border-rekaz-border/80 shadow-sm">
              {/* Like Button */}
              <button
                onClick={handleLike}
                title="Like article"
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all cursor-pointer ${
                  hasLiked
                    ? 'text-red-500 bg-red-50'
                    : 'text-rekaz-grey hover:text-red-500 hover:bg-red-50/50'
                }`}
              >
                <Heart className={`w-5 h-5 ${hasLiked ? 'fill-red-500 scale-110' : ''} transition-transform`} />
                <span className="text-[11px] font-satoshi font-bold">{likes}</span>
              </button>

              <div className="w-6 h-px bg-rekaz-border" />

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                title={isRTL ? 'نسخ الرابط' : 'Copy link'}
                className="p-2.5 rounded-xl text-rekaz-grey hover:text-rekaz-blue hover:bg-rekaz-blue/5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
              </button>

              {/* Comment Button */}
              <button
                onClick={scrollToComments}
                title={isRTL ? 'التعليقات' : 'Comments'}
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl text-rekaz-grey hover:text-rekaz-blue hover:bg-rekaz-blue/5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-[11px] font-satoshi font-bold">{commentsCount}</span>
              </button>

              {/* Share to All Platforms */}
              <button
                onClick={() => setShareModalOpen(true)}
                title={isRTL ? 'مشاركة في جميع المنصات' : 'Share to all platforms'}
                className="p-2.5 rounded-xl text-rekaz-grey hover:text-rekaz-blue hover:bg-rekaz-blue/5 transition-colors cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </aside>


          {/* Main Article Body */}
          <main className="lg:col-span-11 max-w-2xl mx-auto w-full">
            <article className="prose prose-lg max-w-none text-rekaz-dark">
              {blocks.length > 0 ? (
                blocks.map((block, index) => (
                  <ContentBlock key={index} block={block} isRTL={isRTL} />
                ))
              ) : (
                // Fallback for plain text or HTML string
                typeof blog.content === 'string' && blog.content ? (
                  blog.content.split('\n\n').map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-dm text-rekaz-dark/85 text-base sm:text-lg leading-[1.85] mb-6"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-rekaz-muted italic">No content available.</p>
                )
              )}
            </article>

            {/* Tags Pills at end of article */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-rekaz-border/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-satoshi font-semibold text-rekaz-muted me-2">
                  {isRTL ? 'الوسوم:' : 'Tags:'}
                </span>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-satoshi font-semibold bg-rekaz-bg border border-rekaz-border text-rekaz-dark"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile Actions Bar */}
            <div className="lg:hidden mt-8 p-3.5 rounded-2xl bg-rekaz-bg border border-rekaz-border flex items-center justify-between">
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-satoshi font-bold transition-all ${
                  hasLiked ? 'text-red-500 bg-red-50' : 'text-rekaz-dark bg-white border border-rekaz-border'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-500' : ''}`} />
                <span>{likes}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-white border border-rekaz-border text-rekaz-grey hover:text-rekaz-blue"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={scrollToComments}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-rekaz-border text-rekaz-grey hover:text-rekaz-blue text-xs font-satoshi font-bold"
                  title="Comments"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{commentsCount}</span>
                </button>
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="p-2 rounded-xl bg-rekaz-blue text-white hover:bg-rekaz-blue/90 shadow-xs"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Author Profile Box */}
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#f9f9fc] to-white border border-rekaz-border shadow-xs">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-start rtl:sm:text-start">
                {blog.authorImage ? (
                  <img
                    src={blog.authorImage}
                    alt={blog.author}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-rekaz-gradient flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0">
                    {blog.author?.charAt(0) || 'R'}
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-satoshi font-bold text-lg text-rekaz-dark">
                      {blog.author || 'Rēkāz Academic Team'}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-satoshi font-bold bg-rekaz-blue/10 text-rekaz-blue">
                      {isRTL ? 'فريق ركاز الرسمي' : 'Official Educator'}
                    </span>
                  </div>
                  <p className="font-dm text-sm text-rekaz-grey leading-relaxed">
                    {isRTL
                      ? 'مؤسسة ركاز للتعليم والتكوين والاستشارات — نلتزم بمرافقة التلاميذ والطلاب لتحقيق أعلى المراتب في الامتحانات الرسمية والمستقبل المهني.'
                      : 'Rēkāz School for Education, Training & Consulting — Empowering learners with structured guidance, exam mastery, and modern skills for tomorrow.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentsSection
              blog_id={blog.blog_id}
              isRTL={isRTL}
              onCommentCountChange={setCommentsCount}
            />
          </main>
        </div>
      </div>


      {/* ── Related Articles ─────────────────────────────────────────── */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 px-5 bg-[#fafafc] border-t border-rekaz-border/60">
          <div className="max-w-container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-blue">
                  {isRTL ? 'واصل القراءة' : 'Keep Reading'}
                </span>
                <h3 className="text-2xl font-satoshi font-bold text-rekaz-dark mt-1">
                  {isRTL ? 'مقالات قد تهمك أيضاً' : 'Related Articles'}
                </h3>
              </div>
              <Link
                to="/blogs"
                className="text-sm font-satoshi font-semibold text-rekaz-blue hover:underline"
              >
                {isRTL ? 'عرض كل المقالات ←' : 'View all articles →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.blog_id}
                  to={`/blogs/${item.blog_id}`}
                  className="group flex flex-col bg-white rounded-2xl border border-rekaz-border/80 hover:border-rekaz-blue/40 hover:shadow-lg transition-all p-5"
                >
                  {item.banner && (
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-rekaz-bg">
                      <img
                        src={item.banner}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <h4 className="font-satoshi font-bold text-base text-rekaz-dark group-hover:text-rekaz-blue transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h4>
                  {item.des && (
                    <p className="font-dm text-xs text-rekaz-grey line-clamp-2 mb-4 leading-relaxed">
                      {item.des}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between text-xs text-rekaz-muted pt-3 border-t border-rekaz-border/60">
                    <span>{item.author || 'Rēkāz Team'}</span>
                    <span>{item.readTime || '4 min read'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share to All Platforms Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url={window.location.href}
        title={blog.title}
        isRTL={isRTL}
      />
    </div>
  );
};

export default BlogPage;

