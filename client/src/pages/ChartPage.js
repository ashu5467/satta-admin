import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChartPage = () => {
  const { state } = useLocation(); // Get the state passed via navigate
  const { sattaName, marketId } = state || {}; // Destructure marketId and sattaName

  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure marketId exists or redirect to home page
  useEffect(() => {
    if (!marketId) {
      console.log("Market ID is missing, redirecting...");
      navigate('/'); // Redirect to home if no marketId
      return;
    }

    console.log(`Fetching data for market: ${marketId}`);
    setLoading(true);

    // Fetch chart data for the market
    axios
      .get(`http://13.203.91.35:5000/api/markets/${marketId}/results`)
      .then((response) => {
        console.log('API Response:', response.data); // Log the full response data
        setChartData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [marketId, navigate]); // Trigger effect on marketId change

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5e7c3] flex flex-col items-center py-6 px-2">
      <h1 className="text-sm font-bold text-gray-800 mb-3">{sattaName}</h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-4 gap-0 sm:gap-1 w-full max-w-6xl sm:grid-cols-4">
        {chartData.map((entry, index) => (
          <div
            key={index}
            className="bg-white border border-gray-700 rounded-none flex flex-col items-center justify-between p-0 sm:p-2 w-full sm:w-28 h-32"
          >
            {/* Display Date */}
            <div className="text-gray-700 font-medium text-[8px] text-center mb-1 sm:mb-2">
              {entry.resultDate
                ? new Date(entry.resultDate).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : "No Date Available"}
            </div>
            <hr className="w-full border-t border-gray-300 mb-1 sm:mb-2" />

            <div className="grid grid-cols-3 gap-0 w-full h-full items-center">
              {/* Open Patti Column */}
              <div className="flex flex-col items-center gap-0">
                {entry.openPatti ? (
                  entry.openPatti.toString().split('').map((num, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center text-gray-800 text-[8px] font-medium w-5 h-5"
                    >
                      {num}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600 text-[8px]">No Patti</div>
                )}
              </div>

              {/* Jodi Column */}
              <div className="flex items-center justify-center text-gray-800 text-[10px] font-bold">
                {entry.jodi || "No Jodi"}
              </div>

              {/* Close Patti Column */}
              <div className="flex flex-col items-center gap-0">
                {entry.closePatti ? (
                  entry.closePatti.toString().split('').map((num, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center text-gray-800 text-[8px] font-medium w-5 h-5"
                    >
                      {num}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600 text-[8px]">No Patti</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartPage;
