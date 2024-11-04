import { useEffect, useState } from 'react'
import {Routes,Route, useLocation} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Product from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Vendor from './pages/Vendor'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Orders'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import SignupVendor from './pages/vendorsignup'
import PrescriptionMedicine from './pages/prescriptionmedicine'
// import UserDashboard from './pages/UserDashboard/UserDashboard'
import Hero from './components/Hero'
import ActivationPage from './pages/ActivationPage'
import axios from 'axios'
import { server } from "./../server";
import { toast } from 'react-toastify'

function App() {
  useEffect(() => {
    axios.get(`${server}/user/getuser`, {withCredentials:true}).then((res) => {
      toast.success(res.data.message);
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }, []);
  const Locations = useLocation();
  return (
    <div className='Nbar'>
      <Navbar />
      {location.pathname === '/' && <Hero />}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Product />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/vendor' element={<Vendor />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/orders' element={<Order />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/place-order' element={<PlaceOrder />} />
      <Route path='/signup-vendor' element={<SignupVendor />} />
      <Route path='/prescription-medicine' element={<PrescriptionMedicine />} />
      <Route path='/activation/:url' element={<ActivationPage />} />
      {/* <Route path='/userdashboard' element={<UserDashboard />} /> */}
    </Routes>
    
    
    <Footer />
    </div>
  )
}

export default App;


