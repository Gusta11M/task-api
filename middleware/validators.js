const {body} = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateRegister = [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

exports.validateLogin = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
];

exports.validateTaskCreation = [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
];

exports.validateTaskUpdate = [
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('completed').optional().isBoolean()
];

exports.handleValidationErrors = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    next();
}