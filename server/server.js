const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env

const connectDB = require('./config/db');
const marketRoutes = require('./routes/marketRoutes');
const resultRoutes = require('./routes/resultRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const path=require("path")
const  _dirname=path.dirname("")
const buildpath = path.join(_dirname,"../client/build")

app.use(express.static(buildpath))

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
app.use('/api/notifications', notificationRoutes);
// app.use('/api', transactionRoutes);
app.use('/api/transactions', transactionRoutes);
app.use("/api/admins", adminRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
