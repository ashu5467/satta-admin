import React from 'react';
import banner from '../assets/matkabanner.gif';

const LiveUpdates = () => {
  // Data array with the information for each update
  const updates = [
    { name: 'MAIN KALYAN', numbers: '179 - 7 - Loading...' },
    { name: 'MUMBAI MAIL', numbers: '158 - 48 - 468' },
    { name: 'MADHUR DAY', numbers: '446 - 47 - 179' },
    { name: 'SUPER KALYAN', numbers: '478 - 90 - 280' }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-lg">
      {/* Heading */}
      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-2 px-6 mt-4 mb-2 rounded-br-xl rounded-tl-xl max-w-full text-center sm:px-12 md:px-32 lg:px-60" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
        Live Updates
      </h3>

      {/* Single Card for All Updates */}
      <div className="bg-[#FFFFFF] p-6 rounded-tl-lg rounded-br-lg shadow-md mt-5">
        <div className="space-y-6 text-center">
          {/* Iterate over the updates and display them inside one card */}
          {updates.map((update, index) => (
            <div key={index} className="space-y-2">
              {/* Update Name */}
              <span className="font-bold text-xl text-center" style={{ color: '#242AD1', fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
                {update.name}
              </span>
              {/* Numbers on new line */}
              <div className="text-gray-600 font-bold text-lg text-center" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '600' }}>
                {update.numbers}
              </div>

              {/* Refresh Button */}
              <div className="flex justify-center mt-2">
                <button className="bg-gradient-to-r from-[#3838E9] to-[#3F74F5] text-white py-1 px-4 rounded-tl-lg rounded-br-lg transform transition duration-300 hover:bg-blue-600" style={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: '400' }}>
                  Refresh
                </button>
              </div>
            </div>
          ))}
        </div>
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
};

export default LiveUpdates;
