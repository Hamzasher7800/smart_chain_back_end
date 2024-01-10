const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Config/User");

require('dotenv').config();
process.env.TZ = 'Asia/Karachi';

// ... Signup and Login methods

exports.signup = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create(name, email, hashedPassword);
    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    console.error("Signup Error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      // Handle duplicate entry (e.g., existing email)
      return res.status(409).json({ message: "Email already in use" });
    } else {
      // Handle other possible errors
      res
        .status(500)
        .json({ message: "Error registering new user", error: error.message });
    }
  }
};

exports.login = async (req, res) => {
  console.log("Resquest Body :", req.body);
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  console.log("Found User:", user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, 'mySuperSecretKey12345!@#$%^&*()_+Secret1234567890', {
    expiresIn: "1h",
  });
  res.json({ token });
  console.log(req.body);
};

// Ensure you import the transporter at the top of your authController.js file
const transporter = require("./emailTransporter"); // Adjust the path as needed
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a JWT token for reset (you can alternatively use a random string)
  const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Hash the token before storing it in the database
  const hashedToken = await bcrypt.hash(resetToken, 12);

  try {
    const moment = require('moment-timezone');
        const expirationDate = moment().tz('Asia/Karachi').add(1, 'hours');

        // Format it as a MySQL DATETIME string
        const expirationDateString = expirationDate.format('YYYY-MM-DD HH:mm:ss');
    await User.savePasswordResetToken(
      user.id,
      hashedToken,
      expirationDateString
    ); // Save token and expiration

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};


// exports.forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findByEmail(email);
  
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
  
//     // Generate a JWT token for reset
//     const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
  
//     // Hash the token before storing it in the database
//     const hashedToken = await bcrypt.hash(resetToken, 12);
  
//     // Calculate expiration date/time for 1 hour from now
//     const expirationDate = new Date(Date.now() + 3600000);
//     // Format it as a MySQL DATETIME string
//     const expirationDateString = expirationDate.toISOString().slice(0, 19).replace('T', ' ');
  
//     try {
//       // Save token and expiration date in the database
//       await User.savePasswordResetToken(user.id, hashedToken, expirationDateString);
  
//       const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
//       await transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to: user.email,
//         subject: "Password Reset",
//         html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
//       });
  
//       res.json({ message: "Password reset email sent" });
//     } catch (error) {
//       console.error("Forgot Password Error:", error);
//       res.status(500).json({ message: "Error sending email", error: error.message });
//     }
//   };
  

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    // Verify the hashed token stored in the database
    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    if (
      !isTokenValid ||
      !user.resetTokenExpiration ||
      user.resetTokenExpiration < Date.now()
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updatePassword(user.id, hashedPassword);
    await User.clearResetToken(user.id); // Clear the reset token from the database

    res.json({ message: "Password has been reset" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
