import React, { useEffect } from 'react';
import SellerSignup from "../components/SellerDashboard/Sellersignup";
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const sellerSignup = () => {
  const navigate = useNavigate();
  const { isSeller,seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/sellerdashboard/${seller._id}`);
    }
  }, [])
  return (
    <div>
      <Navbar />
      <SellerSignup />
      
    </div>
  )
}

export default sellerSignup;
