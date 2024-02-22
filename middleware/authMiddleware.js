// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Token is usually sent in the Authorization header in the format 'Bearer <token>'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Split the header value and get the token part
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        // Verify the token with the JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded payload to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
        }
        // Handle any error that occurred during verification
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
