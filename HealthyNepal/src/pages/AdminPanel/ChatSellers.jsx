import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchChats,
  sendMessage,
  markAsRead,
  setSelectedSeller,
  setSearch,
  selectSellers,
  selectChats,
  selectSelectedSeller,
  selectChatLoading,
  selectChatError,
  selectSearch
} from '../../redux/reducers/chatSlice';
import '../../styles/admindashboard.css';
import '../../styles/chat.css';

const ChatSellers = () => {
  const dispatch = useDispatch();
  const sellers = useSelector(selectSellers);
  const chats = useSelector(selectChats);
  const selectedSeller = useSelector(selectSelectedSeller);
  const loading = useSelector(selectChatLoading);
  const error = useSelector(selectChatError);
  const searchTerm = useSelector(selectSearch);
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedSeller, chats]);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSelectSeller = (seller) => {
    dispatch(setSelectedSeller(seller));
    if (seller.unread > 0) {
      dispatch(markAsRead(seller.id));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedSeller) return;

    dispatch(sendMessage({
      sellerId: selectedSeller.id,
      message: message.trim()
    }));
    setMessage('');
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="chat-container">
      {/* Sellers List */}
      <div className="sellers-list">
        <div className="sellers-header">
          <h2>Messages</h2>
          <div className="search-chat">
            <input 
              type="text" 
              placeholder="Search sellers..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="sellers-items">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            sellers.map(seller => (
              <div 
                key={seller.id}
                className={`seller-item ${selectedSeller?.id === seller.id ? 'active' : ''}`}
                onClick={() => handleSelectSeller(seller)}
              >
                <div className="seller-avatar">
                  <img src={seller.avatar} alt={seller.name} />
                  {seller.online && <span className="online-status"></span>}
                </div>
                <div className="seller-info">
                  <div className="seller-name-time">
                    <h4>{seller.name}</h4>
                    <span className="time">{seller.lastMessageTime}</span>
                  </div>
                  <div className="last-message">
                    <p>{seller.lastMessage}</p>
                    {seller.unread > 0 && (
                      <span className="unread-count">{seller.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {selectedSeller ? (
          <>
            <div className="chat-header">
              <div className="chat-seller-info">
                <img src={selectedSeller.avatar} alt={selectedSeller.name} />
                <div>
                  <h3>{selectedSeller.name}</h3>
                  <span className={`status ${selectedSeller.online ? 'online' : 'offline'}`}>
                    {selectedSeller.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-messages" ref={chatContainerRef}>
              {chats[selectedSeller.id]?.map(chat => (
                <div 
                  key={chat.id}
                  className={`message ${chat.sender === 'admin' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{chat.text}</p>
                    <span className="message-time">{chat.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" disabled={!message.trim() || loading}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <i className="fas fa-comments"></i>
            <h3>Select a conversation</h3>
            <p>Choose a seller from the list to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSellers;
