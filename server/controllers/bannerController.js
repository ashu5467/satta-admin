// controllers/bannerController.js
const Banner = require('../models/banner');

// Handle banner upload
exports.uploadBanner = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    // Create or update the banner record
    const banner = await Banner.findOneAndUpdate(
      {}, // Empty query to always update the single banner
      { name: originalname, data: buffer },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Banner uploaded successfully', bannerId: banner._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload banner' });
  }
};

// Handle banner retrieval
exports.getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({});
    if (banner) {
      res.set('Content-Type', 'image/jpeg');
      res.send(banner.data);
    } else {
      res.status(404).json({ error: 'No banner found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch banner' });
  }
};
