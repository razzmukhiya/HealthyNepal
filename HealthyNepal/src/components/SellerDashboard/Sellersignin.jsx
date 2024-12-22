import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/sellers';
import { toast } from 'react-toastify';
import "../../styles/Sellersign.css";

const Sellersignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await dispatch(login(email, password));
      if (result.success) {
        toast.success("Login successful!");
        navigate('/seller/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="shop-login-container">
      <div className="shop-login-header">
        <h2>Login to Your Shop</h2>
      </div>
      <div className="shop-login-form-container">
        <form className='shop-login-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input 
              type="email" 
              id="email"
              name='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-input'
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <div className="password-input-container">
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                id="password"
                name='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-input'
                placeholder="Enter your password"
              />
              <button 
                type="button"
                className='password-toggle-button'
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <AiOutlineEye className='password-toggle-icon' size={25} />
                ) : (
                  <AiOutlineEyeInvisible className='password-toggle-icon' size={25} />
                )}
              </button>
            </div>
          </div>
          <div className="form-option">
            <div className="remember-me">
              <input 
                type="checkbox" 
                name='remember-me'
                id='remember-me'
                className='checkbox'
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="forget-password">
              <Link to="#" className='forget-password-link'>
                Forgot Your Password?
              </Link>
            </div>
          </div>
          <button type='submit' className='submit-button'>
            Login
          </button>
          <div className="signup-prompt">
            <h4>Don't have an account?</h4>
            <Link to="/seller-register" className='signup-link'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sellersignin;
