// const Web3 = require('web3');
// const OrderABI = require('../keys/ContractABI.json');
// const ContractAddress = require("../keys/ContractAddress")
// const ganacheUrl = "http://127.0.0.1:7545";
// const web3 = new Web3(ganacheUrl); // Or any other Ethereum node endpoint

// const contract = new web3.eth.Contract(OrderABI, ContractAddress);
// const initEventListeners = () => {
//     contract.events.OrderCreated({ fromBlock: 'latest' })
//       .on('data', event => {
//         // Logic to notify service providers about a new order
//         console.log('Order Created:', event.returnValues);
//       })
//       .on('error', console.error);
  
//     contract.events.OrderAccepted({ fromBlock: 'latest' })
//       .on('data', event => {
//         // Logic to update the order with the service provider's address
//         console.log('Order Accepted:', event.returnValues);
//       })
//       .on('error', console.error);
//   };
//   initEventListeners();  
// const OrderController = {
//     // Fetches all orders; adjust based on your contract's capabilities
//     getAllOrders: async (req, res) => {
//         try {
//             const orders = await contract.methods.getOrders().call(); // Assuming your contract has a getOrders method
//             res.json(orders);
//         } catch (error) {
//             console.error("Failed to fetch orders", error);
//             res.status(500).send("Failed to fetch orders");
//         }
//     },

//     // Gets a single order by ID
//     getOrderById: async (req, res) => {
//         const { orderId } = req.params;
//         try {
//             const order = await contract.methods.getOrder(orderId).call();
//             res.json(order);
//         } catch (error) {
//             console.error(`Failed to fetch order ${orderId}`, error);
//             res.status(500).send(`Failed to fetch order ${orderId}`);
//         }
//     },

//     // Example function to listen for event and act accordingly
//     listenForOrderCreated: () => {
//         contract.events.OrderCreated({
//             fromBlock: 0
//         }, (error, event) => {
//             if (error) {
//                 console.error("Error on event", error);
//                 return;
//             }
//             console.log("Order Created Event", event.returnValues);
//             // Perform any action after an order is created, e.g., notify users
//         });
//     },

//     getAvailableOrdersByLocation: async (req, res) => {
//         const { longitude, latitude } = req.query; // Or however you choose to receive these parameters
//         try {
//             const orders = await Order.find({
//                 coordinates: {
//                     $near: {
//                         $geometry: {
//                             type: "Point",
//                             coordinates: [parseFloat(longitude), parseFloat(latitude)]
//                         },
//                         $maxDistance: 10000, // 10km radius, adjust as needed
//                     }
//                 },
//                 status: 'booked' // Only find orders that haven't been accepted yet
//             });
//             res.json(orders);
//         } catch (error) {
//             console.error("Error fetching nearby orders", error);
//             res.status(500).send("Failed to fetch nearby orders");
//         }
//     },

//     // Other controller methods for interacting with your contract
//     // Remember, creating or modifying blockchain state is better handled in the frontend
// };

// module.exports = OrderController;


// const Web3 = require('web3');
// const ContractABI = require('../keys/ContractABI.json');
// const contractAddress = require("../keys/ContractAddress");
// const bscTestnetUrl = process.env.BSC_TESTNET_URL;

// const web3 = new Web3(bscTestnetUrl);
// const contract = new web3.eth.Contract(ContractABI, contractAddress);

// const geolocation = require('../Utilites/geoLocation');  // Ensure this path is correct

// const OrderController = {
//     createOrder: async (req, res) => {
//         const { id, coordinates, fromAddress } = req.body;
//         if (!web3.utils.isAddress(fromAddress)) {
//             return res.status(400).send('Invalid fromAddress');
//         }
//         const value = web3.utils.toWei(req.body.amount.toString(), 'ether');
        
//         try {
//             const receipt = await contract.methods.createOrder(id, coordinates).send({ from: fromAddress, value });
//             res.json({ message: 'Order created successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error creating order:', error);
//             res.status(500).send('Failed to create order. Error: ' + error.message);
//         }
//     },

//     acceptOrder: async (req, res) => {
//         const { id } = req.params;
//         const { fromAddress } = req.body;
//         if (!web3.utils.isAddress(fromAddress)) {
//             return res.status(400).send('Invalid fromAddress');
//         }

