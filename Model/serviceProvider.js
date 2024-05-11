const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    serviceType: { type: String, required: true }, // e.g., Energy Sharing, Fuel Delivery
    available: { type: Boolean, required: true, default: true },
    location: { type: String, required: true }, // Consider using GeoJSON for real applications
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
