import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/sign-up', '/seller-login', '/seller-register'];
  
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default MainLayout;
