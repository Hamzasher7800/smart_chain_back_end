// const express = require('express');

// module.exports = function(io) {
//   const router = express.Router();
//   const OrderController = require('../Controllers/orderController')(io);

//   router.post('/createOrder', OrderController.createOrder);
//   router.post('/sendSignedTransaction', OrderController.sendSignedTransaction);
//   router.post('/accept/:orderId', OrderController.acceptOrder);
//   router.post('/cancel/:orderId', OrderController.cancelOrder);
//   router.post('/deliver/:orderId', OrderController.deliverOrder);
//   router.post('/complete/:orderId', OrderController.completeOrder);
//   router.post('/dispute/:orderId', OrderController.disputeOrder);
//   router.post('/releaseEscrow/:orderId', OrderController.releaseEscrow);
//   router.get('/history/:userName', OrderController.getOrderHistory);
//   router.get('/disputed-orders', OrderController.getDisputedOrders);
//   router.get('/:orderId', OrderController.getOrder);
//   router.get('/available-by-location', OrderController.getAvailableOrdersByLocation);
//   router.get('/fuel-delivery-orders', OrderController.getFuelDeliveryOrders);
//   router.get('/customer-orders/:userAddress', OrderController.getCustomerOrders);

//   return router;
// };



const express = require('express');

module.exports = function(io) {
  const router = express.Router();
  const OrderController = require('../Controllers/orderController')(io);

  router.post('/createOrder', OrderController.createOrder);
  router.post('/sendSignedTransaction', OrderController.sendSignedTransaction);
  router.post('/accept/:orderId', OrderController.acceptOrder);
  router.post('/cancel/:orderId', OrderController.cancelOrder);
  router.post('/deliver/:orderId', OrderController.deliverOrder);
  router.post('/complete/:orderId', OrderController.completeOrder);
  router.post('/dispute/:orderId', OrderController.disputeOrder);
  router.post('/releaseEscrow/:orderId', OrderController.releaseEscrow);
  router.get('/history/:userName', OrderController.getOrderHistory);
  router.get('/disputed-orders', OrderController.getDisputedOrders);
  router.get('/:orderId', OrderController.getOrder);
  router.get('/available-by-location', OrderController.getAvailableOrdersByLocation);
  router.get('/fuel-delivery-orders', OrderController.getFuelDeliveryOrders);

  return router;
};

