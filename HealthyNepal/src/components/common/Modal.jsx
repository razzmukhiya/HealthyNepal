import React, { useEffect, useCallback } from 'react';
import '../../styles/modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium', 
  showCloseButton = true,
  closeOnOutsideClick = true,
  footer = null 
}) => {
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className={`modal-container modal-${size}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          {showCloseButton && (
            <button className="modal-close" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <div className="modal-content">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Confirmation Modal Component
export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  title = 'Confirm Action', 
  message, 
  onConfirm, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'danger'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      footer={
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`btn btn-${confirmButtonClass}`} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <p className="confirmation-message">{message}</p>
    </Modal>
  );
};

// Form Modal Component
export const FormModal = ({ 
  isOpen, 
  onClose, 
  title, 
  onSubmit, 
  submitText = 'Submit',
  cancelText = 'Cancel',
  children,
  loading = false
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      closeOnOutsideClick={false}
      footer={
        <div className="modal-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            type="submit" 
            form="modal-form"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : submitText}
          </button>
        </div>
      }
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

export default Modal;
