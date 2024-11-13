import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaDownload, FaPlus } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Bids = () => {
  // Updated bid data with your format
  const bidData = [
    {
      id: 1,
      date: '13/11/2024 05:25 PM',
      market: 'POONA DAY',
      marketType: 'Close',
      user: 'Deepika',
      mobile: '9209129629',
      bid: '289(15), 135(5), 234(1), 270(1), 360(1), 450(1), Total : 24'
    },
    {
      id: 2,
      date: '13/11/2024 06:00 PM',
      market: 'POONA NIGHT',
      marketType: 'Open',
      user: 'Amit',
      mobile: '9876543210',
      bid: '200(10), 300(5), 150(8), 500(2), 400(6), Total : 31'
    },
    {
      id: 3,
      date: '13/11/2024 06:30 PM',
      market: 'DELHI DAY',
      marketType: 'Close',
      user: 'Priya',
      mobile: '9123456789',
      bid: '100(3), 250(7), 180(6), 400(4), Total : 20'
    },
    {
      id: 4,
      date: '14/11/2024 07:15 AM',
      market: 'MUMBAI MORNING',
      marketType: 'Open',
      user: 'Ravi',
      mobile: '9345678901',
      bid: '500(2), 400(5), 350(3), 280(8), Total : 18'
    },
    {
      id: 5,
      date: '14/11/2024 08:00 AM',
      market: 'MUMBAI DAY',
      marketType: 'Close',
      user: 'Suman',
      mobile: '9765432109',
      bid: '450(4), 300(2), 270(6), 400(3), Total : 15'
    },
    {
      id: 6,
      date: '14/11/2024 09:00 AM',
      market: 'DELHI NIGHT',
      marketType: 'Open',
      user: 'Nina',
      mobile: '9654321098',
      bid: '600(1), 320(4), 420(7), 350(2), 500(3), Total : 17'
    },
    {
      id: 7,
      date: '14/11/2024 09:30 AM',
      market: 'POONA NIGHT',
      marketType: 'Close',
      user: 'Raj',
      mobile: '9432109876',
      bid: '400(5), 330(6), 280(8), 500(2), Total : 21'
    },
    {
      id: 8,
      date: '14/11/2024 10:00 AM',
      market: 'DELHI MORNING',
      marketType: 'Open',
      user: 'Shyam',
      mobile: '9612345678',
      bid: '250(5), 200(7), 150(10), 320(2), Total : 24'
    }
  ];
  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newBid, setNewBid] = useState({ date: '', market: '', marketType: '', user: '', mobile: '', bid: '' });

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
    setNewBid({ ...newBid, [name]: value });
  };

  const handleAddBid = () => {
    if (newBid.date && newBid.market && newBid.marketType && newBid.user && newBid.mobile && newBid.bid) {
      bidData.push({ ...newBid, id: bidData.length + 1 });
      setNewBid({ date: '', market: '', marketType: '', user: '', mobile: '', bid: '' });
      setIsModalOpen(false);
    }
  };

  // Function to export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(bidData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bid Data");
    XLSX.writeFile(wb, "bidData.xlsx");
  };

  // Function to export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Sr no', 'Date', 'Market', 'Market Type', 'User', 'Mobile', 'Bid']],
      body: bidData.map((item, index) => [
        index + 1,
        item.date,
        item.market,
        item.marketType,
        item.user,
        item.mobile,
        item.bid,
      ]),
    });
    doc.save('bidData.pdf');
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4 bg-[#17A2B8] p-6 rounded-lg">
          <h1 className="text-2xl font-bold">Bids</h1>
          <button
            onClick={toggleModal}
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center space-x-2"
          >
            <FaPlus className="text-lg" />
            <span>Add Bid</span>
          </button>
        </div>

        {/* Modal for Add Bid */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-bold mb-4">Add Bid</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={newBid.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Market</label>
                <input
                  type="text"
                  name="market"
                  value={newBid.market}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter market"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Market Type</label>
                <input
                  type="text"
                  name="marketType"
                  value={newBid.marketType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter market type"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">User</label>
                <input
                  type="text"
                  name="user"
                  value={newBid.user}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter user name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={newBid.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Bid</label>
                <input
                  type="text"
                  name="bid"
                  value={newBid.bid}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter bid values"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddBid}
                  className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Add Bid
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
                  <CSVLink data={bidData} filename="bidData.csv">
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
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Date</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Market</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Market Type</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">User</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Mobile</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Bid</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {bidData.map((item, index) => (
              <tr key={item.id} className="bg-white text-gray-700">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.market}</td>
                <td className="border px-4 py-2">{item.marketType}</td>
                <td className="border px-4 py-2">{item.user}</td>
                <td className="border px-4 py-2">{item.mobile}</td>
                <td className="border px-4 py-2">{item.bid}</td>
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

export default Bids;
