// const express= require('express')
// const router = express.Router()

// const{ login, signup}=require('../Controllers/userController')

// router.route('/signup').post((req, res) => {
//     console.log("Signup route hit", req.body);
//     signup(req, res);
// });
// router.route('/login').post(login)

// router.route('/signup').post(signup)

// module.exports= router;
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
// Assume you have middleware to verify if the user is authenticated
// const authMiddleware = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/authMiddleware');
// Route to update user profile
router.get('/profile',verifyToken, userController.getProfile);
router.put('/profile', verifyToken,userController.updateProfile);

module.exports = router;
