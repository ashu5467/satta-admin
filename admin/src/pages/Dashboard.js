// src/pages/Dashboard.js
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
  // Sample data for table rows
  const marketData = [
    {
      market: 'Aarush Morning',
      time: '10:00 AM - 11:30 PM',
      result: '179-70-389',
      date: '13/11/2024',
    },
    {
      market: 'Market 2',
      time: '12:00 PM - 1:30 PM',
      result: '123-45-678',
      date: '13/11/2024',
    },
    {
      market: 'Market 3',
      time: '2:00 PM - 3:30 PM',
      result: '111-22-333',
      date: '13/11/2024',
    },
    {
      market: 'Market 4',
      time: '4:00 PM - 5:30 PM',
      result: '456-78-901',
      date: '13/11/2024',
    },
  ];

  // State to handle modal visibility and selected market data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [resultDate, setResultDate] = useState('');
  const [openPatti, setOpenPatti] = useState('');
  const [jodi, setJodi] = useState('');
  const [closePatti, setClosePatti] = useState('');

  // Function to open the modal with selected market
  const openModal = (market) => {
    setSelectedMarket(market);
    setResultDate(market.date); // Set the result date from the market data
    setOpenPatti(''); // Clear previous values
    setJodi('');
    setClosePatti('');
    setIsModalOpen(true);
  };

  // Handle changes in result input fields
  const handleResultDateChange = (e) => setResultDate(e.target.value);
  const handleOpenPattiChange = (e) => setOpenPatti(e.target.value);
  const handleJodiChange = (e) => setJodi(e.target.value);
  const handleClosePattiChange = (e) => setClosePatti(e.target.value);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (openPatti && jodi && closePatti && resultDate) {
      alert(`Result for ${selectedMarket.market} updated:\n
      Date: ${resultDate}\n
      Open Patti: ${openPatti}\n
      Jodi: ${jodi}\n
      Close Patti: ${closePatti}`);
      setIsModalOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <h3 className="text-xl font-semibold text-white bg-[#17A2B8] p-4 shadow-md mb-6">
        Satta Dashboard
      </h3>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#17A2B8] shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
            <div className="text-3xl font-bold text-white text-left w-full">0</div>
            <h3 className="text-xl font-semibold text-white text-left w-full mb-auto">New Debit Requests</h3>

            <button className="bg-[#148A9D] text-sm text-white py-2 border-t border-white w-full rounded-b-lg flex justify-between items-center px-4 hover:bg-[#11707A] transition-colors">
              <span>Check Now</span>
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-[#28A745] shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
            <div className="text-3xl font-bold text-white text-left w-full">0</div>
            <h3 className="text-xl font-semibold text-white text-left w-full mb-auto">New Users</h3>

            <button className="bg-[#228E3B] text-sm text-white py-2 border-t border-white w-full rounded-b-lg flex justify-between items-center px-4 hover:bg-[#11707A] transition-colors">
              <span>Check Now</span>
              <FaArrowRight />
            </button>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full">
          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Market Results</h3>
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Market</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Time</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Result</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamically generating table rows from the array */}
                {marketData.map((data, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="py-2 px-4 text-gray-700 border border-gray-300">{data.market}</td>
                    <td className="py-2 px-4 text-gray-700 border border-gray-300">{data.time}</td>
                    <td className="py-2 px-4 text-gray-700 border border-gray-300">{data.result}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 flex items-center"
                        onClick={() => openModal(data)} // Open modal with selected market
                      >
                        Result
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal for entering result */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[600px]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Enter Result for {selectedMarket.market} ({resultDate})</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="resultDate" className="block text-sm font-medium text-gray-700">
                  Result for Date
                </label>
                <input
                  id="resultDate"
                  type="date"
                  value={resultDate}
                  onChange={handleResultDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="openPatti" className="block text-sm font-medium text-gray-700">
                  Open Patti
                </label>
                <input
                  id="openPatti"
                  type="number"
                  value={openPatti}
                  onChange={handleOpenPattiChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Open Patti"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="jodi" className="block text-sm font-medium text-gray-700">
                  Jodi
                </label>
                <input
                  id="jodi"
                  type="number"
                  value={jodi}
                  onChange={handleJodiChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Jodi"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="closePatti" className="block text-sm font-medium text-gray-700">
                  Close Patti
                </label>
                <input
                  id="closePatti"
                  type="number"
                  value={closePatti}
                  onChange={handleClosePattiChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Close Patti"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit Result
              </button>
            </form>
            <button
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
