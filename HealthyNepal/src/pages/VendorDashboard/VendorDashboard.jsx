import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Vendordashboard from "./Dashboard";
import Orders from "./Orders";
import Products from './Products';
import AddProduct from "./AddProducts";
import Withdrawl from "./Withdrawl";
import ChatSupport from "./ChatSupports";
import CustomerSupport from "./CustomerSupport";
import Vendorprofile from "./Profile";


function VendorDashboard() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path="/vendordashboard" element={<Vendordashboard />} />
        <Route path="/vendororders" element={<Orders />} />
        <Route path="/vendorproducts" element={<Products />} />
        <Route path="/vendoraddproduct" element={<AddProduct />} />
        <Route path="/vendorwithdrawl" element={<Withdrawl />} />
        <Route path="/vendorchatsupport" element={<ChatSupport />} />
        <Route path="/vendorcustomersupport" element={<CustomerSupport />} />
        <Route path="/vendorprofile" element={<Vendorprofile />} />
      </Routes>
      </BrowserRouter>
      
    
  )
}

export default VendorDashboard;
