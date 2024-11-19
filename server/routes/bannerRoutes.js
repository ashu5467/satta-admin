const express = require('express');
const multer = require('multer');
const { uploadBanner, getBanner } = require('../controllers/bannerController');

const router = express.Router();

// Configure multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define routes
router.post('/upload', upload.single('banner'), uploadBanner);
router.get('/get', getBanner);

module.exports = router;
