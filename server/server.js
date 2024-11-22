const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env

const connectDB = require('./config/db');
const marketRoutes = require('./routes/marketRoutes');
const resultRoutes = require('./routes/resultRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable Cross-Origin Requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', marketRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
