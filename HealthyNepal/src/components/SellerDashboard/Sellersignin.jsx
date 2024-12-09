import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../server";
import { toast } from 'react-toastify';
import "../../styles/Sellersign.css";

const Sellersignin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${server}/shop/login-shop`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login Success!");
      navigate("/sellerdashboard"); // Redirect to seller dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
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
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="forget-password">
              <Link to="#" className='forget-password-link'>
                Forget Your Password ?
              </Link>
            </div>
          </div>
          <button type='submit' className='submit-button'>Submit</button>
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
