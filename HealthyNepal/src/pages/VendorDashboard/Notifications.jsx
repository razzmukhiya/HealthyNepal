import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/notifications.css';

const Notifications = () => {
  const { seller } = useSelector((state) => state.sellers);

  return (
    <div className="notifications-container">
      <div className="page-header">
        <h2>Notifications</h2>
      </div>
      <div className="notifications-list">
        <div className="notification-item">
          <div className="notification-icon">🔔</div>
          <div className="notification-content">
            <h3>Welcome to HealthyNepal!</h3>
            <p>Thank you for joining our platform. Start adding your products to reach more customers.</p>
            <span className="notification-time">Just now</span>
          </div>
        </div>
        <div className="notification-item">
          <div className="notification-icon">📦</div>
          <div className="notification-content">
            <h3>New Order Received</h3>
            <p>You have received a new order. Check your orders page for details.</p>
            <span className="notification-time">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
