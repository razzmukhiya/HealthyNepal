import React, { useState } from 'react';
import "../styles/Billing.css";

function Billing({ onNext }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleSameAsBillingChange = (event) => {
    setSameAsBilling(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit billing information here
    console.log('Billing Information:', {
      firstName,
      lastName,
      deliveryAddress,
      city,
      state,
      sameAsBilling,
    });
  };

  return (
    <div className="billing-form">
      <h1>Billing</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="deliveryAddress">Delivery Address:</label>
          <input
            type="text"
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={handleDeliveryAddressChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={handleStateChange}
          />
        </div>
        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={handleSameAsBillingChange}
            />
            Same as Billing Address
          </label>
        </div>
        <button type="button" onClick={() => {/* Handle Previous */}}>Previous</button>
        <button type="button" onClick={onNext}>Next</button>
      </form>
    </div>
  );
}

export default Billing;

