import React from 'react';
import '../Styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="path_to_logo" alt="Logo" className="logo-image" />
        <h1>CellSnaps for <span>CELL SCIENCE</span></h1>
      </div>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#collection">cell</a>
        <a href="#tools">Data & Digital Tools</a>
        <a href="#analysis">Analysis & Modeling</a>
        <a href="#publications">Publications</a>
        <a href="#education">Education</a>
        <a href="#support">Login</a>
      </nav>
      <div className="search-icon">
        🔍
      </div>
    </header>
  );
}

export default Header;
