import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "../../styles/SidebarStyles.css";

const sidebarLinks = [
  { path: "/dashboard", label: "Dashboard", end: true },
  { path: "/dashboard/orders", label: "Orders" },
  { path: "/dashboard/address", label: "Address" },
  { path: "/dashboard/wishlist", label: "WishList" },
  { path: "/dashboard/chatsupport", label: "Chat Support" },
  { path: "/dashboard/profile", label: "Profile" }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('refreshToken');

    // Reset auth state in Redux
    dispatch({ type: "LOAD_USER_FAIL" });
    dispatch({ type: "clearErrors" });

    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="Sidebar">
      {sidebarLinks.map((link) => (
        <NavLink 
          key={link.path}
          to={link.path} 
          end={link.end}
          className={({ isActive }) => `Navl ${isActive ? 'active' : ''}`}
        >
          <p>{link.label}</p>
        </NavLink>
      ))}
      
      {/* Logout button */}
      <button 
        onClick={handleLogout}
        className="Navl logout-btn"
      >
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
