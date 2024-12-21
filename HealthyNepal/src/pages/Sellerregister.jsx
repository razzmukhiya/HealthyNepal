import React, { useEffect } from 'react';
import SellerSignupForm from "../components/SellerDashboard/Sellersignup";
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SellerRegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.seller);

  useEffect(() => {
    // If seller is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/seller/dashboard');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <Navbar />
      <SellerSignupForm />
      
    </div>
  )
}

export default SellerRegisterPage;
