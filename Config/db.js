// //  require('dotenv').config();
// const mysql = require("mysql");
// const util = require('util');
// require("dotenv").config();
// // create a new MySQL connection
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database:process.env.DB_DATABASE ,
//   password: process.env.DB_PASSWORD ,
//   timezone: 'Asia/Karachi'
// });
// // connect to the MySQL database
// pool.getConnection ((error,connection) => {
//   if (error) {
//     console.error("Error connecting to MySQL database:", error);
//   } else {
//     console.log("Connected to database!");
//     connection.release();
//   }
// });
// pool.query = util.promisify(pool.query);
// // close the MySQL connection
// // connection.end();

// module.exports = pool;



const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;

