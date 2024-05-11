// middleware/roleCheck.js
const jwt = require('jsonwebtoken');

const roleCheck = (roles) => (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
    }
};

module.exports = roleCheck;
