//  require('dotenv').config();
const mysql = require("mysql");
const util = require('util');

// create a new MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'user',
  password: 'new_password' ,
  timezone: 'Asia/Karachi'
});
// connect to the MySQL database
pool.getConnection ((error,connection) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to database!");
    connection.release();
  }
});
pool.query = util.promisify(pool.query);
// close the MySQL connection
// connection.end();

module.exports = pool;
