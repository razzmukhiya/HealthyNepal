import React from 'react';
import { useSelector } from 'react-redux';
import Vendornavtop from '../../components/SellerDashboard/Vendornavtop';
import '../../styles/Sellerdashboard.css';
import '../../styles/loading.css';

const SellerDashboard = () => {
  const { seller, loadingStates } = useSelector((state) => state.sellers);
  const isLoading = loadingStates?.loadSeller;

  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: seller?.orders?.length || "0",
      color: "#4299e1",
      icon: "📦"
    },
    {
      id: 2,
      title: "Total Products",
      value: seller?.products?.length || "0",
      color: "#48bb78",
      icon: "🛍️"
    },
    {
      id: 3,
      title: "Total Revenue",
      value: `Rs. ${seller?.totalRevenue || "0"}`,
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
      value: seller?.activeProducts?.length || "0",
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
    <div className="dashboard-layout">
      <div className="main-content">
        <Vendornavtop />
        <div className="content-area">
          <div className="dashboard-header">
            <h1>Welcome back, {seller?.name || 'Seller'}!</h1>
            <p>Here's what's happening with your store today.</p>
          </div>
          <div className={`stats-grid ${isLoading ? 'loading-overlay' : ''}`}>
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
    </div>
  );
};

export default SellerDashboard;
