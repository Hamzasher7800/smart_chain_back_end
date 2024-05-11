const ServiceRequest = require('../models/ServiceRequest');
const ServiceProvider = require('../models/ServiceProvider');

exports.matchRequestWithProvider = async (requestId) => {
    try {
        const request = await ServiceRequest.findById(requestId);
        if (!request) {
            console.log('Service request not found');
            return;
        }

        // Example: Find the first available provider. You should implement actual matching logic.
        const provider = await ServiceProvider.findOne({ available: true });
        if (!provider) {
            console.log('No available providers found');
            return;
        }

        // Update the request with the matched provider
        request.provider = provider._id;
        request.status = 'Accepted';
        await request.save();

        console.log(`Matched request ${requestId} with provider ${provider._id}`);
        // Optionally, send notifications to the user and provider here.
    } catch (error) {
        console.error('Error matching service request with provider:', error);
    }
};
