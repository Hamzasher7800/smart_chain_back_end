// const express = require('express');
// const router = express.Router();
// const OrderController = require('../Controllers/orderController');
// console.log(OrderController.createOrder);
// console.log(OrderController.acceptOrder);
// console.log(OrderController.cancelOrder);
// console.log(OrderController.deliverOrder);
// console.log(OrderController.completeOrder);
// console.log(OrderController.disputeOrder);
// console.log(OrderController.releaseEscrow);
// console.log(OrderController.getOrder);
// console.log(OrderController.getOrderHistory);
// console.log(OrderController.getAvailableOrdersByLocation);
// // Route to handle creating an order; this might just log the action or send a notification
// router.post('/createOrder', OrderController.createOrder);

// // Route to accept an order; might be used for notification purposes or additional logging
// router.post('/accept/:orderId', OrderController.acceptOrder);

// // Route to cancel an order
// router.post('/cancel/:orderId', OrderController.cancelOrder);

// // Route to deliver an order
// router.post('/deliver/:orderId', OrderController.deliverOrder);

// // Route to complete an order
// router.post('/complete/:orderId', OrderController.completeOrder);

// // Route to dispute an order
// router.post('/dispute/:orderId', OrderController.disputeOrder);

// // Route to release escrow (likely to be restricted to the contract owner or admin)
// router.post('/releaseEscrow/:orderId', OrderController.releaseEscrow);

// // Get order by ID
// router.get('/:orderId', OrderController.getOrder);

// // Get all orders for a user
// router.get('/history/:userId', OrderController.getOrderHistory);

// router.get('/available-by-location', OrderController.getAvailableOrdersByLocation);

// // router.post('/subscribeNotifications', OrderController.subscribeToNotifications);

// // router.post('/unsubscribeNotifications', OrderController.unsubscribeFromNotifications);



// module.exports = router;



module.exports = function(io) {
    const router = require('express').Router();
    const OrderController = require('../Controllers/orderController')(io);

    router.post('/createOrder', OrderController.createOrder);
    router.post('/accept/:orderId', OrderController.acceptOrder);
    router.post('/cancel/:orderId', OrderController.cancelOrder);
    router.post('/deliver/:orderId', OrderController.deliverOrder);
    router.post('/complete/:orderId', OrderController.completeOrder);
    router.post('/dispute/:orderId', OrderController.disputeOrder);
    router.post('/releaseEscrow/:orderId', OrderController.releaseEscrow);
    router.get('/:orderId', OrderController.getOrder);
    router.get('/history/:userId', OrderController.getOrderHistory);
    router.get('/available-by-location', OrderController.getAvailableOrdersByLocation);

    return router;
};
