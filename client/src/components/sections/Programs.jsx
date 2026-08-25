import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const Programs = () => {
  const { t } = useTranslation();

  const mainPrograms = [
    {
      tag: t('programs.cem.tag', 'CEM • BEM'),
      title: t('programs.cem.title', 'CEM — Middle School'),
      desc: t('programs.cem.desc', 'Complete support across all subjects from 1CEM to 4CEM, building strong foundations and preparing students confidently for the BEM.'),
      img: 'qS6LMA7iQKHtZNdhS9Wl1T4iY.jpg'
    },
    {
      tag: t('programs.lycee.tag', 'Lycée • BAC'),
      title: t('programs.lycee.title', 'LYCÉE — High School'),
      desc: t('programs.lycee.desc', 'All-subject support from 1AS to 3AS, helping students build strong academic foundations and prepare strategically for the BAC.'),
      img: 'iiyPd24vPOjrEoCH6MOzoM7FAg.jpg'
    },
    {
      tag: t('programs.formations.tag', 'Certificates'),
      title: t('programs.formations.title', 'Professional Formations'),
      desc: t('programs.formations.desc', 'Practical formations in entrepreneurship, marketing, digital skills and more — with valid certificates upon completion.'),
      img: 'UHS92vQMSs8EyuPs1M9I0EICPmE.jpg'
    }
  ];

  return (
    <section className="py-24 bg-rekaz-bg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14"
        >
          <SectionTag text={t('programs.tag', 'Programs')} />
          <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 tracking-[-0.03em]">
            {t('programs.title', 'Our Programs')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {mainPrograms.map((prog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-[22px] ring-1 ring-black/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-all duration-400"
            >
              <div className="h-[220px] overflow-hidden relative">
                <img
                  src={`https://framerusercontent.com/images/${prog.img}`}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                />
                {/* Tag overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider text-rekaz-blue shadow-sm ring-1 ring-white/50">
                    {prog.tag}
                  </span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1 text-start">
                <h3 className="text-[19px] font-satoshi font-bold mb-3 text-rekaz-black tracking-[-0.02em]">{prog.title}</h3>
                <p className="text-rekaz-grey font-dm leading-relaxed text-[14px]">{prog.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Row */}
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 bg-rekaz-black text-white text-start rounded-[22px] overflow-hidden flex flex-col"
          >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(0,165,255,0.18) 0%, transparent 65%)' }} />
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-rekaz-violet mb-4">{t('programs.growthTag', 'Growth')}</div>
              <h3 className="text-[22px] font-satoshi font-bold mb-3 tracking-[-0.02em]">{t('programs.growthTitle', 'Business Growth & Monitoring')}</h3>
              <p className="text-white/60 font-dm leading-relaxed text-[14px] mb-8">
                {t('programs.growthDesc', 'From marketing and digital marketing to cybersecurity and advanced management, we provide strategies and continuous follow-up to help businesses grow and stay ahead.')}
              </p>
            </div>
            <div className="mt-auto w-full rounded-[14px] overflow-hidden opacity-90">
              <img src="https://framerusercontent.com/images/xvvnxiHVjBneP7l9of0BNL5Gc.png" alt="Analytics Graph" className="w-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 text-start rounded-[22px] ring-1 ring-rekaz-blue/[0.10] overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(135deg, rgba(0,165,255,0.07) 0%, rgba(4,18,250,0.06) 100%)', backgroundColor: '#fff' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(0,165,255,0.10) 0%, transparent 60%)' }} />
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-rekaz-cyan mb-4">{t('programs.guidanceTag', 'Guidance')}</div>
              <h3 className="text-[22px] font-satoshi font-bold mb-3 text-rekaz-black tracking-[-0.02em]">{t('programs.consultationTitle', 'Consultation')}</h3>
              <p className="text-rekaz-dark font-dm leading-relaxed text-[14px]">
                {t('programs.consultationDesc', 'Educational, career and business consultation to help students, families and entrepreneurs make better decisions and build a clear path toward success.')}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Programs;
