import React from 'react';
import BlueLotusLogo from '../assets/blue-lotus.png';

export default function Header() {
  return (
    <header className="logo-container">
      <img
        src={BlueLotusLogo}
        alt="Blue Lotus Logo"
        className="logo"
      />
    </header>
  );
}
