import React from 'react';

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
      {/* Underlined Heading */}
      <h3 className="text-2xl font-bold bg-[#3838E9] text-white py-2 px-6 sm:px-12 md:px-32 lg:px-60 mt-4 rounded-br-xl rounded-tl-xl max-w-full text-center">
        Timetable
      </h3>

      {/* Table for Timetable */}
      <div className="overflow-x-auto mt-4 w-full">
        <table className="table-auto w-full max-w-full bg-white shadow-lg border border-gray-300 rounded-2xl rounded-bl-2xl overflow-hidden">
          <thead>
            <tr className="bg-[#3838E9] text-white">
              <th className="px-4 py-2 border border-gray-300 text-center w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 rounded-tl-xl" style={{ fontFamily: 'Ubuntu' }}>Market</th>
              <th className="px-4 py-2 border border-gray-300 text-center w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/6" style={{ fontFamily: 'Ubuntu' }}>Open</th>
              <th className="px-4 py-2 border border-gray-300 text-center w-1/4 sm:w-1/3 md:w-1/4 lg:w-1/6 rounded-tr-xl" style={{ fontFamily: 'Ubuntu' }}>Close</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.map((entry, index) => (
              <tr key={index} className='bg-white'>
                <td className="px-4 py-2 border border-gray-300 text-left" style={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>{entry.market}</td>
                <td className="px-4 py-2 border border-gray-300 text-left" style={{ fontFamily: 'Ubuntu' }}>{entry.open}</td>
                <td className="px-4 py-2 border border-gray-300 text-left" style={{ fontFamily: 'Ubuntu' }}>{entry.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Timetable;
