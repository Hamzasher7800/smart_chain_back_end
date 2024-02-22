const mongoose = require('mongoose');
const User = require('../Model/Users'); // Update the path to where your User model is defined

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/db'; // Replace with your MongoDB connection string

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Function to check signup entries
const checkSignupEntries = async () => {
  try {
    const users = await User.find({});
    console.log('Signup Entries:', users);
  } catch (error) {
    console.error('Error fetching signup entries:', error);
  }
};
// Execute the function
checkSignupEntries();
