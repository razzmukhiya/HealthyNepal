import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadUser } from './redux/actions/user';
import { loadSeller } from './redux/actions/sellers';
import { refreshSellerToken } from './utils/refreshToken';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SellerRequests from './pages/AdminPanel/SellerRequests';
import Checkout from './components/cart/Checkout'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import MainLayout from './components/Layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignupPage';
import ActivationPage from './pages/ActivationPage';
import Sellerlogin from './pages/Sellerlogin';
import Sellerregister from './pages/Sellerregister';
import PrescriptionMedicine from './pages/prescriptionmedicine';
import UserDashboard from './pages/dashboard/UserDashboard';
import VendorDashboard from './pages/VendorDashboard/VendorDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import AdminLogin from './pages/AdminPanel/AdminLogin';
import AdminRegister from './pages/AdminPanel/AdminRegister';
import AdminDashboard from './pages/AdminPanel/AdminDashboard';
// import SellerRequests from './pages/AdminPanel/SellerRequests';
import Withdrawlrequest from './pages/AdminPanel/WithdrawalRequests';

function App() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    console.log('Current cart items:', cartItems);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  
  useEffect(() => {
    
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('sellerAccessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            
            const newToken = await refreshSellerToken();
            
            
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            
            
            return axios(originalRequest);
          } catch (refreshError) {
            
            localStorage.removeItem('sellerAccessToken');
            localStorage.removeItem('sellerRefreshToken');
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);
  
  useEffect(() => {
    const loadData = async () => {
        console.log('Loading data...');
      
      const sellerToken = localStorage.getItem('sellerAccessToken');
      if (sellerToken) {
        try {
          await dispatch(loadSeller());
        } catch (error) {
          console.error('Error loading seller:', error);
        }
      }

    
      const userToken = localStorage.getItem('userAccessToken');
      if (userToken) {
        try {
          await dispatch(loadUser());
        } catch (error) {
          console.error('Error loading user:', error);
        }
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <MainLayout>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/products-page" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/activation/:activation_token" element={<ActivationPage />} />
            <Route path="/seller-login" element={<Sellerlogin />} />
            <Route path="/seller-register" element={<Sellerregister />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/seller-requests" element={
              <ProtectedRoute type="admin">
                <SellerRequests />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/orders" element={
              <ProtectedRoute type="admin">
                <Orders />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/withdrawals" element={
              <ProtectedRoute type="admin">
                <Withdrawlrequest />
              </ProtectedRoute>
            } />

            
            <Route path="/admin/dashboard" element={
              <ProtectedRoute type="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            
            <Route path="/seller/*" element={
              <ProtectedRoute type="seller">
                <VendorDashboard />
              </ProtectedRoute>
            } />

            
            <Route path="/checkout" element={<Checkout />} />
            
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart cartItems={cartItems} />
              </ProtectedRoute>
            } />
            <Route path="/prescription-medicine" element={
              <ProtectedRoute>
                <PrescriptionMedicine />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/place-order" element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            } />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
