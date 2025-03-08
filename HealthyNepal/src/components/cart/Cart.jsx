import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, addToCart } from '../../redux/reducers/cartSlice'; 
import '../../styles/cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items); 

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems'));
        if (savedCart) {
            savedCart.forEach(item => {
                dispatch(addToCart(item));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity({ _id: id }));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity({ _id: id }));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart({ _id: id }));
    };

    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.discountPrice || item.originalPrice;
        return total + price * item.quantity;
    }, 0);

    console.log('Cart Items:', cartItems);
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item._id} className="cart-item">
                            <img src={item.images[0].url} alt={item.name} className="cart-item-image" />
                            <span>{item.name}</span>
                            <span>Quantity: {item.quantity}</span>
                            <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                            <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                            <button onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Total Price: Rs. {totalPrice}</h3>
<button className="checkout-button" onClick={() => navigate('/checkout')}>Checkout</button>

        </div>
    );
};

export default Cart;
