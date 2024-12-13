import React from "react";
import bgImage from '../assets/maroonbg.jpg';

const Gamerates = () => {
  const gameRates = [
    { type: "Single", rate: "1 ka 9.50" },
    { type: "Jodi", rate: "1 ka 95.00" },
    { type: "Single Pana", rate: "1 ka 145.00" },
    { type: "Double Pana", rate: "1 ka 280.00" },
    { type: "Triple Pana", rate: "1 ka 800.00" },
    { type: "Half Sangam", rate: "1 ka 1000.00" },
    { type: "Full Sangam", rate: "1 ka 10000.00" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`, // Set background image
        backgroundSize: 'cover', // Cover the entire screen
        backgroundPosition: 'center', // Center the background
      }}
    >
      <h2 className="text-2xl font-medium mb-4 text-white">Game Rates</h2> {/* White text for heading */}

      {/* Game Rates List */}
      <div className="space-y-4">
        {gameRates.map((game, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-md shadow-sm"
          >
            <span className="text-lg font-medium text-white">{game.type}</span> {/* White text for game type */}
            <span className="text-lg font-medium text-white">{game.rate}</span> {/* White text for rate */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gamerates;
