const escrowService = require('../Services/escrowServices');

exports.createOrder = async (req, res) => {
    try {
        console.log("Received createOrder request:", req.body);
        const { seller, amount, serviceType } = req.body;
        if (!req.user || !req.user.id) {
            console.error("User information missing in createOrder request");
            return res.status(400).json({ error: "User information missing" });
        }
        const result = await escrowService.createOrder(req.user.id, seller, amount, serviceType);
        res.json(result);
    } catch (error) {
        console.error('Error in createOrder controller:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.confirmDelivery = async (req, res) => {
    try {
        console.log("Received confirmDelivery request:", req.body);
        const { orderId } = req.body;
        const result = await escrowService.confirmDelivery(orderId);
        res.json(result);
    } catch (error) {
        console.error('Error in confirmDelivery controller:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        console.log("Received cancelOrder request:", req.body);
        const { orderId } = req.body;
        const result = await escrowService.cancelOrder(orderId);
        res.json(result);
    } catch (error) {
        console.error('Error in cancelOrder controller:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        console.log("Received getOrders request");
        const orders = await escrowService.getOrders();
        res.json(orders);
    } catch (error) {
        console.error('Error in getOrders controller:', error);
        res.status(500).json({ error: error.message });
    }
};
