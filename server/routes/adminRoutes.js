const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminDetails } = require("../controllers/adminController");
const { auth } = require("../middlewere/authMiddleware"); // Protect route using JWT authentication

// POST request for admin registration
router.post("/signup", registerAdmin);

// POST request for admin login
router.post("/login", loginAdmin);

// GET request for fetching admin details (protected route)
// router.get("/me", auth, getAdminDetails);

module.exports = router;
