import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Sidemenu from "./components/Sidemenu";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import DebitRequests from "./pages/DebitRequests";
import Points from "./pages/Points";
import MainBanner from "./pages/MainBanner";
import PaymentSettings from "./pages/PaymentSettings";
import MainMarket from "./pages/MainMarket";
import Notifications from "./pages/Notifications";
import DeleteResults from "./pages/DeleteResults";
import CheckBusiness from "./pages/CheckBusiness";
import Reports from "./pages/Reports";
import List from "./pages/List";
import Bids from "./pages/Bids";
import Results from "./pages/Results";
import RegisterPage from "./pages/RegisterPage";
import DefaultMethod from "./pages/DefaultMethod";
import PaymentUpi from "./pages/PaymentUpi";
import WithdrawalTime from "./pages/WithdrawalTime";
import RechargeAmount from "./pages/RechargeAmount";
import BidReports from "./pages/BidReports";
import PointsReports from "./pages/PointReports";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false); // Authentication state

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setAuthenticated(false); // Reset authentication state
  };

  return (
    <Router>
      <div className="App">
        <div className="flex flex-col h-screen">
          {/* Show Navbar if authenticated */}
          {isAuthenticated && (
            <Navbar
              onMenuToggle={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              onLogout={handleLogout} // Pass logout handler
            />
          )}

          <div className="flex flex-1 overflow-hidden">
            {/* Show Sidemenu if authenticated */}
            {isAuthenticated && <Sidemenu isOpen={isSidebarOpen} />}

            <div
              className={`flex-1 p-6 overflow-auto transition-all duration-300 bg-[#B3D9FF] ${
                isSidebarOpen && isAuthenticated ? "ml-64" : "ml-0"
              }`}
            >
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" />
                    ) : (
                      <LoginPage setAuthenticated={setAuthenticated} />
                    )
                  }
                />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                {isAuthenticated ? (
                  <>
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
                    <Route path="/payment-settings/default-method" element={<DefaultMethod />} />
                    <Route path="/payment-settings/recharge-amount" element={<RechargeAmount />} />
                    <Route path="/payment-settings/withdrawal-time" element={<WithdrawalTime />} />
                    <Route path="/payment-settings/payment-upi" element={<PaymentUpi />} />
                    <Route path="/reports/bids" element={<BidReports />} />
                    <Route path="/reports/points" element={<PointsReports />} />
                  </>
                ) : (
                  <Route path="*" element={<Navigate to="/" />} />
                )}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
