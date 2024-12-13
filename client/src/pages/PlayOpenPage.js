import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgImage from '../assets/maroonbg.jpg'; // Ensure this image is available

const PlayOpenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sattaName } = location.state || {};
  const [market, setMarket] = useState('');
  const [biddingItems, setBiddingItems] = useState([]);
  const [biddingNumber, setBiddingNumber] = useState('');
  const [points, setPoints] = useState('');

  const handleAddBidding = () => {
    if (biddingNumber && points) {
      setBiddingItems((prev) => [
        ...prev,
        { openClose: 'Open', digit: biddingNumber, points: points },
      ]);
      setBiddingNumber('');
      setPoints('');
    }
  };

  const handleDeleteBidding = (index) => {
    const updatedItems = biddingItems.filter((_, i) => i !== index);
    setBiddingItems(updatedItems);
  };

  const handleSubmitMarket = () => {
    if (!market) { 
      alert('Please select a market first.');
    } else {
      // Calculate total points
      const totalPoints = biddingItems.reduce(
        (total, item) => total + parseFloat(item.points || 0),
        0
      );
  
      // Pass all selected data to the checkout page
      navigate('/checkout', {
        state: {
          market,
          biddingItems,
          totalPoints,
          sattaName,
        },
      });
    }
  };
  
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-2xl font-bold text-white mb-4">
        {sattaName ? `${sattaName} - Open` : 'No Satta Selected'}
      </h1>

      {/* Dropdown and Submit Button in Same Line */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="w-64">
          <select
            id="market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="default">DEFAULT</option>
            <option value="sp">SP</option>
            <option value="dpt">DPT</option>
            <option value="cp">CP</option>
            <option value="sp motors">SP MOTORS</option>
            <option value="dp motors">DP MOTORS</option>
            <option value="sp dp motors">SP DP MOTORS</option>
            <option value="sp common">SP COMMON</option>
            <option value="dpt common">DPT COMMON</option>
            <option value="pana family">PANA FAMILY</option>
            <option value="cht 30">CHT 30</option>
            <option value="cht 40">CHT 40</option>
            <option value="cht 50">CHT 50</option>
            <option value="cht 70">CHT 70</option>
          </select>
        </div>
        <button
          onClick={handleSubmitMarket}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* Display Space for Added Items */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Bidding Items</h2>
        {biddingItems.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold">Open/Close</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Digit</th>
                <th className="py-2 px-4 text-left text-sm font-semibold">Points</th>
                <th className="py-2 px-4 text-left text-sm font-semibold"></th> {/* Empty Column for Delete */}
              </tr>
            </thead>
            <tbody>
              {biddingItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4">{item.openClose}</td>
                  <td className="py-2 px-4">{item.digit}</td>
                  <td className="py-2 px-4">{item.points}</td>
                  <td className="py-2 px-4 text-red-500 cursor-pointer" onClick={() => handleDeleteBidding(index)}>
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No items added yet.</p>
        )}
      </div>

      {/* Input Section for Bidding */}
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <div className="flex space-x-4">
          <input
            type="text"
            value={biddingNumber}
            onChange={(e) => setBiddingNumber(e.target.value)}
            placeholder="Bidding Number"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Points"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleAddBidding}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </div>

      {/* Total Points */}
      <div className="mt-4 text-white text-lg font-semibold">
        Total Rs: {biddingItems.reduce((total, item) => total + parseFloat(item.points || 0), 0)}
      </div>
    </div>
  );
};

export default PlayOpenPage;
