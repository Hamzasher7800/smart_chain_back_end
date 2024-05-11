// const express = require('express');
// const router = express.Router();
// // const requestController= require("../Controllers/serviceRequestController")
// const requestController=require("../Controllers/serviceRequestController")
// const {createRequest,getUserRequests,updateRequestStatus} = require('../Controllers/serviceRequestController');

// // Middleware to ensure the user is authenticated
// // const { verifyToken } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// // const { ensureAuthenticated } = require('../middleware/authMiddleware');

// router.post('/create', createRequest);
// router.get('/user/:userId', getUserRequests);
// router.put('/status/:requestId', updateRequestStatus);
// // router.put('/:requestId/cancel', verifyToken, requestController.cancelServiceRequest);
// router.put('/:requestId/cancel', requestController.cancelServiceRequest);
// module.exports = router;



const express = require('express');
const OrderController = require('./Controllers/OrderController');

const router = express.Router();

router.post('/createOrder', OrderController.createOrder);
router.post('/acceptOrder/:orderId', OrderController.acceptOrder);

// Other routes...

module.exports = router;




 



