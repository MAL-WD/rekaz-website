import logoUrl from '../assets/logo.png';

const getLogoBase64 = async () => {
  try {
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
};

const educationLevelLabels = {
  licence: 'ليسانس',
  master: 'ماستر',
  doctorat: 'دكتوراه',
  other: 'أخرى'
};

const modeLabels = {
  presentiel: 'حضوري',
  online: 'عن بعد',
  hybrid: 'هجين (حضوري + عن بعد)'
};

const availabilityLabels = {
  weekend: 'نهاية الأسبوع',
  evening: 'مسائي',
  flexible: 'مرن',
  fulltime: 'دوام كامل'
};

const expLabels = {
  '0-1': 'أقل من سنة',
  '1-3': '1 - 3 سنوات',
  '3-5': '3 - 5 سنوات',
  '5-10': '5 - 10 سنوات',
  '10+': 'أكثر من 10 سنوات'
};

export const generateTeacherApplicationPDF = async (data) => {
  const logoBase64 = await getLogoBase64();
  const {
    referenceNumber,
    fullName,
    phone,
    email,
    birthDate,
    city,
    wilaya,
    subjectSpecialty,
    educationLevel,
    educationField,
    yearsExperience,
    targetLevels,
    teachingMode,
    availability,
    currentInstitution,
    motivation
  } = data;

  const date = new Date().toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Algiers'
  });

  const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>وصل طلب التوظيف - ${referenceNumber}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700;800;900&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      font-family: 'Noto Kufi Arabic', 'Segoe UI', Tahoma, sans-serif;
      background: #fff;
      color: #1a1a2e;
      direction: rtl;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 20mm 18mm;
      position: relative;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 3px solid #0412FA;
      margin-bottom: 24px;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    
    .logo {
      width: 60px;
      height: auto;
    }
    
    .header-text h1 {
      font-size: 22px;
      font-weight: 900;
      color: #0412FA;
      line-height: 1.3;
    }
    
    .header-text p {
      font-size: 11px;
      color: #666;
      margin-top: 2px;
    }
    
    .header-left {
      text-align: left;
      font-size: 10px;
      color: #888;
      line-height: 1.8;
    }
    
    /* Title Banner */
    .title-banner {
      background: linear-gradient(135deg, #0412FA 0%, #00A5FF 100%);
      color: white;
      text-align: center;
      padding: 14px 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .title-banner h2 {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1px;
    }
    
    .title-banner p {
      font-size: 11px;
      opacity: 0.85;
      margin-top: 4px;
    }
    
    /* Reference Strip */
    .ref-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f0f4ff;
      border: 1px solid #d0d8f0;
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 20px;
      font-size: 13px;
    }
    
    .ref-strip .ref-number {
      font-weight: 800;
      color: #0412FA;
      font-size: 15px;
      letter-spacing: 1.5px;
      direction: ltr;
    }
    
    .ref-strip .ref-date {
      color: #555;
      font-size: 12px;
    }
    
    /* Section */
    .section {
      margin-bottom: 18px;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #0412FA;
      padding: 7px 14px;
      background: #f0f4ff;
      border-right: 4px solid #0412FA;
      border-radius: 0 6px 6px 0;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }
    
    .info-row {
      display: flex;
      align-items: baseline;
      padding: 8px 14px;
      border-bottom: 1px solid #eee;
      font-size: 12.5px;
    }
    
    .info-row:nth-child(odd) {
      background: #fafbff;
    }
    
    .info-row .label {
      font-weight: 700;
      color: #333;
      min-width: 110px;
      flex-shrink: 0;
    }
    
    .info-row .value {
      color: #1a1a2e;
      font-weight: 400;
    }
    
    .info-row.full {
      grid-column: 1 / -1;
    }
    
    /* Tags List */
    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 14px;
    }
    
    .tag-item {
      background: #e8eeff;
      color: #0412FA;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid #c8d4f8;
    }
    
    /* Notes */
    .notes-box {
      background: #fafbff;
      border: 1px dashed #ccc;
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 12px;
      color: #444;
      line-height: 1.8;
      margin: 8px 14px;
    }
    
    /* Footer */
    .footer {
      position: absolute;
      bottom: 18mm;
      left: 18mm;
      right: 18mm;
      text-align: center;
      padding-top: 14px;
      border-top: 2px solid #eee;
    }
    
    .footer p {
      font-size: 10px;
      color: #999;
      line-height: 1.8;
    }
    
    .footer .important {
      font-size: 11px;
      color: #0412FA;
      font-weight: 700;
      margin-bottom: 6px;
    }
    
    /* Stamp area */
    .stamp-area {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
      padding: 0 14px;
    }
    
    .stamp-box {
      text-align: center;
      width: 180px;
    }
    
    .stamp-box p {
      font-size: 11px;
      font-weight: 700;
      color: #555;
      margin-bottom: 50px;
    }
    
    .stamp-box .line {
      border-top: 1px solid #aaa;
      width: 100%;
    }
    
    @media print {
      body { background: white; }
      .page { margin: 0; padding: 15mm 18mm; }
      .no-print { display: none !important; }
    }
    
    .print-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 9999;
      padding: 12px 28px;
      background: linear-gradient(135deg, #0412FA, #00A5FF);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Noto Kufi Arabic', sans-serif;
      box-shadow: 0 4px 15px rgba(4,18,250,0.3);
    }
    
    .print-btn:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">📥 تحميل / طباعة الوصل</button>

  <div class="page">
    <!-- Header -->
    <div class="header">
      <div class="header-right">
        <img src="${logoBase64}" alt="Rēkāz Logo" class="logo">
        <div class="header-text">
          <h1>مؤسسة ركاز للتعليم والتكوين والاستشارة</h1>
          <p>متعة الدراسة والتكوين كما لم ترها من قبل</p>
        </div>
      </div>
      <div class="header-left">
        بشار، الجزائر<br>
        rekaz.school<br>
        schoolrekaz@gmail.com
      </div>
    </div>

    <!-- Title -->
    <div class="title-banner">
      <h2>وصل طلب توظيف أستاذ</h2>
      <p>Teacher Employment Application Receipt</p>
    </div>

    <!-- Reference -->
    <div class="ref-strip">
      <div>
        <span style="font-weight:600;">رقم الملف: </span>
        <span class="ref-number">${referenceNumber}</span>
      </div>
      <div class="ref-date">📅 تاريخ الطلب: ${date}</div>
    </div>

    <!-- Personal Info -->
    <div class="section">
      <div class="section-title">👤 المعلومات الشخصية</div>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">الاسم الكامل:</span>
          <span class="value">${fullName}</span>
        </div>
        <div class="info-row">
          <span class="label">رقم الهاتف:</span>
          <span class="value" style="direction:ltr;text-align:right;">${phone}</span>
        </div>
        <div class="info-row">
          <span class="label">البريد الإلكتروني:</span>
          <span class="value" style="direction:ltr;text-align:right;">${email || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">تاريخ الميلاد:</span>
          <span class="value">${birthDate || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">المدينة / الولاية:</span>
          <span class="value">${city || 'بشار'} (${wilaya || 'بشار'})</span>
        </div>
        <div class="info-row">
          <span class="label">المؤسسة الحالية:</span>
          <span class="value">${currentInstitution || '—'}</span>
        </div>
      </div>
    </div>

    <!-- Professional Info -->
    <div class="section">
      <div class="section-title">🎓 المعلومات المهنية</div>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">التخصص / المادة:</span>
          <span class="value">${subjectSpecialty || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">المستوى الدراسي:</span>
          <span class="value">${educationLevelLabels[educationLevel] || educationLevel || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">مجال الدراسة:</span>
          <span class="value">${educationField || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">سنوات الخبرة:</span>
          <span class="value">${expLabels[yearsExperience] || yearsExperience || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">طريقة التدريس:</span>
          <span class="value">${modeLabels[teachingMode] || teachingMode || '—'}</span>
        </div>
        <div class="info-row">
          <span class="label">التوفر:</span>
          <span class="value">${availabilityLabels[availability] || availability || '—'}</span>
        </div>
      </div>
      
      ${(targetLevels && targetLevels.length > 0) ? `
      <div style="padding: 4px 14px; font-size: 12px; font-weight: 700; color: #333; margin-top: 8px;">المستويات المستهدفة للتدريس:</div>
      <div class="tags-list">
        ${targetLevels.map(l => `<span class="tag-item">${l}</span>`).join('')}
      </div>` : ''}
    </div>

    <!-- Motivation -->
    ${motivation ? `
    <div class="section">
      <div class="section-title">📝 الدافع والرسالة التعريفية</div>
      <div class="notes-box">${motivation}</div>
    </div>` : ''}

    <!-- Signature Area -->
    <div class="stamp-area">
      <div class="stamp-box">
        <p>توقيع المتقدم</p>
        <div class="line"></div>
      </div>
      <div class="stamp-box">
        <p>ختم المؤسسة</p>
        <div class="line"></div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="important">يُعدّ هذا الوصل دليل تقديم أوّلي — سيتمّ التواصل معك من قبل إدارة ركاز في أقرب وقت ممكن.</p>
      <p>مؤسسة ركاز للتعليم والتكوين والاستشارة — بشار، الجزائر | schoolrekaz@gmail.com</p>
    </div>
  </div>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  }
};
