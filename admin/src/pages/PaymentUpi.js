// src/components/PaymentUpi.js
import React, { useState } from 'react';

const PaymentUpi = () => {
  const [upi, setUpi] = useState('');

  const handleChange = (event) => {
    setUpi(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Payment UPI ID updated to: ${upi}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Payment UPI</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentUpi">
            Enter UPI ID:
          </label>
          <input
            type="text"
            id="paymentUpi"
            value={upi}
            onChange={handleChange}
            placeholder="Enter UPI ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default PaymentUpi;
