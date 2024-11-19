import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Orders from "./Orders";
import Address from "./Address";
import WishList from "./WishList";
import ChatSupport from "./ChatSupport";
import Profile from "./Profile";



function UserDashboard() {
  return (

    <BrowserRouter>
      <Routes>
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/orders" element={<Orders />} />
     <Route path="/address" element={<Address />} />
     <Route path="/wishlist" element={<WishList />} />
     <Route path="/chatsupport" element={<ChatSupport />} />
     <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>

  )
}

export default UserDashboard;