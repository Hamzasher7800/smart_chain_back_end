// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../Config/User");
// const crypto = require("crypto");
// // Adjust the path as needed

// require("dotenv").config();
// process.env.TZ = "Asia/Karachi";

// // ... Signup and Login methods

// exports.signup = async (req, res) => {
//   console.log("Request Body:", req.body);
//   const { name, email, password } = req.body;

//   // Check for missing fields
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   // Name validation: only letters and spaces
//   const nameRegex = /^[A-Za-z\s]+$/;
//   if (!nameRegex.test(name)) {
//     return res
//       .status(400)
//       .json({ message: "Name must contain only letters and spaces" });
//   }

//   // Email validation: basic format check
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: "Invalid email format" });
//   }

//   // Password validation: minimum 6 characters
//   if (password.length < 6) {
//     return res
//       .status(400)
//       .json({ message: "Password must be at least 6 characters long" });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = await User.create(name, email, hashedPassword);

//     if (!newUser || !newUser.id) {
//       console.error("Failed to create new user in database");
//       return res.status(500).json({ message: "Error registering new user" });
//     }

//     try {
//       const confirmationToken = crypto.randomBytes(20).toString("hex");
//       await User.saveConfirmationToken(newUser.id, confirmationToken);
//       const confirmUrl = `http://localhost:3000/confirm-email?token=${confirmationToken}`;
//       await transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to: email,
//         subject: "Email Confirmation",
//         html: `<p>Please confirm your email by clicking <a href="${confirmUrl}">here</a>.</p>`,
//       });
//     } catch (emailError) {
//       console.error("Error sending confirmation email:", emailError);
//     }

//     res.status(201).json({
//       message:
//         "User successfully registered. Please check your email to confirm.",
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res
//       .status(500)
//       .json({ message: "Error registering new user", error: error.message });
//   }
// };

// exports.confirmEmail = async (req, res) => {
//   const { token } = req.body;

//   try {
//     const user = await User.findByConfirmationToken(token);
//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired token." });
//     }

//     await User.confirmUserEmail(user.id); // Implement this method in your User model

//     res.json({ message: "Email confirmed successfully." });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   console.log("Resquest Body :", req.body);
//   const { email, password } = req.body;
//   const user = await User.findByEmail(email);
//   console.log("Found User:", user);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
//   const tokenExpirationDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "15m",
//   });
//   const tokenExpirationTime = new Date(
//     Date.now() + tokenExpirationDuration
//   ).toISOString();
//   res.json({
//     status: true,
//     message: "login Successful",
//     token: token,
//     tokenExpiration: tokenExpirationTime, // Send the expiration time
//     user_name: user.name,
//   });
//   console.log(req.body);
// };

// // Ensure you import the transporter at the top of your authController.js file
// const transporter = require("./emailTransporter"); // Adjust the path as needed
// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findByEmail(email);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Generate a JWT token for reset (you can alternatively use a random string)
//   const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "15m",
//   });

//   // Hash the token before storing it in the database
//   const hashedToken = await bcrypt.hash(resetToken, 12);

//   try {
//     const moment = require("moment-timezone");
//     const expirationDate = moment().tz("Asia/Karachi").add(1, "hours");

//     // Format it as a MySQL DATETIME string
//     const expirationDateString = expirationDate.format("YYYY-MM-DD HH:mm:ss");
//     await User.savePasswordResetToken(
//       user.id,
//       hashedToken,
//       expirationDateString
//     ); // Save token and expiration

//     const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: user.email,
//       subject: "Password Reset",
//       html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
//     });

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res.status(500).json({ message: "Error sending email" });
//   }
// };

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findByEmail(email);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Generate a JWT token for reset
//   const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   // Hash the token before storing it in the database
//   const hashedToken = await bcrypt.hash(resetToken, 12);

//   // Calculate expiration date/time for 1 hour from now
//   const expirationDate = new Date(Date.now() + 3600000);
//   // Format it as a MySQL DATETIME string
//   const expirationDateString = expirationDate
//     .toISOString()
//     .slice(0, 19)
//     .replace("T", " ");

//   try {
//     // Save token and expiration date in the database
//     await User.savePasswordResetToken(
//       user.id,
//       hashedToken,
//       expirationDateString
//     );

//     const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: user.email,
//       subject: "Password Reset",
//       html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
//     });

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     res
//       .status(500)
//       .json({ message: "Error sending email", error: error.message });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     // Verify the hashed token stored in the database
//     const isTokenValid = await bcrypt.compare(token, user.resetToken);
//     if (
//       !isTokenValid ||
//       !user.resetTokenExpiration ||
//       user.resetTokenExpiration < Date.now()
//     ) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     await User.updatePassword(user.id, hashedPassword);
//     await User.clearResetToken(user.id); // Clear the reset token from the database

//     res.json({ message: "Password has been reset" });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EmailConfirmation = require("../Config/email_confirmations");
const User = require("../Model/Users"); // MongoDB model for User
const crypto = require("crypto");
require("dotenv").config();

// exports.signup = async (req, res) => {
//   console.log("Request Body:", req.body);
//   const { name, email, password } = req.body;

//   //  Check for missing fields
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   // Name validation: only letters and spaces
//   const nameRegex = /^[A-Za-z\s]+$/;
//   if (!nameRegex.test(name)) {
//     return res
//       .status(400)
//       .json({ message: "Name must contain only letters and spaces" });
//   }

