import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css';
import axios from '../api/axios';

function Header() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        // Call the backend logout endpoint
        await axios.post('/auth/logout', {}, { withCredentials: true });
        // Clear any client-side auth state here, if applicable
        // e.g., setAuth(null) or useAuth().setAuth(null) if using context
        // Redirect to the login page
        navigate('/login');
    } catch (error) {
        console.error('Error logging out:', error);
    }
};



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
        <div className='wrapper_btn'>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }} id='login_btn' >
            Logout
        </button>
        </div>
      </nav>
      <div className="search-icon">
        🔍
      </div>
    </header>
  );
}

export default Header;
