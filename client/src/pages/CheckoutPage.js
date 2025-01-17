import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/maroonbg.jpg';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { market, biddingItems, totalPoints, sattaName } = location.state || {};

  const [walletBalance, setWalletBalance] = useState(0); // State for wallet balance
  const [loading, setLoading] = useState(true); // Loading state for fetching wallet

  // Fetch the user's wallet balance from the server
  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Token is missing! Please log in.');
        navigate('/login');
        return;
      }

      const response = await axios.get('http://13.203.91.35:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWalletBalance(response.data.personalDetails.points); // Assuming 'points' is the wallet balance field
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      alert('Failed to fetch wallet balance. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate remaining balance in points
  const remainingBalance = walletBalance - totalPoints;

  // Handle transaction confirmation
  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Token is missing! Please log in.');
        navigate('/login');
        return;
      }

      // Check if the user has sufficient balance
      if (remainingBalance < 0) {
        alert('Insufficient balance!');
        return;
      }


      const description = biddingItems
      .map((item) => `${item.digit} for ${sattaName} in ${market}`)
      .join(", "); 

      const transactionPayload = {
        biddingItems: biddingItems.map((item) => ({
          digit: item.digit,
          points: item.points,
        })),
        description,
        pointsSpent: totalPoints,
       
      };

      // Add transaction to the database
      const transactionResponse = await axios.post(
        'http://13.203.91.35:5000/api/users/transaction',
        transactionPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (transactionResponse.status === 200) {
        alert('Transaction successful! Your balance has been updated.');
        navigate('/confirmation');
      }
    } catch (error) {
      console.error('Error confirming transaction:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  // Fetch wallet balance on component mount
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-2xl font-bold text-white mb-4">
        Checkout: {sattaName ? sattaName : 'No Satta Selected'}
      </h1>

      {/* Market and Satta Details */}
      <div className="mb-6">
      <h2 className="text-lg font-semibold text-white">Game: {market.toUpperCase()}</h2>

        {/* <h2 className="text-lg font-semibold text-white">Satta: {sattaName}</h2> */}
        <h3 className="text-lg text-white mt-2">Total Points: Rs {totalPoints}</h3>
      </div>

      {/* Bidding Items List */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Bidding Items</h3>
        <ul>
          {biddingItems.map((item, index) => (
            <li key={index} className="text-sm text-gray-700">
              {item.digit} - {item.points} Points
            </li>
          ))}
        </ul>
      </div>

      {/* Wallet, Play Points, and Balance */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Wallet & Balance</h3>
        {loading ? (
          <p className="text-sm text-gray-600">Loading...</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">Wallet Balance: Rs {walletBalance}</p>
            <p className="text-sm text-gray-600">Total Play Points: Rs {totalPoints}</p>
            <p className="text-sm text-gray-600">Remaining Balance: Rs {remainingBalance}</p>
          </>
        )}
      </div>

      {/* Confirm Button */}
      <div className="mt-6">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
