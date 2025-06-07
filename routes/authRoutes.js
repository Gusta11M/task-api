const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { handleValidationErrors } = require('../middleware/handleValidation');


router.post('/register', validateRegister, handleValidationErrors,register);
router.post('/login', validateLogin, handleValidationErrors, login);

module.exports = router;