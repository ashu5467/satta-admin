import React, { useState } from "react";
import bgImage from '../assets/maroonbg.jpg';

const Withdraw = () => {
  const [amount, setAmount] = useState(""); // State for amount
  const [selectedUPI, setSelectedUPI] = useState(""); // State for selected UPI
  const [upiId, setUpiId] = useState(""); // State for UPI ID

  const handleSubmit = async () => {
    if (!amount || !selectedUPI || !upiId) {
      alert("Please enter an amount, select a UPI option, and provide a UPI ID.");
    } else {
      const data = {
        amount,
        upiOption: selectedUPI,
        upiId,
      };

      try {
        const response = await fetch('http://localhost:5000/api/transactions/debit-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert(`Withdraw request of ₹${amount} via ${selectedUPI} to ${upiId} submitted successfully.`);
        } else {
          alert(result.message || "Error submitting withdrawal request.");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An error occurred while submitting your request.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`, // Background image
        backgroundSize: 'cover', // Cover the entire screen
        backgroundPosition: 'center', // Center the background
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Withdraw</h2> {/* White text for heading */}

      {/* Withdrawal Timing Information */}
      <p className="text-lg text-white mb-6">
        Withdraw Time: <span className="font-semibold">01:00 AM to 10:00 AM</span>
      </p>

      {/* Input for Amount */}
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm font-medium text-white mb-2">
          Enter Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to withdraw"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* UPI Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-white mb-2">Choose UPI Option</label>
        <div className="space-y-2">
          {["Google Pay", "PhonePe", "Paytm", "Other UPI"].map((upi) => (
            <div key={upi} className="flex items-center">
              <input
                type="radio"
                id={upi}
                name="upiOption"
                value={upi}
                onChange={(e) => setSelectedUPI(e.target.value)}
                className="mr-2"
              />
              <label htmlFor={upi} className="text-sm text-white">
                {upi}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Input for UPI ID */}
      <div className="mb-6">
        <label htmlFor="upiId" className="block text-sm font-medium text-white mb-2">
          Enter UPI ID
        </label>
        <input
          id="upiId"
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="Enter your UPI ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-white text-bold text-[#800000] rounded-md shadow hover:bg-gray-100 focus:outline-none"
      >
        Submit
      </button>
    </div>
  );
};

export default Withdraw;
