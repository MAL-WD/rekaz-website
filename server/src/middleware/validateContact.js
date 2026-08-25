const { body, validationResult } = require('express-validator');

exports.validateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be at most 100 characters')
    .trim()
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional({ values: 'falsy' })
    .trim(),
  body('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isIn(['cem-bem', 'bac-preparation', 'professional-training', 'consultation', 'business', 'general'])
    .withMessage('Invalid subject selection'),
  body('source')
    .optional({ values: 'falsy' })
    .isIn(['facebook', 'instagram', 'youtube', 'friend', 'other', ''])
    .withMessage('Invalid source selection'),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message must be at most 2000 characters')
    .trim()
    .escape()
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};
