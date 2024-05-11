/**
 * Calculates the great-circle distance between two points, with
 * the Haversine formula.
 * @param {Object} point1 { latitude: Number, longitude: Number }
 * @param {Object} point2 { latitude: Number, longitude: Number }
 * @returns {Number} Distance in kilometers.
 */
exports.calculateDistance = (point1, point2) => {
    const RADIUS_OF_EARTH_KM = 6371; // Earth's radius in kilometers

    const lat1 = point1.latitude;
    const lon1 = point1.longitude;
    const lat2 = point2.latitude;
    const lon2 = point2.longitude;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIUS_OF_EARTH_KM * c;
};

/**
 * Converts degrees to radians.
 * @param {Number} degrees
 * @returns {Number} Radians.
 */
const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};
