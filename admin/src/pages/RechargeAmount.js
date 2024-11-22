// src/components/RechargeAmount.js
import React, { useState } from 'react';

const RechargeAmount = () => {
  const [amount, setAmount] = useState('');

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Recharge amount set to: ₹${amount}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Recharge Amount</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="rechargeAmount">
            Enter Recharge Amount:
          </label>
          <input
            type="number"
            id="rechargeAmount"
            value={amount}
            onChange={handleChange}
            placeholder="Enter amount"
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

export default RechargeAmount;
