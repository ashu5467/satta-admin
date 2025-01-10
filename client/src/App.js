import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyProfile from "./pages/Myprofile";
import Statements from "./pages/Statements";
import Withdraw from "./pages/Withdraw";
import Gamerates from "./pages/Gamerates";
import Notifications from "./pages/Notifications";
import Share from "./pages/Share";
import ChartPage from "./pages/ChartPage";
import PlayPage from "./pages/PlayPage";
import PlayOpenPage from "./pages/PlayOpenPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PlayClosePage from "./pages/PlayClosePage";
import AddPointsPage from "./pages/AddPointsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UPIPayment from "./pages/UPIPayment";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const walletAmount = 150.0;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    // Change authentication status
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token from localStorage
    setIsAuthenticated(false); // Update the authentication state to false
  };


  return (
    <Router>
      <div className="flex h-screen">
        {isAuthenticated && (
          <>
            <div
              className={`fixed inset-y-0 left-0 bg-amber-50 text-gray-800 z-20 w-64 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
            >
             <Sidebar onLogout={handleLogout} /> {/* Pass handleLogout to Sidebar */}
            </div>

            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        )}

        <div className="flex flex-col flex-grow">
          {isAuthenticated && <Header walletAmount={walletAmount} onMenuClick={toggleSidebar} />}
          <div className="flex-grow overflow-auto">
            <Routes>
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}
              />
              <Route
                path="/signup"
                element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
              />

           

              <Route
                path="/forgot-password"
                element={isAuthenticated ? <Navigate to="/" /> : <ForgotPasswordPage />}
              />

              <Route
                path="/"
                element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/my-profile"
                element={isAuthenticated ? <MyProfile /> : <Navigate to="/login" />}
              />
              <Route
                path="/statements"
                element={isAuthenticated ? <Statements /> : <Navigate to="/login" />}
              />
              <Route
                path="/withdraw-requests"
                element={isAuthenticated ? <Withdraw /> : <Navigate to="/login" />}
              />
               <Route
                path="/add-points"
                element={isAuthenticated ? <AddPointsPage /> : <Navigate to="/login" />}
              />

              <Route
                path="/game-rates"
                element={isAuthenticated ? <Gamerates /> : <Navigate to="/login" />}
              />
              <Route
                path="/notifications"
                element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />}
              />
              <Route path="/share" element={isAuthenticated ? <Share /> : <Navigate to="/login" />} />
              <Route
                path="/chart"
                element={isAuthenticated ? <ChartPage /> : <Navigate to="/login" />}
              />
              <Route path="/play" element={isAuthenticated ? <PlayPage /> : <Navigate to="/login" />} />
              <Route
                path="/play-open"
                element={isAuthenticated ? <PlayOpenPage /> : <Navigate to="/login" />}
              />

              <Route
                path="/play-close"
                element={isAuthenticated ? <PlayClosePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/checkout"
                element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/confirmation"
                element={isAuthenticated ? <ConfirmationPage /> : <Navigate to="/login" />}
              />


              <Route
                path="/upi-payment"
                element={ <UPIPayment />}
                //main route is commented for testing later this shoud be uncommented

               // element={isAuthenticated ? <UPIPayment /> : <Navigate to="/login" />} // New UPIPayment route
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
