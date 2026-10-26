import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
  User,
} from 'lucide-react';
import ViewStudioModal from './ViewStudioModal';
import ConfirmDialog from './ConfirmDialog';

export const StudioTable = ({
  studios = [],
  onDelete,
  isDeleting = false,
  onRefresh,
}) => {
  const navigate = useNavigate();

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'INACTIVE'
  const [sortField, setSortField] = useState('id'); // 'id' | 'studioName' | 'ownerName' | 'monthlyRent' | 'active'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  // Modal states
  const [viewingStudio, setViewingStudio] = useState(null);
  const [deletingStudio, setDeletingStudio] = useState(null);

  // Currency formatter
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  // Status counts
  const totalCount = studios.length;
  const activeCount = studios.filter((s) => s.active).length;
  const inactiveCount = totalCount - activeCount;

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtered & Sorted records
  const processedStudios = useMemo(() => {
    let result = [...studios];

    // Status filter
    if (statusFilter === 'ACTIVE') {
      result = result.filter((s) => s.active === true);
    } else if (statusFilter === 'INACTIVE') {
      result = result.filter((s) => s.active === false);
    }

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (s) =>
          (s.studioName && s.studioName.toLowerCase().includes(q)) ||
          (s.ownerName && s.ownerName.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB || '').toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [studios, statusFilter, searchTerm, sortField, sortDirection]);

  // Sort indicator helper
  const renderSortIndicator = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown size={13} style={{ opacity: 0.4 }} />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={13} style={{ color: 'var(--terracotta-500)' }} />
    ) : (
      <ArrowDown size={13} style={{ color: 'var(--terracotta-500)' }} />
    );
  };

  const handleConfirmDelete = async () => {
    if (!deletingStudio) return;
    try {
      await onDelete(deletingStudio.id);
      setDeletingStudio(null);
    } catch (err) {
      // Error is handled in parent and toast is shown
    }
  };

  return (
    <div className="table-panel">
      {/* Table Toolbar */}
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          {/* Search Input */}
          <div className="table-search-box">
            <Search size={15} className="table-search-icon" />
            <input
              type="text"
              className="table-search-input"
              placeholder="Search by studio or owner name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search studios"
            />
            {searchTerm && (
              <button
                type="button"
                className="table-search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="filter-pills-group" role="group" aria-label="Filter studios by status">
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              <span>All</span>
              <span className="filter-count">{totalCount}</span>
            </button>
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'ACTIVE' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ACTIVE')}
            >
              <span>Active</span>
              <span className="filter-count">{activeCount}</span>
            </button>
            <button
              type="button"
              className={`filter-pill ${statusFilter === 'INACTIVE' ? 'active' : ''}`}
              onClick={() => setStatusFilter('INACTIVE')}
            >
              <span>Inactive</span>
              <span className="filter-count">{inactiveCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="table-responsive-container">
        <table className="artistry-table" aria-label="Art Studios Table">
          <thead>
            <tr>
              <th
                className="sortable"
                style={{ width: '80px' }}
                onClick={() => handleSort('id')}
                aria-sort={sortField === 'id' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="th-sort-inner">
                  <span>ID</span>
                  {renderSortIndicator('id')}
                </div>
              </th>

              <th
                className="sortable"
                onClick={() => handleSort('studioName')}
                aria-sort={sortField === 'studioName' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="th-sort-inner">
                  <span>Studio Name</span>
                  {renderSortIndicator('studioName')}
                </div>
              </th>

              <th
                className="sortable"
                onClick={() => handleSort('ownerName')}
                aria-sort={sortField === 'ownerName' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="th-sort-inner">
                  <span>Owner Name</span>
                  {renderSortIndicator('ownerName')}
                </div>
              </th>

              <th
                className="sortable"
                onClick={() => handleSort('monthlyRent')}
                aria-sort={sortField === 'monthlyRent' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="th-sort-inner">
                  <span>Monthly Rent</span>
                  {renderSortIndicator('monthlyRent')}
                </div>
              </th>

              <th
                className="sortable"
                style={{ width: '130px' }}
                onClick={() => handleSort('active')}
                aria-sort={sortField === 'active' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="th-sort-inner">
                  <span>Status</span>
                  {renderSortIndicator('active')}
                </div>
              </th>

              <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedStudios.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <div style={{ color: 'var(--charcoal-500)', fontSize: '0.92rem' }}>
                    {searchTerm
                      ? `No studios matching "${searchTerm}" with status filter "${statusFilter}".`
                      : 'No studio records found.'}
                  </div>
                </td>
              </tr>
            ) : (
              processedStudios.map((studio) => (
                <tr key={studio.id}>
                  <td>
                    <span className="col-id">#{studio.id}</span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: 'var(--terracotta-subtle)',
                          color: 'var(--terracotta-500)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Building2 size={15} />
                      </div>
                      <span className="col-studio-name">{studio.studioName}</span>
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <User size={14} style={{ color: 'var(--charcoal-400)' }} />
                      <span>{studio.ownerName}</span>
                    </div>
                  </td>

                  <td>
                    <span className="col-rent">{formatINR(studio.monthlyRent)}</span>
                  </td>

                  <td>
                    <span
                      className={`badge-status ${
                        studio.active ? 'badge-status-active' : 'badge-status-inactive'
                      }`}
                    >
                      {studio.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn-icon-subtle"
                        title="View details"
                        onClick={() => setViewingStudio(studio)}
                        aria-label={`View details for ${studio.studioName}`}
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        type="button"
                        className="btn-icon-subtle"
                        title="Edit studio"
                        onClick={() => navigate(`/studios/${studio.id}/edit`)}
                        aria-label={`Edit ${studio.studioName}`}
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        type="button"
                        className="btn-icon-subtle btn-delete"
                        title="Delete studio"
                        onClick={() => setDeletingStudio(studio)}
                        aria-label={`Delete ${studio.studioName}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="table-footer">
        <div>
          Showing <strong>{processedStudios.length}</strong> of <strong>{totalCount}</strong> recorded studios
        </div>
        <div>
          Currency format: Indian Rupee (₹) • Sorted by <strong>{sortField}</strong> ({sortDirection.toUpperCase()})
        </div>
      </div>

      {/* View Modal */}
      <ViewStudioModal
        isOpen={Boolean(viewingStudio)}
        studio={viewingStudio}
        onClose={() => setViewingStudio(null)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deletingStudio)}
        title="Delete Art Studio"
        studioName={deletingStudio?.studioName}
        studioId={deletingStudio?.id}
        isProcessing={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingStudio(null)}
      />
    </div>
  );
};

export default StudioTable;
