import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    { step: '01', title: t('howItWorks.steps.0.title', 'Choose Your Program'), desc: t('howItWorks.steps.0.desc', 'Find the academic program, formation, or consultation that matches your goals.') },
    { step: '02', title: t('howItWorks.steps.1.title', 'Learn & Grow'), desc: t('howItWorks.steps.1.desc', 'Study with experienced teachers, modern methods, and continuous support.') },
    { step: '03', title: t('howItWorks.steps.2.title', 'Practice & Improve'), desc: t('howItWorks.steps.2.desc', 'Strengthen your skills through exercises, mock exams, and practical learning.') }
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <SectionTag text={t('howItWorks.tag', 'Your Journey Starts Here')} />
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 mb-12 leading-[1.15] tracking-[-0.03em] text-start">
              {t('howItWorks.title', 'Choose your path, learn with purpose, and move closer to your goals.')}
            </h2>

            <div className="relative flex flex-col gap-0 w-full">
              {steps.map((item, idx) => (
                <div key={idx} className="flex gap-5 text-start relative">
                  {/* Vertical connector line */}
                  {idx < steps.length - 1 && (
                    <div className="absolute left-[22px] top-[48px] bottom-[-12px] w-[2px] bg-gradient-to-b from-rekaz-cyan/40 to-transparent" />
                  )}

                  {/* Step circle */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-satoshi font-bold text-[13px] text-rekaz-blue relative z-10"
                    style={{ background: 'linear-gradient(135deg, rgba(0,165,255,0.12) 0%, rgba(4,18,250,0.08) 100%)', boxShadow: '0 0 0 1px rgba(0,165,255,0.25), 0 2px 8px rgba(0,165,255,0.12)' }}>
                    {item.step}
                  </div>

                  <div className="pb-10">
                    <h3 className="text-[18px] font-satoshi font-bold mb-1.5 text-rekaz-black tracking-[-0.02em]">{item.title}</h3>
                    <p className="text-rekaz-grey font-dm text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full min-h-[480px] rounded-[24px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.10)]"
          >
            <img
              src="https://framerusercontent.com/images/9Dc1Mz5nXTqjI8SdCSJbMTh7dc.jpg"
              alt="Students Collaborating"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-rekaz-black/30 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
