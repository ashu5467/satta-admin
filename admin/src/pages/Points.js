import React, { useState, useEffect } from 'react';

const Points = () => {
  const [pointsData, setPointsData] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    date: '',
    name: '',
    mobile: '',
    type: '',
    remark: '',
    points: '',
  });

  useEffect(() => {
    fetchPoints();
  }, []);

  useEffect(() => {
    filterPoints();
  }, [pointsData, searchFilters]);

  const fetchPoints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/points');
      if (!response.ok) throw new Error('Failed to fetch points');
      const data = await response.json();
      setPointsData(data);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filterPoints = () => {
    const filtered = pointsData.filter((point) => {
      return (
        (searchFilters.date === '' || point.date.includes(searchFilters.date)) &&
        point.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
        point.mobile.toLowerCase().includes(searchFilters.mobile.toLowerCase()) &&
        point.type.toLowerCase().includes(searchFilters.type.toLowerCase()) &&
        point.remark.toLowerCase().includes(searchFilters.remark.toLowerCase()) &&
        (searchFilters.points === '' || (point.points || '').toString().includes(searchFilters.points))
      );
    });
    setFilteredPoints(filtered);
  };

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Points</h3>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Sr No</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Date</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Name</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Mobile</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Type</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Remark</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold border">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
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
                  name="remark"
                  placeholder="Search Remark"
                  value={searchFilters.remark}
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
            </tr>
            {filteredPoints.length > 0 ? (
              filteredPoints.map((point, index) => (
                <tr key={point._id} className="border-t border-gray-300">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{point.date}</td>
                  <td className="py-2 px-4 border">{point.name}</td>
                  <td className="py-2 px-4 border">{point.mobile}</td>
                  <td className="py-2 px-4 border">{point.type}</td>
                  <td className="py-2 px-4 border">{point.remark}</td>
                  <td className="py-2 px-4 border">{point.points}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 text-center text-gray-600">
                  No points data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Points;
