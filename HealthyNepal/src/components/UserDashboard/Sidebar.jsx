import React from 'react'
import { NavLink } from 'react-router-dom';
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <NavLink to="" end className="Navl">
        <p>Dashboard</p>
        <hr hidden />
      </NavLink>

      <NavLink to="orders" className="Navl">
        <p>Orders</p>
        <hr hidden />
      </NavLink>

      <NavLink to="address" className="Navl">
        <p>Address</p>
        <hr hidden/>
      </NavLink>

      <NavLink to="wishlist" className="Navl">
        <p>WishList</p>
        <hr hidden/>
      </NavLink>

      <NavLink to="chatsupport" className="Navl">
        <p>Chat Support</p>
        <hr hidden />
      </NavLink>

      <NavLink to="profile" className="Navl">
        <p>Profile</p>
        <hr hidden/>
      </NavLink>

      <NavLink to="/login" className="Navl">
        <p>Logout</p>
        <hr hidden/>
      </NavLink>
    </div>
  )
}

export default Sidebar;
