const express = require('express');
const {
  getMarkets,
  addMarket,
  editMarket,
  deleteMarket,
} = require('../controllers/marketController');

const router = express.Router();

router.get('/markets', getMarkets);  // Get all markets
router.post('/markets', addMarket);  // Add a new market
router.put('/markets/:id', editMarket);  // Edit an existing market
router.delete('/markets/:id', deleteMarket);  // Delete a market

module.exports = router;
