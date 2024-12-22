import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/user";
import { LOGOUT } from "../redux/reducers/authSlice";
import { loadSeller, logout as sellerLogout } from "../redux/actions/sellers";
import PropTypes from 'prop-types';
import "../styles/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { productData } from "../../src/statics/data";
import { server } from "../utils/api";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isAuthenticated: isSeller, seller } = useSelector((state) => state.sellers);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(LOGOUT());
    navigate("/login");
  };

  const handleSellerLogout = () => {
    dispatch(sellerLogout());
    navigate('/seller-login');
  };

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
    const sellerToken = localStorage.getItem("sellerAccessToken");
    const userToken = localStorage.getItem("accessToken");
    
    if (sellerToken) {
      dispatch(loadSeller());
    } else if (userToken) {
      dispatch(loadUser());
    }
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

        {!isSeller && !isAuthenticated && (
          <NavLink to="/seller-register" className="Navlink">
            <p>Become a Seller</p>
            <hr />
          </NavLink>
        )}

        {!isAuthenticated && !isSeller ? (
          <>
            <NavLink to="/login" className="Navlink" onClick={() => setDropdownVisible(false)}>
              <p>Login</p>
              <hr />
            </NavLink>

            <NavLink to="/sign-up" className="Navlink">
              <p>Signup</p>
              <hr />
            </NavLink>
          </>
        ) : isSeller ? (
          <div className="user-profile" onClick={toggleDropdown}>
            {seller?.avatar ? (
              <img 
                src={`${server}/${seller.avatar}`}
                alt="seller" 
                className="avatar-icon avatar-image"
                onError={(e) => {
                  console.log("Avatar load error, using RxAvatar");
                  e.target.style.display = 'none';
                  e.target.onerror = null;
                }}
              />
            ) : (
              <RxAvatar size={32} className="avatar-icon" />
            )}
            <span className="username">{seller?.name || "Seller"}</span>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <NavLink to="/seller/dashboard" className="dropdown-item">Dashboard</NavLink>
                <button className="dropdown-item" onClick={handleSellerLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="user-profile" onClick={toggleDropdown}>
            {user?.avatar ? (
              <img 
                src={`${server}/${user.avatar}`}
                alt="user" 
                className="avatar-icon avatar-image"
                onError={(e) => {
                  console.log("Avatar load error, using RxAvatar");
                  e.target.style.display = 'none';
                  e.target.onerror = null;
                }}
              />
            ) : (
              <RxAvatar size={32} className="avatar-icon" />
            )}
            <span className="username">{user?.name || "User"}</span>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <NavLink to="/dashboard" className="dropdown-item">Dashboard</NavLink>
                <button className="dropdown-item" onClick={handleUserLogout}>Logout</button>
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

Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  }),
  seller: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string
  })
};

export default Navbar;