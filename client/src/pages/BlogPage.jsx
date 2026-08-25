import { useState, useEffect, createContext, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Context so child components can share blog state
export const BlogContext = createContext({});

// ─── Social share buttons ────────────────────────────────────────────────────
const ShareButton = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-full border border-rekaz-border hover:border-rekaz-blue hover:bg-rekaz-blue/5 transition-colors"
  >
    <img src={icon} alt={label} className="w-4 h-4 object-contain" />
  </a>
);

// ─── Render EditorJS block ───────────────────────────────────────────────────
const Block = ({ block }) => {
  const { type, data } = block;

  if (type === 'header') {
    const Tag = `h${data.level}`;
    const sizes = {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base',
    };
    return (
      <Tag
        className={`font-satoshi font-semibold text-rekaz-dark leading-tight mt-8 mb-3 ${sizes[data.level] || 'text-xl'}`}
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    );
  }

  if (type === 'paragraph') {
    return (
      <p
        className="font-dm text-rekaz-dark/80 text-base leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    );
  }

  if (type === 'image') {
    return (
      <figure className="my-8">
        <img
          src={data.file?.url}
          alt={data.caption || ''}
          className="w-full rounded-card-sm object-cover"
        />
        {data.caption && (
          <figcaption className="text-center text-rekaz-muted font-dm text-sm mt-2">
            {data.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (type === 'quote') {
    return (
      <blockquote className="border-l-4 border-rekaz-blue bg-rekaz-blue/5 pl-5 pr-4 py-4 rounded-r-xl my-6">
        <p className="font-dm text-rekaz-dark text-lg leading-relaxed italic">"{data.text}"</p>
        {data.caption && (
          <cite className="text-rekaz-muted text-sm font-satoshi mt-2 block">— {data.caption}</cite>
        )}
      </blockquote>
    );
  }

  if (type === 'list') {
    const Tag = data.style === 'ordered' ? 'ol' : 'ul';
    return (
      <Tag className={`pl-6 my-4 font-dm text-rekaz-dark/80 space-y-2 ${data.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
        {data.items.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </Tag>
    );
  }

  return null;
};

// ─── Like button ─────────────────────────────────────────────────────────────
const LikeButton = ({ blogId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);

  const toggle = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((l) => l + (newLiked ? 1 : -1));
    try {
      await axios.post(`${API}/blogs/${blogId}/like`, { liked: newLiked });
    } catch {
      // revert on error
      setLiked(liked);
      setLikes((l) => l + (newLiked ? -1 : 1));
    }
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-pill border transition-colors text-sm font-satoshi ${
        liked
          ? 'border-red-200 bg-red-50 text-red-500'
          : 'border-rekaz-border text-rekaz-grey hover:border-rekaz-blue hover:text-rekaz-blue'
      }`}
    >
      <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
      <span>{likes}</span>
    </button>
  );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="animate-pulse max-w-3xl mx-auto px-5 pt-32 pb-20">
    <div className="flex gap-3 mb-6">
      <div className="h-4 w-16 bg-rekaz-bg rounded-pill" />
      <div className="h-4 w-4 bg-rekaz-bg rounded-pill" />
      <div className="h-4 w-24 bg-rekaz-bg rounded-pill" />
    </div>
    <div className="h-12 bg-rekaz-bg rounded w-full mb-3" />
    <div className="h-12 bg-rekaz-bg rounded w-2/3 mb-8" />
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-rekaz-bg" />
      <div className="h-4 w-28 bg-rekaz-bg rounded" />
    </div>
    <div className="aspect-video bg-rekaz-bg rounded-card mb-10" />
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-4 bg-rekaz-bg rounded w-full mb-3" />
    ))}
  </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────
const BlogPage = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`${API}/blogs/${blog_id}`);
        setBlog(data.data);
      } catch {
        setError('Blog post not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [blog_id]);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-5">
        <p className="text-rekaz-grey font-dm text-lg">{error}</p>
        <Link to="/blogs" className="text-rekaz-blue font-satoshi text-sm underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // EditorJS content blocks
  const blocks = blog.content?.blocks || [];

  // share URLs
  const shareUrl = window.location.href;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      <div className="min-h-screen bg-white">

        {/* ── Hero section ────────────────────────────────────────────────── */}
        <section className="pt-32 pb-10 px-5">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">

            {/* Meta line: read time · date */}
            <div className="flex items-center gap-2 text-sm font-dm text-rekaz-grey">
              <span>{blog.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-rekaz-grey/40" />
              <span>{date}</span>
              {blog.tags?.length > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-rekaz-grey/40" />
                  <span className="text-rekaz-blue font-satoshi font-medium">{blog.tags[0]}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-satoshi font-semibold text-rekaz-dark leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3">
              {blog.authorImage ? (
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-rekaz-gradient flex items-center justify-center text-white font-bold text-sm">
                  {blog.author?.charAt(0) || 'R'}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs text-rekaz-grey font-dm">Written by</span>
                <span className="text-rekaz-dark font-satoshi font-medium text-sm">{blog.author}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cover image ─────────────────────────────────────────────────── */}
        {blog.banner && (
          <div className="px-5 mb-10">
            <div className="max-w-3xl mx-auto">
              <img
                src={blog.banner}
                alt={blog.title}
                className="w-full aspect-video object-cover rounded-card"
              />
            </div>
          </div>
        )}

        {/* ── Body + Share sidebar ─────────────────────────────────────────── */}
        <section className="px-5 pb-16">
          <div className="max-w-3xl mx-auto flex gap-10">

            {/* Share sidebar – sticks on desktop */}
            <aside className="hidden lg:flex flex-col items-center gap-4 pt-1 sticky top-28 self-start">
              <p className="text-rekaz-grey font-dm text-xs uppercase tracking-widest rotate-0">Share</p>
              <ShareButton
                href={twitterShare}
                icon="https://framerusercontent.com/images/xXvUOxE3tcZSpXA7Z4Bumlnh4.svg"
                label="Share on Twitter"
              />
              <ShareButton
                href={linkedinShare}
                icon="https://framerusercontent.com/images/fKFY9H0kRtdZHfBMWopMbnMjio.svg"
                label="Share on LinkedIn"
              />
              <ShareButton
                href={`https://www.instagram.com/`}
                icon="https://framerusercontent.com/images/Fx5rcAXqD8IvmHQwKM5sBUNihs.svg"
                label="Instagram"
              />
            </aside>

            {/* Article content */}
            <article className="flex-1 min-w-0">
              {/* Description / lead */}
              {blog.des && (
                <p className="text-rekaz-grey font-dm text-lg leading-relaxed mb-8 border-b border-rekaz-border pb-8">
                  {blog.des}
                </p>
              )}

              {/* Render EditorJS blocks */}
              {blocks.length > 0 ? (
                blocks.map((block, i) => <Block key={i} block={block} />)
              ) : (
                // Fallback: raw text paragraphs if content is plain string
                typeof blog.content === 'string' && blog.content
                  ? blog.content.split('\n').filter(Boolean).map((p, i) => (
                      <p key={i} className="font-dm text-rekaz-dark/80 text-base leading-relaxed mb-4">{p}</p>
                    ))
                  : null
              )}

              {/* ── Interaction bar ─────────────────────────────────────── */}
              <div className="mt-12 pt-6 border-t border-rekaz-border flex items-center gap-4 flex-wrap">
                <LikeButton blogId={blog.blog_id} initialLikes={blog.activity?.total_likes} />

                {/* Mobile share */}
                <div className="flex items-center gap-2 lg:hidden">
                  <span className="text-rekaz-grey font-dm text-sm">Share:</span>
                  <ShareButton href={twitterShare} icon="https://framerusercontent.com/images/xXvUOxE3tcZSpXA7Z4Bumlnh4.svg" label="Twitter" />
                  <ShareButton href={linkedinShare} icon="https://framerusercontent.com/images/fKFY9H0kRtdZHfBMWopMbnMjio.svg" label="LinkedIn" />
                </div>

                <Link
                  to="/blogs"
                  className="ml-auto text-rekaz-grey font-satoshi text-sm hover:text-rekaz-blue transition-colors"
                >
                  ← All articles
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="px-5 pb-20">
          <div className="max-w-container mx-auto">
            <div className="relative bg-rekaz-gradient rounded-card overflow-hidden px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
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
                  For students, learners &amp; families.
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
    </BlogContext.Provider>
  );
};

export default BlogPage;
