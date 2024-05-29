// const Web3 = require("web3");
// const ContractABI = require("../keys/ContractABI.json");
// const contractAddress = require("../keys/ContractAddress");
// const geolocation = require("../Utilites/geoLocation");
// const User = require("../Model/Users");

// const ganacheUrl = "http://127.0.0.1:7545";
// const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
// const contract = new web3.eth.Contract(ContractABI, contractAddress);

// const getUserAddressFromUserName = async (userName) => {
//   try {
//     const user = await User.findOne({ name: userName });
//     if (!user || !user.ethereumAddress) {
//       throw new Error("User address not found.");
//     }
//     return user.ethereumAddress;
//   } catch (error) {
//     console.error("Error in getUserAddressFromUserName:", error);
//     throw error;
//   }
// };

// const getNearbyServiceProviders = async (latitude, longitude) => {
//   const providers = await User.find({ isServiceProvider: true }); // Ensure you have a flag to identify service providers
//   const nearbyProviders = providers.filter((provider) => {
//     const distance = geolocation.calculateDistance(
//       { latitude: provider.latitude, longitude: provider.longitude },
//       { latitude, longitude }
//     );
//     return distance <= 10000; // within 10 km radius
//   });
//   return nearbyProviders;
// };

// module.exports = function (io) {
//   return {
//     sendSignedTransaction: async (req, res) => {
//       try {
//         const { signedTransaction } = req.body;

//         const receipt = await web3.eth.sendSignedTransaction(
//           signedTransaction.raw
//         );

//         res.json({
//           message: "Transaction sent successfully",
//           receipt: receipt,
//         });
//       } catch (error) {
//         console.error("Error in sendSignedTransaction:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     createOrder: async (req, res) => {
//       try {
//         const { coordinates, fromAddress, amount } = req.body;

//         if (!web3.utils.isAddress(fromAddress)) {
//           return res.status(400).json({ error: "Invalid fromAddress" });
//         }

//         const value = web3.utils.toWei(amount.toString(), "ether");

//         const receipt = await contract.methods
//           .createOrder(coordinates, coordinates)
//           .send({
//             from: fromAddress,
//             value,
//             gas: 3000000, // Adjust gas limit as needed
//           });

//         const [latitude, longitude] = coordinates.split(",").map(Number);
//         const nearbyProviders = await getNearbyServiceProviders(
//           latitude,
//           longitude
//         );

//         nearbyProviders.forEach((provider) => {
//           io.to(provider.socketId).emit("ORDER_UPDATE", {
//             type: "ORDER_UPDATE",
//             orderId: receipt.events.OrderCreated.returnValues.id,
//             status: "BOOKED",
//             details: receipt,
//           });
//         });

//         res.json({
//           message: "Order created successfully",
//           transactionHash: receipt.transactionHash,
//         });
//       } catch (error) {
//         console.error("Error in createOrder:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     acceptOrder: async (req, res) => {
//       try {
//         const { orderId } = req.params;
//         const fromAddress = req.user.address; // Assumes user's address is stored in request
//         if (!web3.utils.isAddress(fromAddress)) {
//           throw new Error("Invalid fromAddress");
//         }
//         const receipt = await contract.methods
//           .acceptOrder(orderId)
//           .send({ from: fromAddress });
//         io.emit("ORDER_UPDATE", {
//           type: "ORDER_UPDATE",
//           orderId,
//           status: "ACCEPTED",
//           details: receipt,
//         });
//         res.json({
//           message: "Order accepted successfully",
//           transactionHash: receipt.transactionHash,
//         });
//       } catch (error) {
//         console.error("Error in acceptOrder:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     cancelOrder: async (req, res) => {
//       try {
//         const { orderId } = req.params;
//         const fromAddress = req.user.address;
//         if (!web3.utils.isAddress(fromAddress)) {
//           throw new Error("Invalid fromAddress");
//         }
//         const receipt = await contract.methods
//           .cancelOrder(orderId)
//           .send({ from: fromAddress });
//         io.emit("ORDER_UPDATE", {
//           type: "ORDER_UPDATE",
//           orderId,
//           status: "CANCELLED",
//           details: receipt,
//         });
//         res.json({
//           message: "Order cancelled successfully",
//           transactionHash: receipt.transactionHash,
//         });
//       } catch (error) {
//         console.error("Error in cancelOrder:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     deliverOrder: async (req, res) => {
//       try {
//         const { orderId } = req.params;
//         const fromAddress = req.user.address;
//         if (!web3.utils.isAddress(fromAddress)) {
//           throw new Error("Invalid fromAddress");
//         }
//         const receipt = await contract.methods
//           .deliverOrder(orderId)
//           .send({ from: fromAddress });
//         io.emit("ORDER_UPDATE", {
//           type: "ORDER_UPDATE",
//           orderId,
//           status: "DELIVERED",
//           details: receipt,
//         });
//         res.json({
//           message: "Order delivered successfully",
//           transactionHash: receipt.transactionHash,
//         });
//       } catch (error) {
//         console.error("Error in deliverOrder:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     completeOrder: async (req, res) => {
//       try {
//         const { orderId } = req.params;
//         const fromAddress = req.user.address;
//         if (!web3.utils.isAddress(fromAddress)) {
//           throw new Error("Invalid fromAddress");
//         }
//         const receipt = await contract.methods
//           .completeOrder(orderId)
//           .send({ from: fromAddress });
//         io.emit("ORDER_UPDATE", {
//           type: "ORDER_UPDATE",
//           orderId,
//           status: "COMPLETE",
//           details: receipt,
//         });
//         res.json({
//           message: "Order completed successfully",
//           transactionHash: receipt.transactionHash,
//         });
//       } catch (error) {
//         console.error("Error in completeOrder:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     disputeOrder: async (req, res) => {
//         try {
//           const { orderId } = req.params;
//           const { coordinates, isServiceProvider } = req.body;
//           const fromAddress = req.user.address;
//           if (!web3.utils.isAddress(fromAddress)) {
//             throw new Error("Invalid fromAddress");
//           }
//           const receipt = await contract.methods
//             .disputeOrder(orderId, coordinates, isServiceProvider)
//             .send({ from: fromAddress });
//           io.emit("ORDER_UPDATE", {
//             type: "ORDER_UPDATE",
//             orderId,
//             status: "DISPUTED",
//             details: receipt,
//           });
//           res.json({
//             message: "Order disputed successfully",
//             transactionHash: receipt.transactionHash,
//           });
//         } catch (error) {
//           console.error("Error in disputeOrder:", error);
//           res.status(500).json({ error: error.toString() });
//         }
//       },
  
