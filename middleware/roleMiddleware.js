const requireAdmin = (req, res, next) => {
    // Check if the role information is present and is 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. You must be an admin to access this route.' });
    }
};
module.exports = requireAdmin;
