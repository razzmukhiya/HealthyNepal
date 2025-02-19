import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';
import Vendorsidebar from "../../components/SellerDashboard/Vendorsidebar";
import Vendornavtop from "../../components/SellerDashboard/Vendornavtop";
import { BsTrash } from "react-icons/bs";
import "../../styles/DeleteProduct.css";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${server}/product/get-product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error fetching product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${server}/product/delete-product/${id}`, {
        withCredentials: true
      });
      
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || "Failed to delete product");
      }

      toast.success('Product deleted successfully');
      navigate('/seller/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="vendor-container">
      <Vendorsidebar active={3} />
      <div className="vendor-content">
        <div className="vendor-header">
          <Vendornavtop />
        </div>
        <div className="vendor-body">
          <div className="delete-product">
            <div className="delete-product-header">
              <h2>Delete Product</h2>
              <BsTrash size={24} className="delete-icon" />
            </div>

            <div className="delete-product-content">
              <div className="product-info">
                <img 
                  src={product.images[0]?.url || `/uploads/${product.images[0]?.public_id}` || "/src/assets/default-product.png"}

                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/src/assets/default-product.png";

                  }}
                />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">₹{product.discountPrice}</p>
                </div>
              </div>

              <div className="confirmation-message">
                <p>Are you sure you want to delete this product?</p>
                <p className="warning">This action cannot be undone.</p>
              </div>

              <div className="action-buttons">
                <button 
                  className="cancel-btn"
                  onClick={() => navigate('/seller/products')}
                >
                  Cancel
                </button>
                <button 
                  className="delete-btn"
                  onClick={handleDelete}
                >
                  <BsTrash size={18} />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
