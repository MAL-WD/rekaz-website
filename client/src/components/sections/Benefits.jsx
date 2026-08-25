import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const Benefits = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const pillars = [
    {
      title: t('benefits.items.0.title', 'All Subjects'),
      desc: t('benefits.items.0.desc', 'Personalized support across the subjects that matter most for confident progress.'),
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      title: t('benefits.items.1.title', 'CEM → BEM'),
      desc: t('benefits.items.1.desc', 'Build strong foundations and prepare with structure, exercises, and encouragement.'),
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 22V5l-6-3-6 3v17" />
          <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
          <path d="M4 22h16" />
        </svg>
      )
    },
    {
      title: t('benefits.items.2.title', 'Lycée → BAC'),
      desc: t('benefits.items.2.desc', 'Strengthen advanced learning and prepare strategically for your BAC.'),
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-5" />
        </svg>
      )
    },
    {
      title: t('benefits.items.3.title', 'Professional Formations'),
      desc: t('benefits.items.3.desc', 'Develop practical future-ready skills in entrepreneurship, marketing, and digital fields.'),
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: t('benefits.items.4.title', 'Valid Certificates'),
      desc: t('benefits.items.4.desc', 'Complete professional formations and earn certificates that reflect your learning.'),
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="m8.2 13.5-2.2 7.5 6-3 6 3-2.2-7.5" />
          <path d="m9.5 8 1.8 1.8 3.7-3.6" />
        </svg>
      )
    },
    {
      title: t('benefits.items.5.title', 'Educational & Business Consultation'),
      desc: t('benefits.items.5.desc', 'Make informed academic, career, and growth decisions with meaningful guidance.'),
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="none" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <SectionTag text={t('benefits.tag', 'Rekaz Advantages')} />
          <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 max-w-2xl leading-[1.15] tracking-[-0.03em] text-start">
            {t('benefits.title', 'Helping Students Turn Effort Into Achievement')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              className="group relative flex flex-col p-7 rounded-[20px] bg-white ring-1 ring-black/[0.06] hover:ring-rekaz-cyan/30 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_-8px_rgba(0,165,255,0.14)] text-start overflow-hidden transition-all duration-400 ease-out cursor-default"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px] bg-gradient-to-r from-[#00a5ff] to-[#0412fa] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-left" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#00a5ff]/[0.12] to-[#0412fa]/[0.06] ring-1 ring-[#00a5ff]/[0.18] text-rekaz-blue flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#00a5ff] group-hover:to-[#0412fa] group-hover:text-white group-hover:ring-transparent group-hover:shadow-[0_6px_20px_rgba(0,165,255,0.28)] transition-all duration-400 ease-out">
                {pillar.icon}
              </div>

              {/* Text */}
              <h3 className="text-[17px] font-satoshi font-bold mb-2 text-rekaz-black group-hover:text-rekaz-blue transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-rekaz-grey font-dm leading-relaxed text-[14px]">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Benefits;
