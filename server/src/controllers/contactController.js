const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { getEmailHTML } = require('../config/emailTemplate');

// Configure Nodemailer transporter (you will need to provide credentials in .env)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred service
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

const sendTelegramMessage = async (message) => {
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
  } catch (error) {
    const detail = error.response?.data || error.message;
    console.error('Failed to send Telegram message:', JSON.stringify(detail));
  }
};

const sendEmailNotification = async (contactData) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NOTIFICATION_EMAIL) return;

  const emailHTML = getEmailHTML({
    tag: 'Contact Form',
    title: 'New Contact Form Submission',
    fields: [
      { label: 'Name', value: contactData.name },
      { label: 'Email', value: contactData.email },
      { label: 'Phone', value: contactData.phone },
      { label: 'Subject', value: contactData.subject },
      { label: 'Source', value: contactData.source }
    ],
    message: contactData.message
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `📞 New Contact: ${contactData.name} - ${contactData.subject}`,
    html: emailHTML
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
};

exports.submitContact = async (req, res, next) => {
  try {
    // 1. Save to Database
    const contact = await Contact.create(req.body);
    
    // 2. Prepare Notification Message
    const notificationMessage = `
<b>New Contact Form Submission</b>
<b>Name:</b> ${escapeHTML(contact.name)}
<b>Email:</b> ${escapeHTML(contact.email)}
<b>Phone:</b> ${escapeHTML(contact.phone) || 'N/A'}
<b>Subject:</b> ${escapeHTML(contact.subject)}
<b>Source:</b> ${escapeHTML(contact.source) || 'N/A'}

<b>Message:</b>
${escapeHTML(contact.message)}
    `;

    // 3. Send Notifications (asynchronous, fire-and-forget so it doesn't block response)
    sendTelegramMessage(notificationMessage);
    sendEmailNotification(contact);

    // 4. Send Success Response
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};
