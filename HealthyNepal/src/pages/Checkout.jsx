import React, { useState } from 'react';
import '../styles/Checkout.css';

const Checkout = () => {
    const [currentSection, setCurrentSection] = useState('billing');

    const handleNext = () => {
        if (currentSection === 'billing') {
            setCurrentSection('shipping');
        } else if (currentSection === 'shipping') {
            setCurrentSection('payment');
        }
    };

    const handlePreview = () => {
        if (currentSection === 'shipping') {
            setCurrentSection('billing');
        } else if (currentSection === 'payment') {
            setCurrentSection('shipping');
        }
    };

    return (
        <div className="checkout-container">
            {currentSection === 'billing' && (
                <div className="billing-section">
                    <h2>Billing Information</h2>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="text" placeholder="Address" required />
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="Zip Code" required />
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handlePreview}>Preview</button>
                </div>
            )}

            {currentSection === 'shipping' && (
                <div className="shipping-section">
                    <h2>Shipping Information</h2>
                    <input type="text" placeholder="Full Name" required />
                    <input type="text" placeholder="Address" required />
                    <input type="text" placeholder="City" required />
                    <input type="text" placeholder="Zip Code" required />
                    <button onClick={handleNext}>Next</button>
                    <button onClick={handlePreview}>Preview</button>
                </div>
            )}

            {currentSection === 'payment' && (
                <div className="payment-section">
                    <h2>Payment Information</h2>
                    <input type="text" placeholder="Card Number" required />
                    <input type="text" placeholder="Expiry Date" required />
                    <input type="text" placeholder="CVV" required />
                    <button onClick={handlePreview}>Preview</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
