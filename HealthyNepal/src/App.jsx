import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sellerlogin from "./pages/Sellerlogin";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Orders";
// import Navbar from './components/Navbar';
// import Sellerregister from './pages/Sellerregister';
import PrescriptionMedicine from "./pages/prescriptionmedicine";
import UserDashboard from "./pages/dashboard/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard/VendorDashboard";
import Sellerregister from "./pages/Sellerregister";
import Store from "./redux/store";
import { loadUser, loadSeller } from "./redux/actions/user";
import Addproducts from "./pages/VendorDashboard/AddProducts";
import Chatsupports from "./pages/VendorDashboard/ChatSupports";
import Customersupport from "./pages/VendorDashboard/CustomerSupport";
import Sellerorders from "./pages/VendorDashboard/Orders";
import Products from "./pages/VendorDashboard/Products";
import Sellerprofile from "./pages/VendorDashboard/SellerProfile";
import Sellersetting from "./pages/VendorDashboard/Setting";
import Withdrawl from "./pages/VendorDashboard/Withdrawl";
// import a from "./pages/VendorDashboard";
// import a from "./pages/VendorDashboard";
// import a from "./pages/VendorDashboard";
// import a from "./pages/VendorDashboard";


function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <BrowserRouter>
      <div className="Nbar">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sellerlogin" element={<Sellerlogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/sellersignup" element={<Sellerregister />} />
          <Route
            path="/prescription-medicine"
            element={<PrescriptionMedicine />}
          />
          <Route path="/dashboard/*" element={<UserDashboard />} />
          <Route path="/vendordashboard/*" element={<VendorDashboard />} />
          <Route path="/sellerdashboard/*" element={<VendorDashboard />} />
          <Route path="/sellerdashboard/*" element={<VendorDashboard />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/sellerchatsupport" element={<Chatsupports />} />
          <Route path="/sellercustomersupport" element={<Customersupport />} />
          <Route path="/sellerorders" element={<Sellerorders />} />
          <Route path="/sellerproducts" element={<Products />} />
          <Route path="/sellerprofile" element={<Sellerprofile />} />
          <Route path="/sellersetting" element={<Sellersetting />} />
          <Route path="/withdrawl" element={<Withdrawl />} />

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
