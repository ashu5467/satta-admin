// models/resultModel.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  date: { type: String, required: true },
  market: { type: String, required: true },
  result: { type: String, required: true },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
