import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    source: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const subjectOptions = [
    { value: '', label: t('contactPage.subjectOptions.placeholder') },
    { value: 'general', label: t('contactPage.subjectOptions.general') },
    { value: 'registration', label: t('contactPage.subjectOptions.registration') },
    { value: 'consultation', label: t('contactPage.subjectOptions.consultation') },
    { value: 'partnership', label: t('contactPage.subjectOptions.partnership') },
    { value: 'other', label: t('contactPage.subjectOptions.other') }
  ];

  const sourceOptions = [
    { value: '', label: t('contactPage.sourceOptions.placeholder') },
    { value: 'social', label: t('contactPage.sourceOptions.social') },
    { value: 'friend', label: t('contactPage.sourceOptions.friend') },
    { value: 'search', label: t('contactPage.sourceOptions.search') },
    { value: 'event', label: t('contactPage.sourceOptions.event') },
    { value: 'other', label: t('contactPage.sourceOptions.other') }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://rekaz-website.onrender.com/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', source: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const inputClasses = (field) => `
    w-full bg-[rgba(249,250,251,1)] border rounded-xl px-5 py-4
    font-dm text-[15px] outline-none transition-all duration-300
    ${errors[field] 
      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
      : 'border-[rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.15)] focus:border-rekaz-blue focus:ring-4 focus:ring-rekaz-blue/10'
    }
  `;

  const labelClasses = "block text-[13px] font-satoshi font-semibold text-rekaz-dark mb-2 uppercase tracking-wide";

  return (
    <>
      <Helmet>
        <title>{t('contactPage.metaTitle')}</title>
        <meta name="description" content={t('contactPage.metaDesc')} />
      </Helmet>

      <section className="pt-32 pb-20 overflow-hidden relative">
        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <SectionTag text={t('contactPage.sectionTag')} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold text-rekaz-black mt-6 mb-6">
              {t('contactPage.heroTitle')}
            </h1>
            <p className="text-lg text-rekaz-grey font-dm leading-relaxed">
              {t('contactPage.heroDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
            {/* Phone */}
            <div className="bg-white border border-rekaz-border rounded-[24px] p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-rekaz-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-rekaz-muted font-inter">{t('contactPage.phoneLabel')}</div>
                <div className="text-rekaz-dark font-satoshi font-medium" dir="ltr">+213 783 12 12 99</div>
                <div className="text-[11px] text-green-600 mt-1 font-medium">{t('contactPage.whatsappAvailable')}</div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-rekaz-border rounded-[24px] p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-rekaz-violet">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-rekaz-muted font-inter">{t('contactPage.emailLabel')}</div>
                <div className="text-rekaz-dark font-satoshi font-medium">schoolrekaz@gmail.com</div>
                <div className="text-[11px] text-rekaz-grey mt-1">{t('contactPage.emailDesc')}</div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white border border-rekaz-border rounded-[24px] p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mb-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-rekaz-cyan">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-rekaz-muted font-inter">{t('contactPage.locationLabel')}</div>
                <div className="text-rekaz-dark font-satoshi font-medium">{t('contactPage.locationDesc')}</div>
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
                <h2 className="text-2xl font-satoshi font-bold text-rekaz-black mb-3">{t('contactPage.successTitle')}</h2>
                <p className="text-rekaz-grey font-dm mb-8">{t('contactPage.successDesc')}</p>
                <Button variant="primary" onClick={() => setStatus('idle')}>{t('contactPage.sendAnother')}</Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[20px] p-6 md:p-8 space-y-6"
              >
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-dm">
                    {t('contactPage.errorMsg')}
                  </div>
                )}

                {/* Row 1: Subject */}
                <div>
                  <label className={labelClasses}>{t('contactPage.formSubject')}</label>
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
                    <label className={labelClasses}>{t('contactPage.formName')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contactPage.formNamePlaceholder')}
                      className={inputClasses('name')}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>{t('contactPage.formEmail')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contactPage.formEmailPlaceholder')}
                      className={inputClasses('email')}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 3: Source + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>{t('contactPage.formSource')}</label>
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
                    <label className={labelClasses}>{t('contactPage.formPhone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contactPage.formPhonePlaceholder')}
                      className={inputClasses('phone')}
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className={labelClasses}>{t('contactPage.formMessage')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contactPage.formMessagePlaceholder')}
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
                      {t('contactPage.btnSending')}
                    </span>
                  ) : t('contactPage.btnSubmit')}
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
              {t('contactPage.ctaTitle')}
            </h2>
            <Button to="/programs" variant="white">{t('contactPage.ctaButton')}</Button>
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="text-rekaz-gold text-sm tracking-widest">★★★★★</div>
              <span className="text-white/80 text-sm font-dm">{t('contactPage.ctaSubtitle')}</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;

