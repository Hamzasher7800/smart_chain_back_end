const express = require('express');
const router = express.Router();
const statsController = require('../Controllers/statsController');

// router.get('/api/stats/users', statsController.getUserCount);
router.get('/users', (req, res, next) => {
    console.log('Fetching user count');
    next();
  }, statsController.getUserCount);
router.get('/orders/completed', statsController.getCompletedOrdersCount);
router.get('/orders/disputed', statsController.getDisputedOrdersCount);

module.exports = router;
