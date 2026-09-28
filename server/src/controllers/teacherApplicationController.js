const TeacherApplication = require('../models/TeacherApplication');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { getEmailHTML } = require('../config/emailTemplate');

// Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Escape special HTML characters so Telegram's HTML parse mode doesn't reject the message
const escapeHTML = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

const sendTelegramNotification = async (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
  } catch (err) {
    const detail = err.response?.data || err.message;
    console.error('Telegram notification error:', JSON.stringify(detail));
  }
};

const sendEmailNotification = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFICATION_EMAIL) return;

  const emailHTML = getEmailHTML({
    tag: 'طلب توظيف أستاذ',
    title: 'طلب توظيف أستاذ جديد — Rēkāz',
    fields: [
      { label: 'N° Dossier', value: data.referenceNumber },
      { label: 'Nom & Prénom', value: data.fullName },
      { label: 'Téléphone', value: data.phone },
      { label: 'Email', value: data.email },
      { label: 'Spécialité', value: data.subjectSpecialty },
      { label: 'Niveau d\'éducation', value: data.educationLevel },
      { label: 'Domaine d\'études', value: data.educationField },
      { label: 'Années d\'expérience', value: data.yearsExperience },
      { label: 'Niveaux ciblés', value: (data.targetLevels || []).join(', ') },
      { label: 'Mode d\'enseignement', value: data.teachingMode },
      { label: 'Disponibilité', value: data.availability },
      { label: 'Institution actuelle', value: data.currentInstitution },
      { label: 'Ville', value: `${data.city} (${data.wilaya})` }
    ],
    message: data.motivation
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `👩‍🏫 [طلب توظيف أستاذ] ${data.fullName} — ${data.subjectSpecialty}`,
    html: emailHTML
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Email notification error:', err.message);
  }
};

const educationLevelLabels = {
  licence: 'ليسانس',
  master: 'ماستر',
  doctorat: 'دكتوراه',
  other: 'أخرى'
};

const modeLabels = { presentiel: 'حضوري', online: 'عن بعد', hybrid: 'هجين' };
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

exports.createTeacherApplication = async (req, res, next) => {
  try {
    const application = await TeacherApplication.create(req.body);

    const telegramMsg = `
👩‍🏫 <b>طلب توظيف أستاذ جديد — ركاز</b>
━━━━━━━━━━━━━━━━━━
🆔 <b>رقم التتبع:</b> <code>${application._id}</code>
📁 <b>رقم الملف:</b> ${escapeHTML(application.referenceNumber)}

👤 <b>المعلومات الشخصية</b>
├ <b>الاسم:</b> ${escapeHTML(application.fullName)}
├ <b>الهاتف:</b> ${escapeHTML(application.phone)}
├ <b>البريد:</b> ${escapeHTML(application.email) || '—'}
└ <b>المدينة:</b> ${escapeHTML(application.city)} (${escapeHTML(application.wilaya)})

🎓 <b>المعلومات المهنية</b>
├ <b>التخصص:</b> ${escapeHTML(application.subjectSpecialty)}
├ <b>المستوى الدراسي:</b> ${escapeHTML(educationLevelLabels[application.educationLevel] || application.educationLevel)}
├ <b>مجال الدراسة:</b> ${escapeHTML(application.educationField) || '—'}
├ <b>سنوات الخبرة:</b> ${escapeHTML(expLabels[application.yearsExperience] || application.yearsExperience)}
├ <b>المستويات المستهدفة:</b> ${escapeHTML((application.targetLevels || []).join('، ')) || '—'}
├ <b>طريقة التدريس:</b> ${escapeHTML(modeLabels[application.teachingMode] || application.teachingMode)}
├ <b>التوفر:</b> ${escapeHTML(availabilityLabels[application.availability] || application.availability)}
└ <b>المؤسسة الحالية:</b> ${escapeHTML(application.currentInstitution) || '—'}
${application.motivation ? `\n📝 <b>الدافع:</b> ${escapeHTML(application.motivation.substring(0, 200))}${application.motivation.length > 200 ? '...' : ''}` : ''}
━━━━━━━━━━━━━━━━━━
⏰ ${new Date(application.createdAt).toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })}
    `;

    sendTelegramNotification(telegramMsg);
    sendEmailNotification(application);

    res.status(201).json({
      success: true,
      data: application,
      message: 'Teacher application submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherApplications = async (req, res, next) => {
  try {
    const list = await TeacherApplication.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};
