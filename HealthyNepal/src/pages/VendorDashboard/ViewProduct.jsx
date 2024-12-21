import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';
import "../../styles/ViewProduct.css";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${server}/product/get-product/${id}`);
        if (!response.data.success) {
          throw new Error('Failed to fetch product');
        }
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error(error.response?.data?.message || 'Error fetching product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="view-product">
      <div className="view-product-header">
        <h2 className="view-product-title">{product.name}</h2>
        <button 
          onClick={() => navigate(`/seller/products/edit/${id}`)}
          className="edit-btn"
        >
          Edit Product
        </button>
      </div>

      <div className="product-images">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Product ${index + 1}`}
            className="product-image"
          />
        ))}
      </div>

      <div className="product-details">
        <div className="detail-group">
          <label>Description</label>
          <p>{product.description}</p>
        </div>

        <div className="detail-row">
          <div className="detail-group">
            <label>Category</label>
            <p>{product.category}</p>
          </div>
          <div className="detail-group">
            <label>Brand</label>
            <p>{product.brand || 'N/A'}</p>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-group">
            <label>Original Price</label>
            <p>₹{product.originalPrice}</p>
          </div>
          <div className="detail-group">
            <label>Discount Price</label>
            <p>₹{product.discountPrice}</p>
          </div>
          <div className="detail-group">
            <label>Stock</label>
            <p>{product.stock}</p>
          </div>
        </div>

        {product.ratings > 0 && (
          <div className="detail-group">
            <label>Rating</label>
            <p>{product.ratings.toFixed(1)} / 5</p>
          </div>
        )}

        {product.reviews?.length > 0 && (
          <div className="detail-group">
            <label>Reviews ({product.reviews.length})</label>
            <div className="reviews-list">
              {product.reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">{review.user.name}</span>
                    <span className="review-rating">{review.rating} / 5</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
