import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/actions/product';
import Vendorsidebar from '../../components/SellerDashboard/Vendorsidebar';
import Vendornavtop from '../../components/SellerDashboard/Vendornavtop';
import '../../styles/VendorViewProduct.css';

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <div className="vendor-container">
      <Vendorsidebar active={3} />
      <div className="vendor-content">
        <div className="vendor-header">
          <Vendornavtop />
        </div>
        <div className="vendor-body">
          {product ? (
            <div className="product-details">
              <h2 className="product-title">{product.name}</h2>
              
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url || `/uploads/${image.public_id}`}
                    alt={`Product ${index + 1}`}
                    className="product-image"
                  />
                ))}
              </div>

              <div className="product-info">
                <div className="info-row">
                  <span className="info-label">Category:</span>
                  <span className="info-value">{product.category}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Price:</span>
                  <span className="info-value">
                    ₹{product.discountPrice || product.originalPrice}
                    {product.discountPrice && (
                      <span className="original-price">₹{product.originalPrice}</span>
                    )}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Stock:</span>
                  <span className="info-value">{product.stock}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Description:</span>
                  <p className="info-value description">{product.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
