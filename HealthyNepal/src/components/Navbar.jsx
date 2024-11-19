import React, { useState } from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { productData } from "../../src/statics/data";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [searchData, setSearchData] = useState([]);
  const [active,setActive] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterProducts = productData.filter((product) => {
      product.name.toLowerCase().includes(term.toLowerCase());
    });
    setSearchData(filterProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  })
  return (
    <div className="Navbar">
      <div className="NavTop">
        <NavLink to="/" className="Navlink">
          <p>Home</p>
          <hr />
        </NavLink>

        <NavLink to="/vendor" className="Navlink">
          <p>Became a Seller</p>
          <hr />
        </NavLink>

        <NavLink to="/login" className="Navlink">
          <p>Login</p>
          <hr />
        </NavLink>

        <NavLink to="/signup" className="Navlink">
          <p>Signup</p>
          <hr />
        </NavLink>
      </div>

      <div className="NavDown">
        <h2>HealthyNepal</h2>

        <div className="search">
          <input type="search" 
          placeholder="Search in HealthyNepal"
          value={searchData} 
          onChange={handleSearchChange}
          />
        </div>

        <NavLink to="/prescription-medicine">
          <p>Prescription Medicine</p>
        </NavLink>

        <NavLink>
          <p>Cart</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
