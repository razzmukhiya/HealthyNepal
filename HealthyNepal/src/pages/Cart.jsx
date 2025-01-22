import React from 'react';

const Cart = ({ cartItems }) => {
    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <h2>{item.name}</h2>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;