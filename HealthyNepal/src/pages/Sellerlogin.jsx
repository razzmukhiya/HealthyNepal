import React from 'react';
import Sellersignin from "../components/SellerDashboard/Sellersignin";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Sellerlogin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, seller } = useSelector((state) => state.sellers);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated && seller) {
    navigate('/seller/dashboard', { replace: true });
    return null; // Prevent rendering the login form
  }
  
  React.useEffect(() => {
    if (isAuthenticated && seller) {
      toast.success("Login successful!");
      navigate('/seller/dashboard', { replace: true });
    }
  }, [isAuthenticated, seller, navigate]);

  return (
    <div>
      <Navbar />
      <Sellersignin />
    </div>
  );
};

export default Sellerlogin;
