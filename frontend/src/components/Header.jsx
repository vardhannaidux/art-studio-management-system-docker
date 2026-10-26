import React from 'react';
import { Menu, Plus, RefreshCw, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = ({ onToggleSidebar, onRefresh, isRefreshing = false }) => {
  const location = useLocation();

  // Determine current page context
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/') {
      return {
        title: 'Portfolio Overview',
        subtitle: 'Key metrics, tenancy rates, and live operational distribution',
        showAdd: true,
      };
    }
    if (path === '/studios') {
      return {
        title: 'Studio Management',
        subtitle: 'Directory of all artistic studio facilities and tenancy leases',
        showAdd: true,
      };
    }
    if (path === '/studios/new') {
      return {
        title: 'Register Art Studio',
        subtitle: 'Add a new workspace to the studio management registry',
        breadcrumb: 'New Studio',
        showAdd: false,
      };
    }
    if (path.includes('/edit')) {
      return {
        title: 'Edit Art Studio',
        subtitle: 'Update rental parameters and tenancy status',
        breadcrumb: 'Edit Record',
        showAdd: false,
      };
    }
    return {
      title: 'Artistry Studio',
      subtitle: 'Studio Management Portal',
      showAdd: false,
    };
  };

  const info = getPageInfo();

  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="d-lg-none btn-icon-subtle"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Page Titles & Breadcrumb */}
        <div>
          {info.breadcrumb && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                color: 'var(--charcoal-500)',
                marginBottom: '0.15rem',
              }}
            >
              <Link to="/studios" style={{ color: 'var(--charcoal-500)', textDecoration: 'none' }}>
                Studios
              </Link>
              <ChevronRight size={12} />
              <span style={{ color: 'var(--charcoal-800)', fontWeight: 500 }}>
                {info.breadcrumb}
              </span>
            </div>
          )}

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 600,
              color: 'var(--charcoal-900)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {info.title}
          </h1>
          <p
            className="d-none d-md-block"
            style={{
              fontSize: '0.8rem',
              color: 'var(--charcoal-500)',
              margin: 0,
            }}
          >
            {info.subtitle}
          </p>
        </div>
      </div>

      {/* Header Context Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="btn-artistry-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            title="Refresh database records"
          >
            <RefreshCw
              size={14}
              style={{
                animation: isRefreshing ? 'spin 0.8s linear infinite' : 'none',
              }}
            />
            <span className="d-none d-sm-inline">
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </span>
          </button>
        )}

        {info.showAdd && (
          <Link
            to="/studios/new"
            className="btn-artistry-primary"
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
          >
            <Plus size={15} />
            <span>Add Studio</span>
          </Link>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};

export default Header;
