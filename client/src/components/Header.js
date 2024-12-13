import React from 'react';
import { FaBars, FaWallet, FaSync } from 'react-icons/fa'; // Importing the required icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = ({ walletAmount, onMenuClick }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleJPlayClick = () => {
    navigate('/'); // Navigate to the home page (root)
  };

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
          <span className="text-sm">{walletAmount} Rs</span>
        </div>

        {/* Refresh Button */}
        <button className="p-2 bg-gray-700 rounded-md hover:bg-gray-600">
          <FaSync size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
