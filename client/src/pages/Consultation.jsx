import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Consultation = () => {
  return (
    <>
      <Helmet>
        <title>Consultation Services | Rekaz Institute</title>
        <meta name="description" content="Educational, Career, and Business Consultation services provided by Rekaz Institute." />
      </Helmet>

      <main className="w-full pt-32 pb-24">
        <Container>
          {/* Hero */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <SectionTag text="Guidance" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-8">
              Expert Consultation
            </h1>
            <p className="text-xl text-rekaz-grey font-dm leading-relaxed">
              Whether you're a student deciding your academic future or a business owner looking for growth strategies, our expert consultants are here to guide you every step of the way.
            </p>
          </div>

          {/* The 3 Types of Consultation */}
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            <Card className="p-10 border-t-4 border-t-rekaz-cyan">
              <div className="w-14 h-14 bg-rekaz-cyan/10 rounded-full flex items-center justify-center text-rekaz-cyan text-2xl mb-6">
                
              </div>
              <h3 className="text-2xl font-satoshi font-bold mb-4">Educational Consultation</h3>
              <p className="text-rekaz-grey font-dm leading-relaxed">
                Helping students and families make informed academic decisions. We analyze strengths, weaknesses, and interests to recommend the best educational paths and study methodologies.
              </p>
            </Card>
            
            <Card className="p-10 border-t-4 border-t-rekaz-blue">
              <div className="w-14 h-14 bg-rekaz-blue/10 rounded-full flex items-center justify-center text-rekaz-blue text-2xl mb-6">
                
              </div>
              <h3 className="text-2xl font-satoshi font-bold mb-4">Career & Orientation</h3>
              <p className="text-rekaz-grey font-dm leading-relaxed">
                Guiding high school graduates and professionals toward the right university majors or career transitions. We map out actionable plans for long-term professional success.
              </p>
            </Card>

            <Card className="p-10 border-t-4 border-t-rekaz-violet">
              <div className="w-14 h-14 bg-rekaz-violet/10 rounded-full flex items-center justify-center text-rekaz-violet text-2xl mb-6">
                
              </div>
              <h3 className="text-2xl font-satoshi font-bold mb-4">Business Consultation</h3>
              <p className="text-rekaz-grey font-dm leading-relaxed">
                Providing comprehensive strategies in digital marketing, cybersecurity, and management to help local businesses optimize their operations and scale effectively.
              </p>
            </Card>
          </div>

          {/* Business Growth & Monitoring */}
          <div className="bg-rekaz-black text-white rounded-3xl overflow-hidden mb-24">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <SectionTag text="Methodology" />
                <h2 className="text-3xl md:text-4xl font-satoshi font-bold mt-6 mb-6">
                  Business Growth & Monitoring Philosophy
                </h2>
                <p className="text-white/80 font-dm leading-relaxed mb-8">
                  We don't just offer advice and leave. We believe in continuous partnership. Our holistic approach ensures that your business doesn't just adapt to the market, but thrives in it.
                </p>
                <div className="space-y-4 font-satoshi font-bold text-lg">
                  <div className="flex items-center gap-4 text-rekaz-cyan"><span>1.</span> Strategy Formulation</div>
                  <div className="flex items-center gap-4 text-white/90"><span>2.</span> Implementation Support</div>
                  <div className="flex items-center gap-4 text-white/70"><span>3.</span> Continuous Monitoring</div>
                  <div className="flex items-center gap-4 text-white/50"><span>4.</span> Analysis & Improvement</div>
                  <div className="flex items-center gap-4 text-rekaz-gold"><span>5.</span> Sustainable Growth</div>
                </div>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full bg-white/5 p-8 flex items-center justify-center">
                <img 
                  src="https://framerusercontent.com/images/xvvnxiHVjBneP7l9of0BNL5Gc.png" 
                  alt="Business Growth Analytics" 
                  className="w-full max-w-md rounded-2xl shadow-2xl opacity-90"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-satoshi font-bold mb-6 text-rekaz-black">Book a Consultation Session</h2>
            <p className="text-lg text-rekaz-grey font-dm max-w-2xl mx-auto mb-8">
              Ready to take the next step? Schedule a meeting with our experts to discuss your specific needs and goals.
            </p>
            <Button variant="primary" to="/contact" className="px-10">Schedule Now</Button>
          </div>

        </Container>
      </main>
    </>
  );
};

export default Consultation;

