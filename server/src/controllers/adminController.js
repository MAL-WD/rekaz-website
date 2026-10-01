const Teacher = require('../models/Teacher');
const Language = require('../models/Language');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Inscription = require('../models/Inscription');
const TeacherApplication = require('../models/TeacherApplication');

// ─── DASHBOARD STATS ──────────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
  try {
    const [blogs, contacts, inscriptions, teacherApps, teachers, languages] = await Promise.all([
      Blog.countDocuments(),
      Contact.countDocuments(),
      Inscription.countDocuments(),
      TeacherApplication.countDocuments(),
      Teacher.countDocuments({ isActive: true }),
      Language.countDocuments({ isActive: true })
    ]);

    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
    const recentInscriptions = await Inscription.find().sort({ createdAt: -1 }).limit(5);

    const newContacts = await Contact.countDocuments({ status: 'new' });
    const pendingInscriptions = await Inscription.countDocuments({ status: 'pending' });
    const pendingTeacherApps = await TeacherApplication.countDocuments({ status: 'pending' });

    res.json({
      success: true,
      data: {
        counts: { blogs, contacts, inscriptions, teacherApps, teachers, languages },
        pending: { newContacts, pendingInscriptions, pendingTeacherApps },
        recentContacts,
        recentInscriptions
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── TEACHERS CRUD ────────────────────────────────────────────
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: teachers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, data: teacher });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!teacher) return res.status(404).json({ success: false, error: 'Teacher not found' });
    res.json({ success: true, data: teacher });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, error: 'Teacher not found' });
    res.json({ success: true, message: 'Teacher deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── LANGUAGES CRUD ───────────────────────────────────────────
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: languages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createLanguage = async (req, res) => {
  try {
    const language = await Language.create(req.body);
    res.status(201).json({ success: true, data: language });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!language) return res.status(404).json({ success: false, error: 'Language not found' });
    res.json({ success: true, data: language });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    if (!language) return res.status(404).json({ success: false, error: 'Language not found' });
    res.json({ success: true, message: 'Language deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── CONTACTS MANAGEMENT ──────────────────────────────────────
exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ success: false, error: 'Contact not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Contact not found' });
    res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── INSCRIPTIONS MANAGEMENT ──────────────────────────────────
exports.updateInscriptionStatus = async (req, res) => {
  try {
    const inscription = await Inscription.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!inscription) return res.status(404).json({ success: false, error: 'Inscription not found' });
    res.json({ success: true, data: inscription });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteInscription = async (req, res) => {
  try {
    const inscription = await Inscription.findByIdAndDelete(req.params.id);
    if (!inscription) return res.status(404).json({ success: false, error: 'Inscription not found' });
    res.json({ success: true, message: 'Inscription deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── TEACHER APPLICATIONS MANAGEMENT ──────────────────────────
exports.updateTeacherAppStatus = async (req, res) => {
  try {
    const app = await TeacherApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!app) return res.status(404).json({ success: false, error: 'Application not found' });
    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteTeacherApp = async (req, res) => {
  try {
    const app = await TeacherApplication.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ success: false, error: 'Application not found' });
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
