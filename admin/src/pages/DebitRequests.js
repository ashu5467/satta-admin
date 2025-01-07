import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const DebitRequests = () => {
  const [requestsData, setRequestsData] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [searchFilters, setSearchFilters] = useState({
    date: "",
    user: "",
    mobile: "",
    points: "",
    type: "",
    status: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requestsData, searchFilters]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions/debit-request");
      if (!response.ok) throw new Error("Failed to fetch requests");
      const data = await response.json();

      const requestsWithUserMobile = data.requests.map((request) => ({
        ...request,
        user: request.user || "Unknown User", // Default value if user is missing
        mobile: request.mobile || "N/A", // Default value if mobile is missing
      }));
      console.log("Fetched data:", data); // Debug log
      //setRequestsData(data.requests || []); // Adjust based on actual API response
      setRequestsData(requestsWithUserMobile);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleSaveRequest = async (e) => {
    e.preventDefault();
    try {
      // Make sure to include user and mobile from state
      const method = selectedRequest._id ? "PUT" : "POST";
      const url = selectedRequest._id
        ? `http://localhost:5000/api/transactions/debit-request/${selectedRequest._id}`
        : "http://localhost:5000/api/transactions/debit-request";

      // Ensure selectedRequest contains user and mobile values
      const updatedRequest = {
        ...selectedRequest,
        user: selectedRequest.user || "",  // Add user if not already set
        mobile: selectedRequest.mobile || "", // Add mobile if not already set
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRequest),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to save request");
      }

      fetchRequests();
      closeModal();
    } catch (error) {
      console.error("Error saving request:", error.message);
      alert(error.message);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      await fetch(`http://localhost:5000/api/transactions/debit-request/${selectedRequest._id}`, {
        method: "DELETE",
      });
      fetchRequests();
      closeModal();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedRequest({});
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const filterRequests = () => {
  //   if (!Array.isArray(requestsData)) {
  //     console.error("requestsData is not an array:", requestsData);
  //     setFilteredRequests([]);
  //     return;
  //   }

  //   const filtered = requestsData.filter((request) => {
  //     return (
  //       (request.date?.toLowerCase() || "").includes(searchFilters.date.toLowerCase()) &&
  //       (request.name?.toLowerCase() || "").includes(searchFilters.name.toLowerCase()) &&
  //       (request.mobile?.toLowerCase() || "").includes(searchFilters.mobile.toLowerCase()) &&
  //       (searchFilters.points === "" || (request.points || "").toString().includes(searchFilters.points)) &&
  //       (request.type?.toLowerCase() || "").includes(searchFilters.type.toLowerCase()) &&
  //       (request.status?.toLowerCase() || "").includes(searchFilters.status.toLowerCase())
  //     );
  //   });

  //   setFilteredRequests(filtered);
  // };

  const filterRequests = () => {
    if (!Array.isArray(requestsData)) {
      console.error("requestsData is not an array:", requestsData);
      setFilteredRequests([]);
      return;
    }
  
    const filtered = requestsData.filter((request) => {
      return (
        (request.date?.toLowerCase() || "").includes(searchFilters.date.toLowerCase()) &&
        (request.user?.toLowerCase() || "").includes(searchFilters.user.toLowerCase()) &&
        (request.mobile?.toLowerCase() || "").includes(searchFilters.mobile.toLowerCase()) &&
        (searchFilters.points === "" || (request.points || "").toString().includes(searchFilters.points)) &&
        (request.type?.toLowerCase() || "").includes(searchFilters.type.toLowerCase()) &&
        (request.status?.toLowerCase() || "").includes(searchFilters.status.toLowerCase())
      );
    });
  
    setFilteredRequests(filtered);
  };
  

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Debit Requests</h3>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Sr No</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Date</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">User</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Mobile</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Points</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Type</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Status</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Action</th>
            </tr>
            <tr>
              <td />
              <td>
                <input
                  type="text"
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
                  name="user"
                  placeholder="Search User"
                  value={searchFilters.user}
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
                <input
                  type="text"
                  name="type"
                  placeholder="Search Type"
                  value={searchFilters.type}
                  onChange={handleSearchChange}
                  className="p-2 border rounded w-full"
                />
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
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{new Date(request.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{request.user}</td>
                  <td className="py-2 px-4 border">{request.mobile}</td>
                  <td className="py-2 px-4 border">{request.points || "N/A"}</td>
                  <td className="py-2 px-4 border">{request.type}</td>
                  <td className="py-2 px-4 border">{request.status}</td>
                  <td className="py-2 px-4 border">
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 text-white p-2 rounded-full"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-full"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsDeleteModalOpen(true);
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
                <td colSpan="8" className="py-2 px-4 text-center text-gray-600">
                  No debit requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DebitRequests;
