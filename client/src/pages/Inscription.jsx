import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Button from '../components/ui/Button';
import { generateInscriptionPDF } from '../utils/generateInscriptionPDF';

const Inscription = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    programType: 'lycee', // 'cem' | 'lycee' | 'formation' | 'consultation'
    level: '3AS',
    filiere: 'Experimental Sciences',
    formationCategory: 'dev-web',
    subjects: [],
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
    notes: '',
    teacher: '',
    isPackBac: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [registrationRef, setRegistrationRef] = useState('');

  const programOptions = [
    {
      id: 'cem',
      title: t('inscription.programs.cem.title', 'Middle School (CEM)'),
      subtitle: t('inscription.programs.cem.subtitle', 'Comprehensive tutoring from 1CEM to 4CEM'),
      icon: '',
      badge: t('inscription.programs.cem.badge', '1AM to 4AM')
    },
    {
      id: 'lycee',
      title: t('inscription.programs.lycee.title', 'High School (Lycée)'),
      subtitle: t('inscription.programs.lycee.subtitle', 'Targeted preparation and structured revision'),
      icon: '',
      badge: t('inscription.programs.lycee.badge', '1AS to 3AS')
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
      { value: '4AM', label: t('inscription.levels.4am', '4th Year Middle School (4AM)') }
    ],
    lycee: [
      { value: '1AS', label: t('inscription.levels.1as', '1st Year High School (1AS - Common Core)') },
      { value: '2AS', label: t('inscription.levels.2as', '2nd Year High School (2AS)') },
      { value: '3AS', label: t('inscription.levels.3as', '3rd Year High School (3AS)') }
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
    { value: 'Experimental Sciences', key: 'sciences' },
    { value: 'Mathematics', key: 'math' },
    { value: 'Technical Mathematics (Civil / Mechanical / Electrical / Process)', key: 'techMath' },
    { value: 'Management & Economics', key: 'management' },
    { value: 'Literature & Philosophy', key: 'literature' },
    { value: 'Foreign Languages', key: 'languages' }
  ];

  const subjectKeyMap = {
    'Mathematics': 'math',
    'Physics & Chemistry': 'physics',
    'Natural Sciences (Biology)': 'biology',
    'French': 'french',
    'English': 'english',
    'Arabic Language': 'arabic',
    'Natural Sciences (SVT)': 'svt',
    'Philosophy': 'philosophy',
    'Economics & Management': 'economics',
    'Law': 'law',
    'Accounting': 'accounting',
    'Core Curriculum': 'coreCurriculum',
    'Hands-on Projects': 'handsOn',
    '1-on-1 Mentorship': 'mentorship',
    'Final Certificate': 'certificate',
    '1-on-1 Discovery Session': 'discovery',
    'Skills & Interest Assessment': 'skillsAssessment',
    'Personalized Action Plan': 'actionPlan'
  };

  const availableSubjectsByProgram = {
    cem: ['arabicLit', 'english', 'french', 'naturalSciences', 'physics', 'historyGeography', 'tamazight', 'islamicSciences', 'math'],
    lycee: ['arabicLit', 'english', 'french', 'naturalSciences', 'physics', 'accounting', 'economics', 'law', 'philosophy', 'historyGeography', 'spanish', 'tamazight', 'islamicSciences', 'metouns', 'englishAdults', 'englishJoyschool', 'spanishLevels', 'frenchLevels', 'electricalEng', 'processEng'],
    formation: ['coreCurriculum', 'handsOn', 'mentorship', 'certificate'],
    consultation: ['discovery', 'skillsAssessment', 'actionPlan']
  };

  const teachersByProgram = {
    lycee: [
      { name: 'عادل عبد القدير', subject: 'فلسفة', nameEn: 'Adel Abd El Kader', subjectEn: 'Philosophy' },
      { name: 'محمد الطيب قرارة', subject: 'فيزياء', nameEn: 'Mohamed El Tayeb Grara', subjectEn: 'Physics' },
      { name: 'وليد فراج', subject: 'رياضيات', nameEn: 'Walid Faraj', subjectEn: 'Mathematics' },
      { name: 'رقية منصوري', subject: 'علوم طبيعية', nameEn: 'Rokia Mansouri', subjectEn: 'Natural Sciences' },
      { name: 'زقيدة عزالي', subject: 'علوم طبيعية', nameEn: 'Zguida Azali', subjectEn: 'Natural Sciences' },
      { name: 'عادل عبد العزيز', subject: 'لغة عربية', nameEn: 'Adel Abd El Aziz', subjectEn: 'Arabic Language' },
      { name: 'أميرة بسو', subject: 'إنجليزية', nameEn: 'Amira Bassou', subjectEn: 'English' },
      { name: 'أسماء بن يحي', subject: 'فرنسية', nameEn: 'Asma Ben Yahia', subjectEn: 'French' },
      { name: 'عبد العزيز قدير', subject: 'تاريخ وجغرافيا', nameEn: 'Abd El Aziz Kadir', subjectEn: 'History & Geography' },
      { name: 'عماد سليماني', subject: 'رياضيات', nameEn: 'Imad Slimani', subjectEn: 'Mathematics' },
      { name: 'سميرة طالبي', subject: 'محاسبة', nameEn: 'Samira Talbi', subjectEn: 'Accounting' },
    ],
    cem: [
      { name: 'هديل مرسو', subject: 'رياضيات', nameEn: 'Hadil Mersou', subjectEn: 'Mathematics' },
      { name: 'وليد فراج', subject: 'رياضيات', nameEn: 'Walid Faraj', subjectEn: 'Mathematics' },
      { name: 'نور الهدى منوني', subject: 'فيزياء', nameEn: 'Nour El Hoda Manouni', subjectEn: 'Physics' },
      { name: 'حمزة بالي', subject: 'فرنسية', nameEn: 'Hamza Bali', subjectEn: 'French' },
      { name: 'خالد بن جيلالي', subject: 'إنجليزية', nameEn: 'Khaled Ben Jilali', subjectEn: 'English' },
      { name: 'رياض براهمي', subject: 'إنجليزية', nameEn: 'Riad Brahmi', subjectEn: 'English' },
      { name: 'عزالي', subject: 'علوم', nameEn: 'Azali', subjectEn: 'Sciences' },
      { name: 'عادل عبد القدير عبد العزيز', subject: 'لغة عربية', nameEn: 'Adel Abd El Kader Abd El Aziz', subjectEn: 'Arabic Language' },
      { name: 'عالي روقية', subject: '', nameEn: 'Ali Rokia', subjectEn: '' },
      { name: 'بخضرة رزيقي', subject: 'فرنسية', nameEn: 'Bakhda Reziki', subjectEn: 'French' },
    ]
  };

  const handleProgramChange = (progId) => {
    const defaultLevel = levelsByProgram[progId]?.[0]?.value || '';
    setFormData(prev => ({
      ...prev,
      programType: progId,
      level: defaultLevel,
      subjects: [],
      teacher: '',
      isPackBac: false
    }));
  };

  const filteredTeachers = (teachersByProgram[formData.programType] || []).filter(teacher => {
    if (!formData.subjects || formData.subjects.length === 0) return false;
    return formData.subjects.some(sub => {
      const s = sub.toLowerCase();
      const tsEn = (teacher.subjectEn || '').toLowerCase();
      const tsAr = (teacher.subject || '').toLowerCase();

      if (s.includes('math') && (tsEn.includes('math') || tsAr.includes('رياضيات'))) return true;
      if ((s.includes('physics') || s.includes('physique')) && (tsEn.includes('physics') || tsAr.includes('فيزياء'))) return true;
      if ((s.includes('natural') || s.includes('svt') || s.includes('biology')) && (tsEn.includes('natural') || tsEn.includes('science') || tsAr.includes('علوم'))) return true;
      if (s.includes('philosoph') && (tsEn.includes('philosoph') || tsAr.includes('فلسفة'))) return true;
      if (s.includes('french') && (tsEn.includes('french') || tsAr.includes('فرنسية'))) return true;
      if (s.includes('english') && (tsEn.includes('english') || tsAr.includes('إنجليزية'))) return true;
      if (s.includes('arabic') && (tsEn.includes('arabic') || tsAr.includes('عربية'))) return true;
      if (s.includes('account') && (tsEn.includes('account') || tsAr.includes('محاسبة'))) return true;
      if ((s.includes('history') || s.includes('geography')) && (tsEn.includes('history') || tsEn.includes('geography') || tsAr.includes('تاريخ'))) return true;
      if ((s.includes('economics') || s.includes('management') || s.includes('law')) && (tsEn.includes('eco') || tsEn.includes('law') || tsAr.includes('اقتصاد') || tsAr.includes('قانون'))) return true;

      return tsEn && s.includes(tsEn);
    });
  });

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
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'level' ? { isPackBac: false } : {})
    }));
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
    if (formData.subjects.length === 0 && !formData.isPackBac) {
      newErrors.subjects = 'Please select at least one subject or option';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
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
        await fetch('https://rekaz-website.onrender.com/api/inscriptions', {
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
        <title>Online Inscription & Registration | Rēkāz Establishment</title>
        <meta
          name="description"
          content="Register online for Rēkāz Establishment programs in Béchar: Middle School (CEM), High School (Lycée), Professional Training & Certifications, and Consulting."
        />
      </Helmet>

      <main className="pt-[128px] pb-24 bg-[#fbfaff] min-h-screen">
        <Container>
          {/* Header Banner */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionTag text={t('inscription.tag')} icon="" />
            <h1 
              className="text-4xl md:text-5xl lg:text-[54px] font-satoshi font-bold text-rekaz-black mt-5 mb-4 leading-[1.2] tracking-[-0.03em]"
            >{t('inscription.heading')}</h1>
            <p className="text-lg md:text-xl text-rekaz-grey font-dm leading-relaxed">{t('inscription.headerSubtitle')}</p>

            {/* Quick Guarantees Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {t('inscription.guarantee1')}
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rekaz-cyan"></span>
                {t('inscription.guarantee2')}
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rekaz-blue"></span>
                {t('inscription.guarantee3')}
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
                {t('inscription.successBadge')}
              </div>

              <h2 className="text-3xl font-satoshi font-bold text-rekaz-black mb-3">{t('inscription.successTitle', { name: formData.fullName })}</h2>
              <p className="text-rekaz-grey font-dm mb-6 max-w-lg mx-auto">{t('inscription.successMessage')}</p>

              {/* Reference Card */}
              <div className="bg-[#fbfaff] border border-gray-200/80 rounded-2xl p-6 mb-8 text-left">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                  <span className="text-xs font-semibold text-rekaz-muted uppercase tracking-wider">{t('inscription.appReference')}</span>
                  <span className="font-mono font-bold text-rekaz-blue text-base bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                    {registrationRef}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('inscription.programLabel')}</span>
                    <span className="font-semibold text-rekaz-black capitalize">{formData.programType.toUpperCase()} ({formData.level})</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('inscription.phoneLabel')}</span>
                    <span className="font-semibold text-rekaz-black">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('inscription.subjectsLabel')}</span>
                    <span className="font-semibold text-rekaz-black">
                      {formData.subjects.map(sub => t('inscription.subjects.' + sub, sub)).join(', ')}
                      {formData.isPackBac && formData.programType === 'lycee' && formData.level === '3AS' && ' + (Pack-BAC)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('inscription.modeLabel')}</span>
                    <span className="font-semibold text-rekaz-black capitalize">{formData.learningMode}</span>
                  </div>
                  {formData.teacher && (
                    <div>
                      <span className="text-rekaz-muted block text-xs">{t('inscription.teacherSelectedLabel', 'Selected Teacher:')}</span>
                      <span className="font-semibold text-rekaz-black">{formData.teacher}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Next Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/213783121299?text=Hello%20Rekaz%20Establishment,%20I%20have%20completed%20my%20online%20registration%20(Ref:%20${registrationRef})`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-[#25D366] text-white font-satoshi font-semibold text-sm hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.765.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.828c0 5.518-4.482 10-10 10-1.745 0-3.37-.449-4.787-1.233l-5.213 1.365 1.39-5.077c-.896-1.472-1.39-3.197-1.39-5.055 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
                  </svg>
                  {t('inscription.whatsappConfirm')}
                </a>

                <button
                  onClick={() => generateInscriptionPDF({ ...formData, subjects: formData.subjects.map(sub => t('inscription.subjects.' + sub, sub)), referenceNumber: registrationRef })}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] text-white font-satoshi font-semibold text-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  📄 تحميل وصل التسجيل PDF
                </button>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setStatus('idle');
                    setCurrentStep(1);
                    setFormData(prev => ({ ...prev, fullName: '', phone: '', email: '', notes: '' }));
                  }}
                  className="w-full sm:w-auto"
                >
                  {t('inscription.newRegistration')}
                </Button>
              </div>
            </div>
          ) : (
            /* Registration Form Container */
            <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)]">
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-satoshi font-semibold text-rekaz-blue">
                      {t('inscription.stepIndicator', { current: currentStep, total: 3 }).replace('{current}', currentStep).replace('{total}', 3)}
                    </span>
                    <span className="text-xs font-dm text-rekaz-grey">{Math.round((currentStep / 3) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-rekaz-blue h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${(currentStep / 3) * 100}%`, background: 'linear-gradient(90deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    ></div>
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="animate-fadeIn">
                    {/* STEP 1: Choose Program Category */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span 
                      className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                      style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    >
                      1
                    </span>
                    <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">{t('inscription.step1Title')}</h2>
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
                              ? 'border-rekaz-blue shadow-[0_4px_18px_rgba(4,18,250,0.22)]'
                              : 'border-gray-200/80 hover:border-rekaz-cyan/60 bg-white hover:bg-gray-50/50'
                          }`}
                          style={isSelected ? { background: 'linear-gradient(135deg, #00a5ff 0%, #0412fa 100%)' } : {}}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="text-3xl">{prog.icon}</div>
                            <span 
                              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                isSelected 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-gray-100 text-rekaz-muted'
                              }`}
                            >
                              {prog.badge}
                            </span>
                          </div>
                          <h3 className={`font-satoshi font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-rekaz-black'}`}>
                            {prog.title}
                          </h3>
                          <p className={`text-xs font-dm ${isSelected ? 'text-white/80' : 'text-rekaz-grey'}`}>
                            {prog.subtitle}
                          </p>

                          {/* Selected Checkmark Indicator */}
                          {isSelected && (
                            <div 
                              className="absolute top-3 left-3 w-5 h-5 rounded-full bg-white/30 text-white flex items-center justify-center shadow-sm"
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

                </div>
                )}

                {currentStep === 2 && (
                  <div className="animate-fadeIn">
                    {/* STEP 2: Academic Level & Subjects */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span 
                      className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                      style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    >
                      2
                    </span>
                    <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">{t('inscription.step2Title')}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    {/* Level Selector */}
                    <div>
                      <label className={labelClass}>
                        {formData.programType === 'formation' ? t('inscription.fieldLabel') : t('inscription.gradeLabel')}
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
                        <label className={labelClass}>{t('inscription.branchLabel')}</label>
                        <select
                          name="filiere"
                          value={formData.filiere}
                          onChange={handleChange}
                          className={inputClass('filiere')}
                        >
                          {filiereOptions.map((fil, i) => (
                              <option key={i} value={fil.value}>
                                {t(`inscription.branches.${fil.key}`)}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    {/* Learning Mode */}
                    <div>
                      <label className={labelClass}>{t('inscription.learningModeLabel')}</label>
                      <select
                        name="learningMode"
                        value={formData.learningMode}
                        onChange={handleChange}
                        className={inputClass('learningMode')}
                      >
                        <option value="presentiel">{t('inscription.inPerson')}</option>
                          <option value="online">{t('inscription.online')}</option>
                          <option value="hybrid">{t('inscription.hybrid')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Pack BAC Banner Notice (Full Card Design) */}
                  {formData.programType === 'lycee' && formData.level === '3AS' && (
                    <div 
                      onClick={() => setFormData(prev => { const nextPackBac = !prev.isPackBac; return { ...prev, isPackBac: nextPackBac, subjects: nextPackBac ? ['arabicLit', 'philosophy', 'historyGeography'] : prev.subjects }; })}
                      className={`mt-4 mb-8 p-6 md:p-8 rounded-[24px] border-2 cursor-pointer transition-all flex flex-col items-start text-start relative group ${
                        formData.isPackBac
                          ? 'border-rekaz-blue bg-blue-50/20 shadow-[0_8px_30px_rgba(4,18,250,0.12)]'
                          : 'border-gray-200/80 bg-white hover:border-rekaz-blue/50 hover:shadow-md'
                      }`}
                    >
                      {/* Selection Checkmark */}
                      <div className={`absolute top-6 left-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        formData.isPackBac ? 'border-rekaz-blue bg-rekaz-blue text-white' : 'border-gray-300'
                      }`}>
                        {formData.isPackBac && (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-rekaz-blue bg-rekaz-blue/5 px-3 py-1.5 rounded-full mb-4 group-hover:bg-rekaz-blue/10 transition-colors">
                        {t('whyRekaz.specialPacks', 'Special Packs')}
                      </div>
                      
                      <h3 className={`text-[22px] font-satoshi font-bold mb-3 tracking-[-0.02em] transition-colors ${
                        formData.isPackBac ? 'text-rekaz-blue' : 'text-rekaz-black group-hover:text-rekaz-blue'
                      }`}>
                        {t('whyRekaz.packBacTitle', 'Pack-BAC: more learning, better value')}
                      </h3>
                      
                      <p className="text-rekaz-grey mb-6 font-dm leading-relaxed text-[14px] max-w-lg">
                        {t('whyRekaz.packBacDesc', 'Make quality education more accessible with offers such as Pack-BAC: 3 subjects for the price of only 2.')}
                      </p>
                      
                      <div
                        className="w-full rounded-[18px] p-6 flex flex-col gap-2 relative overflow-hidden"
                        style={{ background: 'linear-gradient(160deg, #00a5ff 0%, #0412fa 100%)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none rounded-[18px]" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="text-[11px] text-white/80 font-bold uppercase tracking-wider mb-1">
                              {t('whyRekaz.premiumPackBac', 'Premium Pack-BAC')}
                            </div>
                            <p className="text-[12px] text-white/80 leading-relaxed max-w-sm">
                              {t('whyRekaz.packBacPriceDesc', 'Affordable learning with Pack-BAC: 3 subjects for 4000 DA — the price of only 2 subjects.')}
                            </p>
                          </div>
                          <div className="text-4xl md:text-5xl font-satoshi font-black text-white tracking-tight">
                            {t('whyRekaz.packBacPrice', '4000 DA')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subject Multi-Select Pills */}
                  <div>
                    <label className={labelClass}>
                      {t('inscription.selectSubjects')} <span className="text-red-500">*</span>
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
                            {t(`inscription.subjects.${subject}`, subject)}
                          </button>
                        );
                      })}
                    </div>
                    {errors.subjects && <p className="text-red-500 text-xs mt-2">{errors.subjects}</p>}
                  </div>

                  {/* Teacher Selection — CEM & Lycée only (appears after selecting subject/module) */}
                  {(formData.programType === 'cem' || formData.programType === 'lycee') && filteredTeachers.length > 0 && (
                    <div className="mt-6">
                      <label className={labelClass}>
                        {t('inscription.teacherLabel', 'Select Your Teacher')} <span className="text-rekaz-grey font-normal text-xs">{t('inscription.optional', '(Optional)')}</span>
                      </label>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                        {filteredTeachers.map((teacher) => {
                          const isSelected = formData.teacher === teacher.nameEn;
                          return (
                            <button
                              type="button"
                              key={teacher.nameEn}
                              onClick={() =>
                                setFormData(prev => ({
                                  ...prev,
                                  teacher: isSelected ? '' : teacher.nameEn
                                }))
                              }
                              className={`relative p-3 rounded-[14px] border-2 cursor-pointer transition-all text-left flex items-center gap-3 ${
                                isSelected
                                  ? 'border-rekaz-blue bg-blue-50/40 shadow-[0_2px_12px_rgba(4,18,250,0.10)]'
                                  : 'border-gray-200/80 hover:border-rekaz-cyan/60 bg-white hover:bg-gray-50'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-satoshi font-bold transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-br from-rekaz-cyan to-rekaz-blue text-white'
                                  : 'bg-gray-100 text-rekaz-dark'
                              }`}>
                                {teacher.nameEn.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-satoshi font-bold text-sm text-rekaz-black truncate">{i18n.language === 'ar' ? teacher.name : teacher.nameEn}</p>
                                {teacher.subject && (
                                  <p className={`text-xs font-dm font-medium truncate ${isSelected ? 'text-rekaz-blue' : 'text-rekaz-grey'}`}>
                                    {i18n.language === 'ar' ? teacher.subject : teacher.subjectEn}
                                  </p>
                                )}
                              </div>
                              {isSelected && (
                                <div
                                  className="absolute top-2 right-2 w-4 h-4 rounded-full text-white flex items-center justify-center"
                                  style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                                >
                                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                </div>
                )}

                {currentStep === 3 && (
                  <div className="animate-fadeIn">
                    {/* STEP 3: Student Details */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span 
                      className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                      style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                    >
                      3
                    </span>
                    <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">{t('inscription.step3Title')}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>{t('inscription.fullName')} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t('inscription.placeholders.fullName')}
                        className={inputClass('fullName')}
                        required
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>{t('inscription.phoneWhatsapp')} <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('inscription.placeholders.phone')}
                        className={inputClass('phone')}
                        required
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>{t('inscription.emailOptional')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('inscription.placeholders.email')}
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className={labelClass}>{t('inscription.cityWilaya')}</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder={t('inscription.placeholders.city')}
                        className={inputClass('city')}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>{t('inscription.currentSchool')}</label>
                      <input
                        type="text"
                        name="currentSchool"
                        value={formData.currentSchool}
                        onChange={handleChange}
                        placeholder={t('inscription.placeholders.school')}
                        className={inputClass('currentSchool')}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>{t('inscription.sessionTiming')}</label>
                      <select
                        name="schedulePreference"
                        value={formData.schedulePreference}
                        onChange={handleChange}
                        className={inputClass('schedulePreference')}
                      >
                        <option value="weekend">{t('inscription.weekend')}</option>
                        <option value="evening">{t('inscription.evening')}</option>
                        <option value="flexible">{t('inscription.flexible')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Parent Section (for CEM & Lycee students) */}
                  {(formData.programType === 'cem' || formData.programType === 'lycee') && (
                    <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                      <h4 className="font-satoshi font-bold text-sm text-rekaz-black mb-4 flex items-center gap-2">
                        <span>‍‍</span>{t('inscription.parentSectionTitle', 'Parent / Guardian Contact (For Middle & High School Students)')}
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-rekaz-dark mb-1">{t('inscription.parentName')}</label>
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            placeholder={t('inscription.placeholders.parentName')}
                            className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-rekaz-dark mb-1">{t('inscription.parentPhone')}</label>
                          <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            placeholder={t('inscription.placeholders.parentPhone')}
                            className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-rekaz-dark mb-1">{t('inscription.relationship')}</label>
                          <select
                            name="parentRelation"
                            value={formData.parentRelation}
                            onChange={handleChange}
                            className="w-full h-11 px-3 bg-white border border-gray-200 rounded-xl text-sm"
                          >
                            <option value="Father">{t('inscription.father')}</option>
                            <option value="Mother">{t('inscription.mother')}</option>
                            <option value="Guardian">{t('inscription.guardian')}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes / Special Requests */}
                  <div className="mt-6">
                    <label className={labelClass}>{t('inscription.notesLabel')}</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={t('inscription.notesPlaceholder')}
                      className="w-full h-24 p-4 bg-rekaz-card border border-[rgba(136,136,136,0.15)] rounded-2xl font-satoshi text-sm text-rekaz-dark placeholder:text-rekaz-grey focus:outline-none focus:border-rekaz-cyan transition-all resize-y"
                    />
                  </div>
                </div>

                </div>
                )}

                {/* Navigation and Submit Section */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-left text-xs text-rekaz-grey max-w-sm hidden sm:block">
                     {t('inscription.privacyNote')}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-full sm:w-auto px-6 h-[58px] text-rekaz-dark bg-gray-100 hover:bg-gray-200 rounded-[16px] font-satoshi font-semibold text-base transition-all cursor-pointer"
                      >
                        {t('inscription.prev', 'Previous Step')}
                      </button>
                    )}
                    
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full sm:w-auto min-w-[200px] h-[58px] px-8 text-white rounded-[16px] font-satoshi font-semibold text-base shadow-md hover:brightness-105 hover:-translate-y-0.5 transition-all cursor-pointer"
                        style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                      >
                        {t('inscription.next', 'Next Step')}
                      </button>
                    ) : (
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
                            {t('inscription.submitting', 'Submitting Application...')}
                          </span>
                        ) : (
                          t('inscription.confirmReg')
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Contact Helpline Box */}
          <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-rekaz-black to-[#1a1c38] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-rekaz-cyan font-satoshi font-bold text-xs uppercase tracking-wider mb-2">
                {t('inscription.helpTag')}
              </div>
              <h3 className="text-2xl font-satoshi font-bold text-white mb-1">{t('inscription.helpTitle')}</h3>
              <p className="text-white/70 text-sm font-dm">{t('inscription.helpDesc')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-satoshi font-semibold transition-colors"
              >{t('inscription.contactUs')}</Link>
              <a
                href="tel:+213783121299"
                dir="ltr"
                className="px-6 py-3 text-white rounded-xl text-sm font-satoshi font-semibold shadow-md hover:brightness-105 transition-all"
                style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
              >
                 +213 783 12 12 99
              </a>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Inscription;

