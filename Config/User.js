// const db = require('./db');

// const User = {
//     async create(name, email, password) {
//         try {
//             const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
//             const userId = result.insertId; // Get the ID of the newly inserted user
//             return { id: userId }; // Return an object with the new user's ID
//         } catch (error) {
//             console.error("Error in creating user:", error);
//             throw error; // Rethrow the error to be handled in the calling function
//         }
//     },

//     async findByEmail(email) {
//         console.log("Querying for email:", email);
//         try {
//             const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//             if (!result || result.length === 0) {
//                 return null;
//             }
//             return result[0]; // Assuming the first element contains the user data
//         } catch (error) {
//             console.error("Query Error:", error);
//             throw error;
//         }
//     },

//     async findById(userId) {
//         const result = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
//         if (!result || result.length === 0) {
//             return null;
//         }
//         return result[0][0];
//     },

//     async updatePassword(userId, newPassword) {
//         await db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);
//     },

//     async savePasswordResetToken(userId, token, expiration) {
//         const query = 'UPDATE users SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?';
//         await db.query(query, [token, expiration, userId]);
//     },
    
//     async clearResetToken(userId) {
//         await db.query('UPDATE users SET resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?', [userId]);
//     },

//     //Save ConfirmationToken
//     saveConfirmationToken: async (userId, token) => {
//         const query = 'INSERT INTO email_confirmations (userId, token) VALUES (?, ?)';
//         await db.query(query, [userId, token]);
//     },

//     // Find a user by their confirmation token
//     findByConfirmationToken: async (token) => {
//         const query = 'SELECT u.* FROM users u INNER JOIN email_confirmations ec ON u.id = ec.userId WHERE ec.token = ?';
//         const result = await db.query(query, [token]);
//         return result[0]; // Assuming the first result is the user
//     },

//     // Confirm the user's email
//     confirmUserEmail: async (userId) => {
//         const query = 'UPDATE users SET isEmailConfirmed = true, confirmationToken = NULL WHERE id = ?';
//         await db.query(query, [userId]);
//     },
// };





// module.exports = User;


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    resetToken: String,
    resetTokenExpiration: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    role: { type: String, default: 'user' }, // 'admin' for admin users

});

// Hash the user's password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Create a new user
userSchema.statics.create = async function(name, email, password) {
    const user = new this({ name, email, password });
    await user.save();
    return user;
};

// Find a user by email
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// Find a user by ID
userSchema.statics.findById = function(userId) {
    return this.findById(userId);
};

// Update a user's password
userSchema.statics.updatePassword = function(userId, newPassword) {
    return this.findByIdAndUpdate(userId, { password: newPassword });
};

// Save a password reset token
userSchema.statics.savePasswordResetToken = function(userId, token, expiration) {
    return this.findByIdAndUpdate(userId, { resetToken: token, resetTokenExpiration: expiration });
};

// Clear a reset token
userSchema.statics.clearResetToken = function(userId) {
    return this.findByIdAndUpdate(userId, { resetToken: null, resetTokenExpiration: null });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
