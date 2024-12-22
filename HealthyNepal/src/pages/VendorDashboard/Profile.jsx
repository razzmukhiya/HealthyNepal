import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/VendorDashboard.css';

const Profile = () => {
  const { seller } = useSelector((state) => state.sellers);

  return (
    <div className="profile-container">
      <h2>Seller Profile</h2>
      <div className="profile-content">
        {seller && (
          <div className="profile-details">
            <div className="profile-field">
              <label>Name:</label>
              <p>{seller.name}</p>
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <p>{seller.email}</p>
            </div>
            <div className="profile-field">
              <label>Shop Name:</label>
              <p>{seller.shopName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
