const express = require('express');
const authController = require('../controllers/auth.controller');
const { authValidation } = require('../validations');
const { verifyCaptcha } = require('../middlewares/captcha');
const verifyToken = require('../middlewares/verifyToekn');
const router = express.Router();

router.post('/register', [verifyCaptcha, authValidation.register], authController.register);
router.post('/login', [verifyCaptcha, authValidation.login], authController.login);
router.post('/change-password', verifyToken, authController.changePassword);
router.post('/forgot-password', authValidation.forgotpasswordData, authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/send-verification-email', verifyToken, authController.verifyEmail);
router.post('/verify-email', authController.verifyAccount);

module.exports = router;