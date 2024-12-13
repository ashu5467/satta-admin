const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  canPlay: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },



    email: { type: String },  // New field for email
    dob: { type: Date }, // New field for Date of Birth
    googlePay: { type: String },
    phonePe: { type: String },
    paytm: { type: String },
    upi: { type: String },
  
  
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
