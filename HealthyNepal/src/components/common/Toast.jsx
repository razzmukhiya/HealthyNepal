import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/toast.css';

// Toast Container Component
export const ToastContainer = ({ position = 'top-right', children }) => {
  return createPortal(
    <div className={`toast-container toast-${position}`}>
      {children}
    </div>,
    document.body
  );
};

// Individual Toast Component
const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose,
  showProgress = true 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const close = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match the CSS animation duration
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, duration);

    if (showProgress) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 10));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 10);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }

    return () => clearTimeout(timer);
  }, [duration, close, showProgress]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fas fa-check-circle"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle"></i>;
      case 'warning':
        return <i className="fas fa-exclamation-triangle"></i>;
      default:
        return <i className="fas fa-info-circle"></i>;
    }
  };

  return (
    <div className={`toast toast-${type} ${isVisible ? 'show' : 'hide'}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        <div className="toast-message">
          {message}
        </div>
        <button className="toast-close" onClick={close}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      {showProgress && (
        <div 
          className="toast-progress" 
          style={{ width: `${progress}%` }}
        ></div>
      )}
    </div>
  );
};

// Toast Manager Component
export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    ToastContainer: () => (
      <ToastContainer>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    )
  };
};

// Custom hook for using toast
export const useToast = () => {
  const showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.createElement('div');
    document.body.appendChild(toast);

    const cleanup = () => {
      document.body.removeChild(toast);
    };

    createPortal(
      <Toast
        message={message}
        type={type}
        duration={duration}
        onClose={cleanup}
      />,
      toast
    );
  };

  return {
    showToast,
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration)
  };
};

export default Toast;
