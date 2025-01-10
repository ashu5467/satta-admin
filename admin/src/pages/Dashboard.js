import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Dashboard = () => {
  // State to handle market data, modal visibility, and other inputs
  const [marketData, setMarketData] = useState([]); // State for storing market data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [resultDate, setResultDate] = useState('');
  const [openPatti, setOpenPatti] = useState('');
  const [jodi, setJodi] = useState('');
  const [closePatti, setClosePatti] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newDebitRequests, setNewDebitRequests] = useState([]);
  const [isDebitModalOpen, setIsDebitModalOpen] = useState(false);

  const [newUsers, setNewUsers] = useState([]);


  const [newUserCount, setNewUserCount] = useState(0);
  const [newDebitCount, setNewDebitCount] = useState(0);

  useEffect(() => {
    const fetchNewUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/today-signups');
        const data = await response.json();
        setNewUserCount(data.todaySignups);
      } catch (error) {
        console.error('Error fetching today\'s signups:', error);
      }
    };

    fetchNewUsers();
  }, []);


  // Fetch market data from API
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/markets');
        const data = await response.json();
        setMarketData(data); // Store the fetched market data
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarkets();
    console.log(marketData)
  }, []);

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




  useEffect(() => {
    const fetchNewDebitRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions/debit-request-today'); // API endpoint to fetch new debit requests for today
        const data = await response.json();
        
        // Access requestCount from the first object in newDebitRequests array
        const count = data.newDebitRequests && data.newDebitRequests[0] ? data.newDebitRequests[0].requestCount : 0;
        setNewDebitCount(count); // Update state with the count
      } catch (error) {
        console.error('Error fetching new debit requests:', error);
      }
    };
  
    fetchNewDebitRequests();
  }, []);
  


  const handleNewDebitRequestsClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/transactions/debit-request');
      const data = await response.json();
      console.log(data);  // Check the API response here
  
      // Ensure the data is structured correctly
      if (data.newDebitRequests && Array.isArray(data.newDebitRequests)) {
        setNewDebitRequests(data.newDebitRequests); // Update state with the list of new debit requests
        setIsDebitModalOpen(true); // Open the modal
      } else {
        console.error('Invalid data format', data); // Log an error if the data structure is not correct
        alert('No new debit requests or incorrect data format.');
      }
    } catch (error) {
      console.error('Error fetching new debit requests:', error);
      alert('Error fetching new debit requests');
    }
  };
  
  

  const handleNewUsersClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/today-signups');
      const data = await response.json();
      console.log(data); // Debug API response
      setNewUsers(data.newUsers || []); // Safely access newUsers
      setIsUserModalOpen(true);
    } catch (error) {
      console.error('Error fetching new users:', error);
    }
  };
  


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (openPatti && jodi && closePatti && resultDate === today) {
      try {
        const response = await fetch(`http://localhost:5000/api/markets/${selectedMarket._id}/result`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resultDate, openPatti, jodi, closePatti }),
        });
        if (!response.ok) throw new Error('Failed to update result');
  
        const updatedMarket = await response.json();
        setMarketData((prevData) =>
          prevData.map((market) => (market._id === updatedMarket._id ? updatedMarket : market))
        );
  
        alert('Result updated successfully!');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating result:', error);
        alert('Error updating result');
      }
    } else {
      alert('Please ensure the result is for today.');
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
            <div className="text-3xl font-bold text-white text-left w-full">{newDebitCount}</div>
            <h3 className="text-xl font-semibold text-white text-left w-full mb-auto">New Debit Requests</h3>

            <button 
            onClick={handleNewDebitRequestsClick}
            className="bg-[#148A9D] text-sm text-white py-2 border-t border-white w-full rounded-b-lg flex justify-between items-center px-4 hover:bg-[#11707A] transition-colors">
              <span>Check Now</span>
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-[#28A745] shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
            <div className="text-3xl font-bold text-white text-left w-full">{newUserCount}</div>
            <h3 className="text-xl font-semibold text-white text-left w-full mb-auto">New Users</h3>

            <button 
            onClick={handleNewUsersClick}
            className="bg-[#228E3B] text-sm text-white py-2 border-t border-white w-full rounded-b-lg flex justify-between items-center px-4 hover:bg-[#11707A] transition-colors">
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
  {marketData.length > 0 ? (
    marketData.map((data, index) => (
      <tr key={index} className="border-t border-gray-300">
        <td className="py-2 px-4 text-gray-700 border border-gray-300">{data.name}</td>
        <td className="py-2 px-4 text-gray-700 border border-gray-300">
          {data.openTime} - {data.closeTime}
        </td>
        <td className="py-2 px-4 text-gray-700 border border-gray-300">
  {data.todayResult
    ? `${data.todayResult.openPatti || 'N/A'} - ${data.todayResult.jodi || 'N/A'} - ${data.todayResult.closePatti || 'N/A'}`
    : 'No Result'}
</td>

        <td className="py-2 px-4 border border-gray-300">
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 flex items-center"
            onClick={() => openModal(data)} // Open modal with selected market
          >
            Result
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center text-gray-500">
        No markets available
      </td>
    </tr>
  )}
</tbody>


            </table>
          </div>
        </section>
      </main>



      {isDebitModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-[600px]">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">New Debit Requests</h3>
      {newDebitRequests.length > 0 ? (
        <ul className="space-y-2">
          {newDebitRequests.map((request, index) => (
            <li key={index} className="border-b py-2">
              <div className="text-gray-700">
                <strong>User:</strong> {request.userName}
              </div>
              <div className="text-gray-700">
                <strong>Amount:</strong> {request.amount}
              </div>
              <div className="text-gray-500 text-sm">
                <strong>Requested At:</strong> {new Date(request.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No new debit requests.</p>
      )}
      <button
        className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        onClick={() => setIsDebitModalOpen(false)}
      >
        Close
      </button>
    </div>
  </div>
)}



      {/* Modal for Today's Signed-up Users */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[600px]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Today's Signed-up Users</h3>
            {newUsers.length > 0 ? (
              <ul className="space-y-2">
                {newUsers.map((user, index) => (
                  <li key={index} className="border-b py-2">
                    <div className="text-gray-700">
                      <strong>Name:</strong> {user.name}
                    </div>
                    <div className="text-gray-700">
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div className="text-gray-500 text-sm">
                      <strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No new users signed up today.</p>
            )}
            <button
              className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              onClick={() => setIsUserModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    



     {/* Modal for entering result */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-[600px]">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Enter Result for {selectedMarket?.name || 'Unknown Market'} ({resultDate})
      </h3>
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
    type="text"
    value={openPatti}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d{0,3}$/.test(value)) {
        setOpenPatti(value); // Allow up to 3 digits
      }
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    placeholder="Enter 3-digit Open Patti"
  />
</div>
<div className="mb-4">
  <label htmlFor="jodi" className="block text-sm font-medium text-gray-700">
    Jodi
  </label>
  <input
    id="jodi"
    type="text"
    value={jodi}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d{0,2}$/.test(value)) {
        setJodi(value); // Allow up to 2 digits
      }
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    placeholder="Enter 2-digit Jodi"
  />
</div>
<div className="mb-4">
  <label htmlFor="closePatti" className="block text-sm font-medium text-gray-700">
    Close Patti
  </label>
  <input
    id="closePatti"
    type="text"
    value={closePatti}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d{0,3}$/.test(value)) {
        setClosePatti(value); // Allow up to 2 digits
      }
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
    placeholder="Enter 3-digit Close Patti"
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