//     releaseEscrow: async (req, res) => {
//       try {
//         const { orderId } = req.params;
//         const { toServiceProvider } = req.body;
//         const fromAddress = req.user.address; // Assuming only specific users can release escrow
//         if (!web3.utils.isAddress(fromAddress)) {
//           throw new Error("Invalid fromAddress");
//         }
//         const receipt = await contract.methods
//           .releaseEscrow(orderId, toServiceProvider)
//           .send({ from: fromAddress });
//         io.emit("ORDER_UPDATE", {
//           type: "ORDER_UPDATE",
//           orderId,
//           status: "ESCROW_RELEASED",
//           details: receipt,
//         });
//         res.json({
//           message: "Escrow released successfully",
//           transactionHash: receipt.transactionHash,
//         });
//       } catch (error) {
//         console.error("Error in releaseEscrow:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     getOrder: async (req, res) => {
//       try {
//         const { orderId } = req.params;
//         const orderDetails = await contract.methods.getOrder(orderId).call();
//         res.json({ orderDetails });
//       } catch (error) {
//         console.error("Error in getOrder:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     getOrderHistory: async (req, res) => {
//       try {
//         const { userName } = req.params;
//         console.log(`Fetching order history for user: ${userName}`);
//         const userAddress = await getUserAddressFromUserName(userName);
//         if (!userAddress) {
//           throw new Error("User address not found.");
//         }
//         console.log(`User address: ${userAddress}`);
//         const orderHistory = await contract.methods
//           .getOrderHistory(userAddress)
//           .call();
//         res.json({ orderHistory });
//       } catch (error) {
//         console.error("Error in getOrderHistory:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     getAvailableOrdersByLocation: async (req, res) => {
//       try {
//         const { latitude, longitude } = req.query;
//         const orders = await contract.methods
//           .getAvailableOrdersByLocation(latitude, longitude)
//           .call();
//         res.json({ orders });
//       } catch (error) {
//         console.error("Error in getAvailableOrdersByLocation:", error);
//         res.status(500).json({ error: error.toString() });
//       }
//     },

//     getDisputedOrders: async (req, res) => {
//         try {
//           const orders = await contract.methods.getDisputedOrders().call();
//           const formattedOrders = orders.map((order) => ({
//             ...order,
//             amount: order.amount.toString(), // Ensure amount is a string
//             userCoordinates: order.userCoordinates,
//             serviceProviderCoordinates: order.serviceProviderCoordinates,
//           }));
//           res.json({ orders: formattedOrders });
//         } catch (error) {
//           console.error("Failed to fetch disputed orders:", error);
//           res.status(500).send(error.message);
//         }
//       },
//       getFuelDeliveryOrders: async (req, res) => {
//         try {
//           const orders = await contract.methods.getOrdersByServiceType('Fuel Delivery').call();
//           const formattedOrders = orders.map((order) => ({
//             ...order,
//             amount: order.amount.toString(),
//             userCoordinates: order.userCoordinates,
//             serviceProviderCoordinates: order.serviceProviderCoordinates,
//           }));
//           res.json({ orders: formattedOrders });
//         } catch (error) {
//           console.error("Failed to fetch fuel delivery orders:", error);
//           res.status(500).send(error.message);
//         }
//       },
//   };
// };







