import React from 'react';
import '../../styles/components/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">💱</span>
            <h1>Currency Exchange</h1>
          </div>
          <nav className="nav-links">
            <a href="#converter">Convert</a>
            <a href="#charts">Charts</a>
            <a href="#favorites">Favorites</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;