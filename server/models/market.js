const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
  },
}, { timestamps: true });

const Market = mongoose.model('Market', marketSchema);

module.exports = Market;
