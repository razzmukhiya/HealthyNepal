import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sellerdashboard from './Sellerdashboard';
import Orders from './Orders';
import Products from './Products';
import AddProducts from './AddProducts';
import ChatSupports from './ChatSupports';
import CustomerSupport from './CustomerSupport';
import Setting from './Setting';
import Withdrawl from './Withdrawl';
import SellerProfile from './VendorSellerProfile';
import Vendorsidebar from '../../components/SellerDashboard/Vendorsidebar';
import ViewProduct from './ViewProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import '../../styles/dashboard.css';

function VendorDashboard() {
  const { isAuthenticated, seller } = useSelector((state) => state.seller);

  if (!isAuthenticated || !seller) {
    return <Navigate to="/sellerlogin" replace />;
  }

  return (
    <div className="vendor-dashboard">
      <aside className="vendor-dashboard__sidebar">
        <Vendorsidebar />
      </aside>
      <main className="vendor-dashboard__content">
        <Outlet />
      </main>
    </div>
  );
}

export default VendorDashboard;
