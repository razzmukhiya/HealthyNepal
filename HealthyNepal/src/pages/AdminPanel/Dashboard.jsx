import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSellers } from '../../redux/reducers/sellersSlice';
import { fetchWithdrawals } from '../../redux/reducers/withdrawalsSlice';
import { fetchRequests } from '../../redux/reducers/requestsSlice';
import '../../styles/admindashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sellers } = useSelector((state) => state.sellers);
  const withdrawalStats = useSelector((state) => state.withdrawals.stats);
  const requestStats = useSelector((state) => state.requests.stats);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchSellers({ status: 'active', page: 1, limit: 5 }));
    dispatch(fetchWithdrawals({ status: 'pending', page: 1, limit: 5 }));
    dispatch(fetchRequests({ status: 'pending', page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h2>Welcome back, {user?.name || 'Admin'}!</h2>
        <p>Here's what's happening in your store today</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon sellers">
            <i className="fas fa-store"></i>
          </div>
          <div className="stat-content">
            <h3>Active Sellers</h3>
            <p className="stat-number">{sellers.length}</p>
            <Link to="/admin/sellers" className="stat-link">View all sellers</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="stat-content">
            <h3>Pending Requests</h3>
            <p className="stat-number">{requestStats.pending}</p>
            <Link to="/admin/seller-requests" className="stat-link">View requests</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon withdrawals">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="stat-content">
            <h3>Pending Withdrawals</h3>
            <p className="stat-number">{withdrawalStats.pending}</p>
            <Link to="/admin/withdrawals" className="stat-link">View withdrawals</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amount">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-content">
            <h3>Total Withdrawal Amount</h3>
            <p className="stat-number">NPR {withdrawalStats.totalAmount?.toLocaleString() || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activities-grid">
          {/* Recent Seller Registrations */}
          <div className="activity-card">
            <h4>New Seller Requests</h4>
            <div className="activity-list">
              {sellers.slice(0, 5).map(seller => (
                <div key={seller.id} className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-details">
                    <p>{seller.name}</p>
                    <span>{seller.requestDate}</span>
                  </div>
                  <div className="activity-status pending">Pending</div>
                </div>
              ))}
            </div>
            <Link to="/admin/seller-requests" className="view-all">View All Requests</Link>
          </div>

          {/* Recent Withdrawals */}
          <div className="activity-card">
            <h4>Recent Withdrawal Requests</h4>
            <div className="activity-list">
              {sellers.slice(0, 5).map(seller => (
                <div key={seller.id} className="activity-item">
                  <div className="activity-icon">
                    <i className="fas fa-money-check-alt"></i>
                  </div>
                  <div className="activity-details">
                    <p>{seller.name}</p>
                    <span>NPR {(Math.random() * 50000).toFixed(2)}</span>
                  </div>
                  <div className="activity-status pending">Pending</div>
                </div>
              ))}
            </div>
            <Link to="/admin/withdrawals" className="view-all">View All Withdrawals</Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/admin/seller-requests" className="action-card">
            <i className="fas fa-user-check"></i>
            <span>Review Seller Requests</span>
          </Link>
          <Link to="/admin/withdrawals" className="action-card">
            <i className="fas fa-money-bill-wave"></i>
            <span>Process Withdrawals</span>
          </Link>
          <Link to="/admin/chat" className="action-card">
            <i className="fas fa-comments"></i>
            <span>Chat with Sellers</span>
          </Link>
          <Link to="/admin/sellers" className="action-card">
            <i className="fas fa-users"></i>
            <span>Manage Sellers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
