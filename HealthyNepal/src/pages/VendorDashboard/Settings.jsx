import React from 'react';
import '../../styles/VendorDashboard.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <div className="settings-content">
        <div className="settings-section">
          <h3>Shop Settings</h3>
          <div className="setting-item">
            <label>Shop Name</label>
            <input type="text" placeholder="Enter shop name" />
          </div>
          <div className="setting-item">
            <label>Shop Description</label>
            <textarea placeholder="Enter shop description"></textarea>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notification Settings</h3>
          <div className="setting-item">
            <label>
              <input type="checkbox" /> Email notifications for new orders
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" /> Email notifications for messages
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Security Settings</h3>
          <div className="setting-item">
            <button className="btn-change-password">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
