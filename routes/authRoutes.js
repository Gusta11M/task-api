const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validators');


router.post('/register', validateRegister, handleValidationErrors,register);
router.post('/login', validateLogin, handleValidationErrors, login);

module.exports = router;