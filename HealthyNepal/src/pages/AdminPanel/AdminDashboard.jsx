import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/admindashboard.css';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-info">
          <span>Welcome, {user?.name}</span>
        </div>
      </div>
      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>$0</p>
          </div>
        </div>
        <div className="admin-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Manage Users</button>
            <button className="action-btn">Manage Products</button>
            <button className="action-btn">View Orders</button>
            <button className="action-btn">Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
