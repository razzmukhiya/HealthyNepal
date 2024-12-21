import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
const response = await fetch(`/api/v2/get-product/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error loading product details');
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product.stock) {
      toast.error('Product is out of stock!');
      return;
    }
    
    const cartData = { ...product, qty: 1 };
    dispatch({ type: 'ADD_TO_CART', payload: cartData });
    toast.success('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist!');
    } else {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product._id });
      toast.success('Removed from wishlist!');
    }
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        <div className="product-images">
          <div className="main-image">
            <img 
              src={Array.isArray(product.images) 
                ? product.images[selectedImage].url.startsWith('http')
                  ? product.images[selectedImage].url
                  : `/uploads/${product.images[selectedImage].url}`
                : product.images?.url || "https://via.placeholder.com/400x400?text=Product+Image"
              } 
              alt={product.name}
            />
          </div>
          <div className="image-list">
            {Array.isArray(product.images) && product.images.map((image, index) => (
              <div 
                key={index}
                className={`image-item ${selectedImage === index ? 'selected' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image.url.startsWith('http') ? image.url : `/uploads/${image.url}`}
                  alt={`${product.name} - ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="product-details-right">
        <h1 className="product-name">{product.name}</h1>
        
        <div className="product-rating">
          <Rating rating={product.ratings || 0} />
          <span>({product.reviews?.length || 0} Reviews)</span>
        </div>

        <div className="product-price">
          <h2 className="discount-price">${product.discountPrice}</h2>
          {product.originalPrice > product.discountPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        <div className="product-description">
          <h3>Description:</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-stock">
          <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          {product.stock > 0 && <span className="stock-count">({product.stock} items left)</span>}
        </div>

        <div className="product-actions">
          <button 
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.stock}
          >
            <AiOutlineShoppingCart /> Add to Cart
          </button>

          <button 
            className="buy-now"
            onClick={handleBuyNow}
            disabled={!product.stock}
          >
            Buy Now
          </button>

          <button 
            className={`wishlist ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={toggleWishlist}
          >
            {isWishlisted ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        {product.shop && (
          <div className="shop-info">
            <h3>Sold By:</h3>
            <div className="shop-details">
              <h4>{product.shop.name}</h4>
              <p>{product.shop.address}</p>
            </div>
          </div>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <div className="product-reviews">
            <h3>Customer Reviews</h3>
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user?.name || 'Anonymous'}</span>
                    <Rating rating={review.rating} />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
