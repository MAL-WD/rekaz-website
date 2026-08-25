import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Button from '../components/ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    source: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const subjectOptions = [
    { value: '', label: 'Select…' },
    { value: 'cem-bem', label: 'CEM & BEM Support' },
    { value: 'bac-preparation', label: 'BAC Preparation' },
    { value: 'professional-training', label: 'Professional Training' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'business', label: 'Business Inquiry' },
    { value: 'general', label: 'General Inquiry' },
  ];

  const sourceOptions = [
    { value: '', label: 'Select…' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'friend', label: 'Friend / Family' },
    { value: 'other', label: 'Other' },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Please write your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', source: '', message: '' });
    } catch (err) {
      setStatus('error');
      console.error('Contact form error:', err);
    }
  };

  const inputClasses = (field) =>
    `w-full h-[52px] px-4 bg-rekaz-card border rounded-[10px] font-satoshi text-sm text-rekaz-dark placeholder:text-rekaz-grey focus:outline-none focus:border-rekaz-cyan/50 transition-colors ${
      errors[field] ? 'border-red-400' : 'border-[rgba(136,136,136,0.1)]'
    }`;

  const labelClasses = 'block font-satoshi font-medium text-sm text-rekaz-dark mb-2';

  return (
    <>
      <Helmet>
        <title>Contact | Rekaz Institute</title>
        <meta name="description" content="Get in touch with Rekaz Institute in Béchar for education, training, and consultation inquiries." />
      </Helmet>

      {/* Hero + Form Section */}
      <section className="pt-[132px] pb-10 bg-white">
        <Container>
          {/* Heading */}
          <div className="max-w-[700px] mx-auto text-center mb-12">
            <SectionTag text="Contact" />
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-satoshi font-bold text-rekaz-black mt-6 leading-tight">
              Get in Touch with Rekaz
            </h1>
          </div>

          {/* Direct Contact Cards */}
          <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row gap-5 justify-center mb-12">
            {/* Email Card */}
            <a
              href="mailto:rekazschool08@gmail.com"
              className="flex items-center gap-4 bg-rekaz-card border border-[rgba(37,124,255,0.03)] rounded-[15px] px-5 py-1.5 hover:border-rekaz-cyan/30 transition-all group"
            >
              <div className="w-12 h-12 bg-rekaz-cyan rounded-[15px] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-rekaz-muted font-inter">Email Us</div>
                <div className="text-rekaz-dark font-satoshi font-medium">rekazschool08@gmail.com</div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+213000000000"
              className="flex items-center gap-4 bg-rekaz-card border border-[rgba(37,124,255,0.03)] rounded-[15px] px-5 py-1.5 hover:border-rekaz-cyan/30 transition-all group"
            >
              <div className="w-12 h-12 bg-rekaz-cyan rounded-[15px] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-rekaz-muted font-inter">Phone Number</div>
                <div className="text-rekaz-dark font-satoshi font-medium">+213 000 000 000</div>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex items-center gap-4 bg-rekaz-card border border-[rgba(37,124,255,0.03)] rounded-[15px] px-5 py-1.5">
              <div className="w-12 h-12 bg-rekaz-cyan rounded-[15px] flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-rekaz-muted font-inter">Location</div>
                <div className="text-rekaz-dark font-satoshi font-medium">Béchar, Algeria</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-[850px] mx-auto">
            {status === 'success' ? (
              <div className="bg-white border border-rekaz-border rounded-[20px] p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-satoshi font-bold text-rekaz-black mb-3">Message Sent Successfully!</h2>
                <p className="text-rekaz-grey font-dm mb-8">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <Button variant="primary" onClick={() => setStatus('idle')}>Send Another Message</Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] p-6 md:p-8 space-y-6"
              >
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-dm">
                    Something went wrong. Please try again later.
                  </div>
                )}

                {/* Row 1: Subject */}
                <div>
                  <label className={labelClasses}>Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClasses('subject')} ${!formData.subject ? 'text-rekaz-grey' : ''}`}
                    required
                  >
                    {subjectOptions.map(opt => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ''}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                {/* Row 2: Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClasses('name')}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@email.com"
                      className={inputClasses('email')}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 3: Source + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>How did you hear about us?</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className={`${inputClasses('source')} ${!formData.source ? 'text-rekaz-grey' : ''}`}
                    >
                      {sourceOptions.map(opt => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+213 000 000 000"
                      className={inputClasses('phone')}
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className={labelClasses}>Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message or inquiry details here..."
                    className={`${inputClasses('message')} !h-auto min-h-[120px] py-3 resize-y`}
                    required
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Honeypot */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full h-[60px] rounded-[16px] bg-gradient-to-b from-rekaz-violet to-rekaz-blue text-white font-satoshi font-medium text-base transition-all duration-300 ${
                    status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:opacity-90'
                  }`}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rekaz-violet to-rekaz-blue" />
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-satoshi font-bold text-white mb-10 leading-tight">
              Your Future Starts With One Decision
            </h2>
            <Button to="/programs" variant="white">Start Your Journey</Button>
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="text-rekaz-gold text-sm tracking-widest">★★★★★</div>
              <span className="text-white/80 text-sm font-dm">For students, learners & families</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
