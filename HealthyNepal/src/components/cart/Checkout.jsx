import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createOrder } from '../../redux/actions/orderActions';
import "../../styles/checkout.css";
import axios from 'axios';
import { server } from "../../../server";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    paymentMethod: "COD",
  });

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Debugging: Log cart items
    console.log("Cart items before submission:", cartItems);

    const orderData = {
      cart: cartItems,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
      },
      paymentInfo: {
        method: formData.paymentMethod,
      },
    };

    console.log("Order data being sent:", orderData); // Debugging line to check order data

    try {
      const response = await axios.post(`${server}/orders/create-order`, orderData, { 
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      if (!response.data.success) {
        throw new Error('Order creation failed');
      }
      dispatch(createOrder(orderData)); 
      console.log("Order created successfully:", response);

      const data = response.data;
      if (data.success) {
        // Handle successful order creation (e.g., redirect or show a success message)
        navigate("/success"); // Redirect to a success page
      } else {
        // Handle error (e.g., show an error message)
      }

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <div className="steps">
          <button className={step === 1 ? "active button" : "button"}>Billing</button>
          <button className={step === 2 ? "active button" : "button"}>Shipping</button>
          <button className={step === 3 ? "active button" : "button"}>Payment</button>
        </div>
        {step === 1 && (
          <div className="billing">
            <h2>Billing</h2>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />

            <button className="button" onClick={() => {
                if (formData.firstName && formData.lastName && formData.address && formData.city && formData.state) {
                  nextStep();
                }
              }}>Next</button>
            <div className="error-message">
              {(!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state) && (
                <p>Please fill all fields.</p>
              )}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="shipping">
            <h2>Shipping</h2>
            <p>Choose shipping location</p>
            <div className="shipping-address">
              <h3>Shipping Address</h3>
              <p>{formData.firstName} {formData.lastName}</p>
              <p>{formData.address}</p>
              <p>{formData.city}, {formData.state}</p>
            </div>

            <button className="button" onClick={prevStep}>Previous</button>
            <button className="button" onClick={() => {
                if (formData.firstName && formData.lastName && formData.address && formData.city && formData.state) {
                  nextStep();
                }
              }}>Next</button>
            <div className="error-message">
              {(!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state) && (
                <p>Please fill all fields.</p>
              )}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="payment">
            <h2>Payment</h2>
            <label>
              <input
                type="radio"
                value="COD"
                checked={formData.paymentMethod === "COD"}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="Esewa"
                checked={formData.paymentMethod === "Esewa"}
              />
              Pay with Esewa
            </label>
            <button className="button" onClick={prevStep}>Previous</button>
            <button className="button" onClick={handleSubmit}>Finish</button>
          </div>
        )}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <h3>Total Price: Rs {cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2) : '0.00'}</h3>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>Rs {item.price !== undefined ? item.price.toFixed(2) : '0.00'}</span>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
