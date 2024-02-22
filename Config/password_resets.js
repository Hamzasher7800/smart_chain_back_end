const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Save a password reset token
passwordResetSchema.statics.createToken = function(userId, token) {
    const passwordReset = new this({ userId, token });
    return passwordReset.save();
};

// Find a password reset token
passwordResetSchema.statics.findByToken = function(token) {
    return this.findOne({ token }).populate('userId');
};

// Clear a reset token
passwordResetSchema.statics.clearResetToken = function(userId) {
    return this.findOneAndDelete({ userId });
};

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;