//         try {
//             const receipt = await contract.methods.acceptOrder(id).send({ from: fromAddress });
//             res.json({ message: 'Order accepted successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error accepting order:', error);
//             res.status(500).send('Failed to accept order. Error: ' + error.message);
//         }
//     },

//     cancelOrder: async (req, res) => {
//         const { id } = req.params;
//         try {
//             // Assume the contract has a method to cancel an order
//             const receipt = await contract.methods.cancelOrder(id).send({ from: req.user.address });
//             res.json({ message: 'Order cancelled successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error cancelling order:', error);
//             res.status(500).send('Failed to cancel order. Error: ' + error.message);
//         }
//     },

//     deliverOrder: async (req, res) => {
//         const { id } = req.params;
//         try {
//             // Assume the contract has a method to mark an order as delivered
//             const receipt = await contract.methods.deliverOrder(id).send({ from: req.user.address });
//             res.json({ message: 'Order delivered successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error delivering order:', error);
//             res.status(500).send('Failed to deliver order. Error: ' + error.message);
//         }
//     },

//     completeOrder: async (req, res) => {
//         const { id } = req.params;
//         try {
//             // Assume the contract has a method to complete an order
//             const receipt = await contract.methods.completeOrder(id).send({ from: req.user.address });
//             res.json({ message: 'Order completed successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error completing order:', error);
//             res.status(500).send('Failed to complete order. Error: ' + error.message);
//         }
//     },

//     disputeOrder: async (req, res) => {
//         const { id } = req.params;
//         try {
//             // Assume the contract has a method to dispute an order
//             const receipt = await contract.methods.disputeOrder(id).send({ from: req.user.address });
//             res.json({ message: 'Order disputed successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error disputing order:', error);
//             res.status(500).send('Failed to dispute order. Error: ' + error.message);
//         }
//     },

//     releaseEscrow: async (req, res) => {
//         const { id } = req.params;
//         try {
//             // Assume the contract has a method to release funds from escrow
//             const receipt = await contract.methods.releaseEscrow(id).send({ from: req.user.address });
//             res.json({ message: 'Escrow released successfully', transactionHash: receipt.transactionHash });
//         } catch (error) {
//             console.error('Error releasing escrow:', error);
//             res.status(500).send('Failed to release escrow. Error: ' + error.message);
//         }
//     },

//     getOrder: async (req, res) => {
//         const { id } = req.params;
//         try {
//             // Assume the contract has a method to get an order's details
//             const orderDetails = await contract.methods.getOrder(id).call();
//             res.json({ orderDetails });
//         } catch (error) {
//             console.error('Error retrieving order:', error);
//             res.status(500).send('Failed to retrieve order. Error: ' + error.message);
//         }
//     },

//     getOrderHistory: async (req, res) => {
//         const { userId } = req.params;
//         try {
//             // Assume the contract has a method to get the order history for a user
//             const orderHistory = await contract.methods.getOrderHistory(userId).call();
//             res.json({ orderHistory });
//         } catch (error) {
//             console.error('Error retrieving order history:', error);
//             res.status(500).send('Failed to retrieve order history. Error: ' + error.message);
//         }
//     },

//     getAvailableOrdersByLocation: async (req, res) => {
//         const { latitude, longitude } = req.query;
//         try {
//             const availableOrders = await contract.methods.getAvailableOrders().call();
//             const filteredOrders = availableOrders.filter(order => {
//                 const [orderLat, orderLong] = order.coordinates.split(',');
//                 const distance = geolocation.calculateDistance(
//                     { latitude: parseFloat(orderLat), longitude: parseFloat(orderLong) },
//                     { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
//                 );
//                 return distance <= 10000; // 10 km radius
//             });
//             res.json({ success: true, availableOrders: filteredOrders });
//         } catch (error) {
//             console.error('Error fetching available orders by location:', error);
//             res.status(500). send('Failed to fetch available orders. Error: ' + error.message);
//         }
//     },
// };

// module.exports = OrderController;


