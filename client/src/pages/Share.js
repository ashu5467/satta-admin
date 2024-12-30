import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Import icons
import bgImage from '../assets/maroonbg.jpg'; // Import the background image

const Share = () => {
  const appUrl = 'https://example.com'; // Replace with your app URL
  const appTitle = 'Check out this amazing app!';

  // Function to handle Web Share API
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: appTitle,
          text: 'Discover this awesome app!',
          url: appUrl,
        });
        alert('Thanks for sharing!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`, // Set the background image
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Share this App</h1>

      {/* Share via Web Share API */}
      <button
        onClick={handleWebShare}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
      >
        Share App (Web Share API)
      </button>

      <p className="text-gray-200 mb-4">Or share via:</p>

      {/* Share via Platforms */}
      <div className="flex justify-center space-x-4">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${appTitle} ${appUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 text-2xl hover:text-green-700"
          title="Share on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-2xl hover:text-blue-800"
          title="Share on Facebook"
        >
          <FaFacebook />
        </a>

        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(appTitle)}&url=${encodeURIComponent(appUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 text-2xl hover:text-blue-600"
          title="Share on Twitter"
        >
          <FaTwitter />
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodeURIComponent(appTitle)}&body=${encodeURIComponent(`Check out this app: ${appUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-200 text-2xl hover:text-gray-400"
          title="Share via Email"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default Share;
