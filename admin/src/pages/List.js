import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaDownload, FaPlus } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const List = () => {
  const tableData = [
    { id: 1, name: 'Kalyan', open: '10:00 AM', close: '6:00 PM', status: 'Active' },
    { id: 2, name: 'MAIN BAZAR', open: '9:00 AM', close: '5:00 PM', status: 'Inactive' },
    { id: 3, name: 'POONA DAY', open: '11:00 AM', close: '7:00 PM', status: 'Active' },
    { id: 4, name: 'Mumbai Night', open: '12:00 AM', close: '8:00 AM', status: 'Active' },
    { id: 5, name: 'Delhi Express', open: '1:00 PM', close: '9:00 PM', status: 'Inactive' },
    { id: 6, name: 'Jodhpur Evening', open: '6:00 PM', close: '10:00 PM', status: 'Active' },
    { id: 7, name: 'Bangladesh Night', open: '11:30 PM', close: '7:30 AM', status: 'Inactive' },
    { id: 8, name: 'Pune Special', open: '8:00 AM', close: '4:00 PM', status: 'Active' },
    { id: 9, name: 'Kolhapur Morning', open: '7:00 AM', close: '3:00 PM', status: 'Active' },
    { id: 10, name: 'Rajkot Day', open: '9:30 AM', close: '5:30 PM', status: 'Inactive' },
    { id: 11, name: 'Surat Evening', open: '6:30 PM', close: '10:30 PM', status: 'Active' },
    { id: 12, name: 'Bangalore Morning', open: '5:00 AM', close: '1:00 PM', status: 'Active' },
    { id: 13, name: 'Chennai Night', open: '12:00 AM', close: '6:00 AM', status: 'Inactive' },
    { id: 14, name: 'Hyderabad Special', open: '10:30 AM', close: '4:30 PM', status: 'Active' },
    { id: 15, name: 'Goa Morning', open: '7:30 AM', close: '3:30 PM', status: 'Inactive' },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for visibility
  const [newMarket, setNewMarket] = useState({ name: '', open: '', close: '', days: '', status: '' });

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMarket({ ...newMarket, [name]: value });
  };

  // Function to export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Table Data");
    XLSX.writeFile(wb, "tableData.xlsx");
  };

  // Function to export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Sr no', 'Name', 'Open', 'Close', 'Status']],
      body: tableData.map((item, index) => [
        index + 1,
        item.name,
        item.open,
        item.close,
        item.status,
      ]),
    });
    doc.save('tableData.pdf');
  };

  const handleAddMarket = () => {
    // Add validation if needed
    if (newMarket.name && newMarket.open && newMarket.close && newMarket.days && newMarket.status) {
      tableData.push({ ...newMarket, id: tableData.length + 1 });
      setNewMarket({ name: '', open: '', close: '', days: '', status: '' });
      setIsModalOpen(false); // Close modal after adding market
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 bg-[#17A2B8] p-6 rounded-lg">
          <h1 className="text-2xl font-bold">Market</h1>
          {/* Add Market Button */}
          <button
            onClick={toggleModal} // Add this line to toggle the modal on click
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-2"
          >
            <FaPlus className="text-lg" />
            <span>Add Market</span>
          </button>
        </div>

        {/* Modal for Add Market */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Add Market</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMarket.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter market name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Open Time</label>
                <input
                  type="text"
                  name="open"
                  value={newMarket.open}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter open time"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Close Time</label>
                <input
                  type="text"
                  name="close"
                  value={newMarket.close}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter close time"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Days</label>
                <input
                  type="text"
                  name="days"
                  value={newMarket.days}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter days (e.g., Mon-Sun)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <select
                  name="status"
                  value={newMarket.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddMarket}
                  className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Add Market
                </button>
                <button
                  onClick={toggleModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Button and Dropdown */}
        <div className="mb-4">
          <button
            onClick={toggleDropdown}
            className="bg-blue-500 text-white py-2 px-4 mb-2 ml-2 rounded-md flex items-center space-x-2"
          >
            <FaDownload className="text-lg " />
            <span>Export</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={exportToPDF}>
                  PDF
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <CSVLink data={tableData} filename="tableData.csv">
                    CSV
                  </CSVLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={exportToExcel}>
                  Excel
                </li>
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
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Name</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Open</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Close</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Status</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id} className="bg-white text-gray-700">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.open}</td>
                <td className="border px-4 py-2">{item.close}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit className="inline-block text-lg" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
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

export default List;
