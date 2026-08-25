import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

const TestimonialBanner = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="bg-rekaz-gradient-r bg-noise rounded-[32px] p-8 md:p-14 flex flex-col items-center text-center relative overflow-hidden shadow-xl ring-1 ring-rekaz-blue/20">
          
          {/* Subtle noise background wrapper & radial sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {/* Decorative quote mark */}
          <div className="absolute -top-6 -left-4 text-[180px] leading-none font-satoshi font-black text-white/[0.08] select-none pointer-events-none">
            &ldquo;
          </div>

          {/* Stars */}
          <div className="flex gap-0.5 mb-7 relative z-10">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f2c161" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ))}
          </div>
          
          <h3 className="text-xl md:text-2xl lg:text-3xl font-satoshi font-bold text-white leading-relaxed max-w-3xl mb-10 relative z-10 tracking-tight">
            &ldquo;{t('testimonialBanner.quote', "Rekaz changed the way I see education. The teachers didn't just prepare me for exams — they helped me believe in myself. I felt supported, motivated, and ready for both school and life.")}&rdquo;
          </h3>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full p-0.5 bg-white/20 ring-1 ring-white/40">
              <img 
                src="https://framerusercontent.com/images/lC2qioDBGmsh1XAFkRr8ZIX1TUU.jpg" 
                alt="Student" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="text-start">
              <div className="text-white font-satoshi font-bold text-[15px]">{t('testimonialBanner.name', 'Lazreg Mohamed')}</div>
              <div className="text-white/70 font-inter text-[12px] uppercase tracking-wider font-semibold">{t('testimonialBanner.role', 'Student')}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialBanner;
