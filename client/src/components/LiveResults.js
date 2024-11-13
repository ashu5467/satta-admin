import React from 'react';

const LiveResults = () => {
  // Sample data for the cards with an additional time field
  const results = [
    { name: 'MILAN MORNING', time: '12:00 AM', secondTime: '02:00 AM', numbers: '135 - 93 - 689' },
    { name: 'MUMBAI NIGHT', time: '12:00 PM', secondTime: '02:00 PM', numbers: '158 - 47 - 123' },
    { name: 'MADHUR EVENING', time: '03:00 PM', secondTime: '05:00 PM', numbers: '456 - 78 - 234' },
    { name: 'SUPER KALYAN', time: '06:00 PM', secondTime: '08:00 PM', numbers: '478 - 90 - 280' }
  ];

  return (
    <div className="bg-[#F2F6FA] min-h-screen flex flex-col items-center justify-center">
      {/* Heading */}
      <h3 className="text-2xl font-bold bg-[#3838E9] text-white py-2 px-6 mt-4 rounded-br-xl rounded-tl-xl max-w-max mx-auto whitespace-nowrap" 
           style={{ fontFamily: 'Ubuntu', fontWeight: '600' }}>
        Live Results
      </h3>

      {/* Card Container */}
      <div className="flex flex-col items-center gap-6 p-6 mt-6 max-w-screen-lg w-full">
        {/* Iterate over the results and create cards */}
        {results.map((result, index) => (
          <div key={index} className="bg-white rounded-bl-3xl rounded-tr-3xl shadow-2xl p-4 w-full sm:w-96 md:w-[80%] lg:w-[70%] xl:w-[60%] h-[160px] flex flex-col justify-between">
            {/* Card Title */}
            <h4 className="text-xl font-semibold text-[#242AD1] text-center" style={{ fontFamily: 'Ubuntu' }}>
              {result.name}
            </h4>
            
            {/* Time and Numbers Section */}
            <div className="flex justify-between items-center mt-2">
              {/* Left Side Time */}
              <p className="text-center text-[#3838E9] text-sm font-medium" style={{ fontFamily: 'Ubuntu', fontWeight: '500' }}>
                {result.time}
              </p>
              
              {/* Center Numbers */}
              <p className="text-gray-600 font-bold text-lg text-center" style={{ fontFamily: 'Ubuntu' }}>
                {result.numbers}
              </p>

              {/* Right Side Second Time */}
              <p className="text-center text-[#3838E9] text-sm font-medium" style={{ fontFamily: 'Ubuntu', fontWeight: '500' }}>
                {result.secondTime}
              </p>
            </div>

            {/* Button Container */}
            <div className="flex justify-between w-full mt-2">
              {/* Left Button */}
              <button className="bg-[#3838E9] text-white py-2 px-4 rounded-br-2xl rounded-tl-2xl transform transition duration-300 hover:bg-blue-600" style={{ fontFamily: 'Ubuntu', fontWeight: '400' }}>
                Jodi Chart
              </button>
              
              {/* Right Button */}
              <button className="bg-[#3838E9] text-white py-2 px-4 rounded-br-2xl rounded-tl-2xl transform transition duration-300 hover:bg-blue-600" style={{ fontFamily: 'Ubuntu', fontWeight: '400' }}>
                Panel Chart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveResults;
