const express = require('express');
const escrowController = require('../Controllers/escrowController');

const router = express.Router();

router.post('/createOrder', escrowController.createOrder);
router.post('/confirmDelivery', escrowController.confirmDelivery);
router.post('/cancelOrder', escrowController.cancelOrder);

module.exports = router;
