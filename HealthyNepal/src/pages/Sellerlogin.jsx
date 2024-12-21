import React from 'react';
import Sellersignin from "../components/SellerDashboard/Sellersignin";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sellerlogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, seller, isLoading } = useSelector((state) => state.seller);

  React.useEffect(() => {
    // Only redirect if we're authenticated and not in a loading state
    if (isAuthenticated && seller && !isLoading) {
      const returnUrl = location.state?.from?.pathname || '/seller/dashboard';
      navigate(returnUrl);
    }
  }, [isAuthenticated, seller, isLoading, navigate, location]);

  // Don't show loading state here, let Sellersignin handle its own loading state
  return (
    <div>
      <Navbar />
      <Sellersignin />
    </div>
  );
};

export default Sellerlogin;