//   // Email validation: basic format check
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   if (!emailRegex.test(email)) {
//     return res.status(400).json({ message: "Invalid email format" });
//   }

//   // Password validation: minimum 6 characters
//   if (password.length < 6) {
//     return res
//       .status(400)
//       .json({ message: "Password must be at least 6 characters long" });
//   }
//   // Validation logic remains the same...

//   try {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({
//       name: name,
//       email: email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     console.log("New User Created:", newUser);

//       // Generate token for the new user, similar to the login process
//       const tokenExpirationDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
//       const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
//         expiresIn: "15m",
//       });
//       const tokenExpirationTime = new Date(
//         Date.now() + tokenExpirationDuration
//       ).toISOString();

//       res.status(201).json({
//         status: true,
//         message: "User successfully registered. Please check your email to confirm.",
//         token: token,
//         tokenExpiration: tokenExpirationTime,
//         user_name: newUser.name,
//       });

//     if (!newUser || !newUser.id) {
//       console.error("Failed to create new user in database");
//       return res.status(500).json({ message: "Error registering new user" });
//     }
//     try {
//       const confirmationToken = crypto.randomBytes(20).toString("hex");
//       // Here we use EmailConfirmation model to save the token
//       await EmailConfirmation.createToken(newUser._id, confirmationToken, Date.now() + 3600000); // Adjust expiration as necessary
//       const confirmUrl = `http://localhost:3000/confirm-email?token=${confirmationToken}`;

//       await transporter.sendMail({
//         from: process.env.EMAIL_FROM,
//         to: email,
//         subject: "Email Confirmation",
//         html: `<p>Please confirm your email by clicking <a href="${confirmUrl}">here</a>.</p>`,
//       });
//     } catch (emailError) {
//       console.error("Error sending confirmation email:", emailError);
//       // Optionally handle partial failure (user created but email not sent)
//     }

//     res.status(201).json({
//       message: "User successfully registered. Please check your email to confirm.",
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Error registering new user", error: error.message });
//   }
// };
///////######## SIGNUP API ##########/////////
exports.signup = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Name validation: only letters and spaces
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    return res
      .status(400)
      .json({ message: "Name must contain only letters and spaces" });
  }

  // Email validation: basic format check
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password validation: minimum 6 characters
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const role =
      email.toLowerCase() === "hamzasher7800@gmail.com".toLowerCase()
        ? "admin"
        : "user";

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // Add this line
    });

    const savedUser = await newUser.save();
    console.log("New User Created:", savedUser);

    // Generate token for the new user, similar to the login process
    const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    try {
      const confirmationToken = crypto.randomBytes(20).toString("hex");
      // Here we use EmailConfirmation model to save the token
      await EmailConfirmation.createToken(
        savedUser._id,
        confirmationToken,
        Date.now() + 3600000
      ); // Adjust expiration as necessary
      const confirmUrl = `http://localhost:3000/confirm-email?token=${confirmationToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Email Confirmation",
        html: `<p>Please confirm your email by clicking <a href="${confirmUrl}">here</a>.</p>`,
      });

      // Send a single response after all operations are successful
      res.status(201).json({
        status: true,
        message:
          "User successfully registered. Please check your email to confirm.",
        token: token,
        user_name: savedUser.name,
        role: savedUser.role, // Optionally include the role in the response
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // If email fails, consider how you want to handle this. You might still want to confirm user creation was successful.
      // Avoid sending another HTTP response here; just log the error or handle it internally.
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exist." });
    }
    console.error("Signup Error:", error);
    // Make sure to only reach this point if no response has been sent yet.
    res.status(500) .json({ message: "Error registering new user", error: error.message });
  }
};


///#### ConfirmEmail API#######///////
exports.confirmEmail = async (req, res) => {
  console.log("Confirm Email Request:", req.body);
  const { token } = req.body;

  try {
    const user = await User.findOne({ confirmationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    user.isEmailConfirmed = true;
    user.confirmationToken = null;
    await user.save();

    res.json({ message: "Email confirmed successfully." });
  } catch (error) {
    console.error("Confirm Email Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

////////######## LOGIN API #########//////////
exports.login = async (req, res) => {
  console.log("Login Request:", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log("Found User:", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokenExpirationDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const tokenExpirationTime = new Date(
      Date.now() + tokenExpirationDuration
    ).toISOString();

    res.json({
      status: true,
      message: "Login successful",
      token: token,
      tokenExpiration: tokenExpirationTime,
      user_name: user.name,
      role: user.role, // Include this
    });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// // Ensure you import the transporter at the top of your authController.js file
const transporter = require("./emailTransporter"); // Adjust the path as needed
// For Forgot Password and Reset Password, the try-catch logic and console logs follow a similar pattern...

//######### FORGOT PASSWORD #########///////////
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT token for reset
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Hash the token before storing it in the database
    const hashedToken = await bcrypt.hash(resetToken, 12);

    // Calculate expiration date/time for 1 hour from now
    const expirationDate = moment().tz("Asia/Karachi").add(1, "hours");
    const expirationDateString = expirationDate.format("YYYY-MM-DD HH:mm:ss");

    // Save token and expiration date in the database
    await User.savePasswordResetToken(
      user.id,
      hashedToken,
      expirationDateString
    );

    // Send password reset email
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
    res
      .status(500)
      .json({ message: "Error processing your request", error: error.message });
  }
};
/////////############## RESET PASSWORD API ########////////////
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Decode the token to find the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    // If user doesn't exist or token is invalid, return error
    if (
      !user ||
      !(await bcrypt.compare(token, user.resetToken)) ||
      user.resetTokenExpiration < Date.now()
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and update user's document
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    // Send response
    res.json({ message: "Password has been reset" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
