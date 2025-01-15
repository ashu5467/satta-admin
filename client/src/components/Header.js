import React, { useEffect, useState } from 'react';
import { FaBars, FaWallet, FaSync } from 'react-icons/fa'; // Importing the required icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API calls

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const [walletAmount, setWalletAmount] = useState(0); // State to store wallet amount
  const [loading, setLoading] = useState(true); // State to track loading state

  const handleJPlayClick = () => {
    navigate('/'); // Navigate to the home page (root)
  };

  const fetchWalletAmount = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      console.log('authToken:', token); // Debug: Ensure token exists
      if (!token) {
        alert('Token is missing! Please log in.');
        navigate('/login');
        return;
      }
  
      const response = await axios.get('http://13.203.91.35:5000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log('API Response:', response.data); // Debug: Log API response
      setWalletAmount(response.data.personalDetails.points); // Assuming 'points' is the wallet amount
    } catch (error) {
      console.error('Error fetching wallet amount:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized! Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchWalletAmount(); // Fetch wallet amount on component mount
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Menu Icon on the Left */}
      <button
        className="p-2 bg-gray-700 rounded-md"
        onClick={onMenuClick} // Trigger the toggle function passed from App.js
      >
        <FaBars size={24} />
      </button>

      {/* Heading - "JPlay" */}
      <h1 className="text-xl font-bold cursor-pointer" onClick={handleJPlayClick}>
        JPlay
      </h1>

      {/* Right Section - Wallet Icon and Refresh Button */}
      <div className="flex items-center space-x-4">
        {/* Wallet Icon */}
        <div className="flex items-center space-x-2">
          <FaWallet size={24} />
          {loading ? (
            <span className="text-sm">Loading...</span>
          ) : (
            <span className="text-sm">{walletAmount} Rs</span>
          )}
        </div>

        {/* Refresh Button */}
        <button
          className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
          onClick={fetchWalletAmount} // Refresh wallet amount on button click
        >
          <FaSync size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
