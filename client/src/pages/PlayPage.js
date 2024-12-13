import React from 'react';
import bgImage from '../assets/maroonbg.jpg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PlayPage = () => {
  const location = useLocation(); // Access location state
  const { sattaName } = location.state || {};
  const navigate = useNavigate();

  const handlePlayOpen = () => {
    navigate('/play-open', { state: { sattaName } });
  };
  const handlePlayClose = () => {
    navigate('/play-close', { state: { sattaName } });
    // Add logic for "Play Close" functionality here
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header Section with Satta Name */}
      <div className="w-full bg-[#D2691E] text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold">
          {sattaName ? ` ${sattaName}` : 'No Satta selected.'}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Buttons Section */}
        <div className="flex space-x-6">
          {/* Play Open Button */}
          <button
            onClick={handlePlayOpen}
            className="px-6 py-3 bg-green-500 rounded-full shadow-md hover:bg-green-600 transition duration-300"
          >
            Play Open
          </button>

          {/* Play Close Button */}
          <button
            onClick={handlePlayClose}
            className="px-6 py-3 bg-red-500 rounded-full shadow-md hover:bg-red-600 transition duration-300"
          >
            Play Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
