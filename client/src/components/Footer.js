import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          SATTAMATKA.com
        </p>
        <p className="text-sm">
          ALL RIGHTS RESERVED
        </p>
        <div className="mt-2">
          <a href="/terms" className="text-sm text-green-500 hover:text-green-700 mx-2">
            Terms & Conditions
          </a>
          <a href="/privacy" className="text-sm text-green-500 hover:text-green-700 mx-2">
            Privacy Policy
          </a>
          <a href="/disclaimer" className="text-sm text-green-500 hover:text-green-700 mx-2">
            Content Disclaimer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
