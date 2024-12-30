// routes/userRoutes.js
const express = require('express');
const {getTransactions, addTransaction, getUserProfile, updateProfile, updatePaymentDetails, signupUser, loginUser, getUsers, createUser, updateUser, deleteUser,addPoints } = require('../controllers/userController');

const router = express.Router();

const authenticate = require('../middlewere/authenticate');

router.put('/profile', authenticate, updateProfile);
router.put('/profile/payment', authenticate, updatePaymentDetails);
router.get('/profile',authenticate, getUserProfile);
router.post('/transaction', authenticate, addTransaction); // Add a transaction
router.get('/transactions', authenticate, getTransactions); // Get transaction history
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/add-points', authenticate, addPoints);
module.exports = router;
