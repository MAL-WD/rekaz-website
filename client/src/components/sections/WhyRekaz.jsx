import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const WhyRekaz = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern — GPU-accelerated */}
      <div className="absolute inset-0 bg-dots opacity-[0.4] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 relative z-10"
        >
          <SectionTag text={t('whyRekaz.tag', 'Why Rekaz')} />
          <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 mb-3 tracking-[-0.03em]">
            {t('whyRekaz.title', 'Discover What Makes Rekaz Different ')}
          </h2>
          <p className="font-instrument-serif text-[22px] text-rekaz-muted italic">
            {t('whyRekaz.subtitle', 'More than lessons. A foundation for your future.')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6 relative z-10"
        >
          {/* Pack-BAC Card */}
          <motion.div variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Link to="/inscription" className="block h-full">
              <Card className="p-8 md:p-10 flex flex-col items-start text-start ring-1 ring-black/[0.05] shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full cursor-pointer group">
                <div className="text-[10px] font-bold uppercase tracking-wider text-rekaz-blue bg-rekaz-blue/5 px-2.5 py-1 rounded-full mb-5 group-hover:bg-rekaz-blue/10 transition-colors">
                  {t('whyRekaz.specialPacks', 'Special Packs')}
                </div>
                <h3 className="text-[22px] font-satoshi font-bold mb-3 text-rekaz-black tracking-[-0.02em] group-hover:text-rekaz-blue transition-colors">
                  {t('whyRekaz.packBacTitle', 'Pack-BAC: more learning, better value')}
                </h3>
                <p className="text-rekaz-grey mb-8 font-dm leading-relaxed text-[14px]">
                  {t('whyRekaz.packBacDesc', 'Make quality education more accessible with offers such as Pack-BAC: 3 subjects for the price of only 2.')}
                </p>
                <div
                  className="mt-auto w-full rounded-2xl p-6 flex flex-col gap-2 relative overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, #00a5ff 0%, #0412fa 100%)' }}
                >
                  {/* Subtle shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none rounded-2xl" />
                  <div className="relative z-10">
                    <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider">
                      {t('whyRekaz.premiumPackBac', 'Premium Pack-BAC')}
                    </div>
                    <div className="text-4xl font-satoshi font-black text-white">
                      {t('whyRekaz.packBacPrice', '4000 DA')}
                    </div>
                    <p className="text-[12px] text-white/70 leading-relaxed">
                      {t('whyRekaz.packBacPriceDesc', 'Affordable learning with Pack-BAC: 3 subjects for 4000 DA — the price of only 2 subjects.')}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Valid Certificates */}
          <motion.div variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Card className="p-8 md:p-10 flex flex-col items-start text-start ring-1 ring-black/[0.05] shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <h3 className="text-[22px] font-satoshi font-bold text-rekaz-black tracking-[-0.02em]">
                  {t('whyRekaz.validCertificates', 'Valid Certificates')}
                </h3>
                <span className="bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/10 rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold">✓</span>
              </div>
              <p className="text-rekaz-grey mb-8 font-dm leading-relaxed text-[14px]">
                {t('whyRekaz.validCertificatesDesc', 'Practical professional formations in entrepreneurship, marketing, digital skills, and more — with valid certificates upon completion.')}
              </p>
              <div className="w-full space-y-2.5 mt-auto">
                {[
                  { name: t('whyRekaz.entrepreneurship', 'Entrepreneurship'), img: 'R4o2AapS90DNVg4OnUarK5BzQ.jpg' },
                  { name: t('whyRekaz.marketing', 'Marketing'), img: 'kowsLNxnpQclOQJjDCjUkZkX0yw.jpg' },
                  { name: t('whyRekaz.cyberSecurity', 'Cyber Security'), img: 'BJxGftmbADulgUM0RIKM7QdBwVo.jpg' }
                ].map((course, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 border border-rekaz-border rounded-xl bg-white hover:border-rekaz-cyan hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-rekaz-surface">
                        <img src={`https://framerusercontent.com/images/${course.img}`} alt={course.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>
                      <span className="font-satoshi font-bold text-[13px] text-rekaz-black">{course.name}</span>
                    </div>
                    <span className="text-[10px] text-rekaz-cyan font-bold bg-rekaz-cyan/5 px-2 py-0.5 rounded-md">
                      {t('whyRekaz.course', 'Course')}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Consultation */}
          <motion.div variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Card className="p-8 md:p-10 flex flex-col items-start text-start ring-1 ring-black/[0.05] shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="text-[10px] font-bold uppercase tracking-wider text-rekaz-blue bg-rekaz-blue/5 px-2.5 py-1 rounded-full mb-5">
                {t('whyRekaz.consultationTag', 'Consultation')}
              </div>
              <h3 className="text-[22px] font-satoshi font-bold mb-3 text-rekaz-black tracking-[-0.02em]">
                {t('whyRekaz.guidanceTitle', 'Guidance for every next step')}
              </h3>
              <p className="text-rekaz-grey mb-8 font-dm leading-relaxed text-[14px]">
                {t('whyRekaz.guidanceDesc', 'Get practical academic, career, and business guidance from people who understand your goals.')}
              </p>
              <div className="mt-auto w-full border border-rekaz-border rounded-2xl p-6 bg-rekaz-surface">
                <h4 className="font-satoshi font-bold text-[15px] mb-1.5 text-rekaz-black">{t('whyRekaz.businessConsultation', 'Business Consultation')}</h4>
                <p className="text-[12px] text-rekaz-muted leading-relaxed">
                  {t('whyRekaz.businessConsultationDesc', 'Educational, career, and business consultation to help students, families, and entrepreneurs build a clear path toward success.')}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* E-Learning */}
          <motion.div variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <Card className="p-8 md:p-10 flex flex-col items-start text-start ring-1 ring-black/[0.05] shadow-md hover:shadow-lg transition-all duration-300 h-full">
              <div className="text-[10px] font-bold uppercase tracking-wider text-rekaz-blue bg-rekaz-blue/5 px-2.5 py-1 rounded-full mb-5">
                {t('whyRekaz.eLearning', 'E-Learning Platform')}
              </div>
              <p className="text-rekaz-grey mb-6 font-dm leading-relaxed text-[14px]">
                {t('whyRekaz.eLearningDesc', "Learn anything, anywhere and anytime through Rekaz's modern e-learning platform.")}
              </p>
              <div className="flex gap-2.5 mb-7">
                <Button variant="primary" className="!px-4 !py-2.5 !text-xs !rounded-xl">
                  {t('whyRekaz.startLearning', 'Start Learning')}
                </Button>
                <Button variant="outline" className="!px-4 !py-2.5 !text-xs !rounded-xl">
                  {t('whyRekaz.viewCourses', 'View Courses')}
                </Button>
              </div>
              <div className="mt-auto w-full border border-rekaz-border rounded-2xl p-6 bg-rekaz-surface">
                <h4 className="font-satoshi font-bold text-[15px] mb-1.5 text-rekaz-black">{t('whyRekaz.studentDashboard', 'Student Dashboard')}</h4>
                <p className="text-[12px] text-rekaz-muted leading-relaxed">
                  {t('whyRekaz.studentDashboardDesc', 'Review completed lessons, subject progress, attendance, and upcoming revision tasks in one place.')}
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyRekaz;
