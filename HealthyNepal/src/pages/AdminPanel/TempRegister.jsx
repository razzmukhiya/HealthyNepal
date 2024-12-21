import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin, clearError, clearSuccess } from '../../redux/reducers/registerSlice';
import '../../styles/tempregister.css';

const TempRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    address: '',
    contact: '',
    license: null,
    registration: null
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
        navigate('/admin/login');
      }, 2000);
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    // Check password strength
    setPasswordStrength({
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      number: /[0-9]/.test(formData.password)
    });
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (formData.password !== formData.confirmPassword) {
      dispatch({ type: 'register/setError', payload: 'Passwords do not match' });
      return;
    }

    const isPasswordValid = Object.values(passwordStrength).every(Boolean);
    if (!isPasswordValid) {
      dispatch({ type: 'register/setError', payload: 'Password does not meet requirements' });
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    dispatch(registerAdmin(formDataToSend));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Temporary Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                disabled={loading}
              />
              <div className="password-requirements">
                Password must contain:
                <ul>
                  <li className={passwordStrength.length ? 'valid' : 'invalid'}>
                    At least 8 characters
                  </li>
                  <li className={passwordStrength.uppercase ? 'valid' : 'invalid'}>
                    One uppercase letter
                  </li>
                  <li className={passwordStrength.number ? 'valid' : 'invalid'}>
                    One number
                  </li>
                </ul>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
                placeholder="Enter shop name"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter shop address"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="file-upload">
              <label htmlFor="license">Business License</label>
              <div className="file-input-wrapper">
                <div className="file-input-button">
                  {formData.license ? formData.license.name : 'Choose License File'}
                </div>
                <input
                  type="file"
                  id="license"
                  name="license"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="file-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="file-upload">
              <label htmlFor="registration">Registration Certificate</label>
              <div className="file-input-wrapper">
                <div className="file-input-button">
                  {formData.registration ? formData.registration.name : 'Choose Registration File'}
                </div>
                <input
                  type="file"
                  id="registration"
                  name="registration"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="file-input"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{message}</div>}
          
          <button 
            type="submit" 
            className={`signup-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/admin/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default TempRegister;
