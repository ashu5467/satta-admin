// models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  name: String,
  data: Buffer, // Store the image as a buffer
});

module.exports = mongoose.model('banner', bannerSchema);
