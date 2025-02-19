import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/admindashboard.css';

const NewAdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      path: '/admin/dashboard',
      icon: '📊',
      label: 'Dashboard'
    },
    { 
      path: '/admin/sellers',
      icon: '👥',
      label: 'Sellers'
    },
    { 
      path: '/admin/deactive-sellers',
      icon: '🚫',
      label: 'Deactive Sellers'
    },
    { 
      path: '/admin/seller-requests',
      icon: '📨',
      label: 'Seller Requests'
    },
    { 
      path: '/admin/chat-sellers',
      icon: '💬',
      label: 'Chat Sellers'
    },
    { 
      path: '/admin/withdrawal-requests',
      icon: '💳',
      label: 'Withdrawal Requests'
    },
    { 
      path: '/admin/manage-users',
      icon: '👤',
      label: 'Manage Users'
    },
    { 
      path: '/admin/settings',
      icon: '⚙️',
      label: 'Settings'
    },
    { 
      path: '/admin/logout',
      icon: '🚪',
      label: 'Logout'
    }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default NewAdminSidebar;
