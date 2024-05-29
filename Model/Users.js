// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     name: { type: String, required: true },
//     role: { type: String, required: true, default: 'user' },
//     ethereumAddress: { type: String, required: true },
//     bio: String,
//     profilePicture: String,
//     latitude: {
//         type: Number,
//         required: true
//       },
//       longitude: {
//         type: Number,
//         required: true
//       },
//       isServiceProvider: {
//         type: Boolean,
//         default: false
//       },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', userSchema);






const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  ethereumAddress: { type: String, required: true },
  bio: String,
  profilePicture: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isServiceProvider: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
