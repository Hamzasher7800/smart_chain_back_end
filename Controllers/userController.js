// const express = require('express')
// const connection = require('../Config/db')
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// // This is Register/Signup API

// exports.signup = async (req, res) => {
//   const bodypassword = req.body.password;
//   const encryptedPassword = await bcrypt.hash(bodypassword, saltRounds)

//   const query = 'INSERT INTO `users`(`id`, `name`, `email`, `password`, `user_type`, ) VALUES (?,?,?,?,?,?,?,?);';

//   // Value to be inserted

//   let id = req.body.id;
//   let name = req.body.First_name;

//   let password = encryptedPassword;
//   let email = req.body.email;
//   let user_type = req.body.user_type;

//   // Value to be inserted

//   // Creating queries
//   if (name != null  && email != null && password != null && user_type != null ) {
//     connection.query(query, [id,name, email, password, user_type,], (err, rows) => {
//       if (!err) {
//         res.json({
//           status: true,
//           Message: "Wellcome!!!........Your Successsfully signUp"
//         })
//       }

//       else
//         console.log(err);

//     });
//   } else {
//     res.json({
//       status: false,
//       Message: "some data is missing"
//     })
//   }

// }

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ status: false, message: 'Please provide both email and password.' });
//   }

//   try {
//     const query = 'SELECT * FROM users WHERE email = ?';
//     connection.query(query, [email], async (error, results, fields) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ status: false, message: 'Internal server error.' });
//       }

//       if (results.length > 0) {
//         const match = await bcrypt.compare(password, results[0].password);
//         if (match) {
//           return res.json({
//             status: true,
//             message: 'Welcome. You are successfully logged in.',
//             user_id: results[0].id,
//             user_type: results[0].user_type,
//             user_name : results[0].First_name +' '+results[0].last_name,
//           });
//         } else {
//           return res.status(400).json({ status: false, message: 'Incorrect password.' });
//         }
//       } else {
//         return res.status(404).json({ status: false, message: 'User not found.' });
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ status: false, message: 'Internal server error.' });
//   }
// };
const User = require("../Model/Users"); // Import User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Assuming you are using JSON Web Tokens
const saltRounds = 10;
require("dotenv").config(); // To access environment variables

// Signup API
// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password, user_type } = req.body;

//     if (!name || !email || !password || !user_type) {
//       return res.status(400).json({ status: false, message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ status: false, message: "Email already exists" });
//     }

//     const encryptedPassword = await bcrypt.hash(password, saltRounds);
//     const newUser = await User.create({ name, email, password: encryptedPassword, user_type });

//     // Email confirmation logic here (if implemented)

//     res.status(201).json({ status: true, message: "Successfully signed up" });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ status: false, message: "Error registering new user", error: error.message });
//   }
// };
// Signup API in authController.js or userController.js
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email belongs to an admin
    const isAdmin = email === "hamzasher7800@gmail.com.com"; // Replace with your admin email

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user", // Assign 'admin' or 'user' based on email
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully",user_name: newUser.name, role: newUser.role });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login API
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ status: false, message: 'Both email and password are required.' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ status: false, message: 'User not found.' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ status: false, message: 'Incorrect password.' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({
//       status: true,
//       message: 'Successfully logged in.',
//       token: token,
//       // other user details as needed
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ status: false, message: "Internal server error." });
//   }
// };
// Login API
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: true,
      message: "Successfully logged in.",
      token,
      user_name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming you're passing the user's ID as a URL parameter
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
