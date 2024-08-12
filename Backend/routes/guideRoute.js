const express = require("express");
const { getAllGuides, login, getGuide,deleteGuide,updateGuide,register, forgetPassword, resetPasswordGuide, sendEmail, resetPassword, verifyOTP, updateWorker, workStatus, updateworkstatus, deleteWorkStatus, deleteStatus, editGuide} = require('../controllers/guideController')
const { verifyAdmin, verifyUser } = require('../middleware/verifyToken');
const multer = require('multer');
const path = require('path');
// const { resetPassword } = require("../controllers/authController");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

router.post('/register',upload.single('image'), register);
router.post('/login', login);
router.get('/getguide/:id', getGuide);
router.put('/editguide/:id', editGuide);
router.get('/', verifyAdmin, getAllGuides);
router.put('/updateworker/:id', updateWorker);
router.put('/updateworkstatus/:id', workStatus);
router.put('/updatestatus/:id/:workStatusId', updateworkstatus);
router.put('/:id', verifyAdmin, updateGuide);
router.delete('/:id', verifyAdmin, deleteGuide);
router.put('/deleteworkstatus/:id',deleteStatus); // deletes the workstatus 
router.post('/forgetpassword', forgetPassword);
router.post('/reset-password/:token', resetPasswordGuide);
router.post('/send-reset-email', sendEmail);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;