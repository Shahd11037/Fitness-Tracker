const express = require('express');
const router = express.Router();
const { signup, login, getMe, updateMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');



router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

console.log('authController:', { signup, login, getMe, updateMe });
console.log('authMiddleware:', { protect });

module.exports = router;