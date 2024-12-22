import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadUser } from './redux/actions/user';
import { loadSeller } from './redux/actions/sellers';
import { refreshSellerToken } from './utils/refreshToken';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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

function App() {
  const dispatch = useDispatch();

  // Setup axios interceptors
  useEffect(() => {
    // Request interceptor
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

    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            const newToken = await refreshSellerToken();
            
            // Update the original request with new token
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            
            // Retry the original request
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, clear tokens
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
      // Load seller data if seller token exists
      const sellerToken = localStorage.getItem('sellerAccessToken');
      if (sellerToken) {
        try {
          await dispatch(loadSeller());
        } catch (error) {
          console.error('Error loading seller:', error);
        }
      }

      // Load user data if user token exists
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
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products-page" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/activation/:activation_token" element={<ActivationPage />} />
            <Route path="/seller-login" element={<Sellerlogin />} />
            <Route path="/seller-register" element={<Sellerregister />} />
            <Route path="/sellerlogin" element={<Navigate to="/seller-login" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            {/* Protected Routes for Admin */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute type="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Protected Routes for User */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes for Seller */}
            <Route path="/seller/*" element={
              <ProtectedRoute type="seller">
                <VendorDashboard />
              </ProtectedRoute>
            } />

            {/* Other Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
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
