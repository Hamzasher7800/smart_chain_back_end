const User = require('../Model/Users');
const Order = require('../Model/orderModel');
const aggregateOrdersByMonth = async (status) => {
    return await Order.aggregate([
      { $match: { status: status } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
          month: { $first: { $dateToString: { format: "%Y-%m", date: "$createdAt" } } }
        }
      },
      { $sort: { "_id": 1 } }, // Sort by month number
      {
        $project: {
          _id: 0,
          month: 1,
          count: 1
        }
      }
    ]);
  };
// Get total number of users
exports.getUserCount = async (req, res) => {
    console.log("Fetching user count");
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).send(error.message);
  }
};

// Get count of completed orders
// Get count of completed orders by month
exports.getCompletedOrdersCount = async (req, res) => {
    try {
      const ordersByMonth = await aggregateOrdersByMonth('complete');
      res.json({ orders: ordersByMonth });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Get count of disputed orders by month
  exports.getDisputedOrdersCount = async (req, res) => {
    try {
      const ordersByMonth = await aggregateOrdersByMonth('disputed');
      res.json({ orders: ordersByMonth });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };