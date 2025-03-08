import React from 'react';
import NewAdminSidebar from './NewAdminSidebar';
import '../../styles/adminseller.css';

const Sellers = () => {
  return (
    <div className="admin-seller-container">
      <NewAdminSidebar />
      
      <div className="admin-seller-content">
        <div className="admin-seller-header">
          <h1 className="admin-seller-title">Active Sellers</h1>
          <p className="admin-seller-subtitle">Manage all active sellers in the platform</p>
        </div>

        <div className="seller-list-container">
          <div className="search-filter-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search sellers..."
            />
            <select className="filter-select">
              <option>All Sellers</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="seller-list">
            <div className="seller-item">
              <div className="seller-info">
                <img 
                  src="https://via.placeholder.com/40" 
                  alt="Seller" 
                  className="seller-avatar"
                />
                <div>
                  <p className="seller-name">Seller Name</p>
                  <span className="seller-status status-active">Active</span>
                </div>
              </div>
              <div className="seller-actions">
                <button className="action-btn btn-view">View</button>
                <button className="action-btn btn-edit">Edit</button>
                <button className="action-btn btn-delete">Delete</button>
              </div>
            </div>
          </div>

          <div className="pagination">
            <span className="page-item active">1</span>
            <span className="page-item">2</span>
            <span className="page-item">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellers;
