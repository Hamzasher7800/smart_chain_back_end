// backend/routes/someProtectedRoute.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Apply the middleware to a protected route
router.get('/protected-route', verifyToken, (req, res) => {
    // Logic for the protected route
    res.json({ message: 'Access to protected route successful' });
});

module.exports = router;
