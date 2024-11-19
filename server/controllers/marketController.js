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
      open,
      close,
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
      open,
      close,
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

module.exports = {
  getMarkets,
  addMarket,
  editMarket,
  deleteMarket,
};
