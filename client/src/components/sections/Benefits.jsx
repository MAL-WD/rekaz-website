import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const Benefits = () => {
  const { t } = useTranslation();

  const pillars = [
    { title: t('benefits.items.0.title', 'All Subjects'), desc: t('benefits.items.0.desc', 'Personalized support across the subjects that matter most for confident progress.'), icon: '' },
    { title: t('benefits.items.1.title', 'CEM → BEM'), desc: t('benefits.items.1.desc', 'Build strong foundations and prepare with structure, exercises, and encouragement.'), icon: '' },
    { title: t('benefits.items.2.title', 'Lycée → BAC'), desc: t('benefits.items.2.desc', 'Strengthen advanced learning and prepare strategically for your BAC.'), icon: '' },
    { title: t('benefits.items.3.title', 'Professional Formations'), desc: t('benefits.items.3.desc', 'Develop practical future-ready skills in entrepreneurship, marketing, and digital fields.'), icon: '' },
    { title: t('benefits.items.4.title', 'Valid Certificates'), desc: t('benefits.items.4.desc', 'Complete professional formations and earn certificates that reflect your learning.'), icon: '' },
    { title: t('benefits.items.5.title', 'Educational & Business Consultation'), desc: t('benefits.items.5.desc', 'Make informed academic, career, and growth decisions with meaningful guidance.'), icon: '️' }
  ];

  return (
    <section className='py-24 bg-white'>
      <Container>
        <div className='mb-16'>
          <SectionTag text={t('benefits.tag', 'Rekaz Advantages')} />
          <h2 className='text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-6 max-w-2xl leading-tight'>
            {t('benefits.title', 'Helping Students Turn Effort Into Achievement')}
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16'>
          {pillars.map((pillar, idx) => (
            <div key={idx} className='flex flex-col'>
              <div className='w-14 h-14 rounded-full bg-rekaz-bg border border-rekaz-border flex items-center justify-center text-2xl mb-6'>
                {pillar.icon}
              </div>
              <h3 className='text-xl font-satoshi font-bold mb-3'>{pillar.title}</h3>
              <p className='text-rekaz-grey font-dm leading-relaxed'>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
