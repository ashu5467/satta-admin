// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your global styles (if needed)
import Sidemenu from './components/Sidemenu'; // Sidebar component
import Navbar from './components/Navbar'; // Navbar component
import Dashboard from './pages/Dashboard'; // Dashboard page
import Users from './pages/Users'; // Users page
import DebitRequests from './pages/DebitRequests'; // Debit Request page
import Points from './pages/Points'; // Points page
import MainBanner from './pages/MainBanner'; // Main Banner page
import PaymentSettings from './pages/PaymentSettings'; // Payment Settings page
import MainMarket from './pages/MainMarket'; // Main Market page
import Notifications from './pages/Notifications'; // Notifications page
import DeleteResults from './pages/DeleteResults'; // Delete Results page
import CheckBusiness from './pages/CheckBusiness'; // Check Business page
import Reports from './pages/Reports'; // Reports page
import List from './pages/List';
import Bids from './pages/Bids';
import Results from './pages/Results';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <Router>
      <div className="App">
        <div className="flex flex-col h-screen ">
          {/* Navbar */}
          <Navbar onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidemenu isOpen={isSidebarOpen} />

            {/* Routes */}
            <div
              className={`flex-1 p-6 overflow-auto transition-all duration-300 bg-[#B3D9FF] ${
                isSidebarOpen ? 'ml-64' : 'ml-0'
              }`}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/debit-request" element={<DebitRequests />} />
                <Route path="/points" element={<Points />} />
                <Route path="/main-banner" element={<MainBanner />} />
                <Route path="/payment-settings" element={<PaymentSettings />} />
                <Route path="/main-market" element={<MainMarket />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/delete-results" element={<DeleteResults />} />
                <Route path="/check-business" element={<CheckBusiness />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/main-market/list" element={<List />} />
                <Route path="/main-market/bids" element={<Bids />} />
                <Route path="/main-market/results" element={<Results />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
