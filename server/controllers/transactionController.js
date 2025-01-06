const Transaction = require('../models/transaction'); // Assuming you have a Transaction model


// Controller to fetch new debit requests for today, and count by user
const getDebitRequests = async (req, res) => {
  try {
    // Get the start and end of today's date
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Set to midnight of today

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // Set to the last millisecond of today

    // Fetch all debit requests that were created today and are still pending
    const newDebitRequests = await Transaction.aggregate([
      {
        $match: {
          status: 'pending',
          createdAt: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: '$userId', // Group by userId (or whatever identifier is used for the user)
          requestCount: { $sum: 1 }, // Count the number of requests per user
        },
      },
      {
        $lookup: {
          from: 'users', // Assuming you have a users collection
          localField: '_id',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          requestCount: 1,
          userName: { $arrayElemAt: ['$userInfo.name', 0] }, // Get user name from the user info
        },
      },
    ]);

    // If no debit requests found for today
    if (newDebitRequests.length === 0) {
      return res.status(404).json({ message: 'No new debit requests for today.' });
    }

    // Send back the grouped and counted debit requests by user
    return res.status(200).json({ newDebitRequests });
  } catch (error) {
    console.error('Error fetching new debit requests:', error);
    return res.status(500).json({ message: 'Error fetching new debit requests.' });
  }
};





// Controller to create a new debit request
const createDebitRequest = async (req, res) => {
    try {
      const { amount, upiOption, upiId } = req.body;  // Updated to match frontend
  
      // Validate incoming data
      if (!amount || !upiOption || !upiId) {
        return res.status(400).json({ message: 'Amount, UPI option, and UPI ID are required.' });
      }
  
      // Create new debit request
      const newDebitRequest = new Transaction({
        amount,
        upiOption,
        upiId,
        status: 'pending', // Default status
        createdAt: new Date(),
      });
  
      await newDebitRequest.save();
  
      return res.status(201).json({ message: 'Debit request created successfully.', newDebitRequest });
    } catch (error) {
      console.error('Error creating debit request:', error);
      return res.status(500).json({ message: 'Error creating debit request' });
    }
  };
  

module.exports = {
  getDebitRequests,
  createDebitRequest,
};
