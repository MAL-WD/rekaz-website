const Inscription = require('../models/Inscription');
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
    console.error('Telegram notification error:', err.message);
  }
};

const sendEmailNotification = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFICATION_EMAIL) return;

  const emailHTML = getEmailHTML({
    tag: 'Inscription Form',
    title: 'Nouvelle Inscription Rekaz',
    fields: [
      { label: 'N° Dossier', value: data.referenceNumber },
      { label: 'Nom & Prénom', value: data.fullName },
      { label: 'Téléphone', value: data.phone },
      { label: 'Email', value: data.email },
      { label: 'Programme', value: `${data.programType} - ${data.level} ${data.filiere ? `(${data.filiere})` : ''}` },
      { label: 'Matières', value: (data.subjects || []).join(', ') },
      { label: 'Mode d\'apprentissage', value: data.learningMode },
      { label: 'Ville', value: `${data.city} (${data.wilaya})` },
      { label: 'Tuteur Name', value: data.parentName },
      { label: 'Tuteur Phone', value: data.parentPhone }
    ],
    message: data.notes
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `📝 [Nouvelle Inscription] ${data.fullName} - ${data.programType.toUpperCase()} (${data.level})`,
    html: emailHTML
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Email notification error:', err.message);
  }
};

exports.createInscription = async (req, res, next) => {
  try {
    const inscription = await Inscription.create(req.body);

    const programLabels = { cem: 'متوسط', lycee: 'ثانوي', formation: 'تكوين', consultation: 'استشارة' };
    const modeLabels = { presentiel: 'حضوري', online: 'عن بعد', hybrid: 'هجين' };
    const scheduleLabels = { weekend: 'نهاية الأسبوع', evening: 'مسائي', flexible: 'مرن' };

    const telegramMsg = `
📝 <b>تسجيل جديد في منصة ركاز</b>
━━━━━━━━━━━━━━━━━━
🆔 <b>رقم التتبع:</b> <code>${inscription._id}</code>
📁 <b>رقم الملف:</b> ${inscription.referenceNumber}

👤 <b>معلومات الطالب</b>
├ <b>الاسم:</b> ${inscription.fullName}
├ <b>الهاتف:</b> ${inscription.phone}
├ <b>البريد:</b> ${inscription.email || '—'}
└ <b>تاريخ الميلاد:</b> ${inscription.birthDate || '—'}

🎓 <b>معلومات الدراسة</b>
├ <b>البرنامج:</b> ${programLabels[inscription.programType] || inscription.programType}
├ <b>المستوى:</b> ${inscription.level}${inscription.filiere ? `\n├ <b>الشعبة:</b> ${inscription.filiere}` : ''}
├ <b>المواد:</b> ${(inscription.subjects || []).join('، ') || '—'}
├ <b>طريقة التعلم:</b> ${modeLabels[inscription.learningMode] || inscription.learningMode}
└ <b>التوقيت:</b> ${scheduleLabels[inscription.schedulePreference] || inscription.schedulePreference || '—'}

📍 <b>العنوان:</b> ${inscription.city} (${inscription.wilaya})
🏫 <b>المدرسة الحالية:</b> ${inscription.currentSchool || '—'}

👨‍👩‍👦 <b>ولي الأمر</b>
├ <b>الاسم:</b> ${inscription.parentName || '—'}
├ <b>الهاتف:</b> ${inscription.parentPhone || '—'}
└ <b>الصلة:</b> ${inscription.parentRelation || '—'}${inscription.notes ? `\n\n📝 <b>ملاحظات:</b> ${inscription.notes}` : ''}
━━━━━━━━━━━━━━━━━━
⏰ ${new Date(inscription.createdAt).toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })}
    `;

    sendTelegramNotification(telegramMsg);
    sendEmailNotification(inscription);

    res.status(201).json({
      success: true,
      data: inscription,
      message: 'Inscription registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getInscriptions = async (req, res, next) => {
  try {
    const list = await Inscription.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};
