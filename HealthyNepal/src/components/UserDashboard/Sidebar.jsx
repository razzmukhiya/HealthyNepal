import React from 'react'
import { NavLink } from 'react-router-dom';
import "../../styles/Sidebar.css";


const sidebar = () => {
  return (
    <>
    <div className="sidebar">
      <NavLink to="/dashboard" className="Navlink">
        <p>Dashboard</p>
        <hr hidden />
      </NavLink>

      <NavLink to="/orders" className="Navlink">
        <p>Orders</p>
        <hr  hidden />
      </NavLink>

      <NavLink to="/address" className="Navlink">
        <p>Address</p>
        <hr hidden/>
      </NavLink>

      <NavLink to="/wishlist" className="Navlink">
        <p>WishList</p>
        <hr hidden/>
      </NavLink>

      <NavLink to="/chatsupport" className="Navlink">
        <p>Chat Support</p>
        <hr hidden />
      </NavLink>

      <NavLink to="/profile" className="Navlink">
        <p>Profile</p>
        <hr hidden/>
      </NavLink>

      <NavLink to="/logout" className="Navlink">
        <p>Logout</p>
        <hr hidden/>
      </NavLink>
    </div>
    </>
  )
}

export default sidebar
