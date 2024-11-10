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
        <img src="/images/logo.png" alt="Logo" className="logo-image" />
        <h1>CellSnaps</h1>
      </div>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="/a">cell</a>
        
        
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
