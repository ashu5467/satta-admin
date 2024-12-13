import React, { useState, useEffect } from 'react';

const CheckBusiness = () => {
  const [businessData, setBusinessData] = useState({
    dhanda: [],
    deletedDhanda: [],
    valan: [],
    chukicheValan: [],
  });
  const [searchDate, setSearchDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [selectedDate]);

  const fetchData = async (date) => {
    try {
      const response = await fetch(`http://localhost:5000/api/businesses?date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch businesses data');
      const data = await response.json();

      setBusinessData({
        dhanda: data.dhanda,
        deletedDhanda: data.deletedDhanda,
        valan: data.valan,
        chukicheValan: data.chukicheValan,
      });
    } catch (error) {
      console.error('Error fetching businesses data:', error);
    }
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSearchDate(selected);
  };

  const handleSearchDate = () => {
    setSelectedDate(searchDate);
  };

  const renderTable = (data, sectionName) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{sectionName}</h3>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Market</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="py-2 px-4 border">{item.market}</td>
                  <td className="py-2 px-4 border">{item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-2 px-4 text-center text-gray-600">
                  No data found for this date
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Date Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="date"
          value={searchDate}
          onChange={handleDateChange}
          className="p-2 border rounded w-1/3"
        />
        <button
          onClick={handleSearchDate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Search
        </button>
      </div>

      {/* Sections */}
      {selectedDate && (
        <>
          {renderTable(businessData.dhanda, 'धंदा')}
          {renderTable(businessData.deletedDhanda, 'Deleted धंदा')}
          {renderTable(businessData.valan, 'वळण')}
          {renderTable(businessData.chukicheValan, 'चुकीचे वळण')}
        </>
      )}
    </div>
  );
};

export default CheckBusiness;
