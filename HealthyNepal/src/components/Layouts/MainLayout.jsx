import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Routes that should not show the main navbar
  const noNavbarRoutes = [
    // Auth routes
    '/login',
    '/sign-up',
    '/seller-login',
    '/seller-register',
    
    // Dashboard routes (using startsWith for nested routes)
    '/dashboard',
    '/seller',  // This will cover all seller routes
    
    // Add any other routes that shouldn't show the main navbar
    '/admin/dashboard'
  ];
  
  // Check if current path starts with any of the noNavbarRoutes
  const shouldShowNavbar = !noNavbarRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(`${route}/`)
  );

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default MainLayout;
