// models/userLocationModel.js
const db = require('../Config/db');

class UserLocation {
    static async updateLocation(userId, latitude, longitude) {
        try {
            await db.execute(
                'INSERT INTO UserLocations (UserID, Latitude, Longitude) ' +
                'VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Latitude = ?, Longitude = ?', 
                [userId, latitude, longitude, latitude, longitude]
            );
        } catch (error) {
            throw error;
        }
    }

    static async findLocationByUserId(userId) {
        try {
            const [location] = await db.execute(
                'SELECT Latitude, Longitude FROM UserLocations WHERE UserID = ?', 
                [userId]
            );
            return location[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserLocation;
