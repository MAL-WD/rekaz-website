import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Button from '../components/ui/Button';

const Inscription = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    programType: 'lycee', // 'cem' | 'lycee' | 'formation' | 'consultation'
    level: '3AS-BAC',
    filiere: 'Experimental Sciences',
    formationCategory: 'dev-web',
    subjects: ['Mathematics', 'Physics & Chemistry'],
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    wilaya: 'Béchar',
    city: 'Béchar',
    currentSchool: '',
    parentName: '',
    parentPhone: '',
    parentRelation: 'Father',
    learningMode: 'presentiel', // 'presentiel' | 'online' | 'hybrid'
    schedulePreference: 'weekend', // 'weekend' | 'evening' | 'flexible'
    notes: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [registrationRef, setRegistrationRef] = useState('');

  const programOptions = [
    {
      id: 'cem',
      title: t('inscription.programs.cem.title', 'Middle School (CEM • BEM)'),
      subtitle: t('inscription.programs.cem.subtitle', 'Comprehensive tutoring from 1CEM to BEM success'),
      icon: '',
      badge: t('inscription.programs.cem.badge', '1AM to 4AM')
    },
    {
      id: 'lycee',
      title: t('inscription.programs.lycee.title', 'High School (Lycée • BAC)'),
      subtitle: t('inscription.programs.lycee.subtitle', 'Targeted preparation and strategic BAC revision'),
      icon: '',
      badge: t('inscription.programs.lycee.badge', '1AS to 3AS / BAC')
    },
    {
      id: 'formation',
      title: t('inscription.programs.formation.title', 'Professional Training & Skills'),
      subtitle: t('inscription.programs.formation.subtitle', 'Certified courses in tech, business & languages'),
      icon: '',
      badge: t('inscription.programs.formation.badge', 'Certificate Included')
    },
    {
      id: 'consultation',
      title: t('inscription.programs.consultation.title', 'Consulting & Academic Guidance'),
      subtitle: t('inscription.programs.consultation.subtitle', 'University orientation & personal coaching'),
      icon: '',
      badge: t('inscription.programs.consultation.badge', 'VIP Mentorship')
    }
  ];

  const levelsByProgram = {
    cem: [
      { value: '1AM', label: t('inscription.levels.1am', '1st Year Middle School (1AM)') },
      { value: '2AM', label: t('inscription.levels.2am', '2nd Year Middle School (2AM)') },
      { value: '3AM', label: t('inscription.levels.3am', '3rd Year Middle School (3AM)') },
      { value: '4AM-BEM', label: t('inscription.levels.4am', '4th Year Middle School (4AM - BEM Exam)') }
    ],
    lycee: [
      { value: '1AS', label: t('inscription.levels.1as', '1st Year High School (1AS - Common Core)') },
      { value: '2AS', label: t('inscription.levels.2as', '2nd Year High School (2AS)') },
      { value: '3AS-BAC', label: t('inscription.levels.3as', '3rd Year High School (3AS - BAC Preparation)') }
    ],
    formation: [
      { value: 'dev-web', label: t('inscription.levels.devWeb', 'Full-Stack Web & Mobile Development') },
      { value: 'design-uiux', label: t('inscription.levels.designUiux', 'Graphic Design & UI/UX') },
      { value: 'langues', label: t('inscription.levels.langues', 'Foreign Languages (English / French / German)') },
      { value: 'marketing-digital', label: t('inscription.levels.marketingDigital', 'Digital Marketing & E-Commerce') },
      { value: 'bureautique', label: t('inscription.levels.bureautique', 'Office Automation & Advanced Secretarial') },
      { value: 'entrepreneuriat', label: t('inscription.levels.entrepreneuriat', 'Entrepreneurship & Project Management') }
    ],
    consultation: [
      { value: 'orientation-bac', label: t('inscription.levels.orientationBac', 'Post-BAC Orientation & University Choice') },
      { value: 'coaching-scolaire', label: t('inscription.levels.coachingScolaire', 'Academic Coaching & Study Methodologies') },
      { value: 'reconversion', label: t('inscription.levels.reconversion', 'Career Transition & Skills Assessment') }
    ]
  };

  const filiereOptions = [
    'Experimental Sciences',
    'Mathematics',
    'Technical Mathematics (Civil / Mechanical / Electrical / Process)',
    'Management & Economics',
    'Literature & Philosophy',
    'Foreign Languages'
  ];

  const availableSubjectsByProgram = {
    cem: ['Mathematics', 'Physics & Chemistry', 'Natural Sciences (Biology)', 'French', 'English', 'Arabic Language'],
    lycee: ['Mathematics', 'Physics & Chemistry', 'Natural Sciences (SVT)', 'Philosophy', 'French', 'English', 'Economics & Management', 'Law', 'Accounting'],
    formation: ['Core Curriculum', 'Hands-on Projects', '1-on-1 Mentorship', 'Final Certificate'],
    consultation: ['1-on-1 Discovery Session', 'Skills & Interest Assessment', 'Personalized Action Plan']
  };

  const handleProgramChange = (progId) => {
    const defaultLevel = levelsByProgram[progId]?.[0]?.value || '';
    setFormData(prev => ({
      ...prev,
      programType: progId,
      level: defaultLevel,
      subjects: availableSubjectsByProgram[progId]?.slice(0, 2) || []
    }));
  };

  const toggleSubject = (subject) => {
    setFormData(prev => {
      const exists = prev.subjects.includes(subject);
      const newSubjects = exists
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.subjects.length === 0) {
      newErrors.subjects = 'Please select at least one subject or option';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    const refNumber = `RKZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const payload = {
        ...formData,
        referenceNumber: refNumber
      };

      try {
        await fetch('/api/inscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('API submission notice:', err);
      }

      setRegistrationRef(refNumber);
      setStatus('success');
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const inputClass = (field) =>
    `w-full h-[52px] px-4 bg-rekaz-card border rounded-[12px] font-satoshi text-sm text-rekaz-dark placeholder:text-rekaz-grey focus:outline-none focus:border-rekaz-cyan focus:ring-2 focus:ring-rekaz-cyan/20 transition-all ${
      errors[field] ? 'border-red-400 bg-red-50/20' : 'border-[rgba(136,136,136,0.15)] hover:border-gray-300'
    }`;

  const labelClass = 'block font-satoshi font-semibold text-sm text-rekaz-black mb-2';

  return (
    <>
      <Helmet>
        <title>Online Inscription & Registration | Rekaz Institute</title>
        <meta
          name="description"
          content="Register online for Rekaz Institute programs in Béchar: Middle School (CEM & BEM), High School (Lycée & BAC), Professional Training & Certifications, and Consulting."
        />
      </Helmet>

      <main className="pt-[128px] pb-24 bg-[#fbfaff] min-h-screen">
        <Container>
          {/* Header Banner */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionTag text="Online Registration • Inscription" icon="" />
            <h1 
              className="text-4xl md:text-5xl lg:text-[54px] font-satoshi font-bold text-rekaz-black mt-5 mb-4 leading-[1.2] tracking-[-0.03em]"
            >
              Join Rekaz Institute
            </h1>
            <p className="text-lg md:text-xl text-rekaz-grey font-dm leading-relaxed">
              Take the first step toward academic excellence and career success. Complete the form below and our admissions team will contact you within 24 hours.
            </p>

            {/* Quick Guarantees Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Personalized Academic Mentoring
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rekaz-cyan"></span>
                Expert & Certified Instructors
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rekaz-blue"></span>
                In-Person Béchar Center + Online Access
              </div>
            </div>
          </div>

          {/* Success Screen */}
          {status === 'success' ? (
            <div className="max-w-2xl mx-auto bg-white border border-gray-100 rounded-[28px] p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.06)] text-center animate-fadeIn">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
                style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
              >
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                Application Successfully Received
              </div>

              <h2 className="text-3xl font-satoshi font-bold text-rekaz-black mb-3">
                Congratulations, {formData.fullName}!
              </h2>
              <p className="text-rekaz-grey font-dm mb-6 max-w-lg mx-auto">
                Your pre-registration with Rekaz Institute has been submitted. Our admissions team will reach out via phone or WhatsApp within 24 hours to confirm your group schedule.
              </p>

              {/* Reference Card */}
              <div className="bg-[#fbfaff] border border-gray-200/80 rounded-2xl p-6 mb-8 text-left">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                  <span className="text-xs font-semibold text-rekaz-muted uppercase tracking-wider">Application Reference</span>
                  <span className="font-mono font-bold text-rekaz-blue text-base bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                    {registrationRef}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-rekaz-muted block text-xs">Program:</span>
                    <span className="font-semibold text-rekaz-black capitalize">{formData.programType.toUpperCase()} ({formData.level})</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">Phone Number:</span>
                    <span className="font-semibold text-rekaz-black">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">Selected Subjects / Modules:</span>
                    <span className="font-semibold text-rekaz-black">{formData.subjects.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">Learning Mode:</span>
                    <span className="font-semibold text-rekaz-black capitalize">{formData.learningMode}</span>
                  </div>
                </div>
              </div>

              {/* Direct Next Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/213555123456?text=Hello%20Rekaz%20Institute,%20I%20have%20completed%20my%20online%20registration%20(Ref:%20${registrationRef})`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-[#25D366] text-white font-satoshi font-semibold text-sm hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.765.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.828c0 5.518-4.482 10-10 10-1.745 0-3.37-.449-4.787-1.233l-5.213 1.365 1.39-5.077c-.896-1.472-1.39-3.197-1.39-5.055 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
                  </svg>
                  Confirm on WhatsApp
                </a>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setStatus('idle');
                    setFormData(prev => ({ ...prev, fullName: '', phone: '', email: '', notes: '' }));
                  }}
                  className="w-full sm:w-auto"
                >
                  New Registration
                </Button>
              </div>
            </div>
          ) : (
            /* Registration Form Container */
            <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)]">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* STEP 1: Choose Program Category */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span 
                      className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                      style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    >
                      1
                    </span>
                    <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">
                      Select Your Study Program
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {programOptions.map((prog) => {
                      const isSelected = formData.programType === prog.id;
                      return (
                        <div
                          key={prog.id}
                          onClick={() => handleProgramChange(prog.id)}
                          className={`relative p-5 rounded-[18px] border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-rekaz-blue bg-blue-50/30 shadow-[0_4px_18px_rgba(4,18,250,0.08)]'
                              : 'border-gray-200/80 hover:border-rekaz-cyan/60 bg-white hover:bg-gray-50/50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="text-3xl">{prog.icon}</div>
                            <span 
                              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                isSelected 
                                  ? 'bg-rekaz-blue text-white' 
                                  : 'bg-gray-100 text-rekaz-muted'
                              }`}
                            >
                              {prog.badge}
                            </span>
                          </div>
                          <h3 className="font-satoshi font-bold text-lg text-rekaz-black mb-1">
                            {prog.title}
                          </h3>
                          <p className="text-xs text-rekaz-grey font-dm">
                            {prog.subtitle}
                          </p>

                          {/* Selected Checkmark Indicator */}
                          {isSelected && (
                            <div 
                              className="absolute top-3 right-3 w-5 h-5 rounded-full text-white flex items-center justify-center shadow-sm"
                              style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                            >
                              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 2: Academic Level & Subjects */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span 
                      className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                      style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    >
                      2
                    </span>
                    <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">
                      Academic Level & Subjects
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    {/* Level Selector */}
                    <div>
                      <label className={labelClass}>
                        {formData.programType === 'formation' ? 'Field / Formation Specialization' : 'Grade / Academic Level'}
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className={inputClass('level')}
                      >
                        {levelsByProgram[formData.programType]?.map((lvl) => (
                          <option key={lvl.value} value={lvl.value}>
                            {lvl.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Secondary Field: Filière (for Lycée/BAC) */}
                    {formData.programType === 'lycee' && (
                      <div>
                        <label className={labelClass}>Academic Branch / Stream</label>
                        <select
                          name="filiere"
                          value={formData.filiere}
                          onChange={handleChange}
                          className={inputClass('filiere')}
                        >
                          {filiereOptions.map((fil, i) => (
                            <option key={i} value={fil}>
                              {fil}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Learning Mode */}
                    <div>
                      <label className={labelClass}>Learning Mode</label>
                      <select
                        name="learningMode"
                        value={formData.learningMode}
                        onChange={handleChange}
                        className={inputClass('learningMode')}
                      >
                        <option value="presentiel">In-Person (At Rekaz Learning Center, Béchar)</option>
                        <option value="online">Online (Interactive Virtual Classroom)</option>
                        <option value="hybrid">Hybrid (In-Person + Online Recordings)</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject Multi-Select Pills */}
                  <div>
                    <label className={labelClass}>
                      Select Subjects or Modules: <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5 mt-2">
                      {availableSubjectsByProgram[formData.programType]?.map((subject) => {
                        const isChecked = formData.subjects.includes(subject);
                        return (
                          <button
                            type="button"
                            key={subject}
                            onClick={() => toggleSubject(subject)}
                            className={`px-4 py-2.5 rounded-xl font-satoshi text-xs font-semibold transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-gradient-to-r from-rekaz-cyan to-rekaz-blue text-white shadow-sm scale-[1.02]'
                                : 'bg-gray-100 text-rekaz-dark hover:bg-gray-200/80'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {subject}
                          </button>
                        );
                      })}
                    </div>
                    {errors.subjects && <p className="text-red-500 text-xs mt-2">{errors.subjects}</p>}
                  </div>

                  {/* Special Pack BAC Banner Notice */}
                  {formData.programType === 'lycee' && formData.level === '3AS-BAC' && (
                    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl"></span>
                        <div>
                          <h4 className="font-satoshi font-bold text-sm text-rekaz-blue">Special Pack-BAC Offer</h4>
                          <p className="text-xs text-rekaz-grey">Get comprehensive tutoring across 3 major subjects for only 4,000 DZD/month.</p>
                        </div>
                      </div>
                      <span className="font-satoshi font-black text-sm text-rekaz-blue bg-white px-3 py-1.5 rounded-xl shadow-xs">
                        4000 DZD
                      </span>
                    </div>
                  )}
                </div>

                {/* STEP 3: Student Details */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span 
                      className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                      style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    >
                      3
                    </span>
                    <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">
                      Student / Applicant Information
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Mohamed Amine Benali"
                        className={inputClass('fullName')}
                        required
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Phone Number (WhatsApp) <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="05 / 06 / 07 XX XX XX XX"
                        className={inputClass('phone')}
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>Email Address (Optional)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>City / Wilaya</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Béchar / Other"
                        className={inputClass('city')}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Current School / High School / College</label>
                      <input
                        type="text"
                        name="currentSchool"
                        value={formData.currentSchool}
                        onChange={handleChange}
                        placeholder="e.g. Ibn Khaldoun High School"
                        className={inputClass('currentSchool')}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Preferred Session Timing</label>
                      <select
                        name="schedulePreference"
                        value={formData.schedulePreference}
                        onChange={handleChange}
                        className={inputClass('schedulePreference')}
                      >
                        <option value="weekend">Weekend Intensive Sessions (Friday / Saturday)</option>
                        <option value="evening">Weekday Evening Sessions</option>
                        <option value="flexible">Flexible Group Timing</option>
                      </select>
                    </div>
                  </div>

                  {/* Parent Section (for CEM & Lycee students) */}
                  {(formData.programType === 'cem' || formData.programType === 'lycee') && (
                    <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-satoshi font-bold text-sm text-rekaz-black mb-4 flex items-center gap-2">
                        <span>‍‍</span> Parent / Guardian Contact (For Middle & High School Students)
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-rekaz-dark mb-1">Parent's Full Name</label>
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            placeholder="Guardian full name"
                            className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-rekaz-dark mb-1">Parent's Phone Number</label>
                          <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            placeholder="05 / 06 / 07 XX XX XX XX"
                            className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-rekaz-dark mb-1">Relationship</label>
                          <select
                            name="parentRelation"
                            value={formData.parentRelation}
                            onChange={handleChange}
                            className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm"
                          >
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Guardian">Guardian / Legal Representative</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes / Special Requests */}
                  <div className="mt-6">
                    <label className={labelClass}>Additional Notes or Specific Goals (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Specify any target subjects, exam goals, or special requirements here..."
                      className="w-full h-24 p-4 bg-rekaz-card border border-[rgba(136,136,136,0.15)] rounded-2xl font-satoshi text-sm text-rekaz-dark placeholder:text-rekaz-grey focus:outline-none focus:border-rekaz-cyan transition-all resize-y"
                    />
                  </div>
                </div>

                {/* Submit Section with Signature Blue Gradient Button */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-left text-xs text-rekaz-grey max-w-sm">
                     Your personal data is kept strictly confidential and used solely for academic enrollment and communication.
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-w-[280px] h-[58px] px-8 text-white rounded-[16px] font-satoshi font-semibold text-base tracking-[-0.01em] shadow-[0_6px_22px_rgba(0,165,255,0.38)] hover:shadow-[0_10px_30px_rgba(4,18,250,0.48)] hover:brightness-105 hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
                    style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting Application...
                      </span>
                    ) : (
                      'Confirm Registration →'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Contact Helpline Box */}
          <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-rekaz-black to-[#1a1c38] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-rekaz-cyan font-satoshi font-bold text-xs uppercase tracking-wider mb-2">
                Need Guidance or Advice?
              </div>
              <h3 className="text-2xl font-satoshi font-bold text-white mb-1">
                Our admissions team is here to assist you
              </h3>
              <p className="text-white/70 text-sm font-dm">
                Contact us directly by phone or visit us at our center in Béchar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-satoshi font-semibold transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:+213555123456"
                className="px-6 py-3 text-white rounded-xl text-sm font-satoshi font-semibold shadow-md hover:brightness-105 transition-all"
                style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
              >
                 +213 555 123 456
              </a>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Inscription;
