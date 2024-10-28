import React from 'react'
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import '../styles/vendor.css'

const Vendor = () => {
  return (
    <div className='VendorLogin'>
    
      <div className="VenA">
        <p>BECAME A HealthyNepal SELLER TODAY</p>

        <p>Create a HealthyNepal seller Account now and reach millions of customers!</p>
      </div>

      <div className="VenB">
        <h2>LOGIN AS SELLER</h2>

        <form action="#">
          <input type="text" placeholder="Mobile / Email" /><br />
          <input type="password" placeholder="Password" /><br />
          <button>Login</button>

          <NavLink to="/signup-vendor">
          <p>CREATE A NEW ACCOUNT!</p>
          </NavLink>
          <NavLink to="/forgetpassword">
          <p>FORGET PASSWORD</p>
          </NavLink>
        </form>
      </div>
    </div>
  )
}

export default Vendor;
