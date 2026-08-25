import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className='py-24 relative overflow-hidden'>
      <div 
        className='absolute inset-0 opacity-95' 
        style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
      />
      {/* Background Graphic Placeholder */}
      <div className='absolute inset-0 opacity-20 bg-[url(https://framerusercontent.com/images/eedO7OqcUJCZYRYF2Q9g5B8o.svg)] bg-cover bg-center' />
      
      <Container className='relative z-10'>
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto'>
          <div className='bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-white font-inter text-xs font-bold uppercase tracking-wider mb-8'>
            {t('cta.pill', ' Start Today')}
          </div>
          
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-white mb-10 leading-tight'>
            {t('cta.title', 'Your Future Starts With One Decision')}
          </h2>
          
          <Button to='/inscription' variant='white' className="!text-base !font-semibold hover:scale-105">
            {t('cta.button', 'Start Your Journey — Join Us')}
          </Button>
          
          <div className='mt-12 flex flex-col items-center gap-3'>
            <div className='flex -space-x-2'>
              {['HWnShFKALLR2bY1tj1JBgav2dd8.jpg', 'He9nXv9Rmw2z12YNslbtnFxD6Y.jpg', 'iayFYczg3uvrbDAJEw2AOM6G6RA.jpg'].map((img, i) => (
                <img key={i} src={`https://framerusercontent.com/images/${img}`} alt='Avatar' className='w-10 h-10 rounded-full border-2 border-[#00a5ff] object-cover' />
              ))}
            </div>
            <div className='flex flex-col items-center'>
              <div className='text-rekaz-gold text-sm tracking-widest'></div>
              <span className='text-white/80 text-sm font-dm mt-1'>{t('cta.subtitle', 'For students, learners & families')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
