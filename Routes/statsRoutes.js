const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController'); // Adjust the path as necessary

router.get('/users', statsController.getUserCount);
router.get('/orders/completed', statsController.getCompletedOrdersCount);
router.get('/orders/disputed', statsController.getDisputedOrdersCount);

module.exports = router;
