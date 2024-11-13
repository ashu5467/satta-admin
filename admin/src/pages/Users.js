import React, { useState } from 'react';
import { FaDollarSign, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Users = () => {
  // Sample data for the table
  const usersData = [
    { id: 1, name: 'John Doe', mobile: '1234567890', points: 150, canPlay: 'Yes', status: 'Active' },
    { id: 2, name: 'Jane Smith', mobile: '0987654321', points: 200, canPlay: 'No', status: 'Inactive' },
    { id: 3, name: 'Sam Wilson', mobile: '1122334455', points: 120, canPlay: 'Yes', status: 'Active' },
    { id: 4, name: 'Chris Evans', mobile: '6677889900', points: 175, canPlay: 'Yes', status: 'Active' },
  ];

  // State for modals and selected user data
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to handle opening the user edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // Function to handle opening the rate edit modal
  const handleRateEdit = (user) => {
    setSelectedUser(user);
    setIsRateModalOpen(true);
  };

  // Function to handle opening the delete confirmation modal
  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Function to handle closing all modals
  const closeModal = () => {
    setIsUserModalOpen(false);
    setIsRateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  // Function to handle saving the user data (Add/Edit)
  const handleSaveUser = (e) => {
    e.preventDefault();
    console.log("User data saved:", selectedUser);
    closeModal();
  };

  // Function to handle saving the rate data
  const handleSaveRates = (e) => {
    e.preventDefault();
    console.log("Rate data saved:", selectedUser);
    closeModal();
  };

  // Function to handle user deletion
  const handleDeleteUser = () => {
    console.log("User deleted:", selectedUser);
    closeModal();
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Users</h3>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Sr No</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Name</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Mobile</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Points</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Can Play</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Status</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="py-2 px-4 text-gray-700 border border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 text-gray-700 border border-gray-300">{user.name}</td>
                <td className="py-2 px-4 text-gray-700 border border-gray-300">{user.mobile}</td>
                <td className="py-2 px-4 text-gray-700 border border-gray-300">{user.points}</td>
                <td className="py-2 px-4 text-gray-700 border border-gray-300">{user.canPlay}</td>
                <td className="py-2 px-4 text-gray-700 border border-gray-300">{user.status}</td>
                <td className="py-2 px-4 text-gray-700 border border-gray-300">
                  <div className="flex justify-start space-x-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                      onClick={() => handleEdit(user)}  // Open the user edit modal
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                      onClick={() => handleRateEdit(user)}  // Open the rate edit modal
                    >
                      <FaDollarSign />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      onClick={() => handleDelete(user)}  // Open the delete confirmation modal
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Edit Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add/Edit User</h2>
            <form onSubmit={handleSaveUser}>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedUser.mobile}
                    onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Can Play */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Can Play</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedUser.canPlay}
                    onChange={(e) => setSelectedUser({ ...selectedUser, canPlay: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter password"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rate Edit Modal */}
      {isRateModalOpen && selectedUser && (
   <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50 overflow-auto">
   <div className="bg-white p-6 rounded-lg w-[90%] max-w-[800px]">
     <h2 className="text-xl font-semibold mb-4">Edit Rate</h2>
     <form onSubmit={handleSaveRates}>
       <div className="space-y-4">
         {/* Name */}
         <div>
           <label className="block text-sm font-medium text-gray-700">Name</label>
           <input
             type="text"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.name || ''}
             disabled
           />
         </div>
 
         {/* Single Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">Single Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.singleRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, singleRate: e.target.value })}
           />
         </div>
 
         {/* Jodi Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">Jodi Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.jodiRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, jodiRate: e.target.value })}
           />
         </div>
 
         {/* SP Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">SP Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.spRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, spRate: e.target.value })}
           />
         </div>
 
         {/* DP Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">DP Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.dpRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, dpRate: e.target.value })}
           />
         </div>
 
         {/* TP Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">TP Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.tpRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, tpRate: e.target.value })}
           />
         </div>
 
         {/* Half Sangam Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">Half Sangam Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.halfSangamRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, halfSangamRate: e.target.value })}
           />
         </div>
 
         {/* Full Sangam Rate */}
         <div>
           <label className="block text-sm font-medium text-gray-700">Full Sangam Rate</label>
           <input
             type="number"
             step="0.01"
             className="w-full h-8 p-2 border border-gray-300 rounded-md"
             value={selectedUser.fullSangamRate || ''}
             onChange={(e) => setSelectedUser({ ...selectedUser, fullSangamRate: e.target.value })}
           />
         </div>
       </div>
 
       <div className="flex justify-end mt-4 space-x-2">
         <button
           type="button"
           className="bg-gray-500 text-white px-6 py-2 rounded-md"
           onClick={closeModal}
         >
           Cancel
         </button>
         <button
           type="submit"
           className="bg-blue-500 text-white px-6 py-2 rounded-md"
         >
           Save Rates
         </button>
       </div>
     </form>
   </div>
 </div>
 

      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-sm text-gray-700 mb-4">Do you really want to delete user {selectedUser.name}?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
