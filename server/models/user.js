const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  canPlay: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },

  role: { type: String, enum: ["User", "Admin"], default: "User" },



    email: { type: String },  // New field for email
    dob: { type: Date }, // New field for Date of Birth
    googlePay: { type: String },
    phonePe: { type: String },
    paytm: { type: String },
    upi: { type: String },
  

     // Transaction History
  transactions: [
    {
      date: { type: Date, required: true, default: Date.now }, // Transaction date
      description: { type: String, required: true }, // Description of the transaction
      points: { type: Number, required: true }, // Points spent in the transaction
      balance: { type: Number, required: true }, // Remaining balance after the transaction
    },
  ],



   // Game rates for each user
   gameRates: {
    Single: { type: Number, default: 9.50 },
    Jodi: { type: Number, default: 95.00 },
    SinglePana: { type: Number, default: 12.00 },
    DoublePana: { type: Number, default: 22.00 },
    TriplePana: { type: Number, default: 32.00 },
    HalfSangam: { type: Number, default: 150.00 },
    FullSangam: { type: Number, default: 1000.00 },
  },
  
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
