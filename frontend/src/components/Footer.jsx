import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white">
      <p className="text-center text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
};

export default Footer;
