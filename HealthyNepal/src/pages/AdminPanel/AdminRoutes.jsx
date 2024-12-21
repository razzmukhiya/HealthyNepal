import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../../components/Layouts/AdminLayout';
import AdminLogin from './AdminLogin';
import TempRegister from './TempRegister';
import Dashboard from './Dashboard';
import Sellers from './Sellers';
import DeactiveSellers from './DeactiveSellers';
import SellerRequests from './SellerRequests';
import ChatSellers from './ChatSellers';
import WithdrawalRequests from './WithdrawalRequests';
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
              <Dashboard />
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
          path="/admin/chat" 
          element={
            <ProtectedRoute>
              <ChatSellers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/withdrawals" 
          element={
            <ProtectedRoute>
              <WithdrawalRequests />
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

        {/* Catch-all Route for Admin */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>

      {/* Global Toast Container */}
      <ToastContainer position="top-right" />
    </>
  );
};

export default AdminRoutes;
