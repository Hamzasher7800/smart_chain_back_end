const express = require('express');
const router = express.Router();

router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  // Store this subscription object in your database
  saveSubscriptionToDatabase(subscription);
  res.status(201).json({ message: 'Subscription added!' });
});

module.exports = router;
