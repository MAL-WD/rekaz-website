const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// POST /api/admin/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = signToken(admin._id);

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/admin/auth/me
exports.getMe = async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.admin._id,
      email: req.admin.email,
      name: req.admin.name
    }
  });
};

// PUT /api/admin/auth/password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Please provide current and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    const token = signToken(admin._id);

    res.json({ success: true, data: { token }, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
