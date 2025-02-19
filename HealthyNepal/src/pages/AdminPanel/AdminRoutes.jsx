import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../../components/Layouts/AdminLayout';
import AdminDashboard from './AdminDashboard';
import Sellers from './Sellers';
import DeactiveSellers from './DeactiveSellers';
import SellerRequests from './SellerRequests';
import ChatSellers from './ChatSellers';
import WithdrawalRequests from './WithdrawalRequests';
import ManageUsers from './ManageUsers';
import Settings from './Settings';
import Logout from './Logout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { ToastContainer } from '../../components/common/Toast';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        {/* Allow root path to be handled by the main application */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Public Routes */}
        <Route 
          path="/admin/login" 
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          } 
        />
        <Route 
          path="/admin/register" 
          element={
            <PublicRoute>
              <TempRegister />
            </PublicRoute>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/sellers" 
          element={
            <ProtectedRoute>
              <Sellers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/deactive-sellers" 
          element={
            <ProtectedRoute>
              <DeactiveSellers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/seller-requests" 
          element={
            <ProtectedRoute>
              <SellerRequests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/chat-sellers" 
          element={
            <ProtectedRoute>
              <ChatSellers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/withdrawal-requests" 
          element={
            <ProtectedRoute>
              <WithdrawalRequests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/manage-users" 
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/logout" 
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          } 
        />

        {/* Default Routes */}
        <Route 
          path="/admin" 
          element={<Navigate to="/admin/dashboard" replace />} 
        />
        <Route 
          path="/admin/*" 
          element={<Navigate to="/admin/dashboard" replace />} 
        />
      </Routes>

      {/* Global Toast Container */}
      <ToastContainer position="top-right" />
    </>
  );
};

export default AdminRoutes;
