import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/user';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUser());
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
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products-page" element={<ProductsPage />} />
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
          <Route path="/seller-login" element={<Sellerlogin />} />
          <Route path="/seller-register" element={<Sellerregister />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/prescription-medicine" element={<ProtectedRoute><PrescriptionMedicine /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
