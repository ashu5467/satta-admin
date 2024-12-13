import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaFileAlt,
  FaMoneyCheck,
  FaGamepad,
  FaBell,
  FaShareAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/jp icon.webp";

const Sidebar = ({ onLogout }) => { // Receive the onLogout function as a prop
  const navigate = useNavigate();

  return (
    <div className="bg-amber-50 text-gray-800 w-64 h-full flex flex-col">
      {/* Logo Section */}
      <div
        className="flex items-center justify-center p-4"
        style={{ backgroundColor: "#3B1F18" }}
      >
        <img
          src={logo}
          alt="App Logo"
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col mt-4 space-y-2">
        <MenuItem to="/my-profile" icon={<FaUser />} text="My Profile" />
        <MenuItem to="/statements" icon={<FaFileAlt />} text="Statements" />
        <MenuItem to="/withdraw-requests" icon={<FaMoneyCheck />} text="Withdraw Requests" />
        <MenuItem to="/game-rates" icon={<FaGamepad />} text="Game Rates" />
        <MenuItem to="/notifications" icon={<FaBell />} text="Notifications" />
        <MenuItem to="/share" icon={<FaShareAlt />} text="Share" />
        
        {/* Logout Item */}
        <div
          onClick={() => {
            onLogout(); // Call the onLogout function passed from App.js
            navigate("/login"); // Ensure user is redirected after logging out
          }}
          className="flex items-center space-x-3 p-3 hover:bg-amber-100 cursor-pointer"
        >
          <FaSignOutAlt />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </nav>
    </div>
  );
};

const MenuItem = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center space-x-3 p-3 hover:bg-amber-100 cursor-pointer">
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </Link>
);

export default Sidebar;
