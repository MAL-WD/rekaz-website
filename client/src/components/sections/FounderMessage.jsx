import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const FounderMessage = () => {
  const { t } = useTranslation();

  return (
    <section
      className="flex flex-col items-center justify-start w-full bg-white relative overflow-hidden"
      style={{ padding: '96px 24px', gap: '10px' }}
    >
      {/* Decorative dot pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #636363 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-[1] flex flex-row items-center justify-start bg-white overflow-hidden w-full"
        style={{
          maxWidth: '960px',
          height: 'auto',
          minHeight: '261px',
          borderRadius: '160px',
          border: '1px solid #e0e0e0',
          gap: '24px',
          padding: '12px',
        }}
      >
        {/* Avatar */}
        <div
          className="flex-shrink-0 relative overflow-hidden"
          style={{
            width: '237px',
            height: '237px',
            aspectRatio: '1',
            borderRadius: '60px',
          }}
        >
          <img
            src="https://framerusercontent.com/images/lKaaStgbmdIe8TfrIkFlKzHazV0.png"
            alt={t('founder.title', "Hello, I'm Adel, CEO & Teacher at Rekaz")}
            className="w-full h-full object-cover block"
            style={{ borderRadius: 'inherit' }}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div
          className="flex flex-col justify-center items-start flex-1 relative overflow-hidden"
          style={{ gap: '5px', padding: '12px 12px 0 0' }}
        >
          {/* Title Row */}
          <div className="flex flex-row items-center justify-start w-full" style={{ gap: '24px' }}>
            <h2
              className="whitespace-pre text-start"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '36px',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'rgb(51, 51, 51)',
              }}
            >
              {t('founder.title', "Hello, I'm Adel, CEO & Teacher at Rekaz")}
            </h2>

            {/* CEO Badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--color-rekaz-dark, #292929)',
                }}
              >
                {t('founder.badge', 'CEO & Teacher')}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="flex-shrink-0"
                style={{ width: '20px', height: '20px', fill: 'rgb(0, 77, 102)' }}
              >
                <path d="M216,96A88,88,0,1,0,72,163.83V240a8,8,0,0,0,11.58,7.16L128,225l44.43,22.21A8.07,8.07,0,0,0,176,248a8,8,0,0,0,8-8V163.83A87.85,87.85,0,0,0,216,96ZM56,96a72,72,0,1,1,72,72A72.08,72.08,0,0,1,56,96Zm16,0a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <p
            className="relative text-start"
            style={{
              fontFamily: '"Satoshi", sans-serif',
              fontSize: '18px',
              lineHeight: '1.6em',
              color: 'rgb(89, 89, 89)',
              maxWidth: '630px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {t('founder.bio', "I want you to know that our mission is bigger than teaching subjects — it's about helping you believe in yourself, discover your potential, and achieve your dreams. Every lesson we give is designed with your future in mind, because I believe each of you has the ability to succeed and make a difference. Rekaz is more than a school; it's a place where together we build the confidence, knowledge, and ambition that will carry you forward in life.")}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            {/* Twitter/X */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] rounded-full border border-[#e0e0e0] flex items-center justify-center hover:border-[#1d9bf0] transition-colors group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#636363] group-hover:text-[#1d9bf0] transition-colors">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor"/>
              </svg>
            </a>
            {/* Framer */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] rounded-full border border-[#e0e0e0] flex items-center justify-center hover:border-[#05f] transition-colors group">
              <svg width="12" height="14" viewBox="0 0 12 18" fill="none" className="text-[#636363] group-hover:text-[#05f] transition-colors">
                <path d="M0 0h12v6H6L0 0zm0 6h6l6 6H6v6L0 12V6z" fill="currentColor"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] rounded-full border border-[#e0e0e0] flex items-center justify-center hover:border-[#0a66c2] transition-colors group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#636363] group-hover:text-[#0a66c2] transition-colors">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px] rounded-full border border-[#e0e0e0] flex items-center justify-center hover:border-[#ff0000] transition-colors group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#636363] group-hover:text-[#ff0000] transition-colors">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FounderMessage;
