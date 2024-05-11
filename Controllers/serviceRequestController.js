// const ServiceRequest = require('../Model/serviceRequest');
// const User = require('../Model/Users'); // Ensure you have a user model

// exports.createRequest = async (req, res) => {
//     try {
//         const { userName, details, serviceType } = req.body;
        
//         // Find the user by userName to get the userId
//         const user = await User.findOne({ name: userName });
//         console.log('Found User:', user)
//         if (!user) {
//             return res.status(404).send('User not found.');
//         }

//         const newRequest = new ServiceRequest({
//             userName: user.name, // Using the found user's _id
//             details: details,
//             serviceType: serviceType, // Assuming your ServiceRequest model can accept this
//         });

//         await newRequest.save();
//         res.status(201).json(newRequest);
//     } catch (error) {
//         console.error('Error creating service request:', error);
//         res.status(500).send('Server error');
//     }
// };

// // Get service requests for a user
// exports.getUserRequests = async (req, res) => {
//   try {
//     const { userName } = req.params;
//     const requests = await ServiceRequest.find({ name: userName });
//     res.status(200).json(requests);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };

// // Update a service request status
// exports.updateRequestStatus = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const { status } = req.body; // e.g., "accepted", "completed"
//     const updatedRequest = await ServiceRequest.findByIdAndUpdate(requestId, { status }, { new: true });
//     if (!updatedRequest) {
//       return res.status(404).send('Request not found.');
//     }
//     res.status(200).json(updatedRequest);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };
// // backend/controllers/requestController.js
// // const ServiceRequest = require('../models/ServiceRequest');

// module.exports.cancelServiceRequest = async (req, res) => {
//     const { requestId } = req.params;
//     try {
//         const request = await ServiceRequest.findById(requestId);

//         if (!request) {
//             return res.status(404).json({ message: 'Request not found' });
//         }

//         // Assuming you have a status field to update
//         request.status = 'Cancelled';
//         await request.save();

//         res.json(request); // Send back the updated request
//     } catch (error) {
//         res.status(500).json({ message: 'Error cancelling request', error: error.message });
//     }
// };



const ServiceRequest = require('../Models/ServiceRequests');

exports.createServiceRequest = async (req, res) => {
    try {
        const { location, fuelType, quantity, chargingLevel, duration } = req.body;
        let serviceType, detail;

        // Determine the service type and details based on the request path
        if (req.path.includes('fuel-requests')) {
            serviceType = 'Fuel';
            detail = { fuelType, quantity: Number(quantity) };
        } else if (req.path.includes('charging-requests')) {
            serviceType = 'Charging';
            detail = { chargingLevel, duration: Number(duration) };
        } else {
            return res.status(400).json({ message: "Invalid service request type." });
        }

        // Create a new service request with the determined type and details
        const newRequest = new ServiceRequest({
            location,
            serviceType,
            detail
        });

        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (error) {
        console.error("Error creating service request:", error);
        res.status(500).json({ message: "Failed to create service request." });
    }
};
