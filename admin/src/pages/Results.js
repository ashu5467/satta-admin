import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaDownload, FaPlus } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Results = () => {
  const [resultData, setResultData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for adding new result
  const [newResult, setNewResult] = useState({ date: '', market: '', result: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  // Fetch all results from MongoDB
  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResultData(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult({ ...newResult, [name]: value });
  };




  const handleAddResult = () => {
    setNewResult({ date: '', market: '', result: '' }); // Reset the form
    setEditingId(null); // Ensure `editingId` is null when adding new result
    setIsModalOpen(true); // Open the modal
  };







  const handleEditResult = (id) => {
    const resultToEdit = resultData.find((item) => item._id === id);
    setNewResult({ date: resultToEdit.date, market: resultToEdit.market, result: resultToEdit.result });
    setEditingId(id); // Set the result ID to track which result is being edited
    setIsModalOpen(true); // Open the modal for editing
  };


  const handleSaveResult = async () => {
  if (newResult.date && newResult.market && newResult.result) {
    try {
      if (editingId) {
        // Update existing result
        const response = await axios.put(`http://localhost:5000/api/results/${editingId}`, newResult);
        const updatedResults = resultData.map((item) =>
          item._id === editingId ? response.data : item
        );
        setResultData(updatedResults);
      } else {
        // Add new result
        const response = await axios.post('http://localhost:5000/api/results', newResult);
        setResultData([...resultData, response.data]);
      }

      // Reset the form and close modal after saving
      setNewResult({ date: '', market: '', result: '' });
      setIsModalOpen(false);
      setEditingId(null); // Reset editing state
    } catch (error) {
      console.error('Error saving result:', error);
    }
  }
};
  // Delete result
  const handleDeleteResult = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/results/${id}`);
      setResultData(resultData.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  // Export functions (same as before)
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(resultData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, 'results.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Sr no', 'Date', 'Market', 'Result']],
      body: resultData.map((item, index) => [
        index + 1, item.date, item.market, item.result
      ]),
    });
    doc.save('results.pdf');
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 bg-[#17A2B8] p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-white">Results</h1>
          <button onClick={toggleModal} className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-2">
            <FaPlus className="text-lg" />
            <span>Add Result</span>
          </button>
        </div>

        {/* Modal for Add Result */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Add Result</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newResult.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter date"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white-600">Market</label>
                <input
                  type="text"
                  name="market"
                  value={newResult.market}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter market"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Result</label>
                <input
                  type="text"
                  name="result"
                  value={newResult.result}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter result"
                />
              </div>
              <div className="flex justify-end">
              <button onClick={handleSaveResult} className="bg-green-500 text-white py-2 px-4 rounded-md mr-2">
                  {editingId ? 'Save Changes' : 'Add Result'}
                </button>
                <button onClick={toggleModal} className="bg-gray-500 text-white py-2 px-4 rounded-md">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Export Button and Dropdown */}
        <div className="mb-4">
          <button onClick={toggleDropdown} className="bg-blue-500 text-white py-2 px-4 mb-2 ml-2 rounded-md flex items-center space-x-2">
            <FaDownload className="text-lg" />
            <span>Export</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={exportToPDF}>PDF</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <CSVLink data={resultData} filename="results.csv">CSV</CSVLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={exportToExcel}>Excel</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Copy</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Print</li>
              </ul>
            </div>
          )}
        </div>

        {/* Table */}
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Sr no</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Date</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Market</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Result</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {resultData.map((item, index) => (
              <tr key={item._id} className="bg-white text-gray-700">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.market}</td>
                <td className="border px-4 py-2">{item.result}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700"  onClick={() => handleEditResult(item._id)}>
                    <FaEdit className="inline-block text-lg" />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteResult(item._id)}>
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

export default Results;
