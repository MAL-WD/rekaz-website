import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState(0);
  
  const faqs = [
    { q: t('faq.items.0.q', 'Which school levels does Rekaz support?'), a: t('faq.items.0.a', 'We support all CEM (Middle School) levels from 1CEM to 4CEM/BEM, and all Lycée (High School) levels from 1AS to 3AS/BAC.') },
    { q: t('faq.items.1.q', 'Do you teach all subjects?'), a: t('faq.items.1.a', 'Yes, we provide comprehensive support across all subjects required for both middle school and high school curriculums.') },
    { q: t('faq.items.2.q', 'What is included in BEM and BAC preparation?'), a: t('faq.items.2.a', 'Our preparation includes intensive subject review, past paper practice, mock exams, and strategic guidance to build confidence.') },
    { q: t('faq.items.3.q', 'What professional formations are available?'), a: t('faq.items.3.a', 'We offer practical courses in entrepreneurship, marketing, digital skills, cybersecurity, and advanced management.') },
    { q: t('faq.items.4.q', 'Are certificates provided after formations?'), a: t('faq.items.4.a', 'Yes, all our professional formations conclude with a valid certificate upon successful completion.') },
    { q: t('faq.items.5.q', 'Can I learn online?'), a: t('faq.items.5.a', 'Our modern E-Learning platform is launching soon, allowing you to learn anything, anywhere, anytime.') }
  ];

  return (
    <section className='py-24 bg-rekaz-bg'>
      <Container>
        <div className='flex flex-col items-center text-center mb-16 max-w-2xl mx-auto'>
          <SectionTag text={t('faq.tag', 'FAQ')} />
          <h2 className='text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-6'>
            {t('faq.title', 'Questions about Rekaz? We’re here to help.')}
          </h2>
        </div>

        <div className='max-w-3xl mx-auto space-y-4'>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-rekaz-border bg-white rounded-[16px] overflow-hidden transition-all duration-300 ${openIdx === idx ? 'shadow-lg border-rekaz-cyan' : ''}`}
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className='w-full text-start px-8 py-6 flex items-center justify-between font-satoshi font-bold text-lg'
              >
                {faq.q}
                <span className={`text-2xl text-rekaz-cyan transition-transform duration-300 ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className='text-rekaz-grey font-dm text-start'>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
