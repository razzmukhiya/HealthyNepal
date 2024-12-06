import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from "../../statics/data";
import './Navbar.css'; // Import the CSS file

const Navbar = ({ active }) => {
  return (
    <div className="navbar-container">
      {navItems && navItems.map((i, index) => (
        <div className="navbar-item" key={index}>
          <Link
            to={i.url}
            className={`navbar-link ${active === index + 1 ? 'active' : 'inactive'}`}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;