import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import upi from '../assets/upi.jpeg'; // Ensure the path to the UPI image is correct
import { QRCodeSVG } from 'qrcode.react';

const UPIPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from the location state (passed from another page)
  const points = location.state?.points || 0;
  const payeeName = location.state?.username || 'User';
  const note = `Payment for ${points} points`;

  // Fixed receiver UPI ID
  const receiverUpiId = '7028418945@ybl'; // This is the fixed UPI ID for the receiver

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the user is on a mobile device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  // Function to handle the payment when the button is clicked
  const handlePayment = () => {
    // Generate the UPI payment link with the fixed receiver's UPI ID
    const upiLink = generateUPILink(payeeName, points, note, receiverUpiId);

    // Redirect to the UPI app if on a mobile device
    if (isMobile) {
      window.location.href = upiLink;
    } else {
      // Show a QR code or provide the link for desktop users
      alert('You are on a desktop. Please use your mobile to scan the QR code.');
    }
  };

  // Function to generate the UPI link
  const generateUPILink = (name, amount, note, receiverUpiId) => {
    return `upi://pay?pa=${receiverUpiId}&pn=${name}&am=${amount}&tn=${encodeURIComponent(
      note
    )}&cu=INR`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
      style={{ fontFamily: 'Segoe UI' }}
    >
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-md text-center">
        {/* UPI Image */}
        <img
          src={upi}
          alt="UPI Payment"
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-md"
        />
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Proceed to Pay</h1>
        <p className="text-gray-700 mb-2">
          <strong>Amount:</strong> {points} INR
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Payee Name:</strong> {payeeName}
        </p>

        {/* Button to trigger the payment process */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isMobile ? 'Pay with UPI' : 'Generate Payment Link'}
        </button>

        {/* QR Code or Payment Link for Desktop Users */}
        {!isMobile && (
          <div className="mt-4">
            <p className="text-gray-700 mb-2">Scan the QR code or use your mobile to pay:</p>
            <QRCodeSVG value={generateUPILink(payeeName, points, note, receiverUpiId)} />
          </div>
        )}

        {/* Cancel button to navigate back */}
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-300 text-black py-2 rounded-md mt-2 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UPIPayment;
