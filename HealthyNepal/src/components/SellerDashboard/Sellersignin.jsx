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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(login(email, password));
      toast.success("Login successful!");
      navigate("/seller/dashboard");
    } catch (error) {
      console.error('Login error:', error.response || error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Login failed. Please try again.";
      
      dispatch({
        type: 'LoadSellerFail',
        payload: errorMessage
      });
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shop-login-container">
      <div className="shop-login-header">
        <h2>login to Your shop</h2>
      </div>
      <div className="shop-login-form-container">
        <form className='shop-login-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input 
              type="email" 
              name='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-input'
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <div className="password-input-container">
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                name='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='form-input'
                disabled={isLoading}
              />
              {isPasswordVisible ? (
                <AiOutlineEye
                  className='password-toggle-icon'
                  size={25}
                  onClick={() => setIsPasswordVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className='password-toggle-icon'
                  size={25}
                  onClick={() => setIsPasswordVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="form-option">
            <div className="remember-me">
              <input 
                type="checkbox" 
                name='remember-me'
                id='remember-me'
                className='checkbox'
                disabled={isLoading}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="forget-password">
              <Link to="#" className='forget-password-link'>
                Forget Your Password ?
              </Link>
            </div>
          </div>
          <button 
            type='submit' 
            className='submit-button'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Submit'}
          </button>
          <div className="signup-prompt">
            <h4>Don't have an account ?</h4>
            <Link to="/sellersignup" className='signup-link'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sellersignin;