module.exports = function(io) {
    const Web3 = require('web3');
    const ContractABI = require('../keys/ContractABI.json');
    const contractAddress = require("../keys/ContractAddress");
    const bscTestnetUrl = process.env.BSC_TESTNET_URL;
    const geolocation = require('../Utilites/geoLocation'); // Ensure this path is correct

    const web3 = new Web3(bscTestnetUrl);
    const contract = new web3.eth.Contract(ContractABI, contractAddress);

    return {
        createOrder: async (req, res) => {
            try {
                const { id, coordinates, fromAddress } = req.body;
                if (!web3.utils.isAddress(fromAddress)) {
                    throw new Error('Invalid fromAddress');
                }
                const value = web3.utils.toWei(req.body.amount.toString(), 'ether');
                const receipt = await contract.methods.createOrder(id, coordinates).send({ from: fromAddress, value });
                io.emit('orderCreated', { id, status: 'created', details: receipt });
                res.json({ message: 'Order created successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in createOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        acceptOrder: async (req, res) => {
            try {
                const { orderId } = req.params;
                const fromAddress = req.user.address; // Assumes user's address is stored in request
                if (!web3.utils.isAddress(fromAddress)) {
                    throw new Error('Invalid fromAddress');
                }
                const receipt = await contract.methods.acceptOrder(orderId).send({ from: fromAddress });
                io.emit('orderAccepted', { orderId, status: 'accepted', details: receipt });
                res.json({ message: 'Order accepted successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in acceptOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        cancelOrder: async (req, res) => {
            try {
                const { orderId } = req.params;
                const fromAddress = req.user.address;
                const receipt = await contract.methods.cancelOrder(orderId).send({ from: fromAddress });
                io.emit('orderCancelled', { orderId, status: 'cancelled', details: receipt });
                res.json({ message: 'Order cancelled successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in cancelOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        deliverOrder: async (req, res) => {
            try {
                const { orderId } = req.params;
                const fromAddress = req.user.address;
                const receipt = await contract.methods.deliverOrder(orderId).send({ from: fromAddress });
                io.emit('orderDelivered', { orderId, status: 'delivered', details: receipt });
                res.json({ message: 'Order delivered successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in deliverOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        completeOrder: async (req, res) => {
            try {
                const { orderId } = req.params;
                const fromAddress = req.user.address;
                const receipt = await contract.methods.completeOrder(orderId).send({ from: fromAddress });
                io.emit('orderCompleted', { orderId, status: 'completed', details: receipt });
                res.json({ message: 'Order completed successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in completeOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        disputeOrder: async (req, res) => {
            try {
                const { orderId } = req.params;
                const fromAddress = req.user.address;
                const receipt = await contract.methods.disputeOrder(orderId).send({ from: fromAddress });
                io.emit('orderDisputed', { orderId, status: 'disputed', details: receipt });
                res.json({ message: 'Order disputed successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in disputeOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        releaseEscrow: async (req, res) => {
            try {
                const { orderId } = req.params;
                const fromAddress = req.user.address; // Assuming only specific users can release escrow
                const receipt = await contract.methods.releaseEscrow(orderId).send({ from: fromAddress });
                io.emit('escrowReleased', { orderId, status: 'escrow released', details: receipt });
                res.json({ message: 'Escrow released successfully', transactionHash: receipt.transactionHash });
            } catch (error) {
                console.error('Error in releaseEscrow:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        getOrder: async (req, res) => {
            try {
                const { orderId } = req.params;
                const orderDetails = await contract.methods.getOrder(orderId).call();
                res.json({ orderDetails });
            } catch (error) {
                console.error('Error in getOrder:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        getOrderHistory: async (req, res) => {
            try {
                const { userId } = req.params;
                const orderHistory = await contract.methods.getOrderHistory(userId).call();
                res.json({ orderHistory });
            } catch (error) {
                console.error('Error in getOrderHistory:', error);
                res.status(500).json({ error: error.toString() });
            }
        },

        getAvailableOrdersByLocation: async (req, res) => {
            try {
                const { latitude, longitude } = req.query;
                const availableOrders = await contract.methods.getAvailableOrders().call();
                const filteredOrders = availableOrders.filter(order => {
                    const [orderLat, orderLong] = order.coordinates.split(',');
                    const distance = geolocation.calculateDistance(
                        { latitude: parseFloat(orderLat), longitude: parseFloat(orderLong) },
                        { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
                    );
                    return distance <= 10000; // within 10 km radius
                });
                res.json({ success: true, availableOrders: filteredOrders });
            } catch (error) {
                console.error('Error in getAvailableOrdersByLocation:', error);
                res.status(500).json({ error: error.toString() });
            }
        },
    };
};




