import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import bgImage from '../assets/maroonbg.jpg';

const LoginPage = ({ onLogin }) => { // Receive the onLogin function from App.js
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const navigate = useNavigate(); // Hook to navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://13.203.91.35:5000/api/users/login', formData);

      console.log(response); // Log the response for debugging

      if (response.status === 200) {
        // Store token or any necessary user data in localStorage or state (if needed)
        localStorage.setItem('authToken', response.data.token);  // Assuming token is returned in response

        alert('Login successful!');
        onLogin(); // Call onLogin to update isAuthenticated in App.js
        navigate('/'); // Redirect to the homepage after successful login
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen justify-center bg-transparent p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Welcome to JPlay</h1>

      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-none">
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          placeholder="Mobile Number"
          className="flex-grow bg-transparent outline-none text-white placeholder-white"
        />
        <FontAwesomeIcon icon={faMobileAlt} className="ml-3 text-white" />
      </div>

      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-none">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="flex-grow bg-transparent outline-none text-white placeholder-white"
        />
        <FontAwesomeIcon icon={faLock} className="ml-3 text-white" />
      </div>

      <button
        onClick={handleLogin}
        className="bg-white text-[#D2691E] font-bold px-4 py-2 rounded-full w-64 border border-[#D2691E] hover:bg-[#f4f4f4]"
      >
        Login
      </button>

      <p className="mt-2 text-white">
  Forgot your password?{' '}
  <span
    className="text-blue-300 cursor-pointer hover:underline"
    onClick={() => navigate('/forgot-password')}
  >
    Reset Password
  </span>
</p>

      <p className="mt-4 text-white">
        Don’t have an account?{' '}
        <span
          className="text-blue-300 cursor-pointer hover:underline"
          onClick={() => navigate('/signup')}
        >
          Sign Up Here
        </span>
      </p>

      
    </div>
  );
};

export default LoginPage;
