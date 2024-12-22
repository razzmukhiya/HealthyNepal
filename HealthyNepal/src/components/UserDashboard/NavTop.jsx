import React from 'react';
import { useSelector } from 'react-redux';
import "../../styles/NavTopStyles.css";

const NavTop = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="navtop">
      <div className="search-container">
        <input 
          type="search" 
          name="search" 
          id="search"  
          placeholder="Search Here"
        />
      </div>
      <div className="user-info">
        <span className="welcome-text">Welcome, {user?.name || 'User'}</span>
      </div>
    </div>
  );
};

export default NavTop;
