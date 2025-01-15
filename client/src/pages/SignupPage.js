import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMobileAlt, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import bgImage from '../assets/maroonbg.jpg';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://13.203.91.35:5000/api/users/signup', formData);
      if (response.status === 201) {
        alert('Signup successful! You can now log in.');
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen justify-center bg-gray-100 p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Welcome to JPlay</h1>

      {/* Name Input */}
      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-sm">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="flex-grow bg-transparent outline-none text-white placeholder-white"
        />
        <FontAwesomeIcon icon={faUser} className="ml-3 text-white" />
      </div>

      {/* Mobile Number Input */}
      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-sm">
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

      {/* Password Input */}
      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-sm">
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

      {/* Confirm Password Input */}
      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-sm">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="flex-grow bg-transparent outline-none text-white placeholder-white"
        />
        <FontAwesomeIcon icon={faKey} className="ml-3 text-white" />
      </div>

      {/* Signup Button */}
      <button
        onClick={handleSignup}
        className="bg-white text-[#D2691E] font-bold px-4 py-2 rounded-full w-64 border border-[#D2691E] hover:bg-[#f4f4f4]"
      >
        Register
      </button>

      {/* Login Redirect */}
      <p className="mt-4 text-white">
        Already have an account?{' '}
        <span
          className="text-blue-300 cursor-pointer hover:underline"
          onClick={() => navigate('/login')} // Navigate to login page
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupPage;
