import { useEffect } from 'react';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Vendor from './pages/Vendor';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Orders';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import SignupVendor from './pages/vendorsignup';
import PrescriptionMedicine from './pages/prescriptionmedicine';
import UserDashboard from './pages/dashboard/UserDashboard';
import Hero from './components/Hero';
// import ActivationPage from './pages/ActivationPage';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';
// import MyAccount from './pages/dashboard/MyAccount';

function App() {
  // const locations = useLocation();

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    
    <BrowserRouter>
    
    <div className='Nbar'>
      {/* <Navbar /> */}
      {/* {locations.pathname === '/' && <Hero />} */}
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
      {/* <Route path='/activation/:url' element={<ActivationPage />} /> */}
      {/* <Route path='/userdashboard' element={<UserDashboard />} /> */}
      {/* <Route path='/myaccount' element={<MyAccount />} /> */}
    </Routes>
    
    {/* <Footer /> */}
    </div>
    
    </BrowserRouter>
   
  )
}

export default App;


