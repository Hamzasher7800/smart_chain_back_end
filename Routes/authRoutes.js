const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/confirm-email', authController.confirmEmail);
module.exports = router;
