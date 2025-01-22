import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { server } from '../../utils/api';
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { FaFilePdf } from "react-icons/fa";
import "../../styles/Sellersignup.css";

const SellerSignup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    document: null,
    documentPreview: null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image (JPEG, PNG) or PDF file');
        return;
      }

     
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      
      setFormData(prev => ({ 
        ...prev, 
        document: file,
        documentPreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      
      
      Object.keys(formData).forEach(key => {
        if (key !== 'document' && key !== 'documentPreview') {
          form.append(key, formData[key]);
        }
      });
      
      
      if (formData.document instanceof File) {
        form.append('document', formData.document);
      }

      const response = await axios.post(`${server}/shop/create-shop`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log("Response from server:", response);
     

      if (response.data.success && response.data.token) {
        // Store token in localStorage
        localStorage.setItem('sellerAccessToken', response.data.token);
        
        // Dispatch registration success
        dispatch({
          type: 'SellerRegisterSuccess',
          payload: { user: response.data.user }
        });
        
        toast.success('Registration successful!');
        setFormData({
          email: "",
          name: "",
          phoneNumber: "",
          address: "",
          zipCode: "",
          document: null,
          documentPreview: null,
          password: "",
        });
        setSuccessMessage(true);
        
        // Navigate directly to dashboard since we have the token
        setTimeout(() => {
          navigate('/seller-login');
        }, 10000); // Delay navigation for 3 seconds
      } else {
        throw new Error('Registration failed: Invalid response from server');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="shop-create-container">
      <div className="header">
        <h2>Register as a seller</h2>
      </div>
      <div className="form-container">
        <form className="shop-create-form" onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: "name", type: "text", required: true },
            { label: 'Phone Number', name: "phoneNumber", type: "tel", required: true },
            { label: 'Email', name: "email", type: "email", required: true },
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
                autoComplete="new-password"
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
                  formData.document.type.startsWith('image/') ? (
                    <img 
                      src={formData.documentPreview} 
                      alt="document preview" 
                      className='document-image'
                    />
                  ) : (
                    <FaFilePdf className='document-icon' />
                  )
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
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileInputChange}
                  className='file-input'
                  required
                />
              </label>
            </div>
          </div>
          <button type="submit" className='sign-in-link'>Signup</button>
          <div className="footer">
            <h4>Already have an account?</h4>
            <Link to="/seller-login">Sign In</Link>
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
