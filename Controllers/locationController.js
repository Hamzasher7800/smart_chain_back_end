// controllers/locationController.js
const UserLocation = require('../Model/userLocationModel');

exports.updateUserLocation = async (req, res, next) => {
    const { userId, latitude, longitude } = req.body;

    try {
        await UserLocation.updateLocation(userId, latitude, longitude);
        res.status(200).json({ message: 'Location updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error: error.message });
    }
};

exports.getUserLocation = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const location = await UserLocation.findLocationByUserId(userId);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving location', error: error.message });
    }
};
