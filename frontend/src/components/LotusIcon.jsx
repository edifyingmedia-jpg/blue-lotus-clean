import React from 'react';

const LotusIcon = ({ size = 120, className = "" }) => {
  return (
    <svg 
      className={`logo ${className}`} 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      
      <path 
        d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" 
        fill="url(#lotusGradient)"
      />
      
      <circle cx="50" cy="50" r="6" fill="white" fillOpacity="0.4" />
    </svg>
  );
};

export default LotusIcon;
