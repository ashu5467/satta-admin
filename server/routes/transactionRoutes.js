const express = require('express');
const router = express.Router();
const {getDebitRequests, createDebitRequest } = require('../controllers/transactionController');


// Route to get new transactions
router.get('/debit-request', getDebitRequests);

// Route to create a new transaction (optional)
router.post('/debit-request', createDebitRequest);

router.get('/debit-request-today', getDebitRequests);

module.exports = router;
