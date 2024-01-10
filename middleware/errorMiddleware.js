module.exports = (error, req, res, next) => {
    res.status(error.status || 8081);
    res.json({ message: error.message || 'Internal Server Error' });
};
