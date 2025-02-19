import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admindashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/seller-requests">Seller Requests</Link>
        </li>
        <li>
          <Link to="/admin/withdrawals">Withdrawals</Link>
        </li>
        <li>
          <Link to="/admin/sellers">Manage Sellers</Link>
        </li>
        <li>
          <Link to="/admin/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
