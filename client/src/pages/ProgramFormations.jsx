import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const ProgramFormations = () => {
  const { t } = useTranslation();
  
  // Note: We need to pull the array from the translation directly.
  // Since arrays in JSON are returned as actual arrays by i18next when setting returnObjects: true
  const courses = t('programFormations.courses', { returnObjects: true }) || [];
  
  // If fallback fails, we provide empty arrays or handle map carefully
  const formations = Array.isArray(courses) ? courses : [];

  return (
    <>
      <Helmet>
        <title>{t('programFormations.metaTitle')}</title>
        <meta name="description" content={t('programFormations.metaDesc')} />
      </Helmet>

      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="flex-1">
              <SectionTag text={t('programFormations.sectionTag')} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
                {t('programFormations.heroTitle')}
              </h1>
              <p className="text-xl text-rekaz-grey font-dm leading-relaxed mb-8">
                {t('programFormations.heroDesc')}
              </p>
              <div className="flex gap-4">
                <Button to="/inscription" variant="primary">{t('programFormations.heroButton')}</Button>
                <div className="inline-flex items-center text-rekaz-cyan font-bold font-satoshi px-4">
                  ✓ {t('programFormations.heroValid')}
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
               <img 
                src="https://framerusercontent.com/images/UHS92vQMSs8EyuPs1M9I0EICPmE.jpg" 
                alt="Professional Formations" 
                className="w-full h-auto rounded-3xl shadow-xl object-cover"
              />
            </div>
          </div>

          {/* Formations Grid */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">{t('programFormations.gridTitle')}</h2>
              <p className="text-rekaz-grey font-dm mt-4 max-w-2xl mx-auto">
                {t('programFormations.gridDesc')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((item, idx) => (
                <Link to="/inscription" key={idx} className="block h-full">
                  <Card className="p-8 border border-transparent hover:border-rekaz-cyan transition-all group h-full cursor-pointer">
                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left"></div>
                    <h3 className="text-2xl font-satoshi font-bold mb-3">{item.title}</h3>
                    <p className="text-rekaz-grey font-dm">{item.desc}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Certificate Banner */}
          <div className="bg-rekaz-black text-white rounded-3xl p-12 text-center mb-24">
            <div className="text-5xl mb-6"></div>
            <h2 className="text-3xl font-satoshi font-bold mb-4">{t('programFormations.certTitle')}</h2>
            <p className="text-lg font-dm text-white/80 max-w-3xl mx-auto">
              {t('programFormations.certDesc')}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-rekaz-bg rounded-3xl p-12 border border-rekaz-border">
            <h2 className="text-3xl font-satoshi font-bold mb-4">{t('programFormations.ctaTitle')}</h2>
            <p className="text-rekaz-grey font-dm mb-8">{t('programFormations.ctaDesc')}</p>
            <Button variant="primary" to="/contact">{t('programFormations.ctaButton')}</Button>
          </div>

        </Container>
      </main>
    </>
  );
};

export default ProgramFormations;
