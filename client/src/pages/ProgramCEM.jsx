import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProgramCEM = () => {
  return (
    <>
      <Helmet>
        <title>CEM — Middle School | Rekaz Institute</title>
        <meta name="description" content="Middle school support for 1CEM, 2CEM, 3CEM, and 4CEM/BEM. Strong foundations and progressive preparation." />
      </Helmet>

      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <SectionTag text="Middle School" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
                CEM — Middle School <br /> (CEM • BEM)
              </h1>
              <p className="text-xl text-rekaz-grey font-dm leading-relaxed mb-8">
                We provide complete support across all subjects from 1CEM to 4CEM. Our goal is to build strong academic foundations and prepare students confidently for their BEM exams.
              </p>
              <Button to="/inscription" variant="primary">Enroll Now</Button>
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
            <h2 className="text-3xl md:text-4xl font-satoshi font-bold text-center mb-12">Grade Levels Covered</h2>
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
              <h2 className="text-3xl md:text-4xl font-satoshi font-bold">BEM Preparation Features</h2>
              <p className="text-white/70 font-dm mt-4">Everything needed for a successful BEM exam.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl"></div>
                <h3 className="text-xl font-bold mb-3">Intensive Exercises</h3>
                <p className="text-white/70 font-dm">Targeted practice across all core subjects.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl"></div>
                <h3 className="text-xl font-bold mb-3">Past Papers</h3>
                <p className="text-white/70 font-dm">Analysis and solving of previous BEM examinations.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 text-2xl"></div>
                <h3 className="text-xl font-bold mb-3">Mock Exams</h3>
                <p className="text-white/70 font-dm">Simulated testing environments to reduce anxiety.</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-satoshi font-bold mb-6">Key Benefits</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-rekaz-cyan text-xl mt-1">✓</span>
                  <div>
                    <h4 className="font-bold font-satoshi">Strong Foundations</h4>
                    <p className="text-rekaz-grey font-dm">Building knowledge step-by-step from year one.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rekaz-cyan text-xl mt-1">✓</span>
                  <div>
                    <h4 className="font-bold font-satoshi">Progressive Preparation</h4>
                    <p className="text-rekaz-grey font-dm">Gradual increase in difficulty to match student growth.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-rekaz-cyan text-xl mt-1">✓</span>
                  <div>
                    <h4 className="font-bold font-satoshi">All Subjects Included</h4>
                    <p className="text-rekaz-grey font-dm">Comprehensive tutoring without leaving gaps.</p>
                  </div>
                </li>
              </ul>
            </div>
            <Card className="p-10 bg-gradient-to-br from-rekaz-cyan/10 to-rekaz-blue/10 border-none shadow-none text-center">
              <h3 className="text-2xl font-satoshi font-bold mb-4">Start Your Journey</h3>
              <p className="text-rekaz-grey font-dm mb-8">
                Join thousands of students who have improved their grades and confidence with Rekaz.
              </p>
              <Button to="/inscription" variant="primary">Register for CEM / BEM</Button>
            </Card>
          </div>

        </Container>
      </main>
    </>
  );
};

export default ProgramCEM;

