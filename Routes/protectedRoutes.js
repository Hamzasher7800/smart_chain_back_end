// backend/routes/someProtectedRoute.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware')

// Apply both middlewares to protect the route for admin users
router.get('/admin-protected-route', verifyToken, requireAdmin, (req, res) => {
    // Logic for the admin-protected route
    res.json({ message: 'Access to admin-protected route successful' });
});

module.exports = router;
