
import React, { useEffect, useState } from 'react';
import '../../styles/AdminDashboard.css';
import Adminsidebar from "./Adminidebar";

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/v2/products/dashboard');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
        <Adminsidebar />
      <h1>Admin Dashboard</h1>
      <div className="cards">
        <div className="card">
          <h2>Total Users</h2>
          <p>{data.totalUsers}</p>
        </div>
        <div className="card">
          <h2>Total Sellers</h2>
          <p>{data.totalSellers}</p>
        </div>
        <div className="card">
          <h2>Total Products</h2>
          <p>{data.totalProducts}</p>
        </div>
        <div className="card">
          <h2>Total Revenue</h2>
          <p>${data.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;