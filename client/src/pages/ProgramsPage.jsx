import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const ProgramsPage = () => {
  const programs = [
    {
      tag: 'CEM • BEM',
      title: 'CEM — Middle School',
      desc: 'Comprehensive support across all subjects from 1CEM to 4CEM, building strong foundations and preparing students for the BEM.',
      img: 'https://framerusercontent.com/images/qS6LMA7iQKHtZNdhS9Wl1T4iY.jpg',
      link: '/programs/cem'
    },
    {
      tag: 'Lycée • BAC',
      title: 'LYCÉE — High School',
      desc: 'All-subject support from 1AS to 3AS, helping students excel academically and prepare strategically for the BAC.',
      img: 'https://framerusercontent.com/images/iiyPd24vPOjrEoCH6MOzoM7FAg.jpg',
      link: '/programs/lycee'
    },
    {
      tag: 'Certificates',
      title: 'Professional Formations',
      desc: 'Practical formations designed to develop real-world skills and provide valid certificates upon completion.',
      img: 'https://framerusercontent.com/images/UHS92vQMSs8EyuPs1M9I0EICPmE.jpg',
      link: '/programs/formations'
    },
    {
      tag: 'Guidance & Growth',
      title: 'Consultation',
      desc: 'Expert educational, career, and business consultation to help you make better decisions and build a clear path toward success.',
      img: 'https://framerusercontent.com/images/xvvnxiHVjBneP7l9of0BNL5Gc.png',
      link: '/consultation'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Programs | Rekaz Institute</title>
        <meta name="description" content="Explore our educational programs including CEM, Lycée, Professional Formations, and Consultation services." />
      </Helmet>
      
      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="flex flex-col items-center text-center mb-20">
            <SectionTag text="Explore" />
            <h1 className="text-4xl md:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-6">
              Our Programs
            </h1>
            <p className="text-xl text-rekaz-grey font-dm max-w-2xl">
              Discover a wide range of academic support and professional training tailored to your needs.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {programs.map((prog, idx) => (
              <Card key={idx} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={prog.img} 
                    alt={prog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-rekaz-cyan text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm">
                      {prog.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-3xl font-satoshi font-bold mb-4 text-rekaz-black">{prog.title}</h3>
                  <p className="text-rekaz-grey font-dm leading-relaxed mb-8 flex-grow">
                    {prog.desc}
                  </p>
                  <Button to={prog.link} variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-rekaz-black rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-satoshi font-bold mb-6">Not sure which program is right for you?</h2>
            <p className="text-lg font-dm mb-8 text-white/70">
              Our consultants are here to guide you to the best path for your future.
            </p>
            <Button variant="primary" to="/contact">Get in Touch</Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default ProgramsPage;

