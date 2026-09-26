import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('aboutPage.metaTitle')}</title>
        <meta name='description' content={t('aboutPage.metaDesc')} />
      </Helmet>
      
      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-24">
            <SectionTag text={t('aboutPage.sectionTag')} />
            <h1 className="text-4xl md:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
              {t('aboutPage.heroTitle1')} <br /> {t('aboutPage.heroTitle2')}
            </h1>
            <p className="text-xl text-rekaz-grey font-dm max-w-3xl leading-relaxed">
              {t('aboutPage.heroDesc')}
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <Card className="p-10">
              <h2 className="text-3xl font-satoshi font-bold mb-6 text-rekaz-cyan">{t('aboutPage.missionTitle')}</h2>
              <p className="text-lg text-rekaz-grey font-dm leading-relaxed">
                {t('aboutPage.missionDesc')}
              </p>
            </Card>
            <Card className="p-10">
              <h2 className="text-3xl font-satoshi font-bold mb-6 text-rekaz-cyan">{t('aboutPage.visionTitle')}</h2>
              <p className="text-lg text-rekaz-grey font-dm leading-relaxed">
                {t('aboutPage.visionDesc')}
              </p>
            </Card>
          </div>

          {/* Founder Section */}
          <div className="bg-rekaz-black text-white rounded-3xl overflow-hidden mb-24 shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <SectionTag text={t('aboutPage.founderTag')} />
                <h2 className="text-4xl font-satoshi font-bold mt-6 mb-6">{t('aboutPage.founderTitle')}</h2>
                <h3 className="text-xl font-dm text-rekaz-cyan mb-8">{t('aboutPage.founderRole')}</h3>
                <blockquote className="text-2xl font-instrument-serif italic leading-relaxed text-white/90 mb-8 border-l-4 border-rekaz-cyan pl-6">
                  {t('aboutPage.founderQuote')}
                </blockquote>
                <p className="font-dm text-white/70 leading-relaxed">
                  {t('aboutPage.founderDesc')}
                </p>
              </div>
              <div className="h-full min-h-[400px] relative">
                <img 
                  src="https://framerusercontent.com/images/lKaaStgbmdIe8TfrIkFlKzHazV0.png" 
                  alt="Adel, CEO & Teacher" 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
            </div>
          </div>

          {/* Pillars/Values */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-satoshi font-bold text-rekaz-black">{t('aboutPage.pillarsTitle')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-8 text-center border-t-4 border-t-rekaz-cyan">
                <h3 className="text-xl font-satoshi font-bold mb-4">{t('aboutPage.pillar1Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('aboutPage.pillar1Desc')}</p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-t-rekaz-blue">
                <h3 className="text-xl font-satoshi font-bold mb-4">{t('aboutPage.pillar2Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('aboutPage.pillar2Desc')}</p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-t-rekaz-violet">
                <h3 className="text-xl font-satoshi font-bold mb-4">{t('aboutPage.pillar3Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('aboutPage.pillar3Desc')}</p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-t-rekaz-gold">
                <h3 className="text-xl font-satoshi font-bold mb-4">{t('aboutPage.pillar4Title')}</h3>
                <p className="text-rekaz-grey font-dm">{t('aboutPage.pillar4Desc')}</p>
              </Card>
            </div>
          </div>

          {/* Team Section (Placeholder) */}
          <div className="text-center mb-24">
            <h2 className="text-4xl font-satoshi font-bold text-rekaz-black mb-6">{t('aboutPage.teamTitle')}</h2>
            <p className="text-lg text-rekaz-grey font-dm max-w-2xl mx-auto">
              {t('aboutPage.teamDesc')}
            </p>
          </div>

          {/* CTA */}
          <div 
            className="rounded-3xl p-12 text-center text-white shadow-xl"
            style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
          >
            <h2 className="text-4xl font-satoshi font-bold mb-6">{t('aboutPage.ctaTitle')}</h2>
            <p className="text-xl font-dm mb-10 max-w-2xl mx-auto opacity-90">
              {t('aboutPage.ctaDesc')}
            </p>
            <Button variant="white" to="/inscription">{t('aboutPage.ctaButton')}</Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default About;
