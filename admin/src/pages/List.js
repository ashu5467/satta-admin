import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaDownload, FaPlus } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const List = () => {
 
  const [tableData, setTableData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMarket, setNewMarket] = useState({ name: '', openTime: '', closeTime: '', days: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch markets data from API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/markets')
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the markets data!', error);
      });
  }, []);

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

  // Add new market via API
  const handleAddMarket = () => {
    if (newMarket.name && newMarket.open && newMarket.close && newMarket.status) {
      
      axios.post('http://localhost:5000/api/markets', newMarket)
        .then(response => {
          setTableData([...tableData, response.data]);
          setNewMarket({ name: '', open: '', close: '', days: '', status: '' });
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error('There was an error adding the market!', error);
        });
    }
  };

  // Edit market via API
  const handleEditMarket = (id) => {
    console.log("Editing market with ID:", id);  // Make sure you get the correct ID
    const marketToEdit = tableData.find((item) => item._id === id);  // Use _id here instead of id
    
    if (marketToEdit) {
      console.log("Market to edit:", marketToEdit);
      setNewMarket({
        _id: marketToEdit._id,  // Use _id instead of id
        name: marketToEdit.name,
        open: marketToEdit.openTime,
        close: marketToEdit.closeTime,
        days: marketToEdit.days,
        status: marketToEdit.status,
      });
      setIsEditing(true);
      setIsModalOpen(true);
    } else {
      console.error("Market not found for editing.");
    }
  };
  
  const handleUpdateMarket = () => {
    if (!newMarket._id) {  // Check for _id instead of id
      console.error('Market ID is missing!');
      return;
    }
  
    console.log("Updating market with ID:", newMarket._id);  // Log the _id
  
    if (newMarket.name && newMarket.open && newMarket.close && newMarket.status) {
      axios.put(`http://localhost:5000/api/markets/${newMarket._id}`, newMarket)  // Use _id in the URL
        .then(response => {
          console.log("Market updated:", response.data);
          setTableData(tableData.map(item => item._id === newMarket._id ? response.data : item));  // Use _id for matching
          setNewMarket({ name: '', open: '', close: '', days: '', status: '' });
          setIsEditing(false);
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error('There was an error updating the market!', error.response ? error.response.data : error.message);
        });
    }
  };
  
  
  

  // Delete market via API
  const handleDeleteMarket = (id) => {
    axios.delete(`http://localhost:5000/api/markets/${id}`)
      .then(() => {
        setTableData(tableData.filter((item) => item._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the market!', error);
      });
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 bg-[#17A2B8] p-6 rounded-lg">
          <h1 className="text-2xl font-bold">Market</h1>
          <button
            onClick={toggleModal}
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-2"
          >
            <FaPlus className="text-lg" />
            <span>Add Market</span>
          </button>
        </div>

        {/* Modal for Add/Edit Market */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Market' : 'Add Market'}</h2>
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
                  onClick={isEditing ? handleUpdateMarket : handleAddMarket}
                  className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  {isEditing ? 'Update Market' : 'Add Market'}
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
            <FaDownload className="text-lg" />
            <span>Export</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
              <ul className="p-2">
                <li>
                  <button
                    onClick={exportToExcel}
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-100 w-full"
                  >
                    Export to Excel
                  </button>
                </li>
                <li>
                  <button
                    onClick={exportToPDF}
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-100 w-full"
                  >
                    Export to PDF
                  </button>
                </li>
                <li>
                  <CSVLink data={tableData} filename="marketData.csv">
                    <button className="block py-2 px-4 text-gray-800 hover:bg-gray-100 w-full">
                      Export to CSV
                    </button>
                  </CSVLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Table Data */}
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Sr no</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Open</th>
              <th className="py-2 px-4 text-left">Close</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.openTime}</td>
                <td className="py-2 px-4">{item.closeTime}</td>
                <td className="py-2 px-4">{item.status}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEditMarket(item._id)}
                    className="bg-yellow-500 text-white p-2 rounded-md"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteMarket(item._id)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    <FaTrashAlt />
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
