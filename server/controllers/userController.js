// controllers/userController.js
const User = require('../models/user');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Create a new user
// Create a new user
const createUser = async (req, res) => {
    try {
      const { name, mobile, points, canPlay, status } = req.body;
  
      // Check if the mobile number already exists
      const existingUser = await User.findOne({ mobile });
      if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists' });
      }
  
      const newUser = new User({ name, mobile, points, canPlay, status });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  };
  
  // Update a user
  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { mobile } = req.body;
  
      // Check if the mobile number already exists for another user (excluding the current user)
      const existingUser = await User.findOne({ mobile, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({ message: 'Mobile number already exists' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user', error: err.message });
    }
  };
  

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
