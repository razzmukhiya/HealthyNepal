import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getAllProductsShop } from '../../redux/actions/product';
import Vendorsidebar from "./Vendorsidebar";
import Vendornavtop from './Vendornavtop';
import { toast } from 'react-toastify';

const AddProducts = () => {
  const { seller } = useSelector((state) => state.sellers);
  const { isLoading, error } = useSelector((state) => state.product);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Cleanup old URLs
    imageUrls.forEach(url => URL.revokeObjectURL(url));
    // Create new URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setImages(files);
    setImageUrls(urls);
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!seller?._id) {
      toast.error("Please login as a seller first!");
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.description || !formData.category || 
        !formData.discountPrice || !formData.stock || images.length === 0) {
      toast.error("Please fill all required fields and upload at least one image!");
      return;
    }

    const newForm = new FormData();

    // Append all form fields
    Object.keys(formData).forEach(key => {
      // Include empty strings for optional fields
      if (key === 'tags' || key === 'originalPrice') {
        newForm.append(key, formData[key]);
      } else if (formData[key]) { // Only append non-empty required fields
        newForm.append(key, formData[key]);
      }
    });

    // Add shop ID
    newForm.append("shopId", seller._id);

    // Append images
    images.forEach((image) => {
      newForm.append("images", image);
    });
    
    dispatch(createProduct(newForm))
      .then(() => {
        setSuccess(true);
        // Fetch updated products list
        if (seller?._id) {
          dispatch(getAllProductsShop(seller._id));
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to create product");
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      // Cleanup image URLs and form data
      imageUrls.forEach(url => URL.revokeObjectURL(url));
      setImages([]);
      setImageUrls([]);
      setFormData({
        name: "",
        description: "",
        category: "",
        tags: "",
        originalPrice: "",
        discountPrice: "",
        stock: "",
      });
      toast.success("Product created successfully!");
      navigate("/seller/products");
    }
  }, [dispatch, error, success, navigate]);


  return (
    <div className="flex">
      <div className="flex-1">
        <Vendorsidebar active={4} />
      </div>
      <div className="flex-4">
        <Vendornavtop />
        <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
          <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleInputChange}
                placeholder="Enter product name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                cols="30"
                required
                rows="8"
                type="text"
                name="description"
                value={formData.description}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleInputChange}
                placeholder="Enter product description..."
              ></textarea>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Choose a category</option>
                <option value="Medicine">Medicine</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Wellness">Wellness</option>
                <option value="Personal Care">Personal Care</option>
              </select>
            </div>
            <br />
            <div>
              <label className="pb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleInputChange}
                placeholder="Enter product tags..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleInputChange}
                placeholder="Enter product price..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Price (With Discount) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleInputChange}
                placeholder="Enter product price with discount..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleInputChange}
                placeholder="Enter product stock..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
                <input
                  type="file"
                  name="images"
                  id="upload"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <div className="w-[100px] h-[100px] bg-slate-200 border cursor-pointer">
                    <span className="text-[40px] flex items-center justify-center h-full">
                      +
                    </span>
                  </div>
                </label>
                {imageUrls.map((url, index) => (
                  <img
                    src={url}
                    key={index}
                    alt={`Preview ${index + 1}`}
                    className="h-[100px] w-[100px] object-cover m-2"
                  />
                ))}
              </div>
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Create"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer bg-[#3321c8] text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
