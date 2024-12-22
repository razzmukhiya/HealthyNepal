import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiSearch, FiBell, FiMail } from 'react-icons/fi';
import { RxAvatar } from "react-icons/rx";
import { server } from "../../utils/api";
import "../../styles/Vendornavtop.css";

const Vendornavtop = () => {
  const { seller, loading } = useSelector((state) => state.sellers);

  return (
    <div className="navtop">
      <div className="navtop__left"></div>
      
      <div className="search-wrapper">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            className="search-input"
            autoComplete="off"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="navtop__right">
        <div className="notification-icons">
          <Link to="/seller/notifications" className="icon-btn" title="Notifications">
            <FiBell size={20} />
            <span className="badge">2</span>
          </Link>
          <Link to="/seller/messages" className="icon-btn" title="Messages">
            <FiMail size={20} />
            <span className="badge">3</span>
          </Link>
        </div>

        <Link to="/seller/profile" className="profile">
          <div className="profile__info">
            <span className="profile__name">{seller?.name || 'Seller'}</span>
            <span className="profile__role">Seller</span>
          </div>
          <div className="profile__avatar">
            {seller?.avatar ? (
              <img 
                src={`${server}/${seller.avatar}`}
                alt="seller avatar" 
                className="avatar-image"
                onError={(e) => {
                  console.log("Avatar load error, using RxAvatar");
                  e.target.style.display = 'none';
                  e.target.onerror = null;
                }}
              />
            ) : (
              <RxAvatar size={24} />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Vendornavtop;
