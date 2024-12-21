import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getAllProductsShop } from '../../redux/actions/product';
import { toast } from 'react-toastify';
import { FiSearch, FiBell, FiMail, FiUser } from 'react-icons/fi';
import '../../styles/VendorAddProducts.css';
import '../../styles/Vendornavtop.css';

const AddProducts = () => {
  const { seller, isAuthenticated } = useSelector((state) => state.seller);
  const { success, error, isLoading, products } = useSelector((state) => state.products || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sellerlogin');
      toast.error("Please login to access this page");
    } else if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [isAuthenticated, navigate, seller?._id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!seller?._id) {
      toast.error("Please login as a seller first!");
      return;
    }

    if (images.length === 0) {
      toast.error("Please select at least one image!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('shopId', seller._id);
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      await dispatch(createProduct(formDataToSend));
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error(err.response?.data?.message || "Error creating product");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    const previewDiv = document.querySelector('.image-preview');
    if (previewDiv) {
      previewDiv.innerHTML = previewUrls.map(url => 
        `<img src="${url}" alt="preview" class="preview-image" />`
      ).join('');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="vendor-dashboard">
      <div className="navtop">
        <div className="navtop__left"></div>
        <div className="search-wrapper">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="navtop__right">
          <div className="notification-icons">
            <button className="icon-btn" title="Notifications">
              <FiBell size={20} />
              <span className="badge">2</span>
            </button>
            <button className="icon-btn" title="Messages">
              <FiMail size={20} />
              <span className="badge">3</span>
            </button>
          </div>
          <div className="profile">
            <div className="profile__info">
              <span className="profile__name">{seller?.name || 'Seller'}</span>
              <span className="profile__role">Seller</span>
            </div>
            <div className="profile__avatar">
              <FiUser size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="form-container">
          <h2 className="form-title">Create New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name <span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Description <span className="required">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="form-group">
              <label>Category <span className="required">*</span></label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Medicine">Medicine</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Wellness">Wellness</option>
                <option value="Personal Care">Personal Care</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Enter product tags (comma separated)"
              />
            </div>

            <div className="form-group">
              <label>Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="Enter original price"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Discounted Price <span className="required">*</span></label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                placeholder="Enter discounted price"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Stock <span className="required">*</span></label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter product stock"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Product Images <span className="required">*</span></label>
              <input
                type="file"
                onChange={handleImageChange}
                multiple
                accept="image/*"
                required={images.length === 0}
              />
              <div className="image-preview"></div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>

        {products && products.length > 0 && (
          <div className="products-list">
            <h3>Your Products</h3>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-item">
                  <img 
                    src={`${product.images[0]?.url}`}
                    alt={product.name} 
                    className="product-image"
                  />
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="price">
                      Price: ${product.discountPrice}
                      {product.originalPrice > product.discountPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </p>
                    <p className="stock">Stock: {product.stock}</p>
                    <p className="category">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProducts;
