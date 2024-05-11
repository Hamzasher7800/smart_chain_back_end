// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next(); // Allow preflight requests
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        const statusCode = error.name === 'TokenExpiredError' ? 401 : 400;
        res.status(statusCode).json({ message: `Authentication failed: ${error.message}` });
    }
};

module.exports = verifyToken;
