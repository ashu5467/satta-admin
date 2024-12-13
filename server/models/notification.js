const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  date: {
    type: String, // Use String to accommodate specific formats from the front end.
    required: true,
  },
  notification: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
