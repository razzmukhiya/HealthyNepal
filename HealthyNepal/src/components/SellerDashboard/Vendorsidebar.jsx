import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../styles/Vendorsidebar.css";



const Vendorsidebar = () => {
  return (
    <>
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>HealthyNepal</h2>
        <p>E-Commerce</p>
      </div>
      <div className="nav">
        <NavLink to="/sellerdashboard" className="VendorNavl" >
          <p>Dashboard</p>
          <br />
        </NavLink>

        <NavLink to="/sellerorders" className="VendorNavl" >
          <p>Orders</p>
          <br />
        </NavLink>

        <NavLink to="/sellerproducts" className="VendorNavl" >
          <p>Products</p>
          <br />
        </NavLink>

        <NavLink to="/addproducts" className="VendorNavl" >
          <p>Add Product</p>
          <br />
        </NavLink>

        <NavLink to="/withdrawl" className="VendorNavl" >
          <p>Withdrawl</p>
          <br />
        </NavLink>

        <p>Pages</p>

        <NavLink to="/sellercustomersupport" className="VendorNavl" >
          <p>Customer Support</p>
          <br />
        </NavLink>

        <NavLink to="/sellerchatsupport" className="VendorNavl" >
          <p>Chat Support</p>
          <br />
        </NavLink>

        <NavLink to="/sellerprofile" className="VendorNavl" >
          <p>Profile</p>
          <br />
        </NavLink>

        <NavLink to="/logout" className="VendorNavl" >
          <p>Logout</p>
          <br />
        </NavLink>

     

      </div>
    </div>
    </>
  )
}

export default Vendorsidebar;
