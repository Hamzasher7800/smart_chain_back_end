const express = require('express');
const escrowController = require('../Controllers/escrowController');
const verifyToken = require('../middleware/authMiddleware');
const { resolveDispute } = require('../Controllers/disputeController');
const router = express.Router();

router.post('/createOrder', verifyToken, escrowController.createOrder);
router.post('/confirmDelivery', escrowController.confirmDelivery);
router.post('/cancelOrder', escrowController.cancelOrder);
router.get('/orders', escrowController.getOrders);
router.post('/resolve-dispute', resolveDispute);
module.exports = router;
