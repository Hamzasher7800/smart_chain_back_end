const escrowService = require('../services/escrowService');

exports.createOrder = async (req, res) => {
  try {
    const { seller, amount, serviceType } = req.body;
    const result = await escrowService.createOrder(req.user, seller, amount, serviceType); // Assuming req.user is the buyer
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.confirmDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;
    const result = await escrowService.confirmDelivery(orderId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const result = await escrowService.cancelOrder(orderId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
