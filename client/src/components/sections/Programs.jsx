import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';
import Card from '../ui/Card';

const Programs = () => {
  const { t } = useTranslation();

  const mainPrograms = [
    {
      tag: t('programs.cem.tag', 'CEM • BEM'),
      title: t('programs.cem.title', 'CEM — Middle School'),
      desc: t('programs.cem.desc', 'Complete support across all subjects from 1CEM to 4CEM, building strong foundations, strengthening knowledge and preparing students confidently for the BEM.'),
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
      desc: t('programs.formations.desc', 'Practical formations in entrepreneurship, marketing, digital skills and more, designed to develop real-world skills and provide valid certificates upon completion.'),
      img: 'UHS92vQMSs8EyuPs1M9I0EICPmE.jpg'
    }
  ];

  return (
    <section className='py-24'>
      <Container>
        <div className='flex flex-col items-center text-center mb-16'>
          <SectionTag text={t('programs.tag', 'Programs')} />
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6'>
            {t('programs.title', 'Our Programs')}
          </h2>
        </div>

        <div className='grid lg:grid-cols-3 gap-6 mb-6'>
          {mainPrograms.map((prog, idx) => (
            <Card key={idx} className='overflow-hidden flex flex-col'>
              <div className='h-60 overflow-hidden'>
                <img 
                  src={`https://framerusercontent.com/images/${prog.img}`} 
                  alt={prog.title} 
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-8 flex flex-col flex-1 text-start'>
                <div className='text-xs font-bold uppercase tracking-wider text-rekaz-cyan mb-3'>{prog.tag}</div>
                <h3 className='text-2xl font-satoshi font-bold mb-4'>{prog.title}</h3>
                <p className='text-rekaz-grey font-dm leading-relaxed'>{prog.desc}</p>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Secondary Widgets Row */}
        <div className='grid md:grid-cols-2 gap-6'>
           <Card className='p-8 bg-rekaz-black text-white text-start'>
             <div className='text-xs font-bold uppercase tracking-wider text-rekaz-violet mb-4'>{t('programs.growthTag', 'Growth')}</div>
             <h3 className='text-2xl font-satoshi font-bold mb-4'>{t('programs.growthTitle', 'Business Growth & Monitoring')}</h3>
             <p className='text-white/70 font-dm leading-relaxed mb-8'>
               {t('programs.growthDesc', 'From marketing and digital marketing to cybersecurity and advanced management, we provide strategies and continuous follow-up to help businesses grow, improve and stay ahead.')}
             </p>
             <div className='mt-auto w-full rounded-xl overflow-hidden'>
               <img src='https://framerusercontent.com/images/xvvnxiHVjBneP7l9of0BNL5Gc.png' alt='Analytics Graph' className='w-full opacity-90' />
             </div>
           </Card>
           
           <Card className='p-8 bg-gradient-to-br from-rekaz-cyan/10 to-rekaz-blue/10 text-start'>
             <div className='text-xs font-bold uppercase tracking-wider text-rekaz-cyan mb-4'>{t('programs.guidanceTag', 'Guidance')}</div>
             <h3 className='text-2xl font-satoshi font-bold mb-4'>{t('programs.consultationTitle', 'Consultation')}</h3>
             <p className='text-rekaz-dark font-dm leading-relaxed'>
               {t('programs.consultationDesc', 'Educational, career and business consultation to help students, families and entrepreneurs make better decisions and build a clear path toward success.')}
             </p>
           </Card>
        </div>
      </Container>
    </section>
  );
};

export default Programs;
