import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import PartnersTicker from '../components/sections/PartnersTicker';
import FounderMessage from '../components/sections/FounderMessage';
import AboutPreview from '../components/sections/AboutPreview';
import WhyRekaz from '../components/sections/WhyRekaz';
import TestimonialBanner from '../components/sections/TestimonialBanner';
import Programs from '../components/sections/Programs';
import Benefits from '../components/sections/Benefits';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonials';
import Integration from '../components/sections/Integration';
import Blog from '../components/sections/Blog';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Rekaz Institute | Education, Training & Consulting</title>
        <meta name='description' content='Rekaz in Béchar empowers students, learners, and businesses through education, training, and guidance.' />
      </Helmet>
      
      <main className='w-full'>
        <Hero />
        <PartnersTicker />
        <FounderMessage />
        <AboutPreview />
        <WhyRekaz />
        <TestimonialBanner />
        <Programs />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Integration />
        <Blog />
        <FAQ />
        <CTA />
      </main>
    </>
  );
};

export default Home;
