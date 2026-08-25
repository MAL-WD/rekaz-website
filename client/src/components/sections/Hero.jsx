import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full flex justify-center pt-[132px] pb-[60px] overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#ffffff]" />
      
      {/* Curved Ribbon Graphic */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-full max-w-[1024px] z-0 opacity-80"
      >
        <img 
          src="https://framerusercontent.com/images/H69fgvtyusX1F2CQdRw0a5QNo.png?width=1024&height=1024" 
          alt="Curved Ribbon" 
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center px-[25px]">
        {/* Text Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[850px] flex flex-col items-start gap-[20px]"
        >
          {/* Rating */}
          <div className="flex items-center gap-[12px]">
            {/* Avatars */}
            <div className="relative w-[105px] h-[44px] flex items-center">
              <div className="w-[44px] h-[44px] rounded-full overflow-hidden absolute left-0 z-[3]">
                <img src="https://framerusercontent.com/images/Nvakaa29zfYfajSY8Hl1Ccs8Gs.jpeg?width=540&height=540" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-[44px] h-[44px] rounded-full overflow-hidden absolute left-[30px] z-[2]">
                <img src="https://framerusercontent.com/images/bwtAZ3fUxutpksN5L4VuNpZctU.jpeg?width=736&height=736" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-[44px] h-[44px] rounded-full overflow-hidden absolute left-[60px] z-[1]">
                <img src="https://framerusercontent.com/images/ZPu0PRlnDu2orh0wrQY8TCETZ2Y.jpeg?width=735&height=674" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Stars & Text */}
            <div className="flex items-center gap-[7px]">
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>
              <span className="font-satoshi font-medium text-[16px] text-black tracking-[-0.01em]">
                14,380+ Reviews
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 
            className="font-satoshi font-bold text-[48px] md:text-[64px] leading-[1.15em] tracking-[-0.045em] text-start"
            style={{
              backgroundImage: 'linear-gradient(270deg, rgb(1, 2, 23) 45%, rgb(4, 18, 250) 105%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('hero.title', 'Rekaz Institute for Education, Training & Consulting')}
          </h1>

          {/* Subtitle */}
          <p className="font-satoshi font-medium text-[18px] md:text-[20px] text-[#4a4a4a] text-start max-w-[650px] leading-[1.5]">
            {t('hero.subtitle', 'Empowering students and learners with knowledge, skills, and guidance for a brighter future.')}
          </p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-[16px] mt-[10px]"
          >
            <Link 
              to="/inscription" 
              className="flex items-center justify-center px-[34px] py-[16px] text-white rounded-[14px] font-satoshi font-semibold text-[16px] tracking-[-0.01em] shadow-[0_6px_20px_rgba(0,165,255,0.38)] hover:shadow-[0_10px_28px_rgba(4,18,250,0.48)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
            >
              {t('hero.cta', 'Join Rekaz')}
            </Link>
            <Link 
              to="/programs" 
              className="flex items-center justify-center px-[32px] py-[16px] bg-white border border-[#e0e0e0] text-[#0a0a0a] hover:border-rekaz-cyan hover:text-rekaz-blue rounded-[14px] font-satoshi font-medium text-[16px] shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
            >
              {t('hero.secondary', 'Explore Our Programs')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

