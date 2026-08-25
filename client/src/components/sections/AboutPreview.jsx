import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';
import Button from '../ui/Button';
import { TextColorLetters } from '../TextColorLetters';

const AboutPreview = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle bottom-to-top gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-rekaz-surface/40 to-transparent pointer-events-none" />

      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
          <SectionTag text={t('aboutPreview.tag', 'About Us')} icon="" />
          
          <div className="mt-8 mb-12 w-full max-w-4xl px-4 md:px-0">
            <TextColorLetters
              text={t('aboutPreview.text', 'At Rekaz, we believe education is more than lessons — it is the foundation for building confident, ambitious, and successful lives. From the early years of CEM to the challenges of BEM and BAC, our mission is to guide every student with care, innovation, and passion. Rekaz is not just a school, but a home where dreams are nurtured, values are strengthened, and futures are shaped.')}
              isRTL={i18n.language === 'ar'}
              fontSize={32}
            />
          </div>
          
          <Button to="/about" variant="primary">
            {t('aboutPreview.button', 'Meet Rekaz')}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default AboutPreview;
