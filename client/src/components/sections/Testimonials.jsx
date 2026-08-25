import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';
import Card from '../ui/Card';

const Testimonials = () => {
  const { t } = useTranslation();

  const reviews = [
    { img: 'JAj7AXUxTTfqevajqV2uwvFnHk.jpg', name: t('testimonials.reviews.0.name', 'Yasmine'), quote: t('testimonials.reviews.0.quote', 'Rekaz changed the way I see education. The teachers didn’t just prepare me for exams — they helped me believe in myself.') },
    { img: 'fR0yFJ3SLBuR08Ae7NNWNWHtKfA.jpg', name: t('testimonials.reviews.1.name', 'Amine'), quote: t('testimonials.reviews.1.quote', 'The support and clear explanations helped me organize my BAC preparation with much more confidence.') },
    { img: 'YfTc9K4UljAfcBAkz9urVAMCM.jpg', name: t('testimonials.reviews.2.name', 'Nadia'), role: t('testimonials.reviews.2.role', 'Parent'), quote: t('testimonials.reviews.2.quote', 'I saw my daughter become more motivated, confident, and willing to ask questions. Rekaz really cares.') },
    { img: 'wLd2o0WOHV7vBCMG9QEwJj69on4.jpg', name: t('testimonials.reviews.3.name', 'Rayan'), quote: t('testimonials.reviews.3.quote', 'My professional formation gave me practical skills I can use right away, plus a certificate I’m proud of.') },
    { img: 'Ha6Zo7ExGpVlUA5lxAJf4BuACU.jpg', name: t('testimonials.reviews.4.name', 'Sara'), quote: t('testimonials.reviews.4.quote', 'The teachers make difficult lessons feel possible. I always leave class ready to try again.') },
    { img: '6ZguZ1F1EvxOLaR48Ikiwa8elPI.jpg', name: t('testimonials.reviews.5.name', 'Karim'), quote: t('testimonials.reviews.5.quote', 'The career guidance helped me see a clearer direction after BEM.') }
  ];

  return (
    <section className='py-24 bg-white'>
      <Container>
        <div className='flex flex-col items-center text-center mb-16'>
          <SectionTag text={t('testimonials.tag', 'Testimonials')} />
          <h2 className='text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-6 mb-4'>
            {t('testimonials.title', 'Words from students, parents, and learners')}
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {reviews.map((rev, idx) => (
            <Card key={idx} className='p-8 flex flex-col justify-between text-start'>
              <div className='flex gap-1 mb-6'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className='text-rekaz-gold text-lg'>★</span>
                ))}
              </div>
              <p className='font-dm text-rekaz-dark mb-8 leading-relaxed'>
                &quot;{rev.quote}&quot;
              </p>
              <div className='flex items-center gap-3'>
                <img src={`https://framerusercontent.com/images/${rev.img}`} alt={rev.name} className='w-12 h-12 rounded-full object-cover' />
                <div>
                  <div className='font-satoshi font-bold text-rekaz-black'>{rev.name}</div>
                  {rev.role && <div className='text-xs text-rekaz-muted'>{rev.role}</div>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
