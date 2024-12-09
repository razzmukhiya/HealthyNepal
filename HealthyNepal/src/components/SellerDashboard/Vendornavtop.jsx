import React from 'react';
import { useSelector } from 'react-redux';
import "../../styles/Vendornavtop.css";

const Vendornavtop = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <div className="Navtop-bar">
        <div className="search-input">
          <input type="search" placeholder='Search' />
          <span className='close-icon'>x</span>
        </div>
        <div className="seller-info">
          <div className="seller-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt="Seller Avatar" />
          </div>
          <div className="seller-name">
            <p>{user ? user.name : 'John Doe'}</p>
            <span>seller</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vendornavtop;
