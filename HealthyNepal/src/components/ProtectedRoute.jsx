import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../styles/UserDashboard.css";

const ProtectedRoute = ({ children, type = 'user' }) => {
    const location = useLocation();
    const { isAuthenticated, loading } = useSelector((state) => 
        type === 'seller' ? state.seller : state.user
    );
    
    // Check for token in localStorage
    const token = type === 'seller' 
        ? localStorage.getItem('sellerAccessToken')
        : localStorage.getItem('userAccessToken');

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    // If there's no token or user is not authenticated, redirect to login
    if (!token || !isAuthenticated) {
        // Save the attempted URL for redirecting after login
        return <Navigate 
            to={type === 'seller' ? '/sellerlogin' : '/login'} 
            state={{ from: location.pathname }}
            replace 
        />;
    }

    // If authenticated and not loading, render the protected content
    return children;
};

export default ProtectedRoute;
