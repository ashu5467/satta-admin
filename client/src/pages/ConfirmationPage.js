import React from 'react';
import bgImage from '../assets/maroonbg.jpg';
// Import FontAwesome for the checkmark icon
import { FaCheckCircle } from 'react-icons/fa';

const ConfirmationPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Checkmark Icon */}
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
      <p className="text-lg text-white text-center sm:text-left">Your order has been placed successfully.</p>
    </div>
  );
};

export default ConfirmationPage;
