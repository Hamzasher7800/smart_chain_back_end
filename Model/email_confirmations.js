const mongoose = require('mongoose');

const emailConfirmationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date
});

module.exports = mongoose.model('EmailConfirmation', emailConfirmationSchema);
