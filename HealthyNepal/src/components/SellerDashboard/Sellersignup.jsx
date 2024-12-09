import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';
// import { toast } from 'react-toastify';
import { HiOutlineDocumentAdd } from "react-icons/hi";
import "../../styles/Sellersignup.css";

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    document: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // useEffect(() => {
    
  // }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((preData) => {
      const updatedData = { ...preData, [name]: value };
      return updatedData;
    });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData((preData) => ({ ...preData, document: reader.result }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/shop/create-shop`, formData);
      toast.success(response.data.message);
      setFormData({
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        document: "",
        password: "",
      });
      setSuccessMessage(true);
      navigate('/sellerlogin');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="shop-create-container">
      <div className="header">
        <h2>Register as a seller</h2>
      </div>
      <div className="form-container">
        <form className="shop-create-form" onSubmit={handleSubmit}>
          {[{ label: 'Name', name: "name", type: "text" },
            { label: 'Phone Number', name: "phoneNumber", type: "tel", required: true },
            { label: 'Email', name: "email", type: "email" },
            { label: 'Address', name: "address", type: "text", required: true },
            { label: "Zip Code", name: "zipCode", type: "number", required: true },
          ].map(({ label, name, type, required }) => (
            <div key={name} className="form-group">
              <label htmlFor={name} className='form-label'>{label}</label>
              <input
                type={type}
                required={required}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className='form-input'
              />
            </div>
          ))}
          <div className="form-group">
            <label htmlFor="password" className='form-label'>Password</label>
            <div className="password-container">
              <input
                type={visible ? "text" : "password"}
                name='password'
                required
                value={formData.password}
                onChange={handleChange}
                className='form-input'
              />
              {visible ? (
                <AiOutlineEye className='eye-icon' onClick={() => setVisible(false)} />
              ) : (
                <AiOutlineEyeInvisible className='eye-icon' onClick={() => setVisible(true)} />
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="document" className='form-label'>Document</label>
            <div className="document-container">
              <span className="document-preview">
                {formData.document ? (
                  <img src={formData.document} alt="document" className='document-image' />
                ) : (
                  <HiOutlineDocumentAdd className='document-icon' />
                )}
              </span>
              <label htmlFor="file-input" className='upload-button'>
                Upload a file
                <input
                  type="file"
                  name='document'
                  id='file-input'
                  onChange={handleFileInputChange}
                  className='file-input'
                />
              </label>
            </div>
          </div>
          <button type="submit" className='sign-in-link'>Signup</button>
          <div className="footer">
            <h4>Already have an account?</h4>
            <Link to="/sellerlogin">Sign In</Link>
          </div>
        </form>
        {successMessage && (
          <div className="success-message">
            <p>Successfully registered as a seller!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerSignup;
