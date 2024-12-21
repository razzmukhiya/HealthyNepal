import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadSeller } from "../../redux/actions/sellers";
import { FiSearch, FiBell, FiMail } from 'react-icons/fi';
import { RxAvatar } from "react-icons/rx";
import { server } from "../../utils/api";
import "../../styles/Vendornavtop.css";

const Vendornavtop = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  
  useEffect(() => {
    dispatch(loadSeller());
  }, [dispatch]);

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
          />
        </div>
      </div>

      <div className="navtop__right">
        <div className="notification-icons">
          <button className="icon-btn" title="Notifications">
            <FiBell size={20} />
            <span className="badge">2</span>
          </button>
          <button className="icon-btn" title="Messages">
            <FiMail size={20} />
            <span className="badge">3</span>
          </button>
        </div>

        <div className="profile">
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
        </div>
      </div>
    </div>
  );
}

export default Vendornavtop;
