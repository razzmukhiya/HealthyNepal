import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Products from './Products';
import Profile from './Profile';
import ChatSupports from './ChatSupports';
import CustomerSupport from './CustomerSupport';
import Setting from './Setting';
import Withdrawl from './Withdrawl';
import SellerProfile from './SellerProfile';

function VendorDashboard() {
  return (
    <div className="vendor-dashboard-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chatsupport" element={<ChatSupports />} />
        <Route path="customersupport" element={<CustomerSupport />} />
        <Route path="setting" element={<Setting />} />
        <Route path="withdrawl" element={<Withdrawl />} />
        <Route path="sellerprofile" element={<SellerProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default VendorDashboard;
