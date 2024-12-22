import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Orders from './Orders';
import Products from './Products';
import AddProducts from './AddProducts';
import CustomerSupport from './CustomerSupport';
import ChatSupport from './ChatSupport';
import Profile from './Profile';
import Settings from './Settings';
import Withdrawl from './Withdrawl';
import SellerDashboard from './SellerDashboard';
import Vendorsidebar from '../../components/SellerDashboard/Vendorsidebar';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import VendorSellerProfile from './VendorSellerProfile';
import Notifications from './Notifications';
import Messages from './Messages';
import '../../styles/dashboard.css';
import '../../styles/loading.css';
import '../../styles/notifications.css';

function VendorDashboard() {
  const { seller } = useSelector((state) => state.sellers);


  return (
    <div className="vendor-dashboard">
      <aside className="vendor-dashboard__sidebar">
        <Vendorsidebar />
      </aside>
      <main className="vendor-dashboard__content">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="edit-product" element={<EditProduct />} />
          <Route path="delete-product" element={<DeleteProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customer-support" element={<CustomerSupport />} />
          <Route path="withdrawl" element={<Withdrawl />} />
          <Route path="chat-support" element={<ChatSupport />} />
          <Route path="profile" element={<VendorSellerProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/seller/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default VendorDashboard;
