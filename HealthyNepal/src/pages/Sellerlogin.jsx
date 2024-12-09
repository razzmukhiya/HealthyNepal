import React, { useEffect } from 'react';
import Sellersignin from "../components/SellerDashboard/Sellersignin";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sellerlogin = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading, user } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/sellerdashboard`);
    }
  }, [isLoading, isSeller])

  return (
    <div>
      <Navbar />
      <Sellersignin />
      
      {isSeller && (
        <div className="seller-info">
          <p>Welcome, {user?.name}</p>
        </div>
      )}
    </div>
  )
}

export default Sellerlogin
