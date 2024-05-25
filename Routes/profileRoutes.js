const express = require('express');
const router = express.Router();
const profileController = require('../Controllers/profileController'); // Adjust the path to your profile controller

// Route to get user profile by username
router.get('/:userName', profileController.getProfile);


// Route to update user profile
router.put('/:userName', profileController.updateProfile);

module.exports = router;
