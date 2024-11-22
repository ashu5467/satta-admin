// src/components/DefaultMethod.js
import React, { useState } from 'react';

const DefaultMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('UPI'); // Default value

  // Options for payment methods
  const paymentMethods = ['UPI', 'Net Banking', 'Debit Card', 'Credit Card', 'Wallet'];

  // Handle selection change
  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Default payment method updated to: ${selectedMethod}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Default Payment Method</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentMethod">
            Select Default Payment Method:
          </label>
          <select
            id="paymentMethod"
            value={selectedMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default DefaultMethod;
