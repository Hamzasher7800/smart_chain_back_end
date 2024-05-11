// GeoService.js
const Order = require('../Model/orderModel');
const Subscription = require('../Model/SubscribtionModel'); // Make sure you have this model
const notificationService = require('../Services/ionotificationservices'); // Assume this service exists for notifying users

class GeoService {
    constructor() {}

    async findNearbyOrders(longitude, latitude, radius) {
        const radiusInMeters = radius * 1000; // Convert km to meters
        try {
            const orders = await Order.find({
                'coordinates': {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: radiusInMeters
                    }
                },
                status: 'booked'
            });

            return orders;
        } catch (error) {
            console.error("Error finding nearby orders:", error);
            throw error;
        }
    }

    async subscribeToNotifications(serviceProviderId, longitude, latitude, radius) {
        const subscription = new Subscription({
          serviceProviderId,
          coordinates: { type: "Point", coordinates: [longitude, latitude] },
          radius
        });
        await subscription.save();
        console.log(`Service provider ${serviceProviderId} subscribed for notifications.`);
    }

    async unsubscribeFromNotifications(serviceProviderId) {
        await Subscription.deleteMany({ serviceProviderId });
        console.log(`Service provider ${serviceProviderId} unsubscribed from notifications.`);
    }

    async notifyServiceProvidersAboutNewOrder(orderId) {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }

        // Implement fetchSubscriptionsNearOrder logic here if needed before notifying
        // This is just a placeholder to illustrate the method's purpose
        const subscriptions = await this.fetchSubscriptionsNearOrder(order._id);

        subscriptions.forEach(subscription => {
            notificationService.sendNotification(subscription.serviceProviderId, `New order available: ${orderId}`);
        });
    }

    async acceptOrder(orderId, serviceProviderId) {
        const order = await Order.findByIdAndUpdate(orderId, {
            status: 'accepted',
            serviceProviderId: serviceProviderId
        }, {new: true});

        notificationService.sendNotification(order.userId, `Your order ${orderId} has been accepted by a service provider.`);
        
        return order;
    }

    async fetchSubscriptionsNearOrder(orderId) {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error('Order not found');
        }
    
        const subscriptions = await Subscription.find({
          coordinates: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [order.coordinates.longitude, order.coordinates.latitude]
              },
              $maxDistance: order.radius // Assuming 'radius' is a property of 'order' to specify search area
            }
          },
          status: 'booked' // Assuming you want to notify about booked orders only
        });
    
        // Notify each service provider about the new order
        subscriptions.forEach(subscription => {
          notificationService.sendNotification(subscription.serviceProviderId, {
            message: 'New order available near you',
            orderId: order._id,
            orderDetails: {
              amount: order.amount,
              serviceType: order.serviceType,
              coordinates: order.coordinates
            }
          });
        });
      }
}

module.exports = new GeoService();
