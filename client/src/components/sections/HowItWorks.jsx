import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className='py-24 bg-rekaz-bg'>
      <Container>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div className='flex flex-col'>
            <SectionTag text={t('howItWorks.tag', 'Your Journey Starts Here')} />
            <h2 className='text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-6 mb-12 leading-tight text-start'>
              {t('howItWorks.title', 'Choose your path, learn with purpose, and move closer to your goals.')}
            </h2>
            
            <div className='space-y-10'>
              {[
                { step: '01', title: t('howItWorks.steps.0.title', 'Choose Your Program'), desc: t('howItWorks.steps.0.desc', 'Find the academic program, formation, or consultation that matches your goals.') },
                { step: '02', title: t('howItWorks.steps.1.title', 'Learn & Grow'), desc: t('howItWorks.steps.1.desc', 'Study with experienced teachers, modern methods, and continuous support.') },
                { step: '03', title: t('howItWorks.steps.2.title', 'Practice & Improve'), desc: t('howItWorks.steps.2.desc', 'Strengthen your skills through exercises, mock exams, and practical learning.') }
              ].map((item, idx) => (
                <div key={idx} className='flex gap-6 text-start'>
                  <div className='flex-shrink-0 w-12 h-12 rounded-full bg-rekaz-cyan/10 text-rekaz-cyan font-bold font-satoshi flex items-center justify-center border border-rekaz-cyan/20'>
                    {item.step}
                  </div>
                  <div>
                    <h3 className='text-xl font-satoshi font-bold mb-2'>{item.title}</h3>
                    <p className='text-rekaz-grey font-dm'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className='relative h-full min-h-[500px] rounded-card overflow-hidden'>
            <img 
              src='https://framerusercontent.com/images/9Dc1Mz5nXTqjI8SdCSJbMTh7dc.jpg' 
              alt='Students Collaborating' 
              className='absolute inset-0 w-full h-full object-cover'
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
