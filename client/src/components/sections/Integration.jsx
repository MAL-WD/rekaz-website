import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import Button from '../ui/Button';

const Integration = () => {
  const { t } = useTranslation();

  return (
    <section className='py-24 bg-rekaz-bg overflow-hidden relative'>
      <Container className='relative z-10'>
        <div className='flex flex-col items-center text-center max-w-3xl mx-auto'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mb-6 leading-tight'>
            {t('integration.title', 'Learning, guidance, and skills for every ambition')}
          </h2>
          <p className='text-xl text-rekaz-grey font-dm mb-10'>
            {t('integration.subtitle', 'Explore education, professional training, e-learning, and consultation designed for your next step.')}
          </p>
          <Button to='/programs' variant='primary'>{t('integration.button', 'Explore Programs')}</Button>
        </div>
      </Container>
    </section>
  );
};

export default Integration;
