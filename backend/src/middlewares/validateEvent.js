const { body, validationResult } = require('express-validator');

const validateEvent = [
  body('title').notEmpty().withMessage('Title is required'),
  body('organization').notEmpty().withMessage('Organization is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('maximumAllowed').isInt({ min: 1 }).withMessage('Maximum allowed must be at least 1'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateEvent;
