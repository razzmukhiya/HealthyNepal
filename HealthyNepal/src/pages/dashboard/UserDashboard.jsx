import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Dashboard';
import Orders from "./Orders";
import Address from "./Address";
import WishList from "./WishList";
import ChatSupport from "./ChatSupport";
import Profile from "./Profile";
import Sidebar from "../../components/UserDashboard/Sidebar";
import NavTop from "../../components/UserDashboard/NavTop";

function UserDashboard() {
  return (
    <div className="user-dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <NavTop />
        <div className="dashboard-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<Address />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="chatsupport" element={<ChatSupport />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard;
