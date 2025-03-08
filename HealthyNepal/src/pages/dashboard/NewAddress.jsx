import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAddress } from '../../redux/reducers/addressSlice';
import '../../styles/dashboard.css';

const NewAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nepal',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      ...formData,
      id: Date.now().toString()
    };
    dispatch(addAddress(newAddress));
    navigate('/dashboard/address');
  };

  return (
    <div className="dashboard-container">
      <h2>Add New Address</h2>
      
      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Street Address</label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({...formData, street: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              value={formData.zip}
              onChange={(e) => setFormData({...formData, zip: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              value={formData.country}
              readOnly
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard/address')}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAddress;
