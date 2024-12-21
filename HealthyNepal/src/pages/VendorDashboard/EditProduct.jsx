import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';
import Vendorsidebar from "../../components/SellerDashboard/Vendorsidebar";
import Vendornavtop from '../../components/SellerDashboard/Vendornavtop';
import "../../styles/EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    originalPrice: '',
    discountPrice: '',
    stock: '',
    images: []
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${server}/product/get-product/${id}`);
        const product = response.data.product;
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          brand: product.brand || '',
          originalPrice: product.originalPrice,
          discountPrice: product.discountPrice,
          stock: product.stock,
          images: product.images
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error fetching product details');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Store object URLs for File objects
  const [imageUrls, setImageUrls] = useState({});

  // Create and store URLs for new File objects
  useEffect(() => {
    const newUrls = {};
    formData.images.forEach((image, index) => {
      if (image instanceof File && !imageUrls[index]) {
        newUrls[index] = URL.createObjectURL(image);
      }
    });
    if (Object.keys(newUrls).length > 0) {
      setImageUrls(prev => ({ ...prev, ...newUrls }));
    }
  }, [formData.images]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    // If there was an object URL for this image, revoke it
    if (imageUrls[index]) {
      URL.revokeObjectURL(imageUrls[index]);
      setImageUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[index];
        return newUrls;
      });
    }
  };

  const getImageSrc = (image, index) => {
    if (image.url) return image.url;
    return imageUrls[index] || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Create FormData object
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('category', formData.category);
      productData.append('brand', formData.brand);
      productData.append('originalPrice', formData.originalPrice);
      productData.append('discountPrice', formData.discountPrice);
      productData.append('stock', formData.stock);

      // Handle both existing and new images
      const existingImages = formData.images
        .filter(image => !(image instanceof File))
        .map(image => image.url);
      
      productData.append('existingImages', JSON.stringify(existingImages));

      // Append new images
      formData.images
        .filter(image => image instanceof File)
        .forEach(image => {
          productData.append('images', image);
        });

      const response = await axios.put(
        `${server}/product/update-product/${id}`,
        productData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      toast.success('Product updated successfully');
      navigate('/seller/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Error updating product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="vendor-container">
      <Vendorsidebar active={3} />
      <div className="vendor-content">
        <div className="vendor-header">
          <Vendornavtop />
        </div>
        <div className="vendor-body">
          <div className="edit-product">
            <h2 className="edit-product-title">Edit Product</h2>
            
            <form onSubmit={handleSubmit} className="edit-product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="originalPrice">Original Price</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="discountPrice">Discount Price</label>
                  <input
                    type="number"
                    id="discountPrice"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="images">Product Images</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div className="image-preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img
                        src={getImageSrc(image, index)}
                        alt={`Preview ${index + 1}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="remove-image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/seller/products')} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
