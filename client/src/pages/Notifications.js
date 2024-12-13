import React from "react";
import bgImage from '../assets/maroonbg.jpg'; // Background image

const Notifications = () => {
  // Example list of notifications
  const notifications = [
    { id: 1, message: "System maintenance scheduled for tomorrow at 2:00 AM." },
    { id: 2, message: "New game rates have been updated." },
    { id: 3, message: "Congratulations to the top player of the week!" },
    { id: 4, message: "Withdrawal requests will be processed faster from now on." },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`, // Set the background image dynamically
        backgroundSize: 'cover',  // Ensure the image covers the screen
        backgroundPosition: 'center', // Center the background
        backgroundRepeat: 'no-repeat', // Prevent repetition of the background
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Notifications</h2>

      {/* Notifications List */}
      <div className="space-y-4 w-full max-w-xl">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border border-gray-300 rounded-md shadow-lg bg-white bg-opacity-80"
            >
              <p className="text-gray-800 text-lg">{notification.message}</p>
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
