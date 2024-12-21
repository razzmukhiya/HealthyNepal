import React, { useState } from 'react';
import "../../styles/AddressStyles.css";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal',
    isDefault: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nepal',
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="address-container">
      <div className="address-header">
        <h2>My Addresses</h2>
        <button 
          className="add-address-btn"
          onClick={() => setShowAddForm(true)}
        >
          Add New Address
        </button>
      </div>

      {showAddForm && (
        <div className="address-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={newAddress.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={handleChange}
                />
                Set as default address
              </label>
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-btn">Save Address</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="addresses-list">
        {addresses.length === 0 ? (
          <p className="no-address">No addresses added yet.</p>
        ) : (
          addresses.map(address => (
            <div key={address.id} className="address-card">
              <div className="address-details">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                {address.isDefault && <span className="default-badge">Default</span>}
              </div>
              <div className="address-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Address;
