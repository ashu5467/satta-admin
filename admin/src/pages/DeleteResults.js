import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteResults = () => {
  const resultData = [
    { id: 1, market: 'Aarush morning', time: '10:00 AM - 11:30 AM', result: '179-70-389' },
    { id: 2, market: 'Aarush evening', time: '02:00 PM - 03:30 PM', result: '200-150-300' },
    { id: 3, market: 'Morning Breeze', time: '06:30 AM - 08:00 AM', result: '100-50-100' },
    { id: 4, market: 'Evening Stars', time: '08:30 PM - 10:00 PM', result: '150-100-250' },
    { id: 5, market: 'Night Thunder', time: '11:00 PM - 12:30 AM', result: '120-80-200' },
  ];

  const [results, setResults] = useState(resultData);

  // Function to handle deleting a result
  const handleDelete = (id) => {
    setResults(results.filter(result => result.id !== id));
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 bg-[#17A2B8] p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-white">Delete Results</h1>
        </div>

        {/* Table */}
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Market</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Time</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Result</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {results.map((item) => (
              <tr key={item.id} className="bg-white text-gray-700">
                <td className="border px-4 py-2">{item.market}</td>
                <td className="border px-4 py-2">{item.time}</td>
                <td className="border px-4 py-2">{item.result}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button 
                    className="text-red-500 hover:text-red-700" 
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrashAlt className="inline-block text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteResults;
