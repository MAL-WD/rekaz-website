import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Rekaz Institute</title>
        <meta name='description' content='Learn about Rekaz Institute, our mission, vision, and our founder Adel.' />
      </Helmet>
      
      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-24">
            <SectionTag text="About Us" />
            <h1 className="text-4xl md:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
              Empowering Minds, <br /> Shaping Futures
            </h1>
            <p className="text-xl text-rekaz-grey font-dm max-w-3xl leading-relaxed">
              We are an educational institution based in Béchar, Algeria, committed to providing quality education, guidance, and consultation to our students and community.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            <Card className="p-10">
              <h2 className="text-3xl font-satoshi font-bold mb-6 text-rekaz-cyan">Our Mission</h2>
              <p className="text-lg text-rekaz-grey font-dm leading-relaxed">
                Empowering students and learners with knowledge, skills, and guidance for a brighter future. We believe that education is the most powerful tool to change the world.
              </p>
            </Card>
            <Card className="p-10">
              <h2 className="text-3xl font-satoshi font-bold mb-6 text-rekaz-cyan">Our Vision</h2>
              <p className="text-lg text-rekaz-grey font-dm leading-relaxed">
                To become one of the most recognized educational institutions in Béchar and expand across Algeria, setting a standard for modern and effective learning methodologies.
              </p>
            </Card>
          </div>

          {/* Founder Section */}
          <div className="bg-rekaz-black text-white rounded-3xl overflow-hidden mb-24 shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <SectionTag text="The Founder" />
                <h2 className="text-4xl font-satoshi font-bold mt-6 mb-6">Meet Adel</h2>
                <h3 className="text-xl font-dm text-rekaz-cyan mb-8">CEO & Teacher</h3>
                <blockquote className="text-2xl font-instrument-serif italic leading-relaxed text-white/90 mb-8 border-l-4 border-rekaz-cyan pl-6">
                  "I want you to know that our mission is bigger than teaching subjects — it's about helping you believe in yourself, discover your potential, and achieve your dreams."
                </blockquote>
                <p className="font-dm text-white/70 leading-relaxed">
                  As an educator and leader, Adel brings his passion for teaching and his vision for a better educational framework to every student that walks through the doors of Rekaz Institute.
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
              <h2 className="text-4xl font-satoshi font-bold text-rekaz-black">Our Pillars</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-8 text-center border-t-4 border-t-rekaz-cyan">
                <h3 className="text-xl font-satoshi font-bold mb-4">Academic Excellence</h3>
                <p className="text-rekaz-grey font-dm">Providing top-tier educational support for all levels to ensure outstanding academic results.</p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-t-rekaz-blue">
                <h3 className="text-xl font-satoshi font-bold mb-4">Professional Training</h3>
                <p className="text-rekaz-grey font-dm">Equipping learners with real-world skills through practical, industry-relevant formations.</p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-t-rekaz-violet">
                <h3 className="text-xl font-satoshi font-bold mb-4">Consultation</h3>
                <p className="text-rekaz-grey font-dm">Expert guidance for students and businesses to make informed and strategic decisions.</p>
              </Card>
              <Card className="p-8 text-center border-t-4 border-t-rekaz-gold">
                <h3 className="text-xl font-satoshi font-bold mb-4">Future E-Learning</h3>
                <p className="text-rekaz-grey font-dm">Pioneering digital education platforms to make learning accessible anywhere, anytime.</p>
              </Card>
            </div>
          </div>

          {/* Team Section (Placeholder) */}
          <div className="text-center mb-24">
            <h2 className="text-4xl font-satoshi font-bold text-rekaz-black mb-6">Our Exceptional Team</h2>
            <p className="text-lg text-rekaz-grey font-dm max-w-2xl mx-auto">
              Our institute is built by a dedicated team of professional educators and staff who are passionate about shaping the next generation. (Profiles coming soon).
            </p>
          </div>

          {/* CTA */}
          <div 
            className="rounded-3xl p-12 text-center text-white shadow-xl"
            style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
          >
            <h2 className="text-4xl font-satoshi font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl font-dm mb-10 max-w-2xl mx-auto opacity-90">
              Start your journey toward academic excellence and professional success today.
            </p>
            <Button variant="white" to="/inscription">Join Us Now — Register</Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default About;

