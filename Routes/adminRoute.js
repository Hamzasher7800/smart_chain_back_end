// routes.js
const express = require('express');
const roleCheck = require('../middleware/roleChecker');

const router = express.Router();

// Admin-only route
router.get('/admin/data', roleCheck(['admin']), (req, res) => {
    res.json({ data: 'Admin data' });
});

module.exports = router;
