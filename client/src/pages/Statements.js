import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/maroonbg.jpg";

const Statements = () => {
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch transaction data from the server
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Token is missing! Please log in.");
        return;
      }

      const response = await axios.get("http://13.203.91.35:5000/api/users/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response getTransactions:", response);

      // Extract transactions from the response
      if (response.data && response.data.transactions) {
        setTransactions(response.data.transactions); // Set the transactions state
      } else {
        console.warn("No transactions found in response");
        setTransactions([]); // Fallback in case the transactions array is missing
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div
      className="min-h-[90vh] bg-cover bg-center p-4 flex flex-col items-center" // Adjusted height here
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Statements</h2>

      {/* Container for table */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-3xl bg-white bg-opacity-70 p-4 rounded-lg shadow-md">
        {loading ? (
          <p className="text-center text-gray-600">Loading transactions...</p>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-xxs sm:text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-2 py-1 text-left">Date</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">Description</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">Points</th>
                  <th className="border border-gray-300 px-2 py-1 text-left">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-2 py-1">{transaction.date}</td>
                    <td className="border border-gray-300 px-2 py-1">{transaction.description}</td>
                    <td className="border border-gray-300 px-2 py-1">{transaction.points}</td>
                    <td className="border border-gray-300 px-2 py-1">{transaction.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Statements;
