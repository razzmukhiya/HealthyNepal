import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellers,
  updateSellerStatus,
  setFilters,
  clearFilters,
  selectSellers,
  selectSellersLoading,
  selectSellersError,
  selectSellersFilters,
  selectSellersPagination
} from '../../redux/reducers/sellersSlice';
import '../../styles/admindashboard.css';
import '../../styles/activesellers.css';

const Sellers = () => {
  const dispatch = useDispatch();
  const sellers = useSelector(selectSellers);
  const loading = useSelector(selectSellersLoading);
  const error = useSelector(selectSellersError);
  const filters = useSelector(selectSellersFilters);
  const { currentPage, totalPages } = useSelector(selectSellersPagination);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    dispatch(fetchSellers({ 
      status: 'active',
      page: currentPage,
      search: searchTerm,
      sort: sortOption
    }));
  }, [dispatch, currentPage, searchTerm, sortOption]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setFilters({ search: value }));
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOption(value);
    dispatch(setFilters({ sort: value }));
  };

  const handlePageChange = (page) => {
    dispatch(fetchSellers({ 
      status: 'active',
      page,
      search: searchTerm,
      sort: sortOption
    }));
  };

  const handleDeactivate = (sellerId) => {
    if (window.confirm('Are you sure you want to deactivate this seller?')) {
      dispatch(updateSellerStatus({ sellerId, status: 'inactive' }));
    }
  };

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="sellers-container">
      <h2>Active Sellers</h2>
      
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <input 
          type="text" 
          placeholder="Search sellers..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select 
          className="filter-select"
          value={sortOption}
          onChange={handleSort}
        >
          <option value="">Sort By</option>
          <option value="name_asc">Name (A-Z)</option>
          <option value="name_desc">Name (Z-A)</option>
          <option value="recent">Recently Added</option>
          <option value="oldest">Oldest First</option>
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
                <th>Status</th>
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
                  <td>
                    <span className={`status-badge ${seller.status.toLowerCase()}`}>
                      {seller.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="edit-btn" title="Edit Seller">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="delete-btn" 
                        title="Deactivate Seller"
                        onClick={() => handleDeactivate(seller.id)}
                      >
                        <i className="fas fa-user-slash"></i>
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

export default Sellers;
