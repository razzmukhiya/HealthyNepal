import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div  className="Footer">

     <div className="footer-info">
        <h1>Information</h1>

        <ul>
            <li>
                <NavLink to="/term&conditions">
                 <p>Terms & Conditions</p>
                </NavLink>
            </li>
            <li>
                <NavLink to="/privacypolicyt">
                 <p>Privacy Policy</p>
                </NavLink>
            </li>
        
           <li>
                <NavLink to="/shipping&returns">
                    <p>Shipping & returns</p>
                </NavLink>
            </li>
    
           <li>
                <NavLink to="/contactus">
                    <p>Contact us</p>
                </NavLink>
           </li>

           <li>
                <NavLink to="/search">
                    <p>Search</p>
                </NavLink>
            </li>
        </ul>
    </div>


    <div className="footer-account">
     <h1>My account</h1>

      <ul>
         <li>
                <NavLink to="/myaccount">
                    <p>My Account</p>
                </NavLink>
         </li>
         <li>
            <NavLink to="/orders">
                <p>Orders</p>
            </NavLink>
         </li>
         <li>
            <NavLink to="/address">
                <p>Address</p>
            </NavLink>
         </li>
         <li>
            <NavLink to="/cart">
                <p>Carts</p>
            </NavLink>
        </li>
        <li>
            <NavLink to="/wishlist">
                <p>Wishlist</p>
            </NavLink>
        </li>
        <li>
            <NavLink to="/about">
                <p>About Us</p>
            </NavLink>
        </li>
      </ul>
    </div>

    <div className="footer-about">

      <h1>About us</h1>

      <ul>
       <li>
        <p>Company name :  HealthyNepal</p>
       </li>
       <li>
        <p>Address : Jadibuti, Kathmandu</p>
       </li>
       <li>
        <p>Contact : contact@healthynepal.com</p>
       </li>
       <li>
        <p>Phone: 9812345678, 9861234567</p>
       </li>
       <li>
           <p>Hour: Sunday - Friday/ 9:00AM - 17:00PM</p>
       </li>

      </ul>
    </div>

     {/* <p>Copyright © 2024 HealthyNepal Pvt. Ltd.. All rights reserved.</p>  */}
      
    </div>
  )
}

export default Footer
