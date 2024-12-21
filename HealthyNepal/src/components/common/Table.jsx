import React, { useState, useMemo } from 'react';
import '../../styles/table.css';
import LoadingSpinner from './LoadingSpinner';

const Table = ({
  columns,
  data,
  loading = false,
  pagination = null,
  onPageChange,
  sortable = true,
  filterable = true,
  onSort,
  onFilter,
  emptyMessage = 'No data available',
  rowsPerPageOptions = [10, 25, 50, 100],
  onRowsPerPageChange,
  selectedRows = [],
  onRowSelect,
  actions = null
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});

  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    if (onSort) {
      onSort(key, direction);
    }
  };

  const handleFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const handleSelectAll = (e) => {
    if (onRowSelect) {
      if (e.target.checked) {
        onRowSelect(data.map(row => row.id));
      } else {
        onRowSelect([]);
      }
    }
  };

  const handleSelectRow = (id) => {
    if (onRowSelect) {
      if (selectedRows.includes(id)) {
        onRowSelect(selectedRows.filter(rowId => rowId !== id));
      } else {
        onRowSelect([...selectedRows, id]);
      }
    }
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortable) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, sortable]);

  return (
    <div className="table-wrapper">
      {/* Table Actions */}
      {actions && (
        <div className="table-actions">
          {actions}
        </div>
      )}

      {/* Table Container */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {onRowSelect && (
                <th className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`${sortable && column.sortable !== false ? 'sortable' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="th-content">
                    {column.title}
                    {sortable && column.sortable !== false && (
                      <span className={`sort-icon ${sortConfig.key === column.key ? sortConfig.direction : ''}`}>
                        <i className="fas fa-sort"></i>
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
            {filterable && (
              <tr className="filter-row">
                {onRowSelect && <th></th>}
                {columns.map(column => (
                  <th key={`filter-${column.key}`}>
                    {column.filterable !== false && (
                      <input
                        type="text"
                        placeholder={`Filter ${column.title}`}
                        value={filters[column.key] || ''}
                        onChange={(e) => handleFilter(column.key, e.target.value)}
                        className="filter-input"
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (onRowSelect ? 1 : 0)} className="loading-cell">
                  <LoadingSpinner size="small" />
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onRowSelect ? 1 : 0)} className="empty-cell">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr key={row.id || index}>
                  {onRowSelect && (
                    <td className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td key={`${row.id}-${column.key}`}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="table-pagination">
          <div className="pagination-info">
            Showing {pagination.from}-{pagination.to} of {pagination.total} entries
          </div>
          <div className="rows-per-page">
            <span>Rows per page:</span>
            <select
              value={pagination.perPage}
              onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            >
              {rowsPerPageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={pagination.currentPage === 1}
              onClick={() => onPageChange(pagination.currentPage - 1)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-button ${pagination.currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-button"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => onPageChange(pagination.currentPage + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
