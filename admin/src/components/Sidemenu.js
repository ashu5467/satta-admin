// src/components/Sidemenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaMoneyBillWave, FaChartBar, FaImage, FaCog, FaStore, FaBell, FaTrashAlt, FaBusinessTime, FaFileAlt, FaAngleDown, FaAngleUp, FaList, FaClipboardList, FaRegChartBar  } from 'react-icons/fa';

//import { FaTachometerAlt, FaUser, FaMoneyBillWave, FaChartBar, FaImage, FaCog, FaStore, FaBell, FaTrashAlt, FaBusinessTime, FaFileAlt, FaAngleDown, FaAngleUp, FaList, FaClipboardList, FaBidding } from 'react-icons/fa';

const Sidemenu = ({ isOpen }) => {
  // State to manage the submenu open/close
  const [isMainMarketOpen, setIsMainMarketOpen] = useState(false);

  // Toggle submenu visibility
  const toggleMainMarketSubMenu = () => {
    setIsMainMarketOpen(!isMainMarketOpen);
  };

  return (
    <nav
      className={`bg-gray-800 text-white w-64 p-6 fixed top-0 left-0 h-screen transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-30`}
    >
      <div className="text-2xl font-bold mb-8">MatkaApp</div>
      <ul className="space-y-6">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-4 hover:text-gray-400">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/users" className="flex items-center space-x-4 hover:text-gray-400">
            <FaUser />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="/debit-request" className="flex items-center space-x-4 hover:text-gray-400">
            <FaMoneyBillWave />
            <span>Debit Request</span>
          </Link>
        </li>
        <li>
          <Link to="/points" className="flex items-center space-x-4 hover:text-gray-400">
            <FaChartBar />
            <span>Points</span>
          </Link>
        </li>
        <li>
          <Link to="/main-banner" className="flex items-center space-x-4 hover:text-gray-400">
            <FaImage />
            <span>Main Banner</span>
          </Link>
        </li>
        <li>
          <Link to="/payment-settings" className="flex items-center space-x-4 hover:text-gray-400">
            <FaCog />
            <span>Payment Settings</span>
          </Link>
        </li>
        <li>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-gray-400" onClick={toggleMainMarketSubMenu}>
            <FaStore />
            <span>Main Market</span>
            {isMainMarketOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {/* Submenu for Main Market */}
          {isMainMarketOpen && (
            <ul className="space-y-4 ml-6 mt-2">
              <li>
                <Link to="/main-market/list" className="flex items-center space-x-4 hover:text-gray-400">
                  <FaList />
                  <span>List</span>
                </Link>
              </li>
              <li>
                <Link to="/main-market/bids" className="flex items-center space-x-4 hover:text-gray-400">
                  <FaRegChartBar  />
                  <span>Bids</span>
                </Link>
              </li>
              <li>
                <Link to="/main-market/results" className="flex items-center space-x-4 hover:text-gray-400">
                  <FaClipboardList />
                  <span>Results</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/notifications" className="flex items-center space-x-4 hover:text-gray-400">
            <FaBell />
            <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/delete-results" className="flex items-center space-x-4 hover:text-gray-400">
            <FaTrashAlt />
            <span>Delete Results</span>
          </Link>
        </li>
        <li>
          <Link to="/check-business" className="flex items-center space-x-4 hover:text-gray-400">
            <FaBusinessTime />
            <span>Check Business</span>
          </Link>
        </li>
        <li>
          <Link to="/reports" className="flex items-center space-x-4 hover:text-gray-400">
            <FaFileAlt />
            <span>Reports</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidemenu;
