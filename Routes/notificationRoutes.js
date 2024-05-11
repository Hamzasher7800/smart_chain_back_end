const webPush = require('web-push');

router.post('/notify', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'icons/icon-192x192.png',
    },
  };

  sendNotificationToAllSubscribers(notificationPayload);
  res.status(200).json({ message: 'Notifications sent!' });
});

async function sendNotificationToAllSubscribers(payload) {
  const subscriptions = await getAllSubscriptionsFromDatabase();
  subscriptions.forEach(subscription => {
    webPush.sendNotification(subscription, JSON.stringify(payload))
    .catch(error => console.error('Error sending notification:', error));
  });
}

module.exports = router;
