const transaction = require('../models/transaction'); // Assuming you have a transaction model




const getDebitRequests = async (req, res) => {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
  
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
  
      const debitRequests = await transaction.aggregate([
        {
          $match: {
            status: 'pending',
            createdAt: { $gte: todayStart, $lte: todayEnd },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo',
          },
        },
        {
          $unwind: {
            path: '$userInfo',
            preserveNullAndEmptyArrays: true,  // Optional: In case there are no matching users
          },
        },
        {
          $project: {
            _id: 1,
            date: '$createdAt',
            user: '$user',
            mobile: '$mobile',
            points: '$amount',  // Assuming 'amount' is used as points
            type: '$upiOption',
            status: '$status',
          },
        },
      ]);
  
      if (!debitRequests || debitRequests.length === 0) {
        return res.status(404).json({ message: 'No new debit requests for today.' });
      }
  
      return res.status(200).json({ requests: debitRequests });
    } catch (error) {
      console.error('Error fetching new debit requests:', error);
      return res.status(500).json({ message: 'Error fetching new debit requests.' });
    }
  };
  





// Controller to create a new debit request
const createDebitRequest = async (req, res) => {
    try {
        const { amount, upiOption, upiId, user, mobile } = req.body;  // Updated to match frontend

        // Log incoming data
        console.log('Received data:', { amount, upiOption, upiId, user, mobile });

        // Validate incoming data
        if (!amount || !upiOption || !upiId || !user || !mobile) {
            console.log('Validation failed: Missing required fields.');
            return res.status(400).json({ message: 'Amount, UPI option, UPI ID, user, and mobile are required.' });
        }

        // Create new debit request
        const newDebitRequest = new transaction({
            amount,
            upiOption,
            upiId,
            user,
            mobile,
            status: 'pending', // Default status
            createdAt: new Date(),
        });

        // Log the new debit request object before saving
        console.log('New Debit Request:', newDebitRequest);

        await newDebitRequest.save();

        // Log success after saving
        console.log('Debit request created successfully:', newDebitRequest);

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
