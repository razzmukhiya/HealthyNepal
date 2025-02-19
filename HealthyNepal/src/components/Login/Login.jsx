import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/login.css";
import { apiMethods, endpoints } from "../../utils/api";
import { loadUser } from "../../redux/actions/user";
import { login, loadUserRequest, loadUserSuccess, loadUserFail } from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the redirect path from location state, or default to home
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      dispatch(loadUserRequest());
      
      const { data, error } = await apiMethods.post(
        endpoints.auth.login,
        { email, password }
      );

      if (error || !data.success) {
        throw new Error(error?.message || data?.message || "Login failed");
      }

      const { success, user, accessToken, refreshToken } = data;

      if (!success) {
        throw new Error("Login failed");
      }

      // store token
      localStorage.setItem("userAccessToken", accessToken);
      localStorage.setItem("userRefreshToken", refreshToken);

      
      dispatch(login(user));

      
      await dispatch(loadUser());
      
      toast.success("Login Success!");
      
      
      setTimeout(() => {
        if (user.role === 'seller') {
          navigate('/seller/dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }, 100); 
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
      
      
      dispatch(loadUserFail(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {error && <p className="error-message">{error}</p>}

        <NavLink to="/forgetpassword">
          <p>Forgot Password?</p>
        </NavLink>
        
        <div className="signup-link">
          <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
