const db = require('./db');

const User = {
    async create(name, email, password) {
        const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
        // Assuming result is an object where the needed data is in a 'rows' property
        return result.rows;
    },

    async findByEmail(email) {
        console.log("Querying for email:", email);
        try {
            const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (!result || result.length === 0) {
                return null;
            }
            return result[0]; // Assuming the first element contains the user data
        } catch (error) {
            console.error("Query Error:", error);
            throw error;
        }
    },

    async findById(userId) {
        const result = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (!result || result.length === 0) {
            return null;
        }
        return result[0][0];
    },

    async updatePassword(userId, newPassword) {
        await db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);
    },

    async savePasswordResetToken(userId, token, expiration) {
        const query = 'UPDATE users SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?';
        await db.query(query, [token, expiration, userId]);
    },
    
    async clearResetToken(userId) {
        await db.query('UPDATE users SET resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?', [userId]);
    }
};

module.exports = User;
