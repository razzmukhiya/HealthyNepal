import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../../redux/reducers/wishlistSlice';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import { toast } from 'react-toastify';
import "../../styles/WishlistStyles.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const wishlistItems = wishlist || [];

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
                  <img
                    src={getImageUrl(item.images)}
                    alt={item.name}
                    onError={(e) => {
                      console.log('Image load error:', e.target.src);
                      e.target.onerror = null;
                      handleImageError(e);
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="product-price">
                    <h5 className='product-discount-price'>
                      Rs. {item.discountPrice || item.price || 0}
                    </h5>
                    {item.price > item.discountPrice && (
                      <h4 className='price'>
                        Rs. {item.price}
                      </h4>
                    )}
                  </div>
                  <div className="item-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => {
                        dispatch(addToCart({
                          ...item,
                          qty: 1,
                          price: item.discountPrice || item.price || 0
                        }));
                        dispatch(removeFromWishlist(item));
                        toast.success('Item moved to cart!');
                      }}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => dispatch(removeFromWishlist(item))}
                    >
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
