const Order = require('../models/OrderModel'); // Adjust path as necessary
const web3 = require('../services/web3'); // Your web3 service setup
const contract = require('../services/contractInstance'); // Your contract instance module

const ProviderController = {
 // Fetch available orders for providers. This might involve geographical filtering or other business logic
 getAvailableOrders: async (req, res) => {
  // Example: Fetch only 'booked' orders. You might want to adjust this method based on your application needs
  try {
    const availableOrders = await Order.find({ status: 'booked' });
    res.json(availableOrders);
  } catch (error) {
    console.error("Failed to fetch available orders", error);
    res.status(500).send("Failed to fetch available orders");
  }
},

// Accept an order. This would change the order status and potentially trigger a smart contract method
acceptOrder: async (req, res) => {
  const { orderId } = req.params;
  const { providerId } = req.body; // Assuming the provider's ID is sent in the request

  try {
    // Example: Update the order in your database
    const order = await Order.findByIdAndUpdate(orderId, { status: 'accepted', serviceProviderId: providerId }, { new: true });

    if (!order) {
      return res.status(404).send("Order not found");
    }

    // Example: Call a smart contract method to reflect this acceptance on-chain
    const receipt = await contract.methods.acceptOrder(orderId).send({ from: providerId });
    console.log("Order accepted on-chain with receipt: ", receipt);

    res.json(order);
  } catch (error) {
    console.error("Error accepting order", error);
    res.status(500).send("Failed to accept order");
  }
},

  // Service provider marks an order as delivered
  deliverOrder: async (req, res) => {
    const { orderId } = req.params;
    const { providerId } = req.body; // Assuming the provider's ID is sent in the request

    try {
      // Update order status in your database
      const order = await Order.findByIdAndUpdate(orderId, { status: 'delivered' }, { new: true });

      // Call smart contract method
      const receipt = await contract.methods.deliverOrder(orderId).send({ from: providerId });
      console.log("Order marked as delivered on-chain with receipt: ", receipt);

      res.json({ message: "Order delivered successfully", order });
    } catch (error) {
      console.error("Error delivering order", error);
      res.status(500).send("Failed to deliver order");
    }
  },

  // Complete an order
  completeOrder: async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.body; // The user who completes the order

    try {
      // Update order status in your database
      const order = await Order.findByIdAndUpdate(orderId, { status: 'complete' }, { new: true });

      // Call smart contract method
      const receipt = await contract.methods.completeOrder(orderId).send({ from: userId });
      console.log("Order completed on-chain with receipt: ", receipt);

      res.json({ message: "Order completed successfully", order });
    } catch (error) {
      console.error("Error completing order", error);
      res.status(500).send("Failed to complete order");
    }
  },

  // Dispute an order
  disputeOrder: async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.body; // The user who disputes the order

    try {
      // Update order status in your database
      const order = await Order.findByIdAndUpdate(orderId, { status: 'disputed' }, { new: true });

      // Call smart contract method
      const receipt = await contract.methods.disputeOrder(orderId).send({ from: userId });
      console.log("Order disputed on-chain with receipt: ", receipt);

      res.json({ message: "Order disputed successfully", order });
    } catch (error) {
      console.error("Error disputing order", error);
      res.status(500).send("Failed to dispute order");
    }
  },

  // Release escrow (likely to be restricted to the contract owner or an admin)
  releaseEscrow: async (req, res) => {
    const { orderId } = req.params;
    const { toServiceProvider } = req.body; // Boolean indicating whom to release the funds to

    try {
      // Call smart contract method
      const receipt = await contract.methods.releaseEscrow(orderId, toServiceProvider).send({ from: web3.eth.defaultAccount }); // Make sure this is the owner/admin account
      console.log("Escrow released on-chain with receipt: ", receipt);

      res.json({ message: "Escrow released successfully" });
    } catch (error) {
      console.error("Error releasing escrow", error);
      res.status(500).send("Failed to release escrow");
    }
  },

  // Additional methods as needed based on your contract...
};

module.exports = ProviderController;
