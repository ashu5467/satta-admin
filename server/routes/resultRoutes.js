// routes/resultRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllResults,
  createResult,
  updateResult,
  deleteResult
} = require('../controllers/resultController');

// GET all results
router.get('/', getAllResults);

// POST a new result
router.post('/', createResult);

// PUT (update) an existing result
router.put('/:id', updateResult);

// DELETE a result
router.delete('/:id', deleteResult);

module.exports = router;
