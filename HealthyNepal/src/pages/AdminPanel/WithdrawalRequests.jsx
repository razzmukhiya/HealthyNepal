import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWithdrawals,
  updateWithdrawalStatus,
  setFilters,
  selectWithdrawals,
  selectWithdrawalsLoading,
  selectWithdrawalsError,
  selectWithdrawalsFilters,
  selectWithdrawalsPagination,
  selectWithdrawalsStats,
  updateStats
} from '../../redux/reducers/withdrawalsSlice';
import '../../styles/admindashboard.css';
import '../../styles/withdrawalrequests.css';

const WithdrawalRequests = () => {
  const dispatch = useDispatch();
  const withdrawals = useSelector(selectWithdrawals);
  const loading = useSelector(selectWithdrawalsLoading);
  const error = useSelector(selectWithdrawalsError);
  const filters = useSelector(selectWithdrawalsFilters);
  const { currentPage, totalPages } = useSelector(selectWithdrawalsPagination);
  const stats = useSelector(selectWithdrawalsStats);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchWithdrawals({ 
      status: statusFilter,
      page: currentPage,
      search: searchTerm
    }));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    if (withdrawals.length > 0) {
      dispatch(updateStats());
    }
  }, [dispatch, withdrawals]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setFilters({ search: value }));
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    dispatch(setFilters({ status: value }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchWithdrawals({ 
      status: statusFilter,
      page,
      search: searchTerm
    }));
  };

  const handleApprove = (withdrawalId) => {
    if (window.confirm('Are you sure you want to approve this withdrawal request?')) {
      dispatch(updateWithdrawalStatus({ 
        withdrawalId, 
        status: 'Approved'
      }));
    }
  };

  const handleReject = (withdrawalId) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason) {
      dispatch(updateWithdrawalStatus({ 
        withdrawalId, 
        status: 'Rejected',
        reason
      }));
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="withdrawal-requests-container">
      <h2>Withdrawal Requests</h2>

      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="stat-item">
          <h4>Pending</h4>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-item">
          <h4>Approved</h4>
          <p>{stats.approved}</p>
        </div>
        <div className="stat-item">
          <h4>Rejected</h4>
          <p>{stats.rejected}</p>
        </div>
        <div className="stat-item">
          <h4>Total Amount</h4>
          <p>NPR {stats.totalAmount.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <input 
          type="text" 
          placeholder="Search requests..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select 
          className="filter-select"
          value={statusFilter}
          onChange={handleStatusFilter}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="table-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <table className="sellers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Shop Name</th>
                <th>Owner</th>
                <th>Amount (NPR)</th>
                <th>Account No.</th>
                <th>Bank</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map(request => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.sellerName}</td>
                  <td>{request.owner}</td>
                  <td>{request.amount.toLocaleString()}</td>
                  <td>{request.accountNo}</td>
                  <td>{request.bank}</td>
                  <td>{request.requestDate}</td>
                  <td>
                    <span className={`status-badge ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      {request.status === 'Pending' && (
                        <>
                          <button 
                            className="edit-btn" 
                            title="Approve Request"
                            onClick={() => handleApprove(request.id)}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button 
                            className="delete-btn" 
                            title="Reject Request"
                            onClick={() => handleReject(request.id)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button 
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default WithdrawalRequests;
