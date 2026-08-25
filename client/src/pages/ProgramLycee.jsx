import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProgramLycee = () => {
  return (
    <>
      <Helmet>
        <title>Lycée — High School | Rekaz Institute</title>
        <meta name="description" content="High school support for 1AS, 2AS, 3AS/BAC. Expert preparation strategies and special BAC packs." />
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
              <SectionTag text="High School" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
                Lycée — High School <br /> (Lycée • BAC)
              </h1>
              <p className="text-xl text-rekaz-grey font-dm leading-relaxed mb-8">
                Targeted, intensive support across all subjects from 1AS to 3AS. We focus on academic excellence and strategic BAC preparation.
              </p>
              <Button to="/inscription" variant="primary">Enroll Now</Button>
            </div>
          </div>

          {/* Levels Covered */}
          <div className="mb-24 text-center">
            <h2 className="text-3xl md:text-4xl font-satoshi font-bold mb-12">Grade Levels Covered</h2>
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
            
            <SectionTag text="Special Offer" />
            <h2 className="text-4xl md:text-5xl font-satoshi font-bold mt-6 mb-4">Pack-BAC Offer</h2>
            <p className="text-2xl font-dm mb-8 opacity-90 max-w-2xl mx-auto">
              Get comprehensive support in <span className="font-bold underline decoration-rekaz-gold decoration-4">3 major subjects</span> for only 
            </p>
            <div className="text-6xl font-satoshi font-black text-rekaz-gold mb-10 drop-shadow-md">
              4000 DA
            </div>
            <Button variant="white" to="/inscription">Claim This Offer — Register</Button>
          </div>

          {/* BAC Preparation Features */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">BAC Preparation Strategy</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">Structured Learning</h3>
                <p className="text-rekaz-grey font-dm">Clear roadmaps covering the entire curriculum systematically.</p>
              </Card>
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">Intensive Revision</h3>
                <p className="text-rekaz-grey font-dm">Focused review sessions before critical exams.</p>
              </Card>
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">Exam Strategies</h3>
                <p className="text-rekaz-grey font-dm">Time management and question-solving techniques.</p>
              </Card>
              <Card className="p-8">
                <div className="text-rekaz-blue text-3xl mb-4"></div>
                <h3 className="text-xl font-bold mb-3 font-satoshi">Simulations</h3>
                <p className="text-rekaz-grey font-dm">Full-length BAC mock exams under real conditions.</p>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-satoshi font-bold mb-6">Secure Your BAC Success</h2>
            <p className="text-lg text-rekaz-grey font-dm mb-8 max-w-xl mx-auto">
              Don't leave your final year to chance. Get the expert guidance you need to achieve the scores for your dream university.
            </p>
            <Button variant="secondary" to="/contact">Get in Touch</Button>
          </div>

        </Container>
      </main>
    </>
  );
};

export default ProgramLycee;

