import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import banner from '../assets/matkabanner.gif';
import Footer from './Footer';

const PanelChart = () => {
  const location = useLocation();
  const { marketName, resultNumbers } = location.state || {};

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  console.log('Received Market Name:', marketName);
  console.log('Received Result Numbers:', resultNumbers);

  const handleViewChart = () => {
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
  };

  // Table data array
  const tableData = [
    [40, 71, 98, 78, 30, 7, 86],
    [21, 72, 20, 21, 7, 19, 11],
    [31, 13, 17, 78, 33, 82, 73],
    [99, 24, 88, 28, 84, 60, 8],
    [11, 2, 2, 36, 80, 13, 80]
  ];

  // Weekday names
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div>
      <Navbar />

      {/* Outer container with max width */}
      <div className="flex flex-col items-center mt-6 mx-auto max-w-3xl">

        {/* Banner Image */}
        <div className="w-full">
          <img src={banner} alt="Banner" className="rounded-lg shadow-lg w-full" style={{ height: 'auto' }} />
        </div>

        {/* Content Section */}
        <div className="p-6 w-full">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-2 px-6 mt-4 mb-2 rounded-tl-3xl rounded-br-3xl text-center" 
              style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
            {marketName || 'Default Market Name'}<br />
            {resultNumbers || 'Default Result Numbers'}
          </h3>
        </div>

        {/* Go to Bottom Button */}
        <button className="text-xl font-semibold bg-gray-700 text-white py-2 px-12 mt-6 rounded-2xl"
            style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
          Go To Bottom
        </button>

        {/* Heading for Chart Section */}
        <h1 className="text-2xl font-semibold text-black mb-6 mt-2" 
            style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600', textDecoration: 'underline' }}>
          {marketName || 'Default Market Name'} CHART
        </h1>

        {/* Date Range Selection */}
        <div className="p-6 w-full flex flex-col items-center">
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            {/* From Date */}
            <div className="flex flex-col items-center">
              <label className="text-md font-medium text-gray-600 mb-1" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Till Date */}
            <div className="flex flex-col items-center">
              <label className="text-md font-medium text-gray-600 mb-1" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
                Till Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* View Chart Button */}
          <button
            onClick={handleViewChart}
            className="text-xl font-semibold bg-gray-700 text-white py-2 px-12 mt-6 rounded-2xl"
            style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}
          >
            View Chart
          </button>
        </div>
{/* Table Section */}
<div className="w-full mt-6 mb-4 bg-gray-100 rounded-lg shadow-lg p-6">
  <table 
    className="table-auto w-full text-lg font-semibold" 
    style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '700', borderRadius: '8px', overflow: 'hidden' }} // Rounded corners for the table
  >
    <thead>
      <tr className="text-white bg-gradient-to-r from-[#3838E9] to-[#3F74F5]">
        {daysOfWeek.map((day, index) => (
          <th key={index} className="px-4 py-2 text-center">{day}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tableData.map((row, rowIndex) => (
        <tr key={rowIndex} className="text-center">
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className="border border-[#3838E9] px-4 py-2"
              style={{
                borderRadius: '8px', // Apply rounded borders to each cell
              }}
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Repeated Market and Result Info */}
        <div className="p-6 w-full">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-2 px-6 mt-4 mb-2 rounded-tl-3xl rounded-br-3xl text-center" 
              style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
            {marketName || 'Default Market Name'}<br />
            {resultNumbers || 'Default Result Numbers'}
          </h3>
        </div>

        {/* Banner Image */}
        <div className="w-full">
          <img src={banner} alt="Banner" className="rounded-lg shadow-lg w-full" style={{ height: 'auto' }} />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default PanelChart;
