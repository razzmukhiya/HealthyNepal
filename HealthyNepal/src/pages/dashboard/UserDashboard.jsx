import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavTop from "../../components/UserDashboard/NavTop";
import Sidebar from "../../components/UserDashboard/Sidebar";
import Dashboard from "./Dashboard";
import Profile from "../../components/UserDashboard/Profile";
import Address from "./Address";
import NewAddress from "./NewAddress";
import Wishlist from "../../components/UserDashboard/Wishlist";
import ChatSupport from "../../components/UserDashboard/ChatSupport";
import "../../styles/UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    
    if (!loading && !isAuthenticated && !localStorage.getItem('userAccessToken')) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="dashboard-layout">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <NavTop />
        <div className="content-area">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="address" element={<Address />} />
            <Route path="address/new" element={<NewAddress />} />
            <Route path="address/edit/:id" element={<NewAddress />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="chatsupport" element={<ChatSupport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
