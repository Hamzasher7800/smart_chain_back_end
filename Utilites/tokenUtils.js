// utils/tokenUtils.js
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user.
 * @param {Object} payload User identification data.
 * @returns {String} JWT Token.
 */
exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiresIn as needed
};

/**
 * Verifies a JWT token's validity and returns the decoded payload.
 * @param {String} token JWT Token.
 * @returns {Object} Decoded payload or null if invalid.
 */
exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};