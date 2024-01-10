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
