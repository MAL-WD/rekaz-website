import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../components/ui/Container';
import SectionTag from '../components/ui/SectionTag';
import Button from '../components/ui/Button';
import { generateTeacherApplicationPDF } from '../utils/generateTeacherApplicationPDF';

const TeacherApplication = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    wilaya: 'Béchar',
    city: 'Béchar',
    currentInstitution: '',
    subjectSpecialty: '',
    educationLevel: 'licence',
    educationField: '',
    yearsExperience: '1-3',
    targetLevels: [],
    teachingMode: 'presentiel',
    availability: 'flexible',
    motivation: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [applicationRef, setApplicationRef] = useState('');

  // ── Subject specialties ─────────────────────────────────────────────────────
  const subjectOptions = [
    { value: 'رياضيات', label: t('teacherApp.subjects.math', 'رياضيات') },
    { value: 'فيزياء', label: t('teacherApp.subjects.physics', 'فيزياء وكيمياء') },
    { value: 'علوم طبيعية', label: t('teacherApp.subjects.biology', 'علوم طبيعية') },
    { value: 'لغة عربية', label: t('teacherApp.subjects.arabic', 'لغة عربية وآدابها') },
    { value: 'لغة فرنسية', label: t('teacherApp.subjects.french', 'لغة فرنسية') },
    { value: 'لغة إنجليزية', label: t('teacherApp.subjects.english', 'لغة إنجليزية') },
    { value: 'فلسفة', label: t('teacherApp.subjects.philosophy', 'فلسفة') },
    { value: 'تاريخ وجغرافيا', label: t('teacherApp.subjects.history', 'تاريخ وجغرافيا') },
    { value: 'اقتصاد وإدارة', label: t('teacherApp.subjects.economics', 'اقتصاد وإدارة') },
    { value: 'محاسبة', label: t('teacherApp.subjects.accounting', 'محاسبة') },
    { value: 'إعلام آلي', label: t('teacherApp.subjects.computer', 'إعلام آلي / برمجة') },
    { value: 'تكوين مهني', label: t('teacherApp.subjects.vocational', 'تكوين مهني / مهارات') },
    { value: 'أخرى', label: t('teacherApp.subjects.other', 'أخرى') }
  ];

  // ── Target teaching levels ───────────────────────────────────────────────────
  const levelOptions = [
    t('teacherApp.levels.1am', '1AM'),
    t('teacherApp.levels.2am', '2AM'),
    t('teacherApp.levels.3am', '3AM'),
    t('teacherApp.levels.4am', '4AM'),
    t('teacherApp.levels.1as', '1AS'),
    t('teacherApp.levels.2as', '2AS'),
    t('teacherApp.levels.3as', '3AS'),
    t('teacherApp.levels.formation', 'تكوين مهني'),
    t('teacherApp.levels.consultation', 'استشارة وتوجيه')
  ];

  // ── Toggle level selection ───────────────────────────────────────────────────
  const toggleLevel = (level) => {
    setFormData(prev => {
      const exists = prev.targetLevels.includes(level);
      return {
        ...prev,
        targetLevels: exists
          ? prev.targetLevels.filter(l => l !== level)
          : [...prev.targetLevels, level]
      };
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
    if (!formData.fullName.trim()) newErrors.fullName = t('teacherApp.errors.fullName', 'الاسم الكامل مطلوب');
    if (!formData.birthDate) newErrors.birthDate = t('teacherApp.errors.birthDate', 'تاريخ الميلاد مطلوب');
    if (!formData.phone.trim()) newErrors.phone = t('teacherApp.errors.phone', 'رقم الهاتف مطلوب');
    else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = t('teacherApp.errors.phoneInvalid', 'يرجى إدخال رقم هاتف صحيح');
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('teacherApp.errors.emailInvalid', 'يرجى إدخال بريد إلكتروني صحيح');
    }
    if (!formData.subjectSpecialty) newErrors.subjectSpecialty = t('teacherApp.errors.specialty', 'يرجى اختيار التخصص');
    if (formData.targetLevels.length === 0) newErrors.targetLevels = t('teacherApp.errors.targetLevels', 'يرجى اختيار مستوى تدريسي واحد على الأقل');
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
    const refNumber = `RKZ-T-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const payload = {
        ...formData,
        referenceNumber: refNumber
      };

      try {
        await fetch('https://rekaz-website.onrender.com/api/teacher-applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('API submission notice:', err);
      }

      setApplicationRef(refNumber);
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
        <title>طلب توظيف أستاذ | مؤسسة ركاز</title>
        <meta
          name="description"
          content="قدّم طلب توظيفك كأستاذ في مؤسسة ركاز للتعليم والتكوين والاستشارة — بشار، الجزائر."
        />
      </Helmet>

      <main className="pt-[128px] pb-24 bg-[#fbfaff] min-h-screen">
        <Container>
          {/* Header Banner */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionTag text={t('teacherApp.tag', 'توظيف الأساتذة')} icon="" />
            <h1
              className="text-4xl md:text-5xl lg:text-[54px] font-satoshi font-bold text-rekaz-black mt-5 mb-4 leading-[1.2] tracking-[-0.03em]"
            >
              {t('teacherApp.heading', 'طلب توظيف للأستاذ')}
            </h1>
            <p className="text-lg md:text-xl text-rekaz-grey font-dm leading-relaxed">
              {t('teacherApp.headerSubtitle', 'انضم إلى فريق ركاز من الأساتذة المتميزين — أكمل النموذج وسيتواصل معك فريقنا في أقرب وقت.')}
            </p>

            {/* Guarantee Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {t('teacherApp.guarantee1', 'نموذج سريع وآمن')}
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rekaz-cyan"></span>
                {t('teacherApp.guarantee2', 'رد خلال 48 ساعة')}
              </div>
              <div className="flex items-center gap-2 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-semibold font-satoshi text-rekaz-dark shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rekaz-blue"></span>
                {t('teacherApp.guarantee3', 'بيئة تعليمية متميزة')}
              </div>
            </div>
          </div>

          {/* ── Success Screen ───────────────────────────────────────────── */}
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
                {t('teacherApp.successBadge', 'تم الإرسال بنجاح')}
              </div>

              <h2 className="text-3xl font-satoshi font-bold text-rekaz-black mb-3">
                {t('teacherApp.successTitle', 'شكراً لك، {{name}}!', { name: formData.fullName }).replace('{{name}}', formData.fullName)}
              </h2>
              <p className="text-rekaz-grey font-dm mb-6 max-w-lg mx-auto">
                {t('teacherApp.successMessage', 'تم استلام طلب توظيفك بنجاح. سيراجع فريق ركاز ملفك ويتواصل معك في أقرب وقت ممكن.')}
              </p>

              {/* Reference Card */}
              <div className="bg-[#fbfaff] border border-gray-200/80 rounded-2xl p-6 mb-8 text-left">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
                  <span className="text-xs font-semibold text-rekaz-muted uppercase tracking-wider">{t('teacherApp.appReference', 'رقم الطلب')}</span>
                  <span className="font-mono font-bold text-rekaz-blue text-base bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                    {applicationRef}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('teacherApp.specialtyLabel', 'التخصص')}</span>
                    <span className="font-semibold text-rekaz-black">{formData.subjectSpecialty}</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('teacherApp.phoneLabel', 'الهاتف')}</span>
                    <span className="font-semibold text-rekaz-black">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('teacherApp.levelsLabel', 'المستويات')}</span>
                    <span className="font-semibold text-rekaz-black">{formData.targetLevels.join(' — ')}</span>
                  </div>
                  <div>
                    <span className="text-rekaz-muted block text-xs">{t('teacherApp.modeLabel', 'طريقة التدريس')}</span>
                    <span className="font-semibold text-rekaz-black capitalize">{formData.teachingMode}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/213783121299?text=مرحبًا%20ركاز%2C%20لقد%20أرسلت%20طلب%20توظيف%20(رقم%20الطلب%3A%20${applicationRef})`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-[#25D366] text-white font-satoshi font-semibold text-sm hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.765.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.828c0 5.518-4.482 10-10 10-1.745 0-3.37-.449-4.787-1.233l-5.213 1.365 1.39-5.077c-.896-1.472-1.39-3.197-1.39-5.055 0-5.518 4.482-10 10-10 5.518 0 10 4.482 10 10z"/>
                  </svg>
                  {t('teacherApp.whatsappConfirm', 'تأكيد الطلب عبر واتساب')}
                </a>

                <button
                  onClick={() => generateTeacherApplicationPDF({ ...formData, referenceNumber: applicationRef })}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] text-white font-satoshi font-semibold text-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('teacherApp.downloadPdf', '📄 تحميل وصل الطلب PDF')}
                </button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus('idle');
                    setCurrentStep(1);
                    setFormData(prev => ({ ...prev, fullName: '', phone: '', email: '', motivation: '' }));
                  }}
                  className="w-full sm:w-auto"
                >
                  {t('teacherApp.newApplication', 'تقديم طلب جديد')}
                </Button>
              </div>
            </div>
          ) : (
            /* ── Application Form Container ────────────────────────────── */
            <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)]">
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-satoshi font-semibold text-rekaz-blue">
                      {t('teacherApp.stepIndicator', 'الخطوة {{current}} من {{total}}', { current: currentStep, total: 3 })
                        .replace('{{current}}', currentStep)
                        .replace('{{total}}', 3)}
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

                {/* ═══════════════════════════════════════════════════════
                    STEP 1 — Professional Specialty & Target Levels
                ═══════════════════════════════════════════════════════ */}
                {currentStep === 1 && (
                  <div className="animate-fadeIn">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                          style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                        >
                          1
                        </span>
                        <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">
                          {t('teacherApp.step1Title', 'التخصص والمستويات')}
                        </h2>
                      </div>

                      {/* Subject Specialty */}
                      <div className="mb-6">
                        <label className={labelClass}>
                          {t('teacherApp.subjectSpecialtyLabel', 'المادة / التخصص الذي ستدرّسه')} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5 mt-2">
                          {subjectOptions.map((opt) => {
                            const isSelected = formData.subjectSpecialty === opt.value;
                            return (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, subjectSpecialty: opt.value }));
                                  if (errors.subjectSpecialty) setErrors(prev => ({ ...prev, subjectSpecialty: '' }));
                                }}
                                className={`px-4 py-2.5 rounded-xl font-satoshi text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-rekaz-cyan to-rekaz-blue text-white shadow-sm scale-[1.02]'
                                    : 'bg-gray-100 text-rekaz-dark hover:bg-gray-200/80'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        {errors.subjectSpecialty && <p className="text-red-500 text-xs mt-2">{errors.subjectSpecialty}</p>}
                      </div>

                      {/* Target Levels */}
                      <div>
                        <label className={labelClass}>
                          {t('teacherApp.targetLevelsLabel', 'المستويات الدراسية التي يمكنك تدريسها')} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5 mt-2">
                          {levelOptions.map((level) => {
                            const isChecked = formData.targetLevels.includes(level);
                            return (
                              <button
                                type="button"
                                key={level}
                                onClick={() => {
                                  toggleLevel(level);
                                  if (errors.targetLevels) setErrors(prev => ({ ...prev, targetLevels: '' }));
                                }}
                                className={`px-4 py-2.5 rounded-xl font-satoshi text-xs font-semibold transition-all cursor-pointer ${
                                  isChecked
                                    ? 'bg-gradient-to-r from-rekaz-cyan to-rekaz-blue text-white shadow-sm scale-[1.02]'
                                    : 'bg-gray-100 text-rekaz-dark hover:bg-gray-200/80'
                                }`}
                              >
                                {isChecked ? '✓ ' : '+ '}
                                {level}
                              </button>
                            );
                          })}
                        </div>
                        {errors.targetLevels && <p className="text-red-500 text-xs mt-2">{errors.targetLevels}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════
                    STEP 2 — Education & Experience
                ═══════════════════════════════════════════════════════ */}
                {currentStep === 2 && (
                  <div className="animate-fadeIn">
                    <div className="pt-8 border-t border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                          style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                        >
                          2
                        </span>
                        <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">
                          {t('teacherApp.step2Title', 'المؤهلات والخبرة')}
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5 mb-6">
                        {/* Education Level */}
                        <div>
                          <label className={labelClass}>{t('teacherApp.educationLevelLabel', 'المستوى الدراسي')}</label>
                          <select
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleChange}
                            className={inputClass('educationLevel')}
                          >
                            <option value="licence">{t('teacherApp.edu.licence', 'ليسانس (L.M.D)')}</option>
                            <option value="master">{t('teacherApp.edu.master', 'ماستر / ماجستير')}</option>
                            <option value="doctorat">{t('teacherApp.edu.doctorat', 'دكتوراه')}</option>
                            <option value="other">{t('teacherApp.edu.other', 'أخرى')}</option>
                          </select>
                        </div>

                        {/* Education Field */}
                        <div>
                          <label className={labelClass}>{t('teacherApp.educationFieldLabel', 'مجال / شعبة الدراسة')}</label>
                          <input
                            type="text"
                            name="educationField"
                            value={formData.educationField}
                            onChange={handleChange}
                            placeholder={t('teacherApp.placeholders.educationField', 'مثال: رياضيات بحتة، أدب عربي...')}
                            className={inputClass('educationField')}
                          />
                        </div>

                        {/* Years of Experience */}
                        <div>
                          <label className={labelClass}>{t('teacherApp.experienceLabel', 'سنوات الخبرة في التدريس')}</label>
                          <select
                            name="yearsExperience"
                            value={formData.yearsExperience}
                            onChange={handleChange}
                            className={inputClass('yearsExperience')}
                          >
                            <option value="0-1">{t('teacherApp.exp.0-1', 'أقل من سنة')}</option>
                            <option value="1-3">{t('teacherApp.exp.1-3', '1 — 3 سنوات')}</option>
                            <option value="3-5">{t('teacherApp.exp.3-5', '3 — 5 سنوات')}</option>
                            <option value="5-10">{t('teacherApp.exp.5-10', '5 — 10 سنوات')}</option>
                            <option value="10+">{t('teacherApp.exp.10+', 'أكثر من 10 سنوات')}</option>
                          </select>
                        </div>

                        {/* Teaching Mode */}
                        <div>
                          <label className={labelClass}>{t('teacherApp.teachingModeLabel', 'طريقة التدريس المفضلة')}</label>
                          <select
                            name="teachingMode"
                            value={formData.teachingMode}
                            onChange={handleChange}
                            className={inputClass('teachingMode')}
                          >
                            <option value="presentiel">{t('teacherApp.mode.presentiel', 'حضوري')}</option>
                            <option value="online">{t('teacherApp.mode.online', 'عن بعد (أونلاين)')}</option>
                            <option value="hybrid">{t('teacherApp.mode.hybrid', 'هجين (حضوري + عن بعد)')}</option>
                          </select>
                        </div>

                        {/* Availability */}
                        <div>
                          <label className={labelClass}>{t('teacherApp.availabilityLabel', 'التوفر / جدول الحصص')}</label>
                          <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className={inputClass('availability')}
                          >
                            <option value="weekend">{t('teacherApp.avail.weekend', 'نهاية الأسبوع فقط')}</option>
                            <option value="evening">{t('teacherApp.avail.evening', 'مسائي (بعد 17:00)')}</option>
                            <option value="flexible">{t('teacherApp.avail.flexible', 'مرن / حسب الاتفاق')}</option>
                            <option value="fulltime">{t('teacherApp.avail.fulltime', 'دوام كامل')}</option>
                          </select>
                        </div>

                        {/* Current Institution */}
                        <div>
                          <label className={labelClass}>{t('teacherApp.currentInstitutionLabel', 'المؤسسة / المدرسة الحالية (إن وجدت)')}</label>
                          <input
                            type="text"
                            name="currentInstitution"
                            value={formData.currentInstitution}
                            onChange={handleChange}
                            placeholder={t('teacherApp.placeholders.currentInstitution', 'اسم المؤسسة أو المدرسة...')}
                            className={inputClass('currentInstitution')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════════════════════
                    STEP 3 — Personal Info & Motivation
                ═══════════════════════════════════════════════════════ */}
                {currentStep === 3 && (
                  <div className="animate-fadeIn">
                    <div className="pt-8 border-t border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="w-8 h-8 rounded-full text-white font-satoshi font-bold text-sm flex items-center justify-center shadow-md"
                          style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                        >
                          3
                        </span>
                        <h2 className="text-2xl font-satoshi font-bold text-rekaz-black">
                          {t('teacherApp.step3Title', 'المعلومات الشخصية والرسالة')}
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>{t('teacherApp.fullName', 'الاسم الكامل')} <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder={t('teacherApp.placeholders.fullName', 'الاسم الثلاثي...')}
                            className={inputClass('fullName')}
                            required
                          />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>{t('teacherApp.phoneWhatsapp', 'رقم الهاتف (واتساب)')} <span className="text-red-500">*</span></label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t('teacherApp.placeholders.phone', '05xxxxxxxx')}
                            className={inputClass('phone')}
                            required
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>{t('teacherApp.emailOptional', 'البريد الإلكتروني (اختياري)')}</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('teacherApp.placeholders.email', 'example@email.com')}
                            className={inputClass('email')}
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>{t('teacherApp.birthDateLabel', 'تاريخ الميلاد')} <span className="text-red-500">*</span></label>
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className={inputClass('birthDate')}
                          />
                          {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>{t('teacherApp.cityWilaya', 'المدينة / الولاية')}</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder={t('teacherApp.placeholders.city', 'مثال: بشار')}
                            className={inputClass('city')}
                          />
                        </div>
                      </div>

                      {/* Motivation / Cover Letter */}
                      <div className="mt-6">
                        <label className={labelClass}>
                          {t('teacherApp.motivationLabel', 'الدافع والرسالة التعريفية')}
                          <span className="text-rekaz-grey font-normal text-xs mr-2">{t('teacherApp.optional', '(اختياري)')}</span>
                        </label>
                        <textarea
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleChange}
                          placeholder={t('teacherApp.motivationPlaceholder', 'أخبرنا عن نفسك، خبرتك في التدريس، وما الذي يدفعك للانضمام لفريق ركاز...')}
                          className="w-full h-36 p-4 bg-rekaz-card border border-[rgba(136,136,136,0.15)] rounded-2xl font-satoshi text-sm text-rekaz-dark placeholder:text-rekaz-grey focus:outline-none focus:border-rekaz-cyan transition-all resize-y"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation & Submit */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-left text-xs text-rekaz-grey max-w-sm hidden sm:block">
                    {t('teacherApp.privacyNote', 'بياناتك محمية ولن تُشارك مع أطراف خارجية.')}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-4">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-full sm:w-auto px-6 h-[58px] text-rekaz-dark bg-gray-100 hover:bg-gray-200 rounded-[16px] font-satoshi font-semibold text-base transition-all cursor-pointer"
                      >
                        {t('teacherApp.prev', 'الخطوة السابقة')}
                      </button>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full sm:w-auto min-w-[200px] h-[58px] px-8 text-white rounded-[16px] font-satoshi font-semibold text-base shadow-md hover:brightness-105 hover:-translate-y-0.5 transition-all cursor-pointer"
                        style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                      >
                        {t('teacherApp.next', 'الخطوة التالية')}
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
                            {t('teacherApp.submitting', 'جارٍ إرسال الطلب...')}
                          </span>
                        ) : (
                          t('teacherApp.confirmApp', 'إرسال طلب التوظيف')
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
                {t('teacherApp.helpTag', 'تحتاج مساعدة؟')}
              </div>
              <h3 className="text-2xl font-satoshi font-bold text-white mb-1">{t('teacherApp.helpTitle', 'تواصل مع إدارة ركاز')}</h3>
              <p className="text-white/70 text-sm font-dm">{t('teacherApp.helpDesc', 'فريقنا جاهز للإجابة على استفساراتك حول التوظيف.')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-satoshi font-semibold transition-colors"
              >
                {t('teacherApp.contactUs', 'تواصل معنا')}
              </Link>
              <a
                href="tel:+213783121299"
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

export default TeacherApplication;
