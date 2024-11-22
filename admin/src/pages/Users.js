import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [rateModalData, setRateModalData] = useState({
    singleRate: '',
    jodiRate: '',
    spRate: '',
    dpRate: '',
    tpRate: '',
    halfSangamRate: '',
    fullSangamRate: ''
  });
  
  const [searchFilters, setSearchFilters] = useState({
    name: '',
    mobile: '',
    points: '',
    canPlay: '',
    status: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [usersData, searchFilters]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const handleSaveUser = async (e) => {
    e.preventDefault();
    // Ensure canPlay is 'Yes' or 'No'
    if (selectedUser.canPlay !== 'Yes' && selectedUser.canPlay !== 'No') {
      alert("Can Play must be 'Yes' or 'No'");
      return;
    }

    try {
      const method = selectedUser._id ? 'PUT' : 'POST';
      const url = selectedUser._id
        ? `http://localhost:5000/api/users/${selectedUser._id}`
        : 'http://localhost:5000/api/users';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedUser),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save user');
      }

      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error.message);
      alert(error.message);
    }
  };

  const handleRateEdit = (user) => {
    setSelectedUser({ ...user });
    setRateModalData({
      singleRate: user.singleRate || '',
      jodiRate: user.jodiRate || '',
      spRate: user.spRate || '',
      dpRate: user.dpRate || '',
      tpRate: user.tpRate || '',
      halfSangamRate: user.halfSangamRate || '',
      fullSangamRate: user.fullSangamRate || ''
    });
    setIsRateModalOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
        method: 'DELETE',
      });
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const closeModal = () => {
    setIsUserModalOpen(false);
    setIsRateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUser({});
    setRateModalData({
      singleRate: '',
      jodiRate: '',
      spRate: '',
      dpRate: '',
      tpRate: '',
      halfSangamRate: '',
      fullSangamRate: ''
    });
  };

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    setRateModalData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveRates = async () => {
    const updatedUser = { ...selectedUser, ...rateModalData };
    try {
      const response = await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update rates');
      }

      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving rates:', error);
      alert(error.message);
    }
  };

  const handleAddUser = () => {
    setSelectedUser({});
    setIsUserModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser({ ...user });
    setIsUserModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser({ ...user });
    setIsDeleteModalOpen(true);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };





  
  const filterUsers = () => {
    const filtered = usersData.filter(user => {
      return (
        user.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
        user.mobile.toLowerCase().includes(searchFilters.mobile.toLowerCase()) &&
        (searchFilters.points === '' || (user.points || '').toString().includes(searchFilters.points)) &&
        (searchFilters.canPlay === '' || user.canPlay.toLowerCase() === searchFilters.canPlay.toLowerCase()) &&
        user.status.toLowerCase().includes(searchFilters.status.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  };
  







  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Users</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4 flex space-x-4">
          
        </div>
        <table className="min-w-full bg-white border-collapse">
  <thead>
    <tr>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Sr No</th>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Name</th>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Mobile</th>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Points</th>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Can Play</th>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Status</th>
      <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Search Name"
          value={searchFilters.name}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </td>
      <td>
        <input
          type="text"
          name="mobile"
          placeholder="Search Mobile"
          value={searchFilters.mobile}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </td>
      <td>
        <input
          type="text"
          name="points"
          placeholder="Search Points"
          value={searchFilters.points}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </td>
      <td>
        <select
          name="canPlay"
          value={searchFilters.canPlay}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        >
          <option value="">All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          name="status"
          placeholder="Search Status"
          value={searchFilters.status}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </td>
      <td />
    </tr>
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user, index) => (
        <tr key={user._id} className="border-t border-gray-300">
          <td className="py-2 px-4 border">{index + 1}</td>
          <td className="py-2 px-4 border">{user.name}</td>
          <td className="py-2 px-4 border">{user.mobile}</td>
          <td className="py-2 px-4 border">{user.points || 'N/A'}</td>
          <td className="py-2 px-4 border">{user.canPlay === 'Yes' ? 'Yes' : 'No'}</td>
          <td className="py-2 px-4 border">{user.status}</td>
          <td className="py-2 px-4 border">
            <div className="flex space-x-2">
              <button className="bg-green-500 text-white p-2 rounded-full" onClick={() => handleEdit(user)}>
                <FaEdit />
              </button>
              <button className="bg-yellow-500 text-white p-2 rounded-full" onClick={() => handleRateEdit(user)}>
                <FaDollarSign />
              </button>
              <button className="bg-red-500 text-white p-2 rounded-full" onClick={() => handleDelete(user)}>
                <FaTrashAlt />
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7" className="py-2 px-4 text-center text-gray-600">
          No users found
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">{selectedUser._id ? 'Edit' : 'Add'} User</h4>
            <form onSubmit={handleSaveUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={selectedUser.name || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Mobile</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={selectedUser.mobile || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Can Play</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedUser.canPlay || 'No'}
                  onChange={(e) => setSelectedUser({ ...selectedUser, canPlay: e.target.value })}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="mb-4 flex justify-end space-x-2">
                <button type="button" className="bg-gray-300 text-white p-2 rounded-md" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Are you sure you want to delete this user?</h4>
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-300 text-white p-2 rounded-md" onClick={closeModal}>
                Cancel
              </button>
              <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleDeleteUser}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Modal */}
      {isRateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Edit Rates for {selectedUser.name}</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              {['singleRate', 'jodiRate', 'spRate', 'dpRate', 'tpRate', 'halfSangamRate', 'fullSangamRate'].map((rateField) => (
                <div className="mb-4" key={rateField}>
                  <label className="block text-sm font-medium text-gray-600">{rateField.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                  <input
                    type="number"
                    name={rateField}
                    className="w-full p-2 border rounded"
                    value={rateModalData[rateField] || ''}
                    onChange={handleRateChange}
                  />
                </div>
              ))}
              <div className="mb-4 flex justify-end space-x-2">
                <button type="button" className="bg-gray-300 text-white p-2 rounded-md" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="bg-blue-500 text-white p-2 rounded-md" onClick={handleSaveRates}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
