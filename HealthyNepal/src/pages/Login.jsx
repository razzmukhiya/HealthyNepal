import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/login.css'

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState ("");
  return (
    <div className='Login'>
      <form action="#">
      <input type="email" placeholder='Email' autoComplete='email' required value={email} name='email' id='email' onChange={(e) => setEmail(e.target.value) } /><br />
      <input type="password" placeholder='Password' autoComplete='current-password' required value={password} name='password' id='password' onClick={(e) => setPasswprd(e.target.value)} />
      <button>Sign In</button>

      <NavLink to="/forgetpassword">
        <p>Forgot Password?</p>
      </NavLink>
      </form>
    </div>
  )
}

export default Login;
