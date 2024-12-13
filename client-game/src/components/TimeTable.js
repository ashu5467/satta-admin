import React from 'react';
import banner from '../assets/matkabanner.gif';

const Timetable = () => {
  // Array of timetable data with market names and timings
  const timetableData = [
    { market: "ADD UR MARKET FREE Chart", open: "10:00 AM", close: "11:00 AM" },
    { market: "MILAN MORNING Chart", open: "9:30 AM", close: "10:30 AM" },
    { market: "MILAN DAY Chart", open: "1:00 PM", close: "2:00 PM" },
    { market: "MILAN NIGHT Chart", open: "8:00 PM", close: "9:00 PM" },
    { market: "TIME BAZAR Chart", open: "11:30 AM", close: "12:30 PM" },
    { market: "NIGHT TIME BAZAR Chart", open: "9:30 PM", close: "10:30 PM" },
    { market: "KALYAN Chart", open: "4:00 PM", close: "5:00 PM" },
    { market: "KALYAN NIGHT Chart", open: "9:30 PM", close: "10:30 PM" },
    // Add more entries as needed
  ];

  return (
    <div className="flex flex-col items-center p-6">
      {/* Timetable Heading (with matching width to the table) */}
      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-2 px-6 sm:px-20 md:px-40 lg:px-60 mt-4 rounded-br-xl rounded-tl-xl max-w-full text-center w-full sm:w-full md:w-full lg:w-2/4" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
        Timetable
      </h3>

      {/* Table for Timetable */}
      <div className="overflow-x-auto md:px-32 lg:px-50 mt-4 w-full sm:w-full md:w-full lg:w-3/4">
        <table className="table-auto w-full max-w-full bg-white shadow-lg border border-gray-300 rounded-2xl rounded-bl-2xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white">
              <th className="px-4 py-2 border border-gray-300 text-center w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 rounded-tl-xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>Market</th>
              <th className="px-4 py-2 border border-gray-300 text-center w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/6" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>Open</th>
              <th className="px-4 py-2 border border-gray-300 text-center w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/6 rounded-tr-xl" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>Close</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.map((entry, index) => (
              <tr key={index} className='bg-white'>
                <td className="px-4 py-2 border border-gray-300 text-left" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>{entry.market}</td>
                <td className="px-4 py-2 border border-gray-300 text-left" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>{entry.open}</td>
                <td className="px-4 py-2 border border-gray-300 text-left" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>{entry.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Banner Image */}
      <div className="flex justify-center mt-6">
        <img
          src={banner}
          alt="Banner"
          className="w-full max-w-3xl rounded-lg shadow-lg"
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default Timetable;
