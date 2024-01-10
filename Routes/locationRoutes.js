// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const locationController = require('../Controllers/locationController');

router.post('/update', locationController.updateUserLocation);
router.get('/:userId', locationController.getUserLocation);

module.exports = router;
