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
  
  // Duplicate enough times for seamless looping
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full flex justify-center items-center py-[54px] bg-white overflow-hidden relative">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-[40px] px-[25px]">
        
        {/* Title */}
        <p className="font-satoshi font-medium text-[18px] md:text-[20px] text-[#292929] text-center max-w-[800px]">
          {t('partners.text', 'Supporting students for BEM and BAC with learning, guidance, and ambition.')}
        </p>
        
        {/* Ticker Container */}
        <div className="w-full max-w-[1000px] h-[50px] relative overflow-hidden" 
          style={{
            WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
            maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
          }}
        >
          <motion.div
            className="flex items-center gap-[52px] absolute left-0"
            animate={{
              x: [0, -1000] // Adjust this depending on the total width to loop seamlessly
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20
            }}
            style={{ width: 'max-content' }}
          >
            {repeatedLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                style={{ width: logo.w, height: logo.h }}
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
