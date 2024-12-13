import React, { useState } from 'react';

const PointsReports = () => {
  // State for storing date and points data
  const [date, setDate] = useState('');
  const [pointsData, setPointsData] = useState([
    // Sample data (replace this with actual data)
    { date: '2024-11-22', name: 'John Doe', credit: 100, debit: 50 },
    { date: '2024-11-21', name: 'Jane Doe', credit: 200, debit: 30 },
    { date: '2024-11-22', name: 'Alice Smith', credit: 150, debit: 70 },
    { date: '2024-11-20', name: 'Bob Brown', credit: 50, debit: 20 },
  ]);

  // Filter data based on the selected date
  const filteredData = pointsData.filter((data) => {
    return date ? data.date === date : true;
  });

  // Calculate totals for Credit and Debit
  const calculateTotal = (data, key) => {
    return data.reduce((total, current) => total + current[key], 0);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Points Reports</h2>

      {/* Date Filter */}
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="date" className="block mb-2">Select Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>

      {/* Table for Points Data */}
      <div className="mb-6">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Credit</th>
              <th className="px-4 py-2">Debit</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{data.date}</td>
                <td className="px-4 py-2">{data.name}</td>
                <td className="px-4 py-2">{data.credit}</td>
                <td className="px-4 py-2">{data.debit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="text-right font-semibold">
        <p>Total Credit: {calculateTotal(filteredData, 'credit')}</p>
        <p>Total Debit: {calculateTotal(filteredData, 'debit')}</p>
        <p>
          Total Balance:{" "}
          {calculateTotal(filteredData, 'credit') - calculateTotal(filteredData, 'debit')}
        </p>
      </div>
    </div>
  );
};

export default PointsReports;
