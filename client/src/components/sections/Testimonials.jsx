import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionTag from '../ui/SectionTag';

const Testimonials = () => {
  const { t } = useTranslation();

  const reviews = [
    { img: 'JAj7AXUxTTfqevajqV2uwvFnHk.jpg', name: t('testimonials.reviews.0.name', 'Yasmine'), quote: t('testimonials.reviews.0.quote', 'Rekaz changed the way I see education. The teachers did not just prepare me for exams — they helped me believe in myself.') },
    { img: 'fR0yFJ3SLBuR08Ae7NNWNWHtKfA.jpg', name: t('testimonials.reviews.1.name', 'Amine'), quote: t('testimonials.reviews.1.quote', 'The support and clear explanations helped me organize my BAC preparation with much more confidence.') },
    { img: 'YfTc9K4UljAfcBAkz9urVAMCM.jpg', name: t('testimonials.reviews.2.name', 'Nadia'), role: t('testimonials.reviews.2.role', 'Parent'), quote: t('testimonials.reviews.2.quote', 'I saw my daughter become more motivated, confident, and willing to ask questions. Rekaz really cares.') },
    { img: 'wLd2o0WOHV7vBCMG9QEwJj69on4.jpg', name: t('testimonials.reviews.3.name', 'Rayan'), quote: t('testimonials.reviews.3.quote', 'My professional formation gave me practical skills I can use right away, plus a certificate I am proud of.') },
    { img: 'Ha6Zo7ExGpVlUA5lxAJf4BuACU.jpg', name: t('testimonials.reviews.4.name', 'Sara'), quote: t('testimonials.reviews.4.quote', 'The teachers make difficult lessons feel possible. I always leave class ready to try again.') },
    { img: '6ZguZ1F1EvxOLaR48Ikiwa8elPI.jpg', name: t('testimonials.reviews.5.name', 'Karim'), quote: t('testimonials.reviews.5.quote', 'The career guidance helped me see a clearer direction after BEM.') }
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
          <SectionTag text={t('testimonials.tag', 'Testimonials')} />
          <h2 className="text-4xl md:text-5xl font-satoshi font-bold text-rekaz-black mt-5 tracking-[-0.03em] max-w-2xl leading-[1.15]">
            {t('testimonials.title', 'Words from students, parents, and learners')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col justify-between p-7 text-start bg-white rounded-[20px] ring-1 ring-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden"
            >
              {/* Decorative large quote mark */}
              <div className="absolute top-4 right-5 text-[72px] leading-none font-satoshi font-black text-rekaz-blue/[0.06] select-none pointer-events-none">
                &ldquo;
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <p className="font-dm text-rekaz-dark/80 leading-relaxed text-[14px] mb-7">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <img
                  src={`https://framerusercontent.com/images/${rev.img}`}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-rekaz-cyan/20"
                />
                <div>
                  <div className="font-satoshi font-bold text-[14px] text-rekaz-black">{rev.name}</div>
                  {rev.role && <div className="text-[12px] text-rekaz-muted">{rev.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
