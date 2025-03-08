import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import { getImageUrl, handleImageError } from '../utils/imageUtils';
import api from '../utils/api';
import '../styles/ProductDetails.css';


// Simple cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product with caching
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cachedData = cache.get(id);
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        setProduct(cachedData.data);
        setLoading(false);
        return;
      }

      const response = await api.get(`/product/get-product/${id}`);
      if (response.data?.success) {
        // Update cache
        cache.set(id, {
          data: response.data.product,
          timestamp: Date.now()
        });
        setProduct(response.data.product);
      } else {
        throw new Error(response.data?.message || 'Error loading product details');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.message || 'Error loading product details');
      toast.error(error.message || 'Error loading product details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

    const handleAddToCart = useCallback(() => {
      if (!product.stock) {
        toast.error('Product is out of stock!');
        return;
      }
      
      const cartData = { 
        ...product, 
        qty: 1,
        image: Array.isArray(product.images) ? product.images[0]?.url : product.images?.url
      };
      dispatch({ type: 'addToCart', payload: cartData });
      toast.success('Added to cart successfully!');
    }, [product, dispatch]);


  const handleBuyNow = useCallback(() => {
    
    navigate('/checkout');
  }, [ navigate]);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
    if (!isWishlisted) {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast.success('Added to wishlist!');
    } else {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product._id });
      toast.success('Removed from wishlist!');
    }
  }, [isWishlisted, product, dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Product</h2>
        <p>{error}</p>
        <button onClick={fetchProduct} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/products')} className="back-button">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-left">
        <div className="product-images">
          <div className="main-image">
            <img 
              src={getImageUrl(product.images, selectedImage)}

              alt={product.name}
              loading="lazy"
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
                  src={getImageUrl([image])}

                  alt={`${product.name} - ${index + 1}`}
                  loading="lazy"
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
          {product.originalPrice > product.discountPrice && (
            <span className="discount-percentage">
              {Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)}% OFF
            </span>
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

export default React.memo(ProductDetails);