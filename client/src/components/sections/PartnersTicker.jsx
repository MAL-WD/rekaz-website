import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const PartnersTicker = () => {
  const { t } = useTranslation();
  const logos = [
    { src: '4I0nUFgLGKqAqwEE0S5l6yrCXzQ.svg', w: 132, h: 35 },
    { src: 'K7N7aNahky7BhBGyGdXp7oSDc.svg', w: 100, h: 51 },
    { src: 'UsU6TSwGi1GYzawTJkBdu5BNeqg.svg', w: 105, h: 40 },
    { src: 'Qifbcz2UjIveHTCuImUZcqT9kZg.svg', w: 140, h: 30 },
    { src: '6QEz8kJbwqWFzbNDcgcMwaBk7Jk.svg', w: 176, h: 40 }
  ];
  
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full flex justify-center items-center py-10 bg-white overflow-hidden relative border-y border-rekaz-border/40">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-7 px-6">
        
        {/* Title */}
        <p className="font-satoshi font-semibold text-[15px] tracking-tight text-rekaz-grey text-center max-w-[800px]">
          {t('partners.text', 'Supporting students for BEM and BAC with learning, guidance, and ambition.')}
        </p>
        
        {/* Ticker Container */}
        <div className="w-full max-w-[900px] h-[44px] relative overflow-hidden" 
          style={{
            WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)',
            maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)'
          }}
        >
          <motion.div
            className="flex items-center gap-[60px] absolute left-0"
            animate={{
              x: [0, -600]
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25
            }}
            style={{ width: 'max-content' }}
          >
            {repeatedLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-40 hover:opacity-100"
                style={{ width: logo.w * 0.85, height: logo.h * 0.85 }}
              >
                <img 
                  src={`https://framerusercontent.com/images/${logo.src}`}
                  alt="Partner Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default PartnersTicker;
