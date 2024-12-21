import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../styles/ProductDetailsCard.css';

const ProductDetailsCard = ({ setOpen, data }) => {
  return (
    <div className="product-details-card">
      <div className="product-details-overlay" onClick={() => setOpen(false)} />
      <div className="product-details-content">
        <div className="product-details-header">
          <h2>Product Quick View</h2>
          <AiOutlineClose
            size={22}
            className="close-icon"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="product-details-body">
          <div className="product-details-image">
            <img
              src={data?.images?.[0]?.url || "https://via.placeholder.com/400x400?text=Product+Image"}
              alt={data?.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x400?text=Product+Image";
              }}
            />
          </div>

          <div className="product-details-info">
            <Link to={`/product/${data?._id}`}>
              <h3 className="product-details-name">{data?.name}</h3>
            </Link>

            <div className="product-details-rating">
              <Rating rating={data?.ratings || 0} />
              <span>({data?.reviews?.length || 0} reviews)</span>
            </div>

            <div className="product-details-price">
              <div className="price-info">
                <h4 className="discount-price">
                  Rs. {data?.discountPrice || data?.originalPrice || 0}
                </h4>
                {data?.originalPrice > data?.discountPrice && (
                  <h5 className="original-price">
                    Rs. {data?.originalPrice}
                  </h5>
                )}
              </div>
              <span className="stock-info">
                {data?.stock > 0 ? `${data.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="product-details-description">
              <p>{data?.description}</p>
            </div>

            {data?.shop && (
              <Link to={`/shop/preview/${data.shop._id}`} className="shop-details">
                <div className="shop-info">
                  <h4>Sold by: {data.shop.name}</h4>
                  {data.shop.ratings && (
                    <div className="shop-rating">
                      <Rating rating={data.shop.ratings} />
                      <span>({data.shop.ratings.toFixed(1)})</span>
                    </div>
                  )}
                </div>
              </Link>
            )}

            <Link to={`/product/${data?._id}`} className="view-full-details">
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
