import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/notifications.css';

const Messages = () => {
  const { seller } = useSelector((state) => state.sellers);

  return (
    <div className="messages-container">
      <div className="page-header">
        <h2>Messages</h2>
      </div>
      <div className="messages-list">
        <div className="message-item">
          <div className="message-avatar">👤</div>
          <div className="message-content">
            <div className="message-header">
              <h3>Support Team</h3>
              <span className="message-time">Just now</span>
            </div>
            <p>Welcome to HealthyNepal! Let us know if you need any assistance.</p>
          </div>
        </div>
        <div className="message-item">
          <div className="message-avatar">👤</div>
          <div className="message-content">
            <div className="message-header">
              <h3>Customer Service</h3>
              <span className="message-time">2 hours ago</span>
            </div>
            <p>Your store has been successfully verified. You can now start selling!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
