import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';

const TestimonialBanner = () => {
  const { t } = useTranslation();

  return (
    <section className='py-20'>
      <Container>
        <div className='bg-gradient-to-r from-rekaz-cyan to-rekaz-blue rounded-[32px] p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden shadow-2xl'>
          {/* Stars */}
          <div className='flex gap-1 mb-8'>
            {[...Array(5)].map((_, i) => (
              <span key={i} className='text-rekaz-gold text-2xl'>★</span>
            ))}
          </div>
          
          <h3 className='text-2xl md:text-3xl lg:text-4xl font-satoshi font-bold text-white leading-tight max-w-4xl mb-12 relative z-10'>
            &quot;{t('testimonialBanner.quote', "Rekaz changed the way I see education. The teachers didn't just prepare me for exams — they helped me believe in myself. I felt supported, motivated, and ready for both school and life.")}&quot;
          </h3>
          
          <div className='flex items-center gap-4 relative z-10'>
            <img 
              src='https://framerusercontent.com/images/lC2qioDBGmsh1XAFkRr8ZIX1TUU.jpg' 
              alt='Student' 
              className='w-14 h-14 rounded-full border-2 border-white object-cover shadow-md'
            />
            <div className='text-start'>
              <div className='text-white font-satoshi font-bold text-lg'>{t('testimonialBanner.name', 'Lazreg Mohamed')}</div>
              {/* Note: Kept placeholder role for now until instructed otherwise */}
              <div className='text-white/80 font-inter text-sm'>{t('testimonialBanner.role', 'Student')}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialBanner;
