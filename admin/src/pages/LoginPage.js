import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported

const LoginPage = ({ setAuthenticated }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!mobile || !password) {
      alert("Please fill in both fields");
      return;
    }

    // Create the login credentials object
    const loginData = {
      mobile,
      password,
    };

    try {
      // Make a POST request to the backend to check the credentials
      const response = await axios.post("http://13.203.91.35:5000/api/admins/login", loginData);

      // If login is successful
      if (response.status === 200) {
        alert("Login successful!");
        
        // Store the JWT token if the user selected "Remember Me"
        if (rememberMe) {
          localStorage.setItem("token", response.data.token); // Store token in localStorage
        }

        // Set the authentication state
        setAuthenticated(true);

        // Redirect to the dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.response?.data?.message || "Error logging in, please try again.");
    }
  };

  const handleForgotPassword = () => {
    alert("Redirecting to Forgot Password page...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Login/Register Toggle */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:underline"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:underline"
        >
          Register
        </button>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleLogin}>
          {/* Mobile Number Field */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="mobile"
              className="w-1/3 text-sm font-medium text-gray-600"
            >
              Mobile Number
            </label>
            <input
              id="mobile"
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-2/3 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center mb-4">
            <label
              htmlFor="password"
              className="w-1/3 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-2/3 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
