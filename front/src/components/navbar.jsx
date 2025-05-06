import React, { useState } from 'react';
import '../css/navbar.css';
import logoImage from '../assets/M logo 1.png'; // Adjust path based on your project structure

const Navbar = () => {
  const [heartFavorited, setHeartFavorited] = useState(false);

  const toggleFavorite = () => {
    setHeartFavorited(!heartFavorited);
    // Redirect to favorites page (replace with React Router or actual path)
    window.location.href = '/favorites'; // Adjust to your routing logic
  };

  const search = () => {
    const input = document.getElementById('searchInput');
    if (input.value.trim()) {
      window.location.href = `/search_results?q=${encodeURIComponent(input.value)}`; // Adjust to your routing logic
    }
  };

  return (
    <header className="navbar">
      {/* <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      <div className="left">
        <span className="logo">
          <img src={logoImage} alt="Logo" />
        </span>
        <span className="website-name">OVIE MIX</span>
      </div>
      <div className="right">
        <div className="input-box heart-btn-container">
          <button className={`heart-btn ${heartFavorited ? 'favorited' : ''}`} onClick={toggleFavorite}>
            <i className="bx bx-heart"></i>
          </button>
        </div>
        <div className="input-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                search();
              }
            }}
          />
          <i className="bx bx-search"></i>
        </div>
        <div className="auth-buttons">
          <a href="#" className="auth-btn">LOG IN</a>
          <a href="#" className="auth-btn">SIGN UP</a>
        </div>
        {/* <div className="logo">
          <img src={logoImage} alt="Logo" />
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;