import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MessageSquare,
  Send,
  Heart,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CommentsSection = ({ blog_id, isRTL, onCommentCountChange }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem('rekaz_commenter_name') || '');
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState({});

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/blogs/${blog_id}/comments`, { timeout: 8000 });
        const list = data.data || [];
        setComments(list);
        if (onCommentCountChange) onCommentCountChange(list.length);
      } catch {
        // Fallback to local storage comments if server offline
        const local = localStorage.getItem(`rekaz_comments_${blog_id}`);
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setComments(parsed);
            if (onCommentCountChange) onCommentCountChange(parsed.length);
          } catch {
            setComments([]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (blog_id) {
      fetchComments();
    }
  }, [blog_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.error(isRTL ? 'يرجى كتابة اسمك' : 'Please enter your name');
    }
    if (!commentText.trim()) {
      return toast.error(isRTL ? 'يرجى كتابة نص التعليق' : 'Please enter a comment');
    }

    setSubmitting(true);
    const toastId = toast.loading(isRTL ? 'جاري نشر التعليق...' : 'Posting comment...');

    // Save name for next time
    localStorage.setItem('rekaz_commenter_name', name.trim());

    const optimisticComment = {
      _id: `temp-${Date.now()}`,
      blog_id,
      name: name.trim(),
      comment: commentText.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${API}/blogs/${blog_id}/comments`, {
        name: name.trim(),
        comment: commentText.trim(),
      });

      const savedComment = response.data?.data || optimisticComment;
      const updatedList = [savedComment, ...comments];
      setComments(updatedList);
      if (onCommentCountChange) onCommentCountChange(updatedList.length);

      // Save locally as backup
      localStorage.setItem(`rekaz_comments_${blog_id}`, JSON.stringify(updatedList));

      setCommentText('');
      toast.success(isRTL ? 'تم نشر تعليقك بنجاح!' : 'Comment posted!', { id: toastId });
    } catch {
      // If server failed (e.g. cold start), add optimistically to local storage
      const updatedList = [optimisticComment, ...comments];
      setComments(updatedList);
      if (onCommentCountChange) onCommentCountChange(updatedList.length);
      localStorage.setItem(`rekaz_comments_${blog_id}`, JSON.stringify(updatedList));

      setCommentText('');
      toast.success(isRTL ? 'تم نشر تعليقك بنجاح!' : 'Comment posted!', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (likedComments[commentId]) return;

    setLikedComments((prev) => ({ ...prev, [commentId]: true }));
    setComments((prev) =>
      prev.map((c) => (c._id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c))
    );

    try {
      await axios.post(`${API}/blogs/${blog_id}/comments/${commentId}/like`);
    } catch {
      // Non-critical
    }
  };

  return (
    <section id="comments-section" className="mt-16 pt-10 border-t border-rekaz-border/80">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rekaz-blue/10 text-rekaz-blue">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-satoshi font-bold text-rekaz-dark">
                {isRTL ? 'التعليقات والمناقشات' : 'Comments & Discussion'}
              </h3>
              <p className="text-xs text-rekaz-muted mt-0.5">
                {isRTL
                  ? 'شارك رأيك، استفسارك، أو تجربتك مع فريق ركاز والطلاب'
                  : 'Share your thoughts, ask questions, or discuss with peers'}
              </p>
            </div>
          </div>

          <span className="px-3.5 py-1 rounded-full text-xs font-satoshi font-bold bg-rekaz-bg border border-rekaz-border text-rekaz-dark">
            {comments.length} {isRTL ? 'تعليق' : 'comments'}
          </span>
        </div>

        {/* Comment Input Card */}
        <div className="bg-[#fafafc] rounded-3xl border border-rekaz-border/80 p-5 sm:p-7 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isRTL ? 'اسمك الكريم (مثال: محمد، سارة)...' : 'Your name (e.g. Mohamed, Sarah)...'}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-rekaz-border text-sm font-dm text-rekaz-dark placeholder:text-rekaz-muted/60 outline-none focus:border-rekaz-blue focus:ring-4 focus:ring-rekaz-blue/10 transition-all"
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  isRTL
                    ? 'اكتب تعليقك هنا... شاركنا رأيك حول هذا الموضوع.'
                    : 'Write your comment here... Share your thoughts about this article.'
                }
                rows={3}
                required
                className="w-full px-4 py-3 rounded-2xl bg-white border border-rekaz-border text-sm font-dm text-rekaz-dark placeholder:text-rekaz-muted/60 outline-none resize-none focus:border-rekaz-blue focus:ring-4 focus:ring-rekaz-blue/10 transition-all leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-rekaz-muted font-dm">
                {commentText.length} / 1200
              </span>

              <button
                type="submit"
                disabled={submitting || !commentText.trim() || !name.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rekaz-blue text-white text-xs font-satoshi font-bold hover:bg-rekaz-blue/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-rekaz-blue/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? (isRTL ? 'جاري النشر...' : 'Posting...') : isRTL ? 'نشر التعليق' : 'Post Comment'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((c) => {
              const commentDate = new Date(c.createdAt || Date.now()).toLocaleDateString(
                isRTL ? 'ar-DZ' : 'en-US',
                { month: 'short', day: 'numeric', year: 'numeric' }
              );

              return (
                <div
                  key={c._id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-rekaz-border/80 shadow-xs space-y-3 transition-all hover:border-rekaz-blue/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-rekaz-gradient flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
                        {c.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <h5 className="font-satoshi font-bold text-sm text-rekaz-dark">
                          {c.name}
                        </h5>
                        <p className="text-[11px] text-rekaz-muted font-dm">
                          {commentDate}
                        </p>
                      </div>
                    </div>

                    {/* Like comment */}
                    <button
                      onClick={() => handleLikeComment(c._id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-satoshi font-semibold transition-all cursor-pointer ${
                        likedComments[c._id]
                          ? 'text-red-500 bg-red-50'
                          : 'text-rekaz-muted hover:text-red-500 hover:bg-red-50/50'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          likedComments[c._id] ? 'fill-red-500 scale-110' : ''
                        }`}
                      />
                      <span>{c.likes || 0}</span>
                    </button>
                  </div>

                  <p className="font-dm text-sm text-rekaz-dark/85 leading-relaxed ps-12 whitespace-pre-line">
                    {c.comment}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 px-4 rounded-3xl bg-white border border-rekaz-border/60">
              <div className="w-12 h-12 rounded-2xl bg-rekaz-blue/10 text-rekaz-blue flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-sm font-satoshi font-bold text-rekaz-dark">
                {isRTL ? 'كن أول من يعلق!' : 'Be the first to comment!'}
              </p>
              <p className="text-xs text-rekaz-muted mt-1 max-w-sm mx-auto">
                {isRTL
                  ? 'رأيك يهمنا، شاركنا وجهة نظرك أو سؤالك حول هذا المقال أعلاه.'
                  : 'Your voice matters. Share your thoughts or questions above.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
