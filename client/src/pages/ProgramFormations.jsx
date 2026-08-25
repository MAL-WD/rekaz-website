import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProgramFormations = () => {
  const formations = [
    { title: 'Entrepreneurship', icon: '', desc: 'Learn how to start, manage, and scale your own business.' },
    { title: 'Marketing', icon: '', desc: 'Master market research, branding, and consumer behavior.' },
    { title: 'Digital Marketing', icon: '', desc: 'Social media, SEO, and paid advertising strategies.' },
    { title: 'Digital Skills', icon: '', desc: 'Essential computer, software, and digital literacy tools.' },
    { title: 'Cybersecurity', icon: '', desc: 'Protect data, networks, and systems from digital attacks.' },
    { title: 'Business Strategy', icon: '️', desc: 'Strategic planning, operations, and long-term vision.' },
  ];

  return (
    <>
      <Helmet>
        <title>Professional Formations | Rekaz Institute</title>
        <meta name="description" content="Gain practical skills in Entrepreneurship, Marketing, Cybersecurity, and more. Valid certificates upon completion." />
      </Helmet>

      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
            <div className="flex-1">
              <SectionTag text="Certificates" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
                Professional Formations
              </h1>
              <p className="text-xl text-rekaz-grey font-dm leading-relaxed mb-8">
                Accelerate your career with our specialized, practical training programs. Whether you want to start a business or upskill in the digital age, we have the right formation for you.
              </p>
              <div className="flex gap-4">
                <Button to="/inscription" variant="primary">Register for Formation</Button>
                <div className="inline-flex items-center text-rekaz-cyan font-bold font-satoshi px-4">
                  ✓ Valid Certificates Included
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
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">Available Formations</h2>
              <p className="text-rekaz-grey font-dm mt-4 max-w-2xl mx-auto">
                Practical, hands-on courses led by industry experts. More formations are frequently added to match market demands.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formations.map((item, idx) => (
                <Card key={idx} className="p-8 border border-transparent hover:border-rekaz-cyan transition-all group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                  <h3 className="text-2xl font-satoshi font-bold mb-3">{item.title}</h3>
                  <p className="text-rekaz-grey font-dm">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Certificate Banner */}
          <div className="bg-rekaz-black text-white rounded-3xl p-12 text-center mb-24">
            <div className="text-5xl mb-6"></div>
            <h2 className="text-3xl font-satoshi font-bold mb-4">Valid Certification</h2>
            <p className="text-lg font-dm text-white/80 max-w-3xl mx-auto">
              Upon successful completion of any formation, you will receive a verifiable certificate recognized by local businesses and partners, adding significant value to your CV.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-rekaz-bg rounded-3xl p-12 border border-rekaz-border">
            <h2 className="text-3xl font-satoshi font-bold mb-4">Ready to upgrade your skills?</h2>
            <p className="text-rekaz-grey font-dm mb-8">Contact us to find out the next available intake dates.</p>
            <Button variant="primary" to="/contact">Get in Touch</Button>
          </div>

        </Container>
      </main>
    </>
  );
};

export default ProgramFormations;

