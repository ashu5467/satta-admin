// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  canPlay: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
