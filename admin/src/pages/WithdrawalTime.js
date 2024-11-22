// src/components/WithdrawalTime.js
import React, { useState } from 'react';

const WithdrawalTime = () => {
  const [time, setTime] = useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Withdrawal time set to: ${time}`);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Time</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="withdrawalTime">
            Enter Withdrawal Time:
          </label>
          <input
            type="time"
            id="withdrawalTime"
            value={time}
            onChange={handleChange}
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

export default WithdrawalTime;
