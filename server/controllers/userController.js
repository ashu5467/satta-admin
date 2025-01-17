// controllers/userController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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


// Signup User
const signupUser = async (req, res) => {
  const { name, mobile, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }

    const newUser = new User({ name, mobile, password });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: { name, mobile } });
  } catch (error) {
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }

};




// Import the jwt library


const loginUser = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please signup.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password. Login failed.' });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ message: 'Account inactive. Please contact support.' });
    }

    // Create a payload to encode into the JWT (e.g., user ID and mobile)
    const payload = {
      id: user._id,
      mobile: user.mobile,
      name: user.name,
    };

    // Generate a JWT token (you can adjust the expiration time as needed)
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '5h' });
    

    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        mobile: user.mobile,
        points: user.points,
        canPlay: user.canPlay,
        status: user.status,
      },
      token, // Include the JWT token in the response
      
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
 
};




// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the token in middleware
    const {name, dob, phone, email, points } = req.body;

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, dob, phone, email ,points},
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};







// Update user payment details
const updatePaymentDetails = async (req, res) => {
  const userId = req.user.id; // Assuming you use authentication middleware
  const { googlePay, phonePe, paytm, upi } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.googlePay = googlePay || user.googlePay;
    user.phonePe = phonePe || user.phonePe;
    user.paytm = paytm || user.paytm;
    user.upi = upi || user.upi;

    await user.save();
    res.status(200).json({ message: 'Payment details updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment details', error });
  }
};



const getUserProfile = async (req, res) => {
  try {
    // Assuming the user ID is stored in the JWT token, which is sent via Authorization header
    const userId = req.user.id || req.params.id || req.query.id || req.body.id;
     

    // Fetch the user from the database
    const user = await User.findById(userId);
    console.log("this is userID",user)
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user's personal and payment details
    return res.status(200).json({
      personalDetails: {
        name:user.name,
        dob: user.dob,
        phone: user.mobile,
        email: user.email,
        points: user.points,
      },
      paymentDetails: {
        googlePay: user.googlePay,
        phonePe: user.phonePe,
        paytm: user.paytm,
        upi: user.upi
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const addTransaction = async (req, res) => {
  const { description, pointsSpent } = req.body;

  try {
    const userId = req.user.id; // Extract user ID from JWT
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.points < pointsSpent) {
      return res.status(400).json({ message: 'Insufficient points balance' });
    }

    // Calculate remaining balance
    const remainingBalance = user.points - pointsSpent;

    // Add the transaction to the user's history
    user.transactions.push({
      date: new Date(),
      description,
      points: pointsSpent,
      balance: remainingBalance,
    });

    // Update the user's points
    user.points = remainingBalance;

    await user.save();
    res.status(200).json({ message: 'Transaction successful', transactions: user.transactions });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ message: 'Error processing transaction', error: err.message });
  }
};

// Get transaction history for a user
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ transactions: user.transactions });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
};




const addPoints = async (req, res) => {
  // Extract user ID from the authenticated user's token
  const userId = req.user.id; // This comes from middleware that decodes the JWT token
  
  try {
    const { points } = req.body;

    // Validate the points
    if (!points || isNaN(points) || points <= 0) {
      return res.status(400).json({ message: 'Please provide valid points' });
    }

    // Fetch the user from the database using the user ID from the token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the points to the user's balance
    user.points += points;

    // Save the updated user data
    await user.save();

    // Send the success response
    res.status(200).json({
      message: 'Points added successfully',
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        points: user.points,
      },
    });
  } catch (err) {
    console.error('Error adding points:', err);
    res.status(500).json({ message: 'Error adding points', error: err.message });
  }
};


 // Import User model
const moment = require('moment'); // For date comparisons

const getTodaySignups = async (req, res) => {
  try {
    const startOfDay = moment().startOf('day').toDate();
    const endOfDay = moment().endOf('day').toDate();

    const todaySignups = await User.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.json({
      todaySignups: todaySignups.length,
      newUsers: todaySignups,
    });
  } catch (error) {
    console.error('Error fetching today\'s signups:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




// Update game rates for a user
const updateGameRates = async (req, res) => {
  const { id } = req.params; // Extract user ID from URL params
  const { gameRates } = req.body; // { Single, Jodi, etc. }

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the game rates for the user
    user.gameRates = { ...user.gameRates, ...gameRates };

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Game rates updated successfully', user });
  } catch (err) {
    console.error('Error updating game rates:', err);
    res.status(500).json({ message: 'Error updating game rates', error: err.message });
  }
};





module.exports = {updateGameRates, getTodaySignups, addPoints,getTransactions, addTransaction, getUserProfile, updateProfile, updatePaymentDetails, loginUser, signupUser, getUsers, createUser, updateUser, deleteUser };
