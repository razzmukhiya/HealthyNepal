import React from 'react'
import '../styles/signup.css'

const Signup = () => {
  return (
    <div className='SignUp'>
      <h2>CREATE A NEW ACCOUNT</h2>

      <form action="#">
        <input type="text" name="fname" id="fname" placeholder='Full Name' /><br />
        <input type="email" name="email" id="email" placeholder='Email' /><br />
        <input type="number" name="number" id="number" placeholder='Number' />
        <input type="password" name="password" id="password" placeholder='Password' /><br />
        <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time</p>
        <button>Sign Up</button>
      </form>
      
    </div>
  )
}

export default Signup
