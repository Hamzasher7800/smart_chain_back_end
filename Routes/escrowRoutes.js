const express = require('express');
const escrowController = require('../Controllers/escrowController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createOrder', verifyToken, escrowController.createOrder);
router.post('/confirmDelivery', escrowController.confirmDelivery);
router.post('/cancelOrder', escrowController.cancelOrder);
router.get('/orders', escrowController.getOrders);

module.exports = router;
