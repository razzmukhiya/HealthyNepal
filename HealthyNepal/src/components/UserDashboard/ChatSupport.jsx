import React, { useState } from 'react';
import "../../styles/ChatSupportStyles.css";

const ChatSupport = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can we help you today?",
      sender: "support",
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: Date.now() + 1,
          text: "Thank you for your message. Our support team will get back to you soon.",
          sender: "support",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 1000);
    }
  };

  return (
    <div className="chat-support-container">
      <div className="chat-header">
        <h2>Chat Support</h2>
        <p>We typically reply within a few minutes</p>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'support-message'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatSupport;
