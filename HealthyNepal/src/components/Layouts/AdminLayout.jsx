import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../redux/reducers/authSlice';
import '../../styles/adminlayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt'
    },
    {
      title: 'Active Sellers',
      path: '/admin/sellers',
      icon: 'fas fa-store'
    },
    {
      title: 'Deactive Sellers',
      path: '/admin/deactive-sellers',
      icon: 'fas fa-store-slash'
    },
    {
      title: 'Seller Requests',
      path: '/admin/seller-requests',
      icon: 'fas fa-user-plus'
    },
    {
      title: 'Withdrawal Requests',
      path: '/admin/withdrawals',
      icon: 'fas fa-money-bill-wave'
    },
    {
      title: 'Chat Support',
      path: '/admin/chat',
      icon: 'fas fa-comments'
    }
  ];

  return (
    <div className={`admin-layout ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">HealthyNepal</h1>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className={`fas fa-${isSidebarOpen ? 'chevron-left' : 'chevron-right'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <i className={item.icon}></i>
              <span className="nav-text">{item.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          {isMobile && (
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          )}

          <div className="nav-right">
            <div className="user-info">
              <img 
                src={user?.avatar || 'https://via.placeholder.com/40'} 
                alt="User Avatar" 
                className="user-avatar"
              />
              <span className="user-name">{user?.name || 'Admin'}</span>
            </div>
            <div className="nav-actions">
              <button className="nav-action-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
