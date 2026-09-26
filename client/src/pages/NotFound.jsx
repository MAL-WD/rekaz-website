import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

/* ─────────────────────────────────────────────────
   Inline keyframe styles injected once
───────────────────────────────────────────────── */
const CSS = `
  @keyframes nf-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-18px); }
  }
  @keyframes nf-pulse-ring {
    0%   { transform: scale(0.85); opacity: 0.6; }
    50%  { transform: scale(1.05); opacity: 0.15; }
    100% { transform: scale(0.85); opacity: 0.6; }
  }
  @keyframes nf-fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes nf-glow-shift {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
  @keyframes nf-spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes nf-counter-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes nf-particle {
    0%   { transform: translateY(0) scale(1);   opacity: 0.7; }
    100% { transform: translateY(-90px) scale(0); opacity: 0; }
  }
  .nf-float      { animation: nf-float      4s  ease-in-out  infinite; }
  .nf-fade-up-1  { animation: nf-fade-up    0.6s ease-out    0.1s both; }
  .nf-fade-up-2  { animation: nf-fade-up    0.6s ease-out    0.3s both; }
  .nf-fade-up-3  { animation: nf-fade-up    0.6s ease-out    0.5s both; }
  .nf-fade-up-4  { animation: nf-fade-up    0.6s ease-out    0.7s both; }
  .nf-404-text {
    background: linear-gradient(135deg, #00a5ff 0%, #0412fa 40%, #99a1ff 70%, #00a5ff 100%);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: nf-glow-shift 5s ease infinite;
    filter: drop-shadow(0 0 40px rgba(0,165,255,0.5)) drop-shadow(0 0 80px rgba(4,18,250,0.3));
  }
  .nf-ring-outer {
    animation: nf-spin-slow 18s linear infinite;
  }
  .nf-ring-inner {
    animation: nf-counter-spin 12s linear infinite;
  }
  .nf-pulse-ring {
    animation: nf-pulse-ring 3s ease-in-out infinite;
  }
  .nf-particle { animation: nf-particle 2.5s ease-out infinite; }
`;

const particles = [
  { x: '15%', delay: '0s',    size: 5 },
  { x: '30%', delay: '0.6s',  size: 3 },
  { x: '50%', delay: '1.2s',  size: 4 },
  { x: '68%', delay: '0.3s',  size: 6 },
  { x: '82%', delay: '1.8s',  size: 3 },
  { x: '92%', delay: '0.9s',  size: 5 },
];

