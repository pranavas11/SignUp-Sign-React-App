// routes/index.js
const express = require('express');
const { register, login } = require('../controllers/Users');
const { refreshToken } = require('../controllers/RefreshToken');
const verifyToken = require('../middleware/VerifyToken');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/Profile');

const router = express.Router();

// Public routes
router.post('/signup', register);  // Route for user registration
router.post('/authenticate', login);      // Route for user login
//router.delete('/logout', Logout);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.delete('/profile', verifyToken, deleteProfile);

router.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
});

// Route for refreshing tokens
router.get('/token', refreshToken);

module.exports = router;