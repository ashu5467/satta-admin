import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/maroonbg.jpg'; // Ensure this image is available

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { market, biddingItems, totalPoints, sattaName } = location.state || {};

  // Static values for wallet balance and total play points (can be dynamic based on your state management)
  const walletBalance = 5000;  // Example wallet balance
  const totalPlayPoints = totalPoints;  // Assuming the total points are the total play points

  // Calculate remaining balance
  const remainingBalance = walletBalance - totalPoints;

  const handleConfirm = () => {
    alert('Transaction confirmed!');
    // Optionally, you can redirect to a different page after confirming
    navigate('/confirmation');
  };

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
        <h2 className="text-lg font-semibold text-white">Market: {market}</h2>
        <h2 className="text-lg font-semibold text-white">Satta: {sattaName}</h2>
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
        <p className="text-sm text-gray-600">Wallet Balance: Rs {walletBalance}</p>
        <p className="text-sm text-gray-600">Total Play Points: Rs {totalPlayPoints}</p>
        <p className="text-sm text-gray-600">Remaining Balance: Rs {remainingBalance}</p>
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
