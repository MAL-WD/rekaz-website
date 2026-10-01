import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import ceoImage from '../assets/ceo.jpg';

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
                <blockquote className="text-lg md:text-xl font-dm leading-relaxed text-white/95 mb-8 border-r-4 md:border-r-4 border-rekaz-cyan pr-6 whitespace-pre-line">
                  {t('aboutPage.founderQuote')}
                </blockquote>
                <p className="font-dm text-white/70 leading-relaxed">
                  {t('aboutPage.founderDesc')}
                </p>
              </div>
              <div className="h-full min-h-[400px] relative">
                <img 
                  src={ceoImage} 
                  alt="Adel, CEO" 
                  className="w-full h-full object-cover absolute inset-0"
                  style={{ objectPosition: 'center 20%' }}
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

          {/* Join Our Team CTA */}
          <div className="mb-10 rounded-3xl overflow-hidden border border-gray-100 shadow-md">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14 bg-[#fbfaff] flex flex-col justify-center">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-rekaz-blue bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5 w-fit">
                  {t('aboutPage.joinTeamTag', 'نحن نوظّف')}
                </span>
                <h2 className="text-3xl font-satoshi font-bold text-rekaz-black mb-4 leading-tight">
                  {t('aboutPage.joinTeamTitle', 'انضم إلى فريق ركاز كأستاذ')}
                </h2>
                <p className="text-rekaz-grey font-dm leading-relaxed mb-8">
                  {t('aboutPage.joinTeamDesc', 'نبحث دائماً عن أساتذة متميزين وشغوفين بالتعليم. إذا كنت تريد أن تكون جزءاً من مشروع تعليمي استثنائي، قدّم طلبك الآن.')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/teacher-application"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] text-white font-satoshi font-semibold text-sm shadow-md hover:brightness-105 hover:-translate-y-0.5 transition-all"
                    style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    {t('aboutPage.joinTeamBtn', 'تقديم طلب توظيف')}
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-white border border-gray-200 text-rekaz-dark font-satoshi font-semibold text-sm hover:border-rekaz-blue hover:text-rekaz-blue transition-all"
                  >
                    {t('aboutPage.joinTeamContact', 'تواصل معنا أولاً')}
                  </a>
                </div>
              </div>
              <div
                className="min-h-[260px] md:min-h-0 flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, #0412fa 0%, #00a5ff 100%)' }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                />
                <div className="relative z-10 text-center px-10 py-12">
                  <div className="text-7xl font-satoshi font-black text-white/20 leading-none mb-2">👩‍🏫</div>
                  <p className="text-white font-satoshi font-bold text-2xl mb-1">{t('aboutPage.joinTeamStat', 'فريق متميز')}</p>
                  <p className="text-white/70 font-dm text-sm">{t('aboutPage.joinTeamStatDesc', 'أساتذة متخصصون في جميع المواد')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student CTA */}
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
