const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  upiOption: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String, // Reference to User model
    ref: 'User',
    required: true,
  },
  mobile: {
    type: String,
    required: true, // You can also make this optional based on your use case
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
