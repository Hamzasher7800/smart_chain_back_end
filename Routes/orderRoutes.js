module.exports = function(io) {
    const router = require('express').Router();
    const OrderController = require('../Controllers/orderController')(io);

    router.post('/createOrder', OrderController.createOrder);
    router.post('/sendSignedTransaction', OrderController.sendSignedTransaction);
    router.post('/accept/:orderId', OrderController.acceptOrder);
    router.post('/cancel/:orderId', OrderController.cancelOrder);
    router.post('/deliver/:orderId', OrderController.deliverOrder);
    router.post('/complete/:orderId', OrderController.completeOrder);
    router.post('/dispute/:orderId', OrderController.disputeOrder);
    router.post('/releaseEscrow/:orderId', OrderController.releaseEscrow);
    router.get('/history/:userName', OrderController.getOrderHistory); // Ensure this line exists
    router.get('/:orderId', OrderController.getOrder);
    router.get('/available-by-location', OrderController.getAvailableOrdersByLocation);

    return router;
};
