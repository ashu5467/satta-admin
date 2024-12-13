import React from "react";
import bgImage from '../assets/maroonbg.jpg'; 

const Statements = () => {
  // Sample data for the table
  const statementData = [
    { date: "2024-11-28", description: "Added Points", points: "+500", balance: "1500" },
    { date: "2024-11-27", description: "Game Played", points: "-200", balance: "1000" },
    { date: "2024-11-26", description: "Bonus Points", points: "+100", balance: "1200" },
    { date: "2024-11-25", description: "Withdrawn", points: "-300", balance: "1100" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`, // Apply the background image
        backgroundSize: 'cover', // Ensure the image covers the screen
        backgroundPosition: 'center', // Center the image
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Statements</h2> {/* White text for visibility */}
      <div className="overflow-x-auto bg-white bg-opacity-70 p-4 rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Points</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {statementData.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2">{item.points}</td>
                <td className="border border-gray-300 px-4 py-2">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statements;
