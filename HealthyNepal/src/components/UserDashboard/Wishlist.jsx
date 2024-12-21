import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../../styles/WishlistStyles.css";

const Wishlist = () => {
  // This would typically come from Redux state
  const [wishlistItems] = React.useState([]);

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
      </div>

      <div className="wishlist-content">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <Link to="/products" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item._id} className="wishlist-item">
                <div className="item-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">Rs. {item.price}</p>
                  <div className="item-actions">
                    <button className="add-to-cart-btn">
                      Add to Cart
                    </button>
                    <button className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
