const Market = require('../models/market');

// Get all markets
const getMarkets = async (req, res) => {
  try {
    const markets = await Market.find();
    res.status(200).json(markets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching markets' });
  }
};

// Add a new market
const addMarket = async (req, res) => {
  const { name, open, close, days, status } = req.body;

  try {
    const newMarket = new Market({
      name,
      openTime: open,
      closeTime: close,
      days,
      status,
    });

    const savedMarket = await newMarket.save();
    res.status(201).json(savedMarket);
  } catch (error) {
    res.status(500).json({ message: 'Error adding market' });
  }
};

// Edit an existing market
const editMarket = async (req, res) => {
  const { id } = req.params;  // Ensure the correct id is used
  const { name, open, close, days, status } = req.body;

  try {
    const updatedMarket = await Market.findByIdAndUpdate(id, {
      name,
      openTime: open,
      closeTime: close,
      days,
      status,
    }, { new: true });

    if (!updatedMarket) {
      return res.status(404).json({ message: 'Market not found' });
    }

    res.status(200).json(updatedMarket);
  } catch (error) {
    res.status(500).json({ message: 'Error updating market' });
  }
};

// Delete a market
const deleteMarket = async (req, res) => {
  const { id } = req.params;  // Ensure correct id is passed here

  try {
    const deletedMarket = await Market.findByIdAndDelete(id);

    if (!deletedMarket) {
      return res.status(404).json({ message: 'Market not found' });
    }

    res.status(200).json({ message: 'Market deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting market' });
  }
};



const updateMarketResult = async (req, res) => {
  const { id } = req.params; // Market ID
  const { resultDate, openPatti, jodi, closePatti } = req.body;

  try {
    // Find the market by its ID
    const market = await Market.findById(id);
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    const today = new Date().toISOString().split('T')[0];
    const resultDateFormatted = new Date(resultDate).toISOString().split('T')[0];

    // If it's a new day, push the current `todayResult` to `results` and clear it
    if (market.todayResult && market.results.length > 0) {
      const lastResultDate = new Date(market.results[market.results.length - 1].resultDate).toISOString().split('T')[0];
      if (today !== lastResultDate) {
        market.results.push({
          resultDate: new Date(),
          ...market.todayResult,
        });
        market.todayResult = null; // Clear `todayResult` for the new day
      }
    }

    // Update today's result
    if (today === resultDateFormatted) {
      market.todayResult = { openPatti, jodi, closePatti };
    }

    // Save the market document
    await market.save();
    res.status(200).json(market);
  } catch (error) {
    console.error('Error updating market result:', error);
    res.status(500).json({ message: 'Error updating market result' });
  }
};


// Get market results for a specific market
const getMarketResults = async (req, res) => {
  const { id } = req.params; // Market ID from URL parameter

  try {
    const market = await Market.findById(id); // Find the market by its ID
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    res.status(200).json(market.results); // Return the results array
  } catch (error) {
    console.error('Error fetching market results:', error);
    res.status(500).json({ message: 'Error fetching market results' });
  }
};





module.exports = {
  getMarkets,
  addMarket,
  editMarket,
  deleteMarket,
  updateMarketResult,
  getMarketResults,
};
