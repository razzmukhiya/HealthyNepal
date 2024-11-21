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
        <NavLink to="/vendordashboard" className="VendorNavl" >
          <p>Dashboard</p>
          <br />
        </NavLink>

        <NavLink to="/vendororders" className="VendorNavl" >
          <p>Orders</p>
          <br />
        </NavLink>

        <NavLink to="/vendorproducts" className="VendorNavl" >
          <p>Products</p>
          <br />
        </NavLink>

        <NavLink to="/vendoraddproduct" className="VendorNavl" >
          <p>Add Product</p>
          <br />
        </NavLink>

        <NavLink to="/vendorwithdrawl" className="VendorNavl" >
          <p>Withdrawl</p>
          <br />
        </NavLink>

        <p>Pages</p>

        <NavLink to="/vendorcustomersupport" className="VendorNavl" >
          <p>Customer Support</p>
          <br />
        </NavLink>

        <NavLink to="/vendorchatsupport" className="VendorNavl" >
          <p>Chat Support</p>
          <br />
        </NavLink>

        <NavLink to="/vendorprofile" className="VendorNavl" >
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
