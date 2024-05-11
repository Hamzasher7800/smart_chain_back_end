const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    serviceProviderId: {
        type: String,
        required: false // Initially null, updated when a service provider accepts the order
    },
    serviceType: {
        type: String,
        required: true,
        enum: ['fuel', 'charging'] // Assuming these are the two types of services you offer
    },
    amount: {
        type: Number,
        required: true
    },
    coordinates: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
      
    },
    status: {
        type: String,
        required: true,
        enum: ['booked', 'accepted', 'delivered', 'complete', 'disputed', 'cancelled'],
        default: 'booked'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
