const mongoose = require('mongoose');

const emailConfirmationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date
});

// Save a confirmation token
emailConfirmationSchema.statics.createToken = function(userId, token, expiresAt) {
    const emailConfirmation = new this({ userId, token, expiresAt });
    return emailConfirmation.save();
};

// Find a user by their confirmation token
emailConfirmationSchema.statics.findByToken = function(token) {
    return this.findOne({ token }).populate('userId');
};

// Confirm a user's email
emailConfirmationSchema.statics.confirmUserEmail = function(userId) {
    return this.findOneAndUpdate({ userId }, { $unset: { token: 1, expiresAt: 1 } });
};

const EmailConfirmation = mongoose.model('EmailConfirmation', emailConfirmationSchema);

module.exports = EmailConfirmation;
