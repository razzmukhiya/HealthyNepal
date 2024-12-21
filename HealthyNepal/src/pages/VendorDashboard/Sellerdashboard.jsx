import React from 'react';
import { useSelector } from 'react-redux';
import Vendornavtop from '../../components/SellerDashboard/Vendornavtop';
import '../../styles/Sellerdashboard.css';

const Sellerdashboard = () => {
  const { seller } = useSelector((state) => state.seller);

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: "0",
      color: "#4299e1",
      icon: "📦"
    },
    {
      id: 2,
      title: "Total Products",
      value: "0",
      color: "#48bb78",
      icon: "🛍️"
    },
    {
      id: 3,
      title: "Total Revenue",
      value: "Rs. 0",
      color: "#ed8936",
      icon: "💰"
    },
    {
      id: 4,
      title: "Today's Orders",
      value: "0",
      color: "#667eea",
      icon: "📅"
    },
    {
      id: 5,
      title: "Active Products",
      value: "0",
      color: "#f6ad55",
      icon: "✨"
    },
    {
      id: 6,
      title: "Today's Revenue",
      value: "Rs. 0",
      color: "#fc8181",
      icon: "💸"
    }
  ];

  return (
    <div className="dashboard-container">
      <Vendornavtop />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {seller?.name || 'Seller'}!</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className="stats-grid">
          {stats.map(stat => (
            <div 
              key={stat.id} 
              className="stat-card"
              style={{ borderLeftColor: stat.color }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sellerdashboard;
