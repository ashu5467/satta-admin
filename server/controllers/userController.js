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
// const updateProfile = async (req, res) => {
//   const userId = req.user.id; // Assuming you use authentication middleware
//   const { personalDetails } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.dob = personalDetails.dob || user.dob;
//     user.phone = personalDetails.phone || user.phone;
//     user.email = personalDetails.email || user.email;

//     await user.save();
//     res.status(200).json({ message: 'Profile updated successfully', user });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating profile', error });
//   }
// };


// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the token in middleware
    const { dob, phone, email } = req.body;

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { dob, phone, email },
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



const getUserProfile = (req, res) => {
  // In a real application, fetch the user data from your database
  const userProfile = {
    personalDetails: {
      dob: "1990-01-01",  // Date of Birth
      phone: "1234567890", // Contact No
      email: "user@example.com" // Email
    },
    paymentDetails: {
      googlePay: "googlepay@upi",
      phonePe: "phonepe@upi",
      paytm: "paytm@upi",
      upi: "user@upi"
    }
  };

  // Sending the user profile data as a response
  res.json(userProfile);
};



module.exports = {getUserProfile, updateProfile, updatePaymentDetails, loginUser, signupUser, getUsers, createUser, updateUser, deleteUser };
