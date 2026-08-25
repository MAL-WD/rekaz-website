import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden bg-rekaz-black">
      {/* Heavy gradient background with noise */}
      <div 
        className="absolute inset-0 opacity-90 bg-noise" 
        style={{ background: 'linear-gradient(135deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
      />
      {/* Additional grid layout background */}
      <div className="absolute inset-0 opacity-10 bg-[url(https://framerusercontent.com/images/eedO7OqcUJCZYRYF2Q9g5B8o.svg)] bg-cover bg-center" />
      
      {/* Decorative circle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.08] rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20 text-white font-inter text-[10px] font-bold uppercase tracking-widest mb-6">
            {t('cta.pill', 'Start Today')}
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-white mb-8 leading-[1.1] tracking-[-0.04em]">
            {t('cta.title', 'Your Future Starts With One Decision')}
          </h2>
          
          <Button to="/inscription" variant="white" className="!text-sm !font-bold hover:scale-[1.02] shadow-lg">
            {t('cta.button', 'Start Your Journey — Join Us')}
          </Button>
          
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex -space-x-2">
              {['HWnShFKALLR2bY1tj1JBgav2dd8.jpg', 'He9nXv9Rmw2z12YNslbtnFxD6Y.jpg', 'iayFYczg3uvrbDAJEw2AOM6G6RA.jpg'].map((img, i) => (
                <img 
                  key={i} 
                  src={`https://framerusercontent.com/images/${img}`} 
                  alt="Avatar" 
                  className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-md" 
                />
              ))}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white/80 text-[13px] font-dm">{t('cta.subtitle', 'For students, learners & families')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
