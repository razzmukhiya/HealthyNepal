import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import Navbar from '../Navbar';
// import { response } from "express";

    const Login = () => {
      const navigate = useNavigate();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        await axios
          .post(`${server}/user/login-user`, {
            email,
            password,
          },
            { withCredentials: true}
          )
          .then((res) => {
            toast.success("Login Success!");
            navigate("/dashboard");
            window.location.reload(true);
          })
          .catch((err) => {
            const errorMessage = err.response ? err.response.data.message : "An unexpected error occured.";
            setError(errorMessage);
            toast.error(errorMessage);
            console.log(err)
          })
          .finally(() => setLoading(false));
      };
    
      return (
        <>
        <Navbar />
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
            <button type="submit" disabled={loading}>Sign In</button>
    
            {error && <p style={{ color: 'red' }}>{error}</p>}
    
            <NavLink to="/forgetpassword">
              <p>Forgot Password?</p>
            </NavLink>
          </form>
        </div>
        </>
    //   );
    // };
  );
};

export default Login;

