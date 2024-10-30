import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/login.css';
import axios from 'axios';
import {server} from "../../server";
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState ("");

  const handleSubmit = async (e) =>{
    e.preventDefault();

    await axios.post(`${server}/user/login-user`, {
      email,
      password,
    }).then((res) => {
      toast.success("Login Success!");
      navigate("/");
    }).catch((err) => {
      // toast.error(err.response.data.message);
    })
    
  }
  

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
      <input type="email" placeholder='Email' autoComplete='email' required value={email} name='email' id='email' onChange={(e) => setEmail(e.target.value) } /><br />
      <input type="password" placeholder='Password' autoComplete='current-password' required  name='password' id='password' onChange={(e) => setPasswprd(e.target.value)} />
      <button>Sign In</button>

      <NavLink to="/forgetpassword">
        <p>Forgot Password?</p>
      </NavLink>
      </form>
    </div>
  )
}

export default Login;
