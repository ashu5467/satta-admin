import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

  // Fetch the current banner from the backend
  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get('http://13.203.91.35:5000/api/banner/get', {
        responseType: 'blob', // Ensure we get the binary image data
      });

      const imageUrl = URL.createObjectURL(response.data);
      setBannerUrl(imageUrl);
    } catch (error) {
      console.error('Failed to fetch banner:', error);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Handle upload action
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('banner', selectedImage);

      try {
        await axios.post('http://13.203.91.35:5000/api/banner/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        alert('Image uploaded successfully');
        fetchBanner(); // Refresh the displayed banner
      } catch (error) {
        console.error('Failed to upload banner:', error);
        alert('Failed to upload banner.');
      }
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Banner Image</h2>
      <div className="flex flex-col items-center">
        {/* Display banner if it exists */}
        {bannerUrl && (
          <img src={bannerUrl} alt="Current banner" className="mb-4 w-full h-48 object-cover rounded-lg" />
        )}

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* Upload button */}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add/Change Banner
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
