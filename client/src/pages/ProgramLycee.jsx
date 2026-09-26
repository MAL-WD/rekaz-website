import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const ProgramLycee = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('programLycee.metaTitle')}</title>
        <meta name="description" content={t('programLycee.metaDesc')} />
      </Helmet>

      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://framerusercontent.com/images/iiyPd24vPOjrEoCH6MOzoM7FAg.jpg" 
                alt="Lycée High School Students" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionTag text={t('programLycee.sectionTag')} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
                {t('programLycee.heroTitle1')} <br /> {t('programLycee.heroTitle2')}
              </h1>
              <p className="text-xl text-rekaz-grey font-dm leading-relaxed mb-8">
                {t('programLycee.heroDesc')}
              </p>
              <Button to="/inscription" variant="primary">{t('programLycee.heroButton')}</Button>
            </div>
          </div>

          {/* Levels Covered */}
          <div className="mb-24 text-center">
            <h2 className="text-3xl md:text-4xl font-satoshi font-bold mb-12">{t('programLycee.levelsTitle')}</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['1AS', '2AS', '3AS / BAC'].map((level, idx) => (
                <Card key={idx} className="w-full sm:w-64 p-8 bg-rekaz-bg border border-rekaz-border hover:border-rekaz-blue transition-colors">
                  <h3 className="text-2xl font-satoshi font-bold text-rekaz-blue">{level}</h3>
                </Card>
              ))}
            </div>
          </div>

          {/* Pack BAC Promo */}
          <div 
            className="rounded-3xl p-12 mb-24 text-white text-center shadow-lg relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rekaz-black/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
            
            <SectionTag text={t('programLycee.promoTag')} />
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold mt-6 mb-4">{t('programLycee.promoTitle')}</h2>
            <p className="text-2xl font-dm mb-8 opacity-90 max-w-2xl mx-auto">
              {t('programLycee.promoDesc1')} <span className="font-bold underline decoration-rekaz-gold decoration-4">{t('programLycee.promoDesc2')}</span>{t('programLycee.promoDesc3')}
            </p>
            <div className="text-6xl font-satoshi font-black text-rekaz-gold mb-10 drop-shadow-md">
              4000 DA
            </div>
            <Button variant="white" to="/inscription">{t('programLycee.promoButton')}</Button>
          </div>

          {/* BAC Preparation Features */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">{t('programLycee.strategyTitle')}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">{t('programLycee.strat1Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('programLycee.strat1Desc')}</p>
              </Card>
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">{t('programLycee.strat2Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('programLycee.strat2Desc')}</p>
              </Card>
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">{t('programLycee.strat3Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('programLycee.strat3Desc')}</p>
              </Card>
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">{t('programLycee.strat4Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('programLycee.strat4Desc')}</p>
              </Card>
            </div>
          </div>

          {/* Teachers */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">{t('programLycee.teachersTitle')}</h2>
              <p className="text-rekaz-grey font-dm mt-4">{t('programLycee.teachersDesc')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'عادل عبد القدير', subject: 'فلسفة', nameEn: 'Adel Abd El Kader', subjectEn: 'Philosophy' },
                { name: 'محمد الطيب قرارة', subject: 'فيزياء', nameEn: 'Mohamed El Tayeb Grara', subjectEn: 'Physics' },
                { name: 'وليد فراج', subject: 'رياضيات', nameEn: 'Walid Faraj', subjectEn: 'Mathematics' },
                { name: 'رقية منصوري', subject: 'علوم طبيعية', nameEn: 'Rokia Mansouri', subjectEn: 'Natural Sciences' },
                { name: 'زقيدة عزالي', subject: 'علوم طبيعية', nameEn: 'Zguida Azali', subjectEn: 'Natural Sciences' },
                { name: 'عادل عبد العزيز', subject: 'لغة عربية', nameEn: 'Adel Abd El Aziz', subjectEn: 'Arabic Language' },
                { name: 'أميرة بسو', subject: 'إنجليزية', nameEn: 'Amira Bassou', subjectEn: 'English' },
                { name: 'أسماء بن يحي', subject: 'فرنسية', nameEn: 'Asma Ben Yahia', subjectEn: 'French' },
                { name: 'عبد العزيز قدير', subject: 'تاريخ وجغرافيا', nameEn: 'Abd El Aziz Kadir', subjectEn: 'History & Geography' },
                { name: 'عماد سليماني', subject: 'رياضيات', nameEn: 'Imad Slimani', subjectEn: 'Mathematics' },
                { name: 'سميرة طالبي', subject: 'محاسبة', nameEn: 'Samira Talbi', subjectEn: 'Accounting' },
              ].map((teacher, idx) => (
                <Card key={idx} className="p-6 flex items-center gap-4 bg-rekaz-bg border border-rekaz-border hover:border-rekaz-blue transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rekaz-blue/20 to-rekaz-cyan/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-rekaz-blue font-satoshi font-bold text-lg">
                      {teacher.nameEn.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-satoshi font-bold text-rekaz-black">{teacher.name}</h3>
                    <p className="text-sm text-rekaz-blue font-dm font-medium">{teacher.subject}</p>
                    <p className="text-xs text-rekaz-grey font-dm mt-0.5">{teacher.nameEn} · {teacher.subjectEn}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-satoshi font-bold mb-6">{t('programLycee.ctaTitle')}</h2>
            <p className="text-lg text-rekaz-grey font-dm mb-8 max-w-xl mx-auto">
              {t('programLycee.ctaDesc')}
            </p>
            <Button variant="secondary" to="/contact">{t('programLycee.ctaButton')}</Button>
          </div>

        </Container>
      </main>
    </>
  );
};

export default ProgramLycee;
