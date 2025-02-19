import React from 'react';
import { useSelector } from 'react-redux';
import NewAdminSidebar from './NewAdminSidebar';
import '../../styles/admindashboard.css';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { 
      title: 'Total Users',
      value: '1,234',
      icon: '👥',
      color: '#3498db'
    },
    { 
      title: 'Active Sellers',
      value: '567',
      icon: '🏪',
      color: '#2ecc71'
    },
    { 
      title: 'Total Revenue',
      value: '$12,345',
      icon: '💵',
      color: '#9b59b6'
    },
    { 
      title: 'Pending Orders',
      value: '89',
      icon: '📦',
      color: '#e67e22'
    }
  ];

  const recentActivities = [
    {
      type: 'New Order',
      description: 'Order #12345 received',
      time: '2 minutes ago',
      icon: '📦'
    },
    {
      type: 'User Registration',
      description: 'New user: john_doe',
      time: '15 minutes ago',
      icon: '👤'
    },
    {
      type: 'Seller Request',
      description: 'New seller application',
      time: '30 minutes ago',
      icon: '📨'
    }
  ];

  return (
    <div className="admin-dashboard-container">
      <NewAdminSidebar />
      
      <div className="admin-dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'Admin'}</h1>
          <p>Here's what's happening with your store today</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card"
              style={{ borderBottom: `4px solid ${stat.color}` }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-details">
                  <p className="activity-type">{activity.type}</p>
                  <p className="activity-description">{activity.description}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
