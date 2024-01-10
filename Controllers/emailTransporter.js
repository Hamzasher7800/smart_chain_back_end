const nodemailer = require('nodemailer');

// Load environment variables from .env file
require('dotenv').config();

console.log('Email Service:', process.env.EMAIL_SERVICE);
console.log('Email Username:', process.env.EMAIL_USERNAME);

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USERNAME, // Your email address
        pass: process.env.EMAIL_PASSWORD  // Your email password
    }
});

module.exports = transporter;
