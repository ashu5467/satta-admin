// controllers/resultController.js
const Result = require('../models/result');

// Get all results
const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new result
const createResult = async (req, res) => {
  const { date, market, result } = req.body;
  
  if (!date || !market || !result) {
    return res.status(400).json({ message: 'Date, market, and result are required.' });
  }

  try {
    const newResult = new Result({ date, market, result });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing result
const updateResult = async (req, res) => {
  const { id } = req.params;
  const { date, market, result } = req.body;

  try {
    const updatedResult = await Result.findByIdAndUpdate(id, { date, market, result }, { new: true });
    if (!updatedResult) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(updatedResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a result
const deleteResult = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedResult = await Result.findByIdAndDelete(id);
    if (!deletedResult) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllResults,
  createResult,
  updateResult,
  deleteResult
};
