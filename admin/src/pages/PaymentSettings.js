import React, { useState } from 'react';
import { FaCheck, FaTimes, FaMobileAlt, FaGoogle, FaMoneyBillWave } from 'react-icons/fa';

const PaymentSettings = () => {
  const [defaultMethod, setDefaultMethod] = useState('Paytm');
  const [rechargeAmount, setRechargeAmount] = useState(500);
  const [withdrawalTime, setWithdrawalTime] = useState('24 Hours');
  const [upiMethods, setUpiMethods] = useState([
    { name: 'Paytm', icon: <FaMobileAlt />, active: true },
    { name: 'PhonePe', icon: <FaMoneyBillWave />, active: true },
    { name: 'Google Pay', icon: <FaGoogle />, active: false },
  ]);

  const toggleUPIMethod = (methodName) => {
    setUpiMethods((prev) =>
      prev.map((method) =>
        method.name === methodName ? { ...method, active: !method.active } : method
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Settings</h3>

      {/* Default Payment Method */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Default Payment Method</h4>
        <select
          value={defaultMethod}
          onChange={(e) => setDefaultMethod(e.target.value)}
          className="p-2 border rounded w-full"
        >
          {upiMethods.map((method) => (
            <option key={method.name} value={method.name}>
              {method.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recharge Amount */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Recharge Amount</h4>
        <input
          type="number"
          value={rechargeAmount}
          onChange={(e) => setRechargeAmount(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter recharge amount"
        />
      </div>

      {/* Withdrawal Time */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Withdrawal Time</h4>
        <select
          value={withdrawalTime}
          onChange={(e) => setWithdrawalTime(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="24 Hours">24 Hours</option>
          <option value="48 Hours">48 Hours</option>
          <option value="72 Hours">72 Hours</option>
        </select>
      </div>

      {/* Payment UPI Methods */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2">Payment UPI Methods</h4>
        <div className="space-y-4">
          {upiMethods.map((method) => (
            <div
              key={method.name}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{method.icon}</div>
                <span>{method.name}</span>
              </div>
              <button
                onClick={() => toggleUPIMethod(method.name)}
                className={`p-2 rounded ${
                  method.active
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {method.active ? <FaCheck /> : <FaTimes />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
