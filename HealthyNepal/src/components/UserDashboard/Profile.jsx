import React from 'react';
import { useSelector } from 'react-redux';
import "../../styles/UserProfile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <img 
              src={user?.avatar || "/default-avatar.png"} 
              alt="Profile" 
              className="avatar-image"
            />
          </div>
          <div className="profile-details">
            <div className="info-group">
              <label>Full Name</label>
              <p>{user?.name || 'N/A'}</p>
            </div>
            <div className="info-group">
              <label>Email</label>
              <p>{user?.email || 'N/A'}</p>
            </div>
            <div className="info-group">
              <label>Phone Number</label>
              <p>{user?.phoneNumber || 'N/A'}</p>
            </div>
            <div className="info-group">
              <label>Joined On</label>
              <p>{new Date(user?.createdAt).toLocaleDateString() || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
