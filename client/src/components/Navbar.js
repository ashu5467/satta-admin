import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  // State to control the side menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`flex justify-between items-center px-6 py-4 relative transition-all duration-300 ${isMenuOpen ? 'bg-[#2d2d8d]' : 'bg-[#3838E9]'} text-white`} style={{ fontFamily: 'Ubuntu' }}>
      {/* Logo */}
      <div className="text-2xl font-bold justify-content-center">MatkaApp</div>

      {/* Desktop Menu (only visible when side menu is closed) */}
      <div className={`hidden lg:flex items-center space-x-6 ${isMenuOpen ? 'hidden' : ''}`}>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="hover:text-gray-400">Home</a>
          </li>
          <li>
            <a href="#about-matka" className="hover:text-gray-400">About Matka</a>
          </li>
          <li>
            <a href="#learn-matka" className="hover:text-gray-400">Learn Matka</a>
          </li>
          <li>
            <a href="#guess-matka" className="hover:text-gray-400">Guess Matka</a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        <Bars3Icon className="h-8 w-8 text-white" />
      </div>

      {/* Side Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-white text-black transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}
        style={{ fontFamily: 'Ubuntu' }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button onClick={toggleMenu} className="text-black">
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
        
        <ul className="space-y-6 p-6">
          <li>
            <a href="#home" className="hover:text-gray-400 underline">Home</a>
          </li>
          <li>
            <a href="#about-matka" className="hover:text-gray-400 underline">About Matka</a>
          </li>
          <li>
            <a href="#learn-matka" className="hover:text-gray-400 underline">Learn Matka</a>
          </li>
          <li>
            <a href="#guess-matka" className="hover:text-gray-400 underline">Guess Matka</a>
          </li>
        </ul>
      </div>

      {/* Overlay to darken the background when the menu is open */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" />
      )}
    </nav>
  );
};

export default Navbar;
