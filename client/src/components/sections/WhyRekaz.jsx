import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';
import Card from '../ui/Card';
import GradientText from '../ui/GradientText';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const WhyRekaz = () => {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const springEase = 'power3.out';
      const duration = 0.8;

      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: springEase,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Use a single scroll trigger for the grid, and animate all cards
      // This ensures the trigger bounding box is stable and large
      if (card1Ref.current) {
        gsap.fromTo(
          [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: springEase,
            stagger: 0.15, // stagger them slightly
            scrollTrigger: {
              trigger: card1Ref.current.parentNode, // trigger on the grid container
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className='py-24 bg-rekaz-bg'>
      <Container>
        <div ref={headerRef} style={{ opacity: 0 }} className='flex flex-col items-center text-center mb-16'>
          <SectionTag text={t('whyRekaz.tag', 'Why Rekaz')} />
          <h2 className='text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-6 mb-4'>
            {t('whyRekaz.title', 'Discover What Makes Rekaz Different ')}
          </h2>
          <p className='font-instrument-serif text-2xl text-rekaz-muted italic'>
            {t('whyRekaz.subtitle', 'More than lessons. A foundation for your future.')}
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {/* Pack-BAC Card */}
          <Card ref={card1Ref} className='p-8 md:p-12 flex flex-col items-start text-start'>
            <div className='text-xs font-bold uppercase tracking-wider text-rekaz-muted mb-4'>{t('whyRekaz.specialPacks', 'Special Packs')}</div>
            <h3 className='text-2xl font-satoshi font-bold mb-4'>{t('whyRekaz.packBacTitle', 'Pack-BAC: more learning, better value')}</h3>
            <p className='text-rekaz-grey mb-8 font-dm leading-relaxed'>
              {t('whyRekaz.packBacDesc', 'Make quality education more accessible with offers such as Pack-BAC: 3 subjects for the price of only 2.')}
            </p>
            <div className='mt-auto w-full bg-rekaz-card rounded-xl p-6 border border-rekaz-border flex flex-col md:flex-row items-center gap-6'>
              <div className='flex-1'>
                <div className='text-sm text-rekaz-cyan font-bold mb-1 uppercase tracking-wider'>{t('whyRekaz.premiumPackBac', 'Premium Pack-BAC')}</div>
                <div className='text-4xl font-satoshi font-black text-rekaz-black mb-2'>{t('whyRekaz.packBacPrice', '4000 DA')}</div>
                <p className='text-xs text-rekaz-muted'>{t('whyRekaz.packBacPriceDesc', 'Affordable learning with Pack-BAC: 3 subjects for 4000 DA — the price of only 2 subjects.')}</p>
              </div>
            </div>
          </Card>

          {/* Valid Certificates */}
          <Card ref={card2Ref} className='p-8 md:p-12 flex flex-col items-start text-start'>
            <div className='flex items-center gap-2 mb-4'>
              <h3 className='text-2xl font-satoshi font-bold'>{t('whyRekaz.validCertificates', 'Valid Certificates')}</h3>
              <span className='bg-green-100 text-green-600 rounded-full p-1 text-xs'>✓</span>
            </div>
            <p className='text-rekaz-grey mb-8 font-dm leading-relaxed'>
              {t('whyRekaz.validCertificatesDesc', 'Practical professional formations in entrepreneurship, marketing, digital skills, and more — with valid certificates upon completion.')}
            </p>
            <div className='w-full space-y-3 mt-auto'>
              {[
                { name: t('whyRekaz.entrepreneurship', 'Entrepreneurship'), img: 'R4o2AapS90DNVg4OnUarK5BzQ.jpg' },
                { name: t('whyRekaz.marketing', 'Marketing'), img: 'kowsLNxnpQclOQJjDCjUkZkX0yw.jpg' },
                { name: t('whyRekaz.cyberSecurity', 'Cyber Security'), img: 'BJxGftmbADulgUM0RIKM7QdBwVo.jpg' }
              ].map((course, idx) => (
                <div key={idx} className='flex items-center justify-between p-3 border border-rekaz-border rounded-lg bg-white hover:border-rekaz-cyan transition-colors'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gray-200 rounded object-cover overflow-hidden'>
                       <img src={`https://framerusercontent.com/images/${course.img}`} alt={course.name} className='w-full h-full object-cover'/>
                    </div>
                    <span className='font-satoshi font-bold text-sm'>{course.name}</span>
                  </div>
                  <span className='text-xs text-rekaz-cyan font-semibold bg-blue-50 px-2 py-1 rounded'>{t('whyRekaz.course', 'Course')}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Consultation */}
          <Card ref={card3Ref} className='p-8 md:p-12 flex flex-col items-start text-start'>
            <div className='text-xs font-bold uppercase tracking-wider text-rekaz-muted mb-4'>{t('whyRekaz.consultationTag', 'Consultation')}</div>
            <h3 className='text-2xl font-satoshi font-bold mb-4'>{t('whyRekaz.guidanceTitle', 'Guidance for every next step')}</h3>
            <p className='text-rekaz-grey mb-8 font-dm leading-relaxed'>
              {t('whyRekaz.guidanceDesc', 'Get practical academic, career, and business guidance from people who understand your goals.')}
            </p>
            <div className='mt-auto w-full border border-rekaz-border rounded-xl p-6 bg-white shadow-sm'>
              <h4 className='font-satoshi font-bold text-lg mb-2'>{t('whyRekaz.businessConsultation', 'Business Consultation')}</h4>
              <p className='text-sm text-rekaz-muted'>{t('whyRekaz.businessConsultationDesc', 'Educational, career, and business consultation to help students, families, and entrepreneurs build a clear path toward success.')}</p>
            </div>
          </Card>

          {/* E-Learning */}
          <Card ref={card4Ref} className='p-8 md:p-12 flex flex-col items-start text-start'>
            <h3 className='text-2xl font-satoshi font-bold mb-4'>{t('whyRekaz.eLearning', 'E-Learning Platform')}</h3>
            <p className='text-rekaz-grey mb-8 font-dm leading-relaxed'>
              {t('whyRekaz.eLearningDesc', 'Learn anything, anywhere and anytime through Rekaz’s modern e-learning platform.')}
            </p>
            <div className='flex gap-3 mb-8'>
              <Button variant='primary' className='!px-4 !py-2 text-sm'>{t('whyRekaz.startLearning', 'Start Learning')}</Button>
              <Button variant='outline' className='!px-4 !py-2 text-sm'>{t('whyRekaz.viewCourses', 'View Courses')}</Button>
            </div>
            <div className='mt-auto w-full border border-rekaz-border rounded-xl p-6 bg-rekaz-card'>
              <h4 className='font-satoshi font-bold text-lg mb-2'>{t('whyRekaz.studentDashboard', 'Student Dashboard')}</h4>
              <p className='text-sm text-rekaz-muted'>{t('whyRekaz.studentDashboardDesc', 'Review completed lessons, subject progress, attendance, and upcoming revision tasks in one place.')}</p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default WhyRekaz;
