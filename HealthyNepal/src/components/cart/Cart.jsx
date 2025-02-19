import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../styles/cart.css";


const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleDelete = (item) => {

        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to remove this item?',
            buttons: [
                {
                    label: 'Yes',
            onClick: () => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })

                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleQuantityChange = (item, newQuantity) => {

        if (newQuantity > 0) {
            dispatch({ 
            type: 'UPDATE_CART_QUANTITY',
            payload: { id: item._id, qty: newQuantity }

            });
        }
    };


    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);


    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <div className="cart-grid">
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    <div className="cart-item-image">
                                        <img 
                                            src={item.image ? `/uploads/${item.image}` : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2Ij5Qcm9kdWN0PC90ZXh0Pjwvc3ZnPg=='} 
                                            alt={item.name} 
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2Ij5Qcm9kdWN0PC90ZXh0Pjwvc3ZnPg=='
                                            }}


                                        />


                                    </div>

                                    <div className="cart-item-details">
                                        <h2>{item.name}</h2>
                                        <p>Price: ${item.price}</p>
                                        <div className="quantity-control">
                                            <button 
                                                onClick={() => handleQuantityChange(item, item.qty - 1)}

                                                aria-label="Decrease quantity"
                                            >
                                                <AiOutlineMinus />
                                            </button>
                                        <span>{item.qty}</span>

                                            <button 
                                                onClick={() => handleQuantityChange(item, item.qty + 1)}

                                                aria-label="Increase quantity"
                                            >
                                                <AiOutlinePlus />
                                            </button>
                                        </div>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(item)}

                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    )}
                </div>
                <div className="cart-summary">
                    <h2>Summary</h2>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    <button 
                        className="checkout-button"
                        onClick={() => window.location.href = '/checkout'}
                        disabled={cartItems.length === 0}
                    >
                        {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Cart;
