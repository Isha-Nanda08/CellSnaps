import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.css';
import axios from '../api/axios';
import Logo from '../assets/Logo.jpeg'
function Header() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.post('/auth/logout', {}, { withCredentials: true });

        navigate('/login');
    } catch (error) {
        console.error('Error logging out:', error);
    }
};



  return (
    <header className="header">
      <div className="logo">
        <img src= {Logo} alt="Logo" className="logo-image" />
        <h1>CellSnaps for <span>CELL SCIENCE</span></h1>
      </div>
      <nav className="nav">
        <a href="\">Home</a>
        <a href="\about">About</a>
        <a href="https://github.com/Isha-Nanda08/CellSnaps">Github</a>
        <a href="https://github.com/Isha-Nanda08/CellSnaps/blob/main/README.md">Readme</a>
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
