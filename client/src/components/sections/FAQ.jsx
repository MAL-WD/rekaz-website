import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    { q: t('faq.items.0.q', 'Which school levels does Rekaz support?'), a: t('faq.items.0.a', 'We support all CEM (Middle School) levels from 1CEM to 4CEM/BEM, and all Lycee (High School) levels from 1AS to 3AS/BAC.') },
    { q: t('faq.items.1.q', 'Do you teach all subjects?'), a: t('faq.items.1.a', 'Yes, we provide comprehensive support across all subjects required for both middle school and high school curriculums.') },
    { q: t('faq.items.2.q', 'What is included in BEM and BAC preparation?'), a: t('faq.items.2.a', 'Our preparation includes intensive subject review, past paper practice, mock exams, and strategic guidance to build confidence.') },
    { q: t('faq.items.3.q', 'What professional formations are available?'), a: t('faq.items.3.a', 'We offer practical courses in entrepreneurship, marketing, digital skills, cybersecurity, and advanced management.') },
    { q: t('faq.items.4.q', 'Are certificates provided after formations?'), a: t('faq.items.4.a', 'Yes, all our professional formations conclude with a valid certificate upon successful completion.') },
    { q: t('faq.items.5.q', 'Can I learn online?'), a: t('faq.items.5.a', 'Our modern E-Learning platform is launching soon, allowing you to learn anything, anywhere, anytime.') }
  ];

  return (
    <section className="py-24 bg-rekaz-bg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14 max-w-2xl mx-auto"
        >
          <SectionTag text={t('faq.tag', 'FAQ')} />
          <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 tracking-[-0.03em] leading-[1.15]">
            {t('faq.title', 'Questions about Rekaz? We are here to help.')}
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-white rounded-[18px] overflow-hidden transition-all duration-300 ${
                openIdx === idx
                  ? 'ring-1 ring-rekaz-cyan/40 shadow-[0_4px_24px_rgba(0,165,255,0.10)]'
                  : 'ring-1 ring-black/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full text-start px-6 py-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="flex-shrink-0 text-[11px] font-bold text-rekaz-cyan/70 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-satoshi font-semibold text-[15px] text-rekaz-black leading-snug">
                    {faq.q}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIdx === idx
                    ? 'bg-rekaz-blue text-white rotate-45'
                    : 'bg-rekaz-bg text-rekaz-muted'
                }`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-16">
                      <p className="text-rekaz-grey font-dm text-[14px] leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
