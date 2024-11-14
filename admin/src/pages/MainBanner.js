import React, { useState } from 'react';

const MainBanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle upload action (this could include API integration for uploading the image to a server)
  const handleUpload = () => {
    if (selectedImage) {
      console.log('Image uploaded successfully');
      // Add API call or any additional upload logic here
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Banner Image</h2>
      <div className="flex flex-col items-center">
        {/* Image preview */}
        {selectedImage && (
          <img src={selectedImage} alt="Selected banner" className="mb-4 w-full h-48 object-cover rounded-lg" />
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
