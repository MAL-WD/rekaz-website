import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

const Integration = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-rekaz-bg overflow-hidden relative border-y border-rekaz-border/40">
      {/* Soft gradient flow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,165,255,0.06) 0%, transparent 70%)' }} />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-satoshi font-bold text-rekaz-black mb-5 leading-[1.15] tracking-[-0.03em]">
            {t('integration.title', 'Learning, guidance, and skills for every ambition')}
          </h2>
          <p className="text-[16px] md:text-[18px] text-rekaz-grey font-dm mb-8 max-w-xl leading-relaxed">
            {t('integration.subtitle', 'Explore education, professional training, e-learning, and consultation designed for your next step.')}
          </p>
          <Button to="/programs" variant="primary">
            {t('integration.button', 'Explore Programs')}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Integration;
