import React, { useState } from 'react';
import '../../styles/VendorDashboard.css';

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'seller', timestamp: new Date() }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-support-container">
      <h2>Chat Support</h2>
      <div className="chat-support-content">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              <p>{message.text}</p>
              <span className="timestamp">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSupport;
