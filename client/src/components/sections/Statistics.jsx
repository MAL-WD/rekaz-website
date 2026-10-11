import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const statItems = [
  {
    key: 'students',
    defaultVal: '+2,500',
    defaultLabel: 'Students & Learners',
    defaultDesc: 'Supported in CEM, Lycée and professional formations',
    accentColor: 'from-[#00a5ff] to-[#0412fa]',
    badgeBg: 'bg-blue-50 text-rekaz-blue border-blue-100',
    iconBg: 'bg-gradient-to-br from-[#00a5ff]/10 to-[#0412fa]/10 text-rekaz-blue',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )
  },
  {
    key: 'successRate',
    defaultVal: '98.4%',
    defaultLabel: 'Success & Pass Rate',
    defaultDesc: 'In official BEM & BAC examinations',
    accentColor: 'from-[#0412fa] to-[#99a1ff]',
    badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    iconBg: 'bg-gradient-to-br from-[#0412fa]/10 to-[#99a1ff]/10 text-indigo-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    key: 'teachers',
    defaultVal: '+35',
    defaultLabel: 'Expert Teachers & Mentors',
    defaultDesc: 'Selected elite educators across all subjects',
    accentColor: 'from-[#00a5ff] to-[#00c9a7]',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-100',
    iconBg: 'bg-gradient-to-br from-[#00c9a7]/10 to-[#00a5ff]/10 text-teal-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    key: 'programs',
    defaultVal: '+40',
    defaultLabel: 'Programs & Courses',
    defaultDesc: 'Academic support, skill workshops & consultations',
    accentColor: 'from-[#f2c161] to-[#f59e0b]',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-100',
    iconBg: 'bg-gradient-to-br from-[#f2c161]/15 to-[#f59e0b]/15 text-amber-600',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Statistics = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-12 md:py-16 bg-white relative border-y border-rekaz-border/40 overflow-hidden">
      {/* Background soft ambient accents */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0, 165, 255, 0.08) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(4, 18, 250, 0.06) 0%, transparent 70%)' }}
      />

      <Container>
        {/* Subtle Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/80 text-[11px] font-bold uppercase tracking-wider text-rekaz-blue mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rekaz-cyan animate-pulse" />
            {t('stats.tag', 'ركاز في أرقام')}
          </div>
          <p className="font-satoshi font-semibold text-[15px] md:text-[16px] text-rekaz-grey max-w-[700px]">
            {t('stats.title', 'أرقام تجسد مسيرة التميز والنجاح لمؤسسة ركاز')}
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative z-10"
        >
          {statItems.map((item) => (
            <motion.div
              key={item.key}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-[#fcfcff] hover:bg-white border border-gray-100 hover:border-blue-200/80 rounded-2xl p-6 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(4,18,250,0.08)] flex flex-col justify-between"
            >
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                  {item.icon}
                </div>
                <div className={`w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${item.accentColor}`} />
              </div>

              {/* Number Value */}
              <div className="mb-2">
                <span className={`font-satoshi font-black text-3xl md:text-4xl tracking-tight bg-gradient-to-r ${item.accentColor} bg-clip-text text-transparent block leading-tight`}>
                  {t(`stats.${item.key}.value`, item.defaultVal)}
                </span>
              </div>

              {/* Label & Description */}
              <div>
                <h3 className="font-satoshi font-bold text-[16px] text-rekaz-black mb-1 group-hover:text-rekaz-blue transition-colors">
                  {t(`stats.${item.key}.label`, item.defaultLabel)}
                </h3>
                <p className="font-dm text-[13px] text-rekaz-grey leading-relaxed">
                  {t(`stats.${item.key}.desc`, item.defaultDesc)}
                </p>
              </div>

              {/* Bottom Subtle Highlight Bar on hover */}
              <div className="absolute inset-x-6 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-rekaz-cyan/40 transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Statistics;
