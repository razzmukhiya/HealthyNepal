import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHome, FaShoppingBag, FaBox, FaPlus, FaMoneyBill } from 'react-icons/fa';
import { BiSupport, BiChat, BiUser, BiCog } from 'react-icons/bi';
import "../../styles/Vendorsidebar.css";

const Vendorsidebar = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome size={20} />, text: "Dashboard", path: "/seller/dashboard", id: 1 },
    { icon: <FaShoppingBag size={20} />, text: "Orders", path: "/seller/orders", id: 2 },
    { icon: <FaBox size={20} />, text: "Products", path: "/seller/products", id: 3 },
    { icon: <FaPlus size={20} />, text: "Add Product", path: "/seller/add-products", id: 4 },
    { icon: <FaMoneyBill size={20} />, text: "Withdrawl", path: "/seller/withdrawl", id: 5 },
    { icon: <BiSupport size={20} />, text: "Customer Support", path: "/seller/customer-support", id: 6 },
    { icon: <BiChat size={20} />, text: "Chat Support", path: "/seller/chat-support", id: 7 },
    { icon: <BiUser size={20} />, text: "Profile", path: "/seller/profile", id: 8 },
    { icon: <BiCog size={20} />, text: "Settings", path: "/seller/settings", id: 9 },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>HealthyNepal</h2>
        <p>E-Commerce</p>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="nav">
        {menuItems.slice(0, 5).map((item) => (
          <NavLink 
            key={item.id}
            to={item.path} 
            className={`VendorNavl ${active === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.text}</span>
          </NavLink>
        ))}

        <div className="nav-section">
          <p className="nav-section-title">Pages</p>
          {menuItems.slice(5).map((item) => (
            <NavLink 
              key={item.id}
              to={item.path} 
              className={`VendorNavl ${active === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendorsidebar;