const Web3 = require("web3");
const ContractABI = require("../keys/ContractABI.json");
const contractAddress = require("../keys/ContractAddress");
const geolocation = require("../Utilites/geoLocation");
const User = require("../Model/Users");

const ganacheUrl = "http://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
const contract = new web3.eth.Contract(ContractABI, contractAddress);

const getUserAddressFromUserName = async (userName) => {
  try {
    const user = await User.findOne({ name: userName });
    if (!user || !user.ethereumAddress) {
      throw new Error("User address not found.");
    }
    return user.ethereumAddress;
  } catch (error) {
    console.error("Error in getUserAddressFromUserName:", error);
    throw error;
  }
};

const getNearbyServiceProviders = async (latitude, longitude) => {
  const providers = await User.find({ isServiceProvider: true }); // Ensure you have a flag to identify service providers
  const nearbyProviders = providers.filter((provider) => {
    const distance = geolocation.calculateDistance(
      { latitude: provider.latitude, longitude: provider.longitude },
      { latitude, longitude }
    );
    return distance <= 10000; // within 10 km radius
  });
  return nearbyProviders;
};

module.exports = function (io) {
  return {
    sendSignedTransaction: async (req, res) => {
      try {
        const { signedTransaction } = req.body;

        const receipt = await web3.eth.sendSignedTransaction(
          signedTransaction.raw
        );

        res.json({
          message: "Transaction sent successfully",
          receipt: receipt,
        });
      } catch (error) {
        console.error("Error in sendSignedTransaction:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    createOrder: async (req, res) => {
      try {
        const { coordinates, fromAddress, amount, serviceType } = req.body;

        if (!web3.utils.isAddress(fromAddress)) {
          return res.status(400).json({ error: "Invalid fromAddress" });
        }

        const value = web3.utils.toWei(amount.toString(), "ether");

        const receipt = await contract.methods
          .createOrder(coordinates, coordinates)
          .send({
            from: fromAddress,
            value,
            gas: 3000000, // Adjust gas limit as needed
          });

        const [latitude, longitude] = coordinates.split(",").map(Number);
        const nearbyProviders = await getNearbyServiceProviders(
          latitude,
          longitude
        );

        nearbyProviders.forEach((provider) => {
          io.to(provider.socketId).emit("ORDER_UPDATE", {
            type: "ORDER_UPDATE",
            orderId: receipt.events.OrderCreated.returnValues.id,
            status: "BOOKED",
            details: receipt,
          });
        });

        res.json({
          message: "Order created successfully",
          transactionHash: receipt.transactionHash,
        });
      } catch (error) {
        console.error("Error in createOrder:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    acceptOrder: async (req, res) => {
      try {
        const { orderId } = req.params;
        const fromAddress = req.user.address; // Assumes user's address is stored in request
        if (!web3.utils.isAddress(fromAddress)) {
          throw new Error("Invalid fromAddress");
        }
        const receipt = await contract.methods
          .acceptOrder(orderId)
          .send({ from: fromAddress });
        io.emit("ORDER_UPDATE", {
          type: "ORDER_UPDATE",
          orderId,
          status: "ACCEPTED",
          details: receipt,
        });
        res.json({
          message: "Order accepted successfully",
          transactionHash: receipt.transactionHash,
        });
      } catch (error) {
        console.error("Error in acceptOrder:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    cancelOrder: async (req, res) => {
      try {
        const { orderId } = req.params;
        const fromAddress = req.user.address;
        if (!web3.utils.isAddress(fromAddress)) {
          throw new Error("Invalid fromAddress");
        }
        const receipt = await contract.methods
          .cancelOrder(orderId)
          .send({ from: fromAddress });
        io.emit("ORDER_UPDATE", {
          type: "ORDER_UPDATE",
          orderId,
          status: "CANCELLED",
          details: receipt,
        });
        res.json({
          message: "Order cancelled successfully",
          transactionHash: receipt.transactionHash,
        });
      } catch (error) {
        console.error("Error in cancelOrder:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    deliverOrder: async (req, res) => {
      try {
        const { orderId } = req.params;
        const fromAddress = req.user.address;
        if (!web3.utils.isAddress(fromAddress)) {
          throw new Error("Invalid fromAddress");
        }
        const receipt = await contract.methods
          .deliverOrder(orderId)
          .send({ from: fromAddress });
        io.emit("ORDER_UPDATE", {
          type: "ORDER_UPDATE",
          orderId,
          status: "DELIVERED",
          details: receipt,
        });
        res.json({
          message: "Order delivered successfully",
          transactionHash: receipt.transactionHash,
        });
      } catch (error) {
        console.error("Error in deliverOrder:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    completeOrder: async (req, res) => {
      try {
        const { orderId } = req.params;
        const fromAddress = req.user.address;
        if (!web3.utils.isAddress(fromAddress)) {
          throw new Error("Invalid fromAddress");
        }
        const receipt = await contract.methods
          .completeOrder(orderId)
          .send({ from: fromAddress });
        io.emit("ORDER_UPDATE", {
          type: "ORDER_UPDATE",
          orderId,
          status: "COMPLETE",
          details: receipt,
        });
        res.json({
          message: "Order completed successfully",
          transactionHash: receipt.transactionHash,
        });
      } catch (error) {
        console.error("Error in completeOrder:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    disputeOrder: async (req, res) => {
        try {
          const { orderId } = req.params;
          const { coordinates, isServiceProvider } = req.body;
          const fromAddress = req.user.address;
          if (!web3.utils.isAddress(fromAddress)) {
            throw new Error("Invalid fromAddress");
          }
          const receipt = await contract.methods
            .disputeOrder(orderId, coordinates, isServiceProvider)
            .send({ from: fromAddress });
          io.emit("ORDER_UPDATE", {
            type: "ORDER_UPDATE",
            orderId,
            status: "DISPUTED",
            details: receipt,
          });
          res.json({
            message: "Order disputed successfully",
            transactionHash: receipt.transactionHash,
          });
        } catch (error) {
          console.error("Error in disputeOrder:", error);
          res.status(500).json({ error: error.toString() });
        }
      },
  
    releaseEscrow: async (req, res) => {
      try {
        const { orderId } = req.params;
        const { toServiceProvider } = req.body;
        const fromAddress = req.user.address; // Assuming only specific users can release escrow
        if (!web3.utils.isAddress(fromAddress)) {
          throw new Error("Invalid fromAddress");
        }
        const receipt = await contract.methods
          .releaseEscrow(orderId, toServiceProvider)
          .send({ from: fromAddress });
        io.emit("ORDER_UPDATE", {
          type: "ORDER_UPDATE",
          orderId,
          status: toServiceProvider ? "RELEASED_TO_PROVIDER" : "RELEASED_TO_USER",
          details: receipt,
        });
        res.json({
          message: "Escrow released successfully",
          transactionHash: receipt.transactionHash,
        });
      } catch (error) {
        console.error("Error in releaseEscrow:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    getOrderHistory: async (req, res) => {
      try {
        const userName = req.params.userName;
        const userAddress = await getUserAddressFromUserName(userName);
        const orderHistory = await contract.methods.getOrderHistory(userAddress).call();
        res.json(orderHistory);
      } catch (error) {
        console.error("Error in getOrderHistory:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    getDisputedOrders: async (req, res) => {
        try {
          const orders = await contract.methods.getDisputedOrders().call();
          const formattedOrders = orders.map((order) => ({
            ...order,
            amount: order.amount.toString(), // Ensure amount is a string
            userCoordinates: order.userCoordinates,
            serviceProviderCoordinates: order.serviceProviderCoordinates,
          }));
          res.json({ orders: formattedOrders });
        } catch (error) {
          console.error("Failed to fetch disputed orders:", error);
          res.status(500).send({ message: "Failed to fetch disputed orders." });
        }
      },

    getOrder: async (req, res) => {
      try {
        const orderId = req.params.orderId;
        const order = await contract.methods.getOrder(orderId).call();
        res.json(order);
      } catch (error) {
        console.error("Error in getOrder:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    getAvailableOrdersByLocation: async (req, res) => {
      try {
        const { latitude, longitude, radius } = req.query;
        const orders = await contract.methods.getAvailableOrdersByLocation(latitude, longitude, radius).call();
        res.json(orders);
      } catch (error) {
        console.error("Error in getAvailableOrdersByLocation:", error);
        res.status(500).json({ error: error.toString() });
      }
    },

    getFuelDeliveryOrders: async (req, res) => {
      try {
        const orders = await contract.methods.getFuelDeliveryOrders().call();
        res.json(orders);
      } catch (error) {
        console.error("Error in getFuelDeliveryOrders:", error);
        res.status(500).json({ error: error.toString() });
      }
    }
  };
};
