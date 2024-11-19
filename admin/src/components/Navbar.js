// src/components/Navbar.js
import React from 'react';
import { HiMenuAlt2 } from 'react-icons/hi'; // Importing the menu icon
import { FaUserCircle } from 'react-icons/fa'; // Importing the user profile icon

const Navbar = ({ onMenuToggle, isSidebarOpen, onLogout }) => {
  return (
    <header
      className={`bg-white text-gray-800 p-4 flex justify-between items-center transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}
    >
      {/* Menu Icon on the left */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuToggle}
          className="text-2xl p-2 rounded-md hover:bg-gray-200"
        >
          <HiMenuAlt2 />
        </button>
      </div>

      {/* Admin Name and Logout Button on the right */}
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-2xl" /> {/* Profile icon */}
        <span className="text-sm">Hello, Admin!</span>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
