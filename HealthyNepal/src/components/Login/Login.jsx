import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/login.css";
import api, { endpoints } from "../../utils/api";
import { loadUser } from "../../redux/actions/user";
import { login, loadUserRequest, loadUserFail } from "../../redux/reducers/authSlice";
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
      const response = await api.post(
        endpoints.auth.login,
        { email, password }
      );

      if (response.error) {
        throw new Error(response.message);
      }

      const { success, user, accessToken, refreshToken } = response.data;

      if (!success) {
        throw new Error("Login failed");
      }

      // Store tokens in localStorage
      localStorage.setItem("userAccessToken", accessToken);
      localStorage.setItem("userRefreshToken", refreshToken);

      // Dispatch login action with user data
      dispatch(login(user));
      
      // Load user data after successful login
      dispatch(loadUser());
      
      toast.success("Login Success!");
      
      // Navigate to the attempted URL or home
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
      
      // Dispatch login fail action
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
