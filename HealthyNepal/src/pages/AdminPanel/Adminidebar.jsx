import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/AdminSidebar.css';
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active">
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/seller-requests" activeClassName="active">
            <FaUsers /> Seller Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/withdrawals" activeClassName="active">
            <FaMoneyBillWave /> Withdrawals
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-sellers" activeClassName="active">
            <FaUsers /> Manage Sellers
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports" activeClassName="active">
            <FaChartLine /> Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/logout" activeClassName="active">
            <FaSignOutAlt /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;