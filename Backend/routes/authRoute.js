const express = require('express');
const { register,login,registerAdmin, loginAdmin, sendEmail, resetPassword,verifyOTP, logout } = require('../controllers/authController')

//as User
const router = express.Router();

// for signup 
router.post('/register', register);

// router.post('/signup', signup);
router.post('/login', login);

//as Admin
router.post('/register-admin', registerAdmin);

// admin login
router.post('/login-admin', loginAdmin);

// guide login
// router.post('/login-guide', loginGuide);

//send reset emai
router.post('/send-email',sendEmail)

//Reset Password
router.post("/resetPassword", resetPassword);
router.post("/verifyOTP", verifyOTP);

// POST /api/auth/logout
router.post('/logout', logout);


module.exports = router;