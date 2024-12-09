import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";
import "../styles/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { productData } from "../../src/statics/data";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filterProducts = productData.filter((product) => 
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filterProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);





  

  return (
    <div className={`Navbar ${active ? 'active' : ''}`}>
      <div className="NavTop">
        <NavLink to="/" className="Navlink">
          <p>Home</p>
          <hr />
        </NavLink>

        <NavLink to="/sellersignup" className="Navlink">
          <p>Became a Seller</p>
          <hr />
        </NavLink>

        {!isAuthenticated ? (
          <>
            <NavLink to="/login" className="Navlink">
              <p>Login</p>
              <hr />
            </NavLink>

            <NavLink to="/signup" className="Navlink">
              <p>Signup</p>
              <hr />
            </NavLink>
          </>
        ) : (
          <div className="user-profile" onClick={toggleDropdown}>
            <RxAvatar size={32} className="avatar-icon" />
            <span className="username">{user?.name || "User"}</span>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <NavLink to="/dashboard" className="dropdown-item">Dashboard</NavLink>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="NavDown">
        <h2>HealthyNepal</h2>

        <div className="search">
          <input
            type="search"
            placeholder="Search in HealthyNepal"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <NavLink to="/prescription-medicine">
          <p>Prescription Medicine</p>
        </NavLink>

        <NavLink to="/cart">
          <p>Cart</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;