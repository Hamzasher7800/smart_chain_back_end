const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model for service providers
    },
    coordinates: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number], // Format [longitude, latitude]
            required: true
        }
    },
    radius: {
        type: Number, // The maximum distance (in meters) the service provider is willing to travel for a job
        required: true
    }
}, {
    timestamps: true
});

// Ensure proper indexing for geospatial queries
subscriptionSchema.index({ coordinates: '2dsphere' });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
