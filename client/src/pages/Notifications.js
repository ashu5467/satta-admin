import React, { useState, useEffect } from "react";
import bgImage from '../assets/maroonbg.jpg'; // Background image

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://13.203.91.35:5000/api/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include auth token if required
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications.");
        }

        const data = await response.json();

        console.log(data); // Debugging: Log the response to confirm structure
        setNotifications(data || []); // Use the root data array directly
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array to run once on mount

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`, // Set the background image dynamically
        backgroundSize: 'cover', // Ensure the image covers the screen
        backgroundPosition: 'center', // Center the background
        backgroundRepeat: 'no-repeat', // Prevent repetition of the background
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Notifications</h2>

      {/* Notifications List */}
      <div className="space-y-4 w-full max-w-xl">
        {loading ? (
          <p className="text-white text-lg">Loading notifications...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error: {error}</p>
        ) : notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id} // Use _id from the response
              className="p-4 border border-gray-300 rounded-md shadow-lg bg-white bg-opacity-80"
            >
              <p className="text-gray-800 text-lg">{notification.notification}</p>
              <p className="text-gray-600 text-sm">{new Date(notification.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
