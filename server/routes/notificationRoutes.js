const express = require('express');
const {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} = require('../controllers/notificationController');

const router = express.Router();

// Get all notifications
router.get('/', getNotifications);

// Create a new notification
router.post('/', createNotification);

// Update an existing notification
router.put('/:id', updateNotification);

// Delete a notification
router.delete('/:id', deleteNotification);

module.exports = router;
