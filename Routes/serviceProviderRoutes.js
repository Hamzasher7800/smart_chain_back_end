const express = require('express');
const router = express.Router();
const {acceptRequest} = require('../Controllers/serviceProviderController');

// Middleware to ensure the user is authenticated
// const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Route for a service provider to accept a service request
router.post('/acceptRequest',acceptRequest);

module.exports = router;
