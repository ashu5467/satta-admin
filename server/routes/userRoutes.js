// routes/userRoutes.js
const express = require('express');
const {getUserProfile, updateProfile, updatePaymentDetails, signupUser, loginUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

const authenticate = require('../middlewere/authenticate');

router.put('/profile', authenticate, updateProfile);
router.put('/profile/payment', authenticate, updatePaymentDetails);
router.get('/profile', getUserProfile);

// Get all users
router.get('/', getUsers);

// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);


router.post('/signup', signupUser);
router.post('/login', loginUser);



// router.put('/profile', updateProfile);

// // Update payment details
// router.put('/profile/payment', updatePaymentDetails);




module.exports = router;
