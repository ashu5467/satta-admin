import React from 'react';

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
      <h3 className="text-2xl font-bold bg-[#3838E9] text-white py-2 px-6 mt-4 rounded-br-xl rounded-tl-xl max-w-max mx-auto whitespace-nowrap" 
           style={{ fontFamily: 'Ubuntu', fontWeight: '600' }}>
        Live Updates
      </h3>

      {/* Single Card for All Updates */}
      <div className="bg-white p-6 rounded-tl-lg rounded-br-lg shadow-md mt-5">
        <div className="space-y-6">
          {/* Iterate over the updates and display them inside one card */}
          {updates.map((update, index) => (
            <div key={index} className="space-y-2">
              <span className="font-bold text-xl" style={{ color: '#242AD1' }}>
                {update.name}
              </span>
              {/* Numbers on new line */}
              <div className="text-gray-600 font-bold text-lg">
                {update.numbers}
              </div>

              <div className="flex justify-center mt-2">
                <button className="bg-[#3838E9] text-white py-1 px-4 rounded-tl-lg rounded-br-lg transform transition duration-300 hover:bg-blue-600">
                  Refresh
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveUpdates;
