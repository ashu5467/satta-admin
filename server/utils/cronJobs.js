const cron = require('node-cron');
const Market = require('./models/Market'); // Adjust the path to your schema

cron.schedule('0 0 * * *', async () => {
  try {
    await Market.updateMany({}, { $unset: { todayResult: "" } });
    console.log('Cleared todayResult for all markets.');
  } catch (error) {
    console.error('Error clearing todayResult:', error);
  }
});
