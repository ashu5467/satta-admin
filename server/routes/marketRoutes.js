const express = require('express');
const {
  getMarkets,
  addMarket,
  editMarket,
  deleteMarket,
  updateMarketResult,
  getMarketResults

} = require('../controllers/marketController');

const router = express.Router();

router.get('/markets', getMarkets);  // Get all markets
router.post('/markets', addMarket);  // Add a new market
router.put('/markets/:id', editMarket);  // Edit an existing market
router.delete('/markets/:id', deleteMarket);  // Delete a market
router.put('/markets/:id/result', updateMarketResult);
// router.get('/markets/:id/result', getMarketResults);
router.get('/markets/:id/results', getMarketResults);  // Ensure this route exists


module.exports = router;

