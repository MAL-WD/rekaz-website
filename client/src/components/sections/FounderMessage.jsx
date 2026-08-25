import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const FounderMessage = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center justify-start w-full bg-white relative overflow-hidden py-24 px-6 gap-2">
      {/* Decorative dots background */}
      <div className="absolute inset-0 pointer-events-none bg-dots opacity-[0.4]" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col md:flex-row items-center bg-gradient-to-br from-white to-[rgba(0,165,255,0.02)] border border-rekaz-border shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden w-full max-w-[920px] p-6 md:p-8 gap-8 rounded-[32px] md:rounded-[48px]"
      >
        {/* Avatar Container with dual rings */}
        <div className="flex-shrink-0 relative w-[160px] h-[160px] md:w-[180px] md:h-[180px] rounded-full p-1.5 bg-gradient-to-tr from-rekaz-cyan to-rekaz-blue shadow-md">
          <div className="w-full h-full rounded-full overflow-hidden bg-white">
            <img
              src="https://framerusercontent.com/images/lKaaStgbmdIe8TfrIkFlKzHazV0.png"
              alt={t('founder.title', "Hello, I'm Adel, CEO & Teacher at Rekaz")}
              className="w-full h-full object-cover scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center md:items-start flex-1 w-full gap-3">
          <h2 className="font-satoshi text-center md:text-start text-2xl md:text-[26px] font-bold tracking-[-0.02em] text-rekaz-black w-full">
            {t('founder.title', "Hello, I'm Adel, CEO & Teacher at Rekaz")}
          </h2>

          {/* Bio */}
          <p className="text-center md:text-start font-dm text-[15px] text-rekaz-grey max-w-full md:max-w-[620px] leading-relaxed whitespace-pre-wrap">
            {t('founder.bio', "I want you to know that our mission is bigger than teaching subjects — it's about helping you believe in yourself, discover your potential, and achieve your dreams. Every lesson we give is designed with your future in mind, because I believe each of you has the ability to succeed and make a difference. Rekaz is more than a school; it's a place where together we build the confidence, knowledge, and ambition that will carry you forward in life.")}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            {/* Twitter/X */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-rekaz-border/80 flex items-center justify-center hover:border-rekaz-blue hover:text-rekaz-blue hover:bg-rekaz-blue/[0.03] transition-all group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-rekaz-grey group-hover:text-rekaz-blue transition-colors">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor"/>
              </svg>
            </a>
            {/* Framer */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-rekaz-border/80 flex items-center justify-center hover:border-rekaz-cyan hover:text-rekaz-cyan hover:bg-rekaz-cyan/[0.03] transition-all group">
              <svg width="11" height="13" viewBox="0 0 12 18" fill="none" className="text-rekaz-grey group-hover:text-rekaz-cyan transition-colors">
                <path d="M0 0h12v6H6L0 0zm0 6h6l6 6H6v6L0 12V6z" fill="currentColor"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-rekaz-border/80 flex items-center justify-center hover:border-rekaz-blue hover:text-rekaz-blue hover:bg-rekaz-blue/[0.03] transition-all group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-rekaz-grey group-hover:text-rekaz-blue transition-colors">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-full border border-rekaz-border/80 flex items-center justify-center hover:border-red-600 hover:text-red-600 hover:bg-red-600/[0.03] transition-all group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-rekaz-grey group-hover:text-red-600 transition-colors">
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
