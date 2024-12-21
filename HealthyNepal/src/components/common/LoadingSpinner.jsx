import React from 'react';
import '../../styles/loadingspinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary', fullScreen = false }) => {
  const spinnerClasses = [
    'loading-spinner',
    `spinner-${size}`,
    `spinner-${color}`,
    fullScreen ? 'spinner-fullscreen' : ''
  ].join(' ');

  return (
    <div className={spinnerClasses}>
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
