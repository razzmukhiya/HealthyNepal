import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSeller } from '../../redux/actions/user';
import Sidebar from '../../components/SellerDashboard/Vendorsidebar';
import NavTop from '../../components/SellerDashboard/Vendornavtop';
import "../../styles/Vendorsidebar.css";
import "../../styles/Vendornavtop.css";

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { seller, loading, error } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(loadSeller());
  }, [dispatch]);

  return (
    <div>
      <NavTop />
      <div className="components">
        <Sidebar />
      </div>
      <div className="basic-info">
        <h2>Seller Profile</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {seller && (
          <div>
            <p>Name: {seller.name}</p>
            <p>Email: {seller.email}</p>
            <p>Phone: {seller.phone}</p>
            <p>Shop Name: {seller.shop.name}</p>
            <p>Shop Address: {seller.shop.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfile;
