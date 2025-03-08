import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectLoadingStates } from '../redux/reducers/sellersSlice';
import { loadSeller } from '../redux/actions/sellers';
import { loadAdmin } from '../redux/actions/admin';

const ProtectedRoute = ({ children, type = 'user' }) => {
    const isAdminRoute = type === 'admin';
    const location = useLocation();
    const dispatch = useDispatch();
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    
    // For seller routes
    const isSellerAuthenticated = useSelector(selectIsAuthenticated);
    const sellerLoadingStates = useSelector(selectLoadingStates);
    const { seller } = useSelector((state) => state.sellers);
    
    // For user routes
    const { isAuthenticated: isUserAuthenticated, user, loading } = useSelector((state) => state.auth);
    
    // Check for token in localStorage
        const token = type === 'seller' // Check for seller token

        ? localStorage.getItem('sellerAccessToken')
        : type === 'admin'
        ? localStorage.getItem('adminToken')
        : localStorage.getItem('userAccessToken');

    useEffect(() => {
        let isMounted = true;
        
        const initAuth = async () => {
            try {
                if (type === 'seller' && token && !seller) {
                    await dispatch(loadSeller());
                } else if (type === 'admin' && token && !user) {
                    await dispatch(loadAdmin());
                }
            } catch (error) {
                console.error('Failed to load auth data:', error);
            }
            if (isMounted) {
                setIsInitialLoad(false);
            }
        };

        initAuth();
        
        return () => {
            isMounted = false;
        };
    }, [dispatch, type, token]);


    // Handle seller routes
    if (type === 'seller') {
        // During initial load or while checking authentication, show loading
        if (isInitialLoad || sellerLoadingStates.loadSeller || sellerLoadingStates.login) {
            return (
                <div className="loading-container">
                    <div className="loading-spinner">Loading...</div>
                </div>
            );
        }

        // Only redirect after initial load and if there's no authentication
        if (!isInitialLoad && (!token || !isSellerAuthenticated || !seller)) { // Check seller authentication

            return <Navigate 
                to="/seller-login" 
                state={{ from: location.pathname }}
                replace 
            />;
        }
    }
    
    else if (type === 'admin') {
        console.log('Admin Route Check:', { token, isUserAuthenticated, user, role: user?.role }); // Log statement here

        // Show loading state while checking authentication
        if (loading) {
            return (
                <div className="loading-container">
                    <div className="loading-spinner">Loading...</div>
                </div>
            );
        }

        // If there's no token, user is not authenticated, no user data, or user is not admin
        if (!token || !isUserAuthenticated || !user || user.role !== 'admin') { // Check admin authentication

            return <Navigate 
                to="/admin/login" 
                state={{ from: location.pathname }}
                replace 
            />;
        }
    }
    // Handle user routes
    else {
        // If there's no token, user is not authenticated, or no user data, redirect to login
        if (!token || !isUserAuthenticated || !user) { // Check user authentication

            return <Navigate 
                to="/login" 
                state={{ from: location.pathname }}
                replace 
            />;
        }
    }

    // If authenticated, has data, and not loading, render the protected content
    return children;
};

export default ProtectedRoute;
