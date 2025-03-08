import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadAddresses, removeAddress } from '../../redux/reducers/addressSlice';
import '../../styles/addressStyles.css';

const Address = () => {
  const { addresses } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadAddresses());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="address-header">
        <h2>Saved Addresses</h2>
        <button 
          className="add-address-btn"
          onClick={() => navigate('/dashboard/address/new')}
        >
          + Add New Address
        </button>
      </div>
      
      <div className="address-list">
        {addresses.length === 0 ? (
          <div className="empty-state">
            <p>You haven't saved any addresses yet.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="address-card">
              <div className="address-details">
                <h3>{address.name}</h3>
                <p className="address-line">{address.street}</p>
                <p className="address-line">{address.city}, {address.state} {address.zip}</p>
                <p className="address-line">{address.country}</p>
                <p className="phone">Phone: {address.phone}</p>
              </div>
              
              <div className="address-actions">
                <button 
                  className="edit-btn"
                  onClick={() => navigate(`/dashboard/address/edit/${address.id}`)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this address?')) {
                      dispatch(removeAddress(address.id));
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Address;
