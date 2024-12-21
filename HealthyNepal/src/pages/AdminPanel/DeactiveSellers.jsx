import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellers,
  updateSellerStatus,
  setFilters,
  selectSellers,
  selectSellersLoading,
  selectSellersError,
  selectSellersFilters,
  selectSellersPagination
} from '../../redux/reducers/sellersSlice';
import '../../styles/admindashboard.css';
import '../../styles/deactivesellers.css';

const DeactiveSellers = () => {
  const dispatch = useDispatch();
  const sellers = useSelector(selectSellers);
  const loading = useSelector(selectSellersLoading);
  const error = useSelector(selectSellersError);
  const filters = useSelector(selectSellersFilters);
  const { currentPage, totalPages } = useSelector(selectSellersPagination);

  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchSellers({ 
      status: 'inactive',
      page: currentPage,
      search: searchTerm,
      timeFilter
    }));
  }, [dispatch, currentPage, searchTerm, timeFilter]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setFilters({ search: value }));
  };

  const handleTimeFilter = (e) => {
    const value = e.target.value;
    setTimeFilter(value);
    dispatch(setFilters({ timeFilter: value }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchSellers({ 
      status: 'inactive',
      page,
      search: searchTerm,
      timeFilter
    }));
  };

  const handleReactivate = (sellerId) => {
    if (window.confirm('Are you sure you want to reactivate this seller?')) {
      dispatch(updateSellerStatus({ sellerId, status: 'active' }));
    }
  };

  const handleDelete = (sellerId) => {
    if (window.confirm('Are you sure you want to permanently delete this seller? This action cannot be undone.')) {
      // Add delete seller action here
      console.log('Delete seller:', sellerId);
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="deactive-sellers-container">
      <h2>Deactivated Sellers</h2>
      
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <input 
          type="text" 
          placeholder="Search deactivated sellers..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select 
          className="filter-select"
          value={timeFilter}
          onChange={handleTimeFilter}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Sellers Table */}
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
                <th>Deactivated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map(seller => (
                <tr key={seller.id}>
                  <td>{seller.id}</td>
                  <td>{seller.name}</td>
                  <td>{seller.owner}</td>
                  <td>{seller.email}</td>
                  <td>{seller.contact}</td>
                  <td>{seller.location}</td>
                  <td className="deactivated-date">{seller.deactivatedDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button 
                        className="edit-btn" 
                        title="Reactivate Seller"
                        onClick={() => handleReactivate(seller.id)}
                      >
                        <i className="fas fa-undo"></i>
                      </button>
                      <button 
                        className="delete-btn" 
                        title="Delete Permanently"
                        onClick={() => handleDelete(seller.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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

export default DeactiveSellers;
