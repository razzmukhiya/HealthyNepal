import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/actions/product';
import { toast } from 'react-toastify';
import '../../styles/VendorAddProducts.css';

const AddProducts = () => {
  const { seller } = useSelector((state) => state.sellers);
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
      toast.success("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
      });
      setImages([]);
      document.querySelector('.image-preview').innerHTML = '';
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

  return (
    <div className="add-products-container">
      <h2 className="form-title">Create New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
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

        <div className="form-row">
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

        <button type="submit" className="submit-button">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
