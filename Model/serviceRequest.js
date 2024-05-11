// const mongoose = require('mongoose');

// const serviceRequestSchema = new mongoose.Schema({
//     // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     userName: { type: String, required: true },
//     details: { type: String, required: true }, // Simplified for example; consider specifying further
//     status: { type: String, required: true, default: 'Pending' }, // e.g., Pending, Accepted, Completed
//     provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider' }, // Link to the provider who accepted
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    location: String,
    serviceType: {
        type: String,
        enum: ['Fuel', 'Charging'],
        required: true
    },
    detail: {
        fuelType: String,
        quantity: Number,
        chargingLevel: String,
        duration: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
