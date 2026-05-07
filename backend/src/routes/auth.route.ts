
const {
	register,
	login,
	verifyEmail,
} = require('../controllers/auth.controller');



const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyEmail);

module.exports = router;
