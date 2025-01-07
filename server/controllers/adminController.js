const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");





const registerAdmin = async (req, res) => {
    const { username, mobile, password } = req.body;
  
    // Check if admin with the same mobile already exists
    try {
      const adminExists = await Admin.findOne({ mobile });
  
      if (adminExists) {
        return res.status(400).json({ message: "Admin with this mobile already exists" });
      }
  
      // Create new admin
      const admin = new Admin({
        username,
        mobile,
        password,
      });
  
      await admin.save(); // Save the admin to the database
  
      res.status(201).json({
        message: "Admin registered successfully",
        admin: {
          id: admin._id,
          username: admin.username,
          mobile: admin.mobile,
        },
      });
    } catch (error) {
      console.error("Error in registerAdmin:", error); // More detailed error logging
      res.status(500).json({ message: "Error registering admin", error: error.message });
    }
  };
  

// Admin login (JWT authentication)
const loginAdmin = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const admin = await Admin.findOne({ mobile });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    // const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h", // Token expiration time
    // });


     const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '5h' });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in admin" });
  }
};

// Get admin details
const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id); // Get admin using the decoded JWT

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      id: admin._id,
      username: admin.username,
      mobile: admin.mobile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching admin details" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminDetails,
};
