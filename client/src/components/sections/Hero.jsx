import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full flex justify-center pt-[108px] md:pt-[140px] pb-[64px] md:pb-[80px] overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Radial glow behind heading */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,165,255,0.10) 0%, rgba(4,18,250,0.06) 40%, transparent 70%)' }}
      />

      {/* Curved Ribbon Graphic */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 right-0 w-full max-w-[900px] z-0 opacity-50"
      >
        <img
          src="https://framerusercontent.com/images/H69fgvtyusX1F2CQdRw0a5QNo.png?width=1024&height=1024"
          alt="Curved Ribbon"
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[860px] flex flex-col items-center gap-6"
        >
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white ring-1 ring-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {/* Avatars */}
            <div className="relative w-[88px] h-[28px] flex items-center flex-shrink-0">
              {[
                'Nvakaa29zfYfajSY8Hl1Ccs8Gs.jpeg',
                'bwtAZ3fUxutpksN5L4VuNpZctU.jpeg',
                'ZPu0PRlnDu2orh0wrQY8TCETZ2Y.jpeg'
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-[28px] h-[28px] rounded-full overflow-hidden absolute ring-2 ring-white"
                  style={{ left: i * 20, zIndex: 3 - i }}
                >
                  <img
                    src={`https://framerusercontent.com/images/${src}?width=540&height=540`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Stars & Text */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <span className="font-satoshi font-semibold text-[13px] text-black/80 tracking-tight">
                14,380+ Reviews
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-satoshi font-bold text-[48px] md:text-[68px] lg:text-[76px] leading-[1.08em] tracking-[-0.05em] animated-gradient-text">
            {t('hero.title', 'Rekaz Institute for Education, Training & Consulting')}
          </h1>

          {/* Subtitle */}
          <p className="font-satoshi font-medium text-[17px] md:text-[19px] text-[#5a5a6a] max-w-[560px] leading-[1.6]">
            {t('hero.subtitle', 'Empowering students and learners with knowledge, skills, and guidance for a brighter future.')}
          </p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
          >
            <Link
              to="/inscription"
              className="flex items-center justify-center px-8 py-4 text-white rounded-[16px] font-satoshi font-semibold text-[15px] tracking-[-0.01em] hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-200"
              style={{ background: 'linear-gradient(150deg,#00a5ff 0%,#0412fa 100%)', boxShadow: '0 6px 24px rgba(0,165,255,0.32), inset 0 1px 0 rgba(255,255,255,0.18)' }}
            >
              {t('hero.cta', 'Join Rekaz')}
            </Link>
            <Link
              to="/programs"
              className="flex items-center justify-center gap-2 px-7 py-4 bg-white ring-1 ring-black/[0.08] text-[#0a0a0a] hover:ring-rekaz-cyan hover:text-rekaz-blue rounded-[16px] font-satoshi font-medium text-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,165,255,0.12)] transition-all duration-200 hover:-translate-y-0.5"
            >
              {t('hero.secondary', 'Explore Our Programs')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
