const Notification = require('../models/notification');

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  const { date, notification } = req.body;

  if (!date || !notification) {
    return res.status(400).json({ message: 'Date and notification are required' });
  }

  try {
    const newNotification = new Notification({ date, notification });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};

// Update an existing notification
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { date, notification } = req.body;

  if (!date || !notification) {
    return res.status(400).json({ message: 'Date and notification are required' });
  }

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { date, notification },
      { new: true } // Return the updated document
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};
