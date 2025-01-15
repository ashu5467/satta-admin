// ForgotPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/maroonbg.jpg';

const ForgotPasswordPage = () => {
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setMobile(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://13.203.91.35:5000/api/users/forgot-password', { mobile });
      
      if (response.status === 200) {
        setMessage('Password reset link sent successfully!');
        // Optionally, redirect to login page
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage('Error sending reset link. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Reset Your Password</h1>

      <div className="mb-4 flex items-center w-64 border rounded-full px-4 py-2 bg-transparent backdrop-blur-none">
        <input
          type="text"
          name="mobile"
          value={mobile}
          onChange={handleInputChange}
          placeholder="Enter your Mobile Number"
          className="flex-grow bg-transparent outline-none text-white placeholder-white"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-white text-[#D2691E] font-bold px-4 py-2 rounded-full w-64 border border-[#D2691E] hover:bg-[#f4f4f4]"
      >
        Send Reset Link
      </button>

      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
