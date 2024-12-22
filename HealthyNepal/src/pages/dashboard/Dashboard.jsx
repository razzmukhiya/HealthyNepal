import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../../styles/dashboard.css";

const DashboardCard = ({ title, value, icon, link }) => (
  <Link to={link} className="dashboard-card">
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
    </div>
  </Link>
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  // These would typically come from Redux state
  const orderCount = 0;
  const wishlistCount = 0;
  const addressCount = 0;

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h2>Welcome back, {user?.name}!</h2>
        <p>Manage your orders, addresses, and profile settings here.</p>
      </div>

      <div className="dashboard-stats">
        <DashboardCard
          title="Total Orders"
          value={orderCount}
          icon="📦"
          link="/dashboard/orders"
        />
        <DashboardCard
          title="Wishlist Items"
          value={wishlistCount}
          icon="❤️"
          link="/dashboard/wishlist"
        />
        <DashboardCard
          title="Saved Addresses"
          value={addressCount}
          icon="📍"
          link="/dashboard/address"
        />
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {orderCount === 0 ? (
            <div className="empty-state">
              <p>No recent orders found</p>
              <Link to="/products" className="shop-now-btn">
                Start Shopping
              </Link>
            </div>
          ) : (
            // This would show recent orders when implemented
            <p>Loading recent orders...</p>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/dashboard/profile" className="action-btn">
            Update Profile
          </Link>
          <Link to="/dashboard/address" className="action-btn">
            Add New Address
          </Link>
          <Link to="/dashboard/chatsupport" className="action-btn">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
