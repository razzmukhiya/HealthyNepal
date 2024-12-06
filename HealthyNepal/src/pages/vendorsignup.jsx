import React from 'react';
import '../styles/vendorsignup.css';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
const vendorsignup = () => {
  return (
      <>
      <Navbar />
      <div className='vendor-signup-container'>
      <h2>CREATE A NEW ACCOUNT</h2>

    <form action="#">
        <input type="text" placeholder='Full Name' name='fname' id='fname' /><br />
        <input type="email" placeholder='Email' name='email' id='email' /><br />
        <input type="text" placeholder='Store Name' name='storename' id='storename' /><br />
        <input type="text" placeholder='Store Address' name='storeaddress' id='store' /><br />
        <input type="text" placeholder='Phone Number' name='phone' id='phone' /><br />
        <input type="password" placeholder='Password' name='password' id='password' /><br />
        <input type="file" placeholder='Upload Pharmacy Document' /><br />
        <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time</p>
        <button>Sign Up</button>
    </form>

    </div>
    {/* <Footer /> */}
    </>
  )
}

export default vendorsignup
