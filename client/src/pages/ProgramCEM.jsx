import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const ProgramCEM = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('programCEM.metaTitle')}</title>
        <meta name="description" content={t('programCEM.metaDesc')} />
      </Helmet>

      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <SectionTag text={t('programCEM.sectionTag')} />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
                {t('programCEM.heroTitle1')} <br /> {t('programCEM.heroTitle2')}
              </h1>
              <p className="text-xl text-rekaz-grey font-dm leading-relaxed mb-8">
                {t('programCEM.heroDesc')}
              </p>
              <Button to="/inscription" variant="primary">{t('programCEM.heroButton')}</Button>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://framerusercontent.com/images/qS6LMA7iQKHtZNdhS9Wl1T4iY.jpg" 
                alt="CEM Middle School Students" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Levels & Subjects */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-center mb-12">{t('programCEM.levelsTitle')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['1CEM', '2CEM', '3CEM', '4CEM / BEM'].map((level, idx) => (
                <Card key={idx} className="p-8 text-center bg-rekaz-bg border border-rekaz-border hover:border-rekaz-cyan transition-colors">
                  <h3 className="text-2xl font-satoshi font-bold text-rekaz-cyan">{level}</h3>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-rekaz-black text-white rounded-3xl p-12 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">{t('programCEM.featuresTitle')}</h2>
              <p className="text-white/70 font-dm mt-4">{t('programCEM.featuresDesc')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl"></div>
                <h3 className="text-xl font-bold mb-3">{t('programCEM.feat1Title')}</h3>
                <p className="text-white/70 font-dm">{t('programCEM.feat1Desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl"></div>
                <h3 className="text-xl font-bold mb-3">{t('programCEM.feat2Title')}</h3>
                <p className="text-white/70 font-dm">{t('programCEM.feat2Desc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl"></div>
                <h3 className="text-xl font-bold mb-3">{t('programCEM.feat3Title')}</h3>
                <p className="text-white/70 font-dm">{t('programCEM.feat3Desc')}</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-satoshi font-bold mb-6">{t('programCEM.benefitsTitle')}</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-rekaz-cyan text-xl mt-1">✓</span>
                  <div>
                    <h4 className="font-bold font-satoshi">{t('programCEM.ben1Title')}</h4>
                    <p className="text-rekaz-grey font-dm">{t('programCEM.ben1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rekaz-cyan text-xl mt-1">✓</span>
                  <div>
                    <h4 className="font-bold font-satoshi">{t('programCEM.ben2Title')}</h4>
                    <p className="text-rekaz-grey font-dm">{t('programCEM.ben2Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rekaz-cyan text-xl mt-1">✓</span>
                  <div>
                    <h4 className="font-bold font-satoshi">{t('programCEM.ben3Title')}</h4>
                    <p className="text-rekaz-grey font-dm">{t('programCEM.ben3Desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <Card className="p-10 bg-gradient-to-br from-rekaz-cyan/10 to-rekaz-blue/10 border-none shadow-none text-center">
              <h3 className="text-2xl font-satoshi font-bold mb-4">{t('programCEM.ctaTitle')}</h3>
              <p className="text-rekaz-grey font-dm mb-8">
                {t('programCEM.ctaDesc')}
              </p>
              <Button to="/inscription" variant="primary">{t('programCEM.ctaButton')}</Button>
            </Card>
          </div>
          {/* Teachers */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">{t('programCEM.teachersTitle')}</h2>
              <p className="text-rekaz-grey font-dm mt-4">{t('programCEM.teachersDesc')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'هديل مرسو', subject: 'رياضيات', nameEn: 'Hadil Mersou', subjectEn: 'Mathematics' },
                { name: 'وليد فراج', subject: 'رياضيات', nameEn: 'Walid Faraj', subjectEn: 'Mathematics' },
                { name: 'نور الهدى منوني', subject: 'فيزياء', nameEn: 'Nour El Hoda Manouni', subjectEn: 'Physics' },
                { name: 'حمزة بالي', subject: 'فرنسية', nameEn: 'Hamza Bali', subjectEn: 'French' },
                { name: 'خالد بن جيلالي', subject: 'إنجليزية', nameEn: 'Khaled Ben Jilali', subjectEn: 'English' },
                { name: 'رياض براهمي', subject: 'إنجليزية', nameEn: 'Riad Brahmi', subjectEn: 'English' },
                { name: 'عزالي', subject: 'علوم', nameEn: 'Azali', subjectEn: 'Sciences' },
                { name: 'عادل عبد القدير عبد العزيز', subject: 'لغة عربية', nameEn: 'Adel Abd El Kader Abd El Aziz', subjectEn: 'Arabic Language' },
                { name: 'عالي روقية', subject: '', nameEn: 'Ali Rokia', subjectEn: '' },
                { name: 'بخضرة رزيقي', subject: 'فرنسية', nameEn: 'Bakhda Reziki', subjectEn: 'French' },
              ].map((teacher, idx) => (
                <Card key={idx} className="p-6 flex items-center gap-4 bg-rekaz-bg border border-rekaz-border hover:border-rekaz-cyan transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rekaz-cyan/20 to-rekaz-blue/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-rekaz-cyan font-satoshi font-bold text-lg">
                      {teacher.nameEn.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-satoshi font-bold text-rekaz-black">{teacher.name}</h3>
                    {teacher.subject && <p className="text-sm text-rekaz-cyan font-dm font-medium">{teacher.subject}</p>}
                    <p className="text-xs text-rekaz-grey font-dm mt-0.5">{teacher.nameEn}{teacher.subjectEn ? ` · ${teacher.subjectEn}` : ''}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </Container>
      </main>
    </>
  );
};

export default ProgramCEM;