export default function NotFound() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const styleRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById('nf-styles')) {
      const el = document.createElement('style');
      el.id = 'nf-styles';
      el.textContent = CSS;
      document.head.appendChild(el);
      styleRef.current = el;
    }
    return () => {
      styleRef.current?.remove();
    };
  }, []);

  const text = {
    title:   isRtl ? 'الصفحة غير موجودة'                                               : 'Page Not Found',
    desc:    isRtl ? 'يبدو أن هذه الصفحة اختفت في الفضاء. ربما أُزيلت أو تم نقلها.' : 'Looks like this page got lost in space. It may have been removed or moved somewhere new.',
    home:    isRtl ? 'العودة للرئيسية'                                                  : 'Back to Home',
    contact: isRtl ? 'اتصل بنا'                                                         : 'Contact Us',
  };

  return (
    <>
      <Helmet>
        <title>{`404 – ${text.title} | Rekaz`}</title>
      </Helmet>

      {/* ── Full-screen stage ── */}
      <section
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(0,165,255,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(4,18,250,0.08) 0%, transparent 60%), #f9f9fc',
          padding: '60px 24px',
        }}
      >
        {/* Grid background */}
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }} />

        {/* Ambient blobs */}
        <div style={{
          position: 'absolute', top: '8%', left: '5%', width: 420, height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,165,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '5%', width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4,18,250,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none',
        }} />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', bottom: 0, left: p.x,
            width: p.size, height: p.size, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00a5ff, #0412fa)',
            animationDelay: p.delay,
            opacity: 0,
          }} className="nf-particle" />
        ))}

        {/* ── Central floating card ── */}
        <div
          className="nf-float"
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 0,
          }}
        >
          {/* Orbital rings around 404 */}
          <div style={{ position: 'relative', marginBottom: 8 }}>
            {/* Pulse ring */}
            <div className="nf-pulse-ring" style={{
              position: 'absolute', inset: -40,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,165,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Outer dashed ring */}
            <div className="nf-ring-outer" style={{
              position: 'absolute', inset: -28,
              borderRadius: '50%',
              border: '1.5px dashed rgba(0,165,255,0.25)',
              pointerEvents: 'none',
            }}>
              {/* Dot on outer ring */}
              <div style={{
                position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
                width: 7, height: 7, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00a5ff, #0412fa)',
                boxShadow: '0 0 8px rgba(0,165,255,0.8)',
              }} />
            </div>

            {/* Inner dashed ring */}
            <div className="nf-ring-inner" style={{
              position: 'absolute', inset: -12,
              borderRadius: '50%',
              border: '1px dashed rgba(4,18,250,0.20)',
              pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                width: 5, height: 5, borderRadius: '50%',
                background: '#99a1ff',
                boxShadow: '0 0 6px rgba(153,161,255,0.9)',
              }} />
            </div>

            {/* THE BIG 404 */}
            <div
              className="nf-404-text"
              style={{
                fontSize: 'clamp(130px, 22vw, 280px)',
                fontFamily: 'var(--font-satoshi), sans-serif',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                userSelect: 'none',
                padding: '0 12px',
              }}
            >
              404
            </div>
          </div>

          {/* Divider */}
          <div className="nf-fade-up-1" style={{
            width: 60, height: 3, borderRadius: 99, marginTop: 20, marginBottom: 28,
            background: 'linear-gradient(90deg, #00a5ff, #0412fa)',
            boxShadow: '0 0 12px rgba(0,165,255,0.6)',
          }} />

          {/* Title */}
          <h1 className="nf-fade-up-2" style={{
            fontFamily: isRtl ? 'var(--font-arabic-title)' : 'var(--font-satoshi)',
            fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 42px)',
            color: '#010212',
            margin: '0 0 14px',
            letterSpacing: isRtl ? 0 : '-0.02em',
            lineHeight: 1.2,
          }}>
            {text.title}
          </h1>

          {/* Description */}
          <p className="nf-fade-up-3" style={{
            fontFamily: isRtl ? 'var(--font-arabic-text)' : 'var(--font-satoshi)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#636363',
            maxWidth: 460,
            lineHeight: 1.7,
            margin: '0 0 40px',
          }}>
            {text.desc}
          </p>

          {/* CTAs */}
          <div className="nf-fade-up-4" style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            justifyContent: 'center',
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}>
            {/* Primary */}
            <Link
              to="/"
              className="btn-gradient-blue"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '14px 30px',
                borderRadius: 14,
                fontFamily: isRtl ? 'var(--font-arabic-title)' : 'var(--font-satoshi)',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                flexDirection: isRtl ? 'row-reverse' : 'row',
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {text.home}
            </Link>

            {/* Secondary */}
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '13px 28px',
                borderRadius: 14,
                fontFamily: isRtl ? 'var(--font-arabic-title)' : 'var(--font-satoshi)',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                color: '#0412fa',
                background: 'rgba(4,18,250,0.07)',
                border: '1.5px solid rgba(4,18,250,0.15)',
                transition: 'all 0.25s ease',
                flexDirection: isRtl ? 'row-reverse' : 'row',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(4,18,250,0.13)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(4,18,250,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {text.contact}
              <svg
                width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom label */}
        <p style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 12,
          color: '#b0b0b8',
          letterSpacing: '0.08em',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-satoshi)',
        }}>
          REKAZ · ERROR 404
        </p>
      </section>
    </>
  );
}
