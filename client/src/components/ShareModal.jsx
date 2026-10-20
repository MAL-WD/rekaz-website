import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Send,
  Share2,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ShareModal = ({ isOpen, onClose, url, title, isRTL }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366] text-white hover:bg-[#20bd5a]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.029.562 1.954.817 2.806.817 3.18 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.768-5.767-5.768zm3.385 8.163c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.148-.528-1.745-.723-2.859-2.497-2.946-2.612-.087-.116-.708-.941-.708-1.794 0-.852.449-1.272.608-1.445.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.25-.041.391.297.145.348.493 1.202.536 1.29.043.087.073.188.014.304-.058.116-.087.188-.174.289l-.261.304c-.087.087-.179.182-.077.357.101.174.45 1.033 1.232 1.487.659.382 1.217.5 1.391.579.174.079.275.066.377-.051.101-.116.435-.507.551-.681.116-.174.232-.145.391-.087s1.014.478 1.188.565c.174.087.29.13.333.203.043.072.043.42-.101.825z" />
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2] text-white hover:bg-[#166fe5]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'X (Twitter)',
      color: 'bg-black text-white hover:bg-neutral-800',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0A66C2] text-white hover:bg-[#095196]',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Telegram',
      color: 'bg-[#229ED9] text-white hover:bg-[#1d8cc1]',
      icon: <Send className="w-5 h-5" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'Email',
      color: 'bg-rekaz-grey text-white hover:bg-rekaz-dark',
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(isRTL ? 'تم نسخ الرابط بنجاح!' : 'Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        onClose();
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl border border-rekaz-border shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rekaz-border/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rekaz-blue/10 text-rekaz-blue">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-satoshi font-bold text-lg text-rekaz-dark">
                {isRTL ? 'مشاركة المقال' : 'Share Article'}
              </h3>
              <p className="text-xs text-rekaz-muted">
                {isRTL ? 'شارك هذه الفائدة مع أصدقائك وزملائك' : 'Share this insight with your network'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rekaz-muted hover:text-rekaz-dark hover:bg-rekaz-bg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Buttons Grid */}
        <div className="grid grid-cols-3 gap-3">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl transition-all shadow-xs hover:scale-105 active:scale-95 ${p.color}`}
            >
              {p.icon}
              <span className="text-xs font-satoshi font-semibold tracking-tight">
                {p.name}
              </span>
            </a>
          ))}
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-2">
          <label className="text-xs font-satoshi font-bold uppercase tracking-wider text-rekaz-grey">
            {isRTL ? 'رابط المقال' : 'Direct Link'}
          </label>
          <div className="flex items-center gap-2 bg-rekaz-bg border border-rekaz-border rounded-xl p-1.5 focus-within:border-rekaz-blue transition-colors">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent px-2.5 text-xs font-dm text-rekaz-dark outline-none select-all truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rekaz-blue text-white text-xs font-satoshi font-bold hover:bg-rekaz-blue/90 shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isRTL ? 'تم النسخ' : 'Copied!') : isRTL ? 'نسخ' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Native Mobile Share if available */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl border border-rekaz-border text-xs font-satoshi font-bold text-rekaz-dark hover:bg-rekaz-bg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rekaz-blue" />
            <span>{isRTL ? 'فتح خيارات المشاركة في هاتفك' : 'More sharing options on device'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
