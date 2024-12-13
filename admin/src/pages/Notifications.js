import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Notifications = () => {
  const [notificationsData, setNotificationsData] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({
    date: '',
    notification: '',
  });
  const [searchFilters, setSearchFilters] = useState({
    date: '',
    notification: '',
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notificationsData, searchFilters]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotificationsData(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSaveNotification = async (e) => {
    e.preventDefault();
    try {
      const method = selectedNotification._id ? 'PUT' : 'POST';
      const url = selectedNotification._id
        ? `http://localhost:5000/api/notifications/${selectedNotification._id}`
        : 'http://localhost:5000/api/notifications';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedNotification),
      });

      if (!response.ok) throw new Error('Failed to save notification');

      fetchNotifications();
      closeModal();
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };

  const handleDeleteNotification = async () => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${selectedNotification._id}`, {
        method: 'DELETE',
      });
      fetchNotifications();
      closeModal();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification({
      date: '',
      notification: '',
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterNotifications = () => {
    const filtered = notificationsData.filter((notification) => {
      return (
        (searchFilters.date === '' || notification.date.includes(searchFilters.date)) &&
        notification.notification.toLowerCase().includes(searchFilters.notification.toLowerCase())
      );
    });
    setFilteredNotifications(filtered);
  };

  const handleEdit = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleAddNotification = () => {
    setSelectedNotification({
      date: '',
      notification: '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Notifications</h3>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddNotification}
        >
          Add Notification
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Sr No</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Date</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Notification</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="date"
                  name="date"
                  placeholder="Search Date"
                  value={searchFilters.date}
                  onChange={handleSearchChange}
                  className="p-2 border rounded w-full"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="notification"
                  placeholder="Search Notification"
                  value={searchFilters.notification}
                  onChange={handleSearchChange}
                  className="p-2 border rounded w-full"
                />
              </td>
              <td />
            </tr>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <tr key={notification._id} className="border-t border-gray-300">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{notification.date}</td>
                  <td className="py-2 px-4 border">{notification.notification}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button className="bg-green-500 text-white p-2 rounded-full" onClick={() => handleEdit(notification)}>
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-full"
                        onClick={() => {
                          setSelectedNotification(notification);
                          handleDeleteNotification();
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 text-center text-gray-600">
                  No notifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              {selectedNotification._id ? 'Edit' : 'Add'} Notification
            </h4>
            <form onSubmit={handleSaveNotification}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={selectedNotification.date || ''}
                  onChange={(e) =>
                    setSelectedNotification({ ...selectedNotification, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Notification</label>
                <textarea
                  className="w-full p-2 border rounded"
                  value={selectedNotification.notification || ''}
                  onChange={(e) =>
                    setSelectedNotification({ ...selectedNotification, notification: e.target.value })
                  }
                  required
                />
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
    </div>
  );
};

export default Notifications;
