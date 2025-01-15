import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPointsPage = () => {
  const [points, setPoints] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const predefinedPoints = [
    10, 15, 26, 36, 46, 56, 69, 79, 126, 175, 265, 359, 459, 559, 659, 759, 859,
    999, 1149, 1150, 1299, 1599, 1999, 2999,
  ];

  const handleAddPoints = async () => {
    if (!points || isNaN(points) || parseInt(points) <= 0) {
      setError("Please enter a valid number of points.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to add points.");
      return;
    }

    try {
      const response = await axios.post(
        "http://13.203.91.35:5000/api/users/add-points",
        {
          points: parseInt(points),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Points added successfully!");
        setError(null);
        setPoints("");

        // Redirect to the UPI Payment page
        setTimeout(() => {
          navigate("/upi-payment", { state: { points } }); // Pass points via state
        }, 2000);
      } else {
        setError("Failed to add points. Please try again.");
      }
    } catch (err) {
      console.error("Error adding points:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleOptionClick = (value) => {
    setPoints(value);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Add Points</h1>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Points:</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter points"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 sm:grid-cols-4">
          {predefinedPoints.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddPoints}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-300 text-black py-2 rounded-md mt-2 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddPointsPage;
