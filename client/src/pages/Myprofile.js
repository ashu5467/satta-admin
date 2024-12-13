import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaCcPaypal, FaGooglePay, FaPhoneAlt } from 'react-icons/fa';
import bgImage from '../assets/maroonbg.jpg';
import { CgProfile } from "react-icons/cg";
import axios from 'axios'; // Assuming axios for API calls
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  // State for personal details
  const navigate = useNavigate();
  const [personalDetails, setPersonalDetails] = useState({
    username: "",
    dob: "",
    phone: "",
    email: "",
  });

  // State for payment details
  const [paymentDetails, setPaymentDetails] = useState({
    googlePay: "",
    phonePe: "",
    paytm: "",
    upi: "",
  });

  // States for edit mode
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  // Fetch user data from API
  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    console.log('Retrieved Token:', token);// Retrieve token from localStorage
    if (!token) {
      alert('Session expired. Please log in again.');
      navigate('/login'); // Redirect if token is not present
      return;
    }
  
    axios.get('http://localhost:5000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Pass the token in headers
      },
    })
    .then(response => {
      console.log('Fetched User Profile:', response.data);
      setPersonalDetails(response.data.personalDetails);
      setPaymentDetails(response.data.paymentDetails);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken'); // Clear invalid token
        navigate('/login');
      }
    });
  }, [navigate]);
  
  // Handler to toggle personal details edit mode
  const handleEditPersonal = () => {
    setIsEditingPersonal(!isEditingPersonal);
  };

  // Handler to toggle payment details edit mode
  const handleEditPayment = () => {
    setIsEditingPayment(!isEditingPayment);
  };

  // Handler to update personal details
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handler to update payment details
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };



  const savePersonalDetails = () => {
    const updatedDetails = {
      
      dob: personalDetails.dob,
      phone: personalDetails.phone,
      email: personalDetails.email,
    };
  
    console.log("Updated Payload:", updatedDetails);
    axios.put('http://localhost:5000/api/users/profile', updatedDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    .then(response => {
      console.log('Profile updated successfully', response.data); // Log success
    })
    .catch(error => {
      console.error('Error updating profile:', error.response?.data || error.message); // Log error
    });
    
  };
  
  

  const savePaymentDetails = () => {
    const token = localStorage.getItem('authToken');
    console.log('Token used for saving payment details:', token);
    
    
    axios.put('http://localhost:5000/api/users/profile/payment', paymentDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
       // Ensure token is stored and retrieved correctly
      },
    })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          
        }
        console.log('Payment details updated successfully');
        setIsEditingPayment(false);
      })
      .catch(error => {
        console.error('Error updating payment details:', error);
      });
    
  };
  


  

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center py-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Profile Icon */}
      <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        <CgProfile className="text-4xl text-black" />
      </div>

      {/* Name */}
      <h1 className="mt-4 text-2xl font-semibold text-white">John Doe</h1>

      {/* Personal Details */}
      <div className="bg-opacity-50 shadow-md rounded-lg mt-6 p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-white">Personal Details</h2>
        <div className="mt-4">
          {/* Date of Birth */}
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            <span className="font-medium text-white">Date of Birth: </span>
            {isEditingPersonal ? (
              <input
                type="date"
                name="dob"
                value={personalDetails.dob}
                onChange={handlePersonalChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{personalDetails.dob}</span>
            )}
          </div>

          {/* Contact No */}
          <div className="flex items-center mb-4">
            <FaPhone className="mr-2 text-blue-500" />
            <span className="font-medium text-white">Contact No: </span>
            {isEditingPersonal ? (
              <input
                type="text"
                name="phone"
                value={personalDetails.phone}
                onChange={handlePersonalChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{personalDetails.phone}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center mb-4">
            <FaEnvelope className="mr-2 text-blue-500" />
            <span className="font-medium text-white">Email ID: </span>
            {isEditingPersonal ? (
              <input
                type="email"
                name="email"
                value={personalDetails.email}
                onChange={handlePersonalChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{personalDetails.email}</span>
            )}
          </div>
        </div>
        <button 
          onClick={isEditingPersonal ? savePersonalDetails : handleEditPersonal} 
          className="mt-6 px-4 py-2 bg-white text-[#800000] rounded-md shadow hover:bg-gray-200 w-full"
        >
          {isEditingPersonal ? 'Save Personal Details' : 'Edit Personal Details'}
        </button>
      </div>

      {/* Payment Details */}
      <div className="bg-opacity-50 shadow-md rounded-lg mt-6 p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-white">Payment Details</h2>
        <div className="mt-4">
          {/* Google Pay */}
          <div className="flex items-center mb-4">
            <FaGooglePay className="mr-2 text-blue-500" />
            <span className="font-medium text-white">Google Pay: </span>
            {isEditingPayment ? (
              <input
                type="text"
                name="googlePay"
                value={paymentDetails.googlePay}
                onChange={handlePaymentChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{paymentDetails.googlePay}</span>
            )}
          </div>

          {/* PhonePe */}
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="mr-2 text-blue-500" />
            <span className="font-medium text-white">PhonePe: </span>
            {isEditingPayment ? (
              <input
                type="text"
                name="phonePe"
                value={paymentDetails.phonePe}
                onChange={handlePaymentChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{paymentDetails.phonePe}</span>
            )}
          </div>

          {/* Paytm */}
          <div className="flex items-center mb-4">
            <FaCcPaypal className="mr-2 text-blue-500" />
            <span className="font-medium text-white">Paytm: </span>
            {isEditingPayment ? (
              <input
                type="text"
                name="paytm"
                value={paymentDetails.paytm}
                onChange={handlePaymentChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{paymentDetails.paytm}</span>
            )}
          </div>

          {/* UPI */}
          <div className="flex items-center mb-4">
            <FaUser className="mr-2 text-blue-500" />
            <span className="font-medium text-white">UPI: </span>
            {isEditingPayment ? (
              <input
                type="text"
                name="upi"
                value={paymentDetails.upi}
                onChange={handlePaymentChange}
                className="ml-2 text-black p-2 rounded w-full"
              />
            ) : (
              <span className="ml-2 text-white">{paymentDetails.upi}</span>
            )}
          </div>
        </div>
        <button 
          onClick={isEditingPayment ? savePaymentDetails : handleEditPayment} 
          className="mt-6 px-4 py-2 bg-white text-[#800000] rounded-md shadow hover:bg-gray-200 w-full"
        >
          {isEditingPayment ? 'Save Payment Details' : 'Edit Payment Details'}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
