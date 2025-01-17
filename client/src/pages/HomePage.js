import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaPhone, FaPlusCircle, FaTelegramPlane, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import banner from '../assets/diwali banner.webp';
import axios from 'axios';

const HomePage = () => {
  const [sattaList, setSattaList] = useState([]); 
  const navigate = useNavigate(); // Initialize the navigate function
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);  // State to show loading status
  const [error, setError] = useState(null); 

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    axios.get('http://13.203.91.35:5000/api/markets')
      .then(response => {
        const sanitizedData = response.data.map(item => ({
          name: item.name || 'Unknown',
          _id: item._id,
          openTime: item.openTime || '12:00 AM',
          closeTime: item.closeTime || '12:00 AM',
          results: item.results || [],
          todayResult: item.todayResult || null, // Add todayResult
        }));
        setSattaList(sanitizedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching market data:', error);
        setError('Failed to load market data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Helper function to convert time string (e.g. "12:00 AM") to Date object
  const convertToDate = (timeString) => {
    const [time, meridian] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = meridian === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && meridian === 'AM' ? 0 : hours;
    const currentDate = new Date(currentTime);
    currentDate.setHours(hours24, minutes, 0, 0);
    return currentDate;
  };

  const isTimeBetween = (openTime, closeTime) => {
    const openDate = convertToDate(openTime);
    const closeDate = convertToDate(closeTime);
    return currentTime >= openDate && currentTime <= closeDate;
  };

  const handleChartClick = (sattaName, marketId) => {
    navigate('/chart', { state: { sattaName, marketId } }); // Pass Satta name in the state
  };

  const handlePlayClick = (sattaName, marketId) => {
    navigate('/play', { state: { sattaName, marketId } }); // Pass Satta name in the state
  };

  const getRemainingTime = (closeTime) => {
    if (!closeTime || !closeTime.match(/(\d+):(\d+)\s(AM|PM)/)) {
      return 0; // Return 0 if closeTime is invalid
    }
    const [hours, minutes, meridian] = closeTime.match(/(\d+):(\d+)\s(AM|PM)/).slice(1);
    const closeDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      meridian === 'PM' ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12,
      parseInt(minutes)
    );
    const diff = closeDate - currentTime;
    return diff > 0 ? diff : 0; // Return 0 if time has already passed
  };
  
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="p-0 bg-[#FADBD8] min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-65 fixed top-0 left-0 z-10">
        <img
          src={banner}
          alt="Satta Banner"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better button visibility */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* WhatsApp and Call Buttons Section */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-full bg-[#3B1F18] py-4 flex justify-center items-center space-x-4">
          {/* WhatsApp Button */}
          <a href="https://wa.me/8010458010?text=Hello%20I%20need%20more%20info" target="_blank" rel="noopener noreferrer" className="inline-flex">
            <button className="flex items-center justify-center p-4 bg-[#3B1F18] text-white border-2 border-white rounded-md shadow hover:bg-[#4C2D23] w-40">
              <FaWhatsapp size={20} className="mr-2" />
              WhatsApp
            </button>
          </a>

          {/* Call Button */}
          <a href="tel:+8010458010" className="inline-flex">
            <button className="flex items-center justify-center p-4 bg-[#3B1F18] text-white border-2 border-white rounded-md shadow hover:bg-[#4C2D23] w-40">
              <FaPhone size={20} className="mr-2" />
              Call
            </button>
          </a>
        </div>

        {/* Add Points and Telegram Buttons Section */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center space-x-4">
          <button onClick={() => navigate('/add-points')} className="flex items-center justify-center text-sm bg-transparent text-white border-2 border-white rounded-md shadow hover:bg-[#FADBD8] w-1/3">
            <FaPlusCircle size={18} className="mr-2" />
            Add Points
          </button>
          <button className="flex items-center justify-center text-sm bg-transparent text-white border-2 border-white rounded-md shadow hover:bg-[#FADBD8] w-1/3">
            <FaTelegramPlane size={18} className="mr-2" />
            Telegram
          </button>
        </div>
      </div>

      {/* Satta List Section */}
      <div className="mt-6 space-y-4">
        {sattaList.map((satta, index) => {
          const remainingTime = getRemainingTime(satta.closeTime);
          const canPlay = isTimeBetween(satta.openTime, satta.closeTime);

          return (
            <div
              key={index}
              className="bg-amber-100 shadow p-4 rounded-md border border-gray-200 relative"
            >
              <div className="flex flex-col items-center mb-2">
                <h2 className="text-lg font-bold text-center md:text-xl">{satta.name}</h2>
              </div>

              {/* Open/Close Timings */}
              <div className="absolute top-2 left-2 text-sm text-gray-600">Open: {satta.openTime}</div>
              <div className="absolute top-2 right-2 text-sm text-gray-600">Close: {satta.closeTime}</div>

              <div className="mt-2 text-center text-gray-800 text-lg font-semibold">
                {satta.todayResult 
                  ? `${satta.todayResult.openPatti || 'N/A'} - ${satta.todayResult.jodi || 'N/A'} - ${satta.todayResult.closePatti || 'N/A'}`
                  : 'No Result'}
              </div>

              {/* Remaining Time */}
              <div className="mt-2 text-center text-gray-500 text-sm">
                {remainingTime > 0
                  ? `Time Left: ${formatTime(remainingTime)}`
                  : 'Betting Closed'}
              </div>

              {/* Buttons Section */}
              <div className="flex justify-between mt-4">
                {/* Chart Button */}
                <button
                  onClick={() => handleChartClick(satta.name, satta._id)} // Pass the satta name to the handler
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Chart
                </button>

                {/* Play Button */}
                {canPlay ? (
                  <button
                    onClick={() => handlePlayClick(satta.name, satta._id)}
                    className="flex items-center justify-center w-12 h-12 rounded-full text-white bg-blue-500 hover:bg-blue-600 animate-pulse"
                  >
                    <FaPlay size={20} />
                  </button>
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-gray-600">
                    Closed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
