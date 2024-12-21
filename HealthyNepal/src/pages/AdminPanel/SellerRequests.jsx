import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRequests,
  updateRequestStatus,
  viewDocument,
  setFilters,
  selectRequests,
  selectRequestsLoading,
  selectRequestsError,
  selectRequestsFilters,
  selectRequestsPagination,
  selectDocumentUrl
} from '../../redux/reducers/requestsSlice';
import '../../styles/admindashboard.css';
import '../../styles/sellerrequests.css';

const SellerRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectRequestsLoading);
  const error = useSelector(selectRequestsError);
  const filters = useSelector(selectRequestsFilters);
  const { currentPage, totalPages } = useSelector(selectRequestsPagination);
  const documentUrl = useSelector(selectDocumentUrl);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRequests({ 
      status: statusFilter,
      page: currentPage,
      search: searchTerm
    }));
  }, [dispatch, currentPage, searchTerm, statusFilter]);

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
    dispatch(fetchRequests({ 
      status: statusFilter,
      page,
      search: searchTerm
    }));
  };

  const handleViewDocument = async (requestId, documentName) => {
    await dispatch(viewDocument({ requestId, documentName }));
    setShowDocumentModal(true);
  };

  const handleApprove = (requestId) => {
    if (window.confirm('Are you sure you want to approve this seller request?')) {
      dispatch(updateRequestStatus({ 
        requestId, 
        status: 'approved',
        feedback: 'Your registration request has been approved. Welcome to HealthyNepal!'
      }));
    }
  };

  const handleReject = (requestId) => {
    const feedback = window.prompt('Please provide a reason for rejection:');
    if (feedback) {
      dispatch(updateRequestStatus({ 
        requestId, 
        status: 'rejected',
        feedback
      }));
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="seller-requests-container">
      <h2>Seller Registration Requests</h2>
      
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
                <th>Email</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Request Date</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.owner}</td>
                  <td>{request.email}</td>
                  <td>{request.contact}</td>
                  <td>{request.location}</td>
                  <td className="request-date">{request.requestDate}</td>
                  <td>
                    <div className="document-links">
                      {request.documents.map((doc, index) => (
                        <a 
                          key={index} 
                          href="#" 
                          className="document-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewDocument(request.id, doc);
                          }}
                        >
                          <i className="fas fa-file-pdf"></i>
                          {doc}
                        </a>
                      ))}
                    </div>
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

      {/* Document Preview Modal */}
      {showDocumentModal && documentUrl && (
        <div className="document-preview-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Document Preview</h3>
              <button 
                className="close-modal"
                onClick={() => setShowDocumentModal(false)}
              >
                ×
              </button>
            </div>
            <iframe
              src={documentUrl}
              title="Document Preview"
              width="100%"
              height="600px"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerRequests;
