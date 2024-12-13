import React, { useState } from 'react';

const BidReports = () => {
  // State for storing dropdown selections, date, and bid data
  const [game, setGame] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [bidData, setBidData] = useState([]);
  
  // Sample data for demonstration (replace with actual data)
  const sampleBidData = [
    {
      game: 'Matka',
      type: 'Open',
      date: '2024-11-22',
      numbers: [1, 2, 3],
      amount: [100, 200, 300],
    },
    {
      game: 'Matka',
      type: 'Close',
      date: '2024-11-22',
      numbers: [4, 5, 6],
      amount: [150, 250, 350],
    },
    // More sample data
  ];

  // Filter the bid data based on selected filters
  const filteredData = sampleBidData.filter((data) => {
    const dateMatches = date ? data.date === date : true;
    const gameMatches = game ? data.game === game : true;
    const typeMatches = type ? data.type === type : true;
    return dateMatches && gameMatches && typeMatches;
  });

  // Calculate total amount for Open and Close sections
  const calculateTotal = (data) => {
    return data.reduce((total, current) => total + current, 0);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bid Reports</h2>
      
      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="game" className="block mb-2">Game</label>
          <select
            id="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Game</option>
            <option value="Kalyan">Kalyan</option>
            <option value="MainBazar">MAIN BAZAR</option>
            <option value="PoonaDay">POONA DAY</option>
            <option value="PoonaNight">POONA NIGHT</option>
            <option value="BholaDay">BHOLA DAY</option>
            <option value="NewsNight">NEWS night</option>
            <option value="AmolMorningf">AMOL MORNING</option>
            <option value="TulsiNight">Tulsi Night</option>
            <option value="KinaraDay">Kinara Day</option>

          


            {/* Add other games as necessary */}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block mb-2">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="Single">Single</option>
            <option value="Jodi">Jodi</option>
            <option value="SinglePatti">Single Patti</option>
            <option value="DoublePatti">Double Patti</option>
            <option value="TripplePatti">Tripple Patti</option>
            <option value="HalfSangam">Half Sangam </option>
            <option value="FullSangam">Full Sangam</option>
          
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block mb-2">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>

      {/* Display filtered data */}
      <div className="space-y-4">
        {filteredData.map((data, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-2">{data.game} - {data.type}</h3>
            <p className="mb-2">Date: {data.date}</p>

            {/* Open/Close Section */}
            <div className="border-t-2 pt-4">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Number</th>
                    <th className="px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.numbers.map((number, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2">{number}</td>
                      <td className="px-4 py-2">{data.amount[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right font-semibold">
                <p>Total Amount: {calculateTotal(data.amount)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidReports;
