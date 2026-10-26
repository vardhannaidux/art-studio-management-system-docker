import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Building2, PlusCircle, X, ExternalLink, Sparkles } from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Sidebar navigation">
      {/* Brand Header */}
      <div
        style={{
          padding: '1.5rem 1.5rem',
          borderBottom: '1px solid #232730',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: 'var(--terracotta-500)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(194, 94, 56, 0.35)',
            }}
          >
            <Sparkles size={20} strokeWidth={2} />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#FAF7F2',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              Artistry Studio
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: '#8E95A5',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 500,
                marginTop: '2px',
              }}
            >
              Studio Management
            </div>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          className="d-lg-none"
          style={{
            background: 'none',
            border: 'none',
            color: '#8E95A5',
            padding: '4px',
            cursor: 'pointer',
          }}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div
          style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#656D7E',
            fontWeight: 600,
            padding: '0 0.75rem 0.5rem 0.75rem',
          }}
        >
          Workspace
        </div>

        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/studios"
          end
          onClick={onClose}
          className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
        >
          <Building2 size={18} />
          <span>Studio Management</span>
        </NavLink>

        <NavLink
          to="/studios/new"
          onClick={onClose}
          className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
        >
          <PlusCircle size={18} />
          <span>Add Studio</span>
        </NavLink>
      </nav>

      {/* Backend Status & Swagger UI Link */}
      <div
        style={{
          padding: '1.25rem 1.25rem',
          borderTop: '1px solid #232730',
          backgroundColor: '#121418',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#34D399',
              boxShadow: '0 0 0 2px rgba(52, 211, 153, 0.2)',
            }}
          />
          <span style={{ fontSize: '0.78rem', color: '#B2B9C8', fontWeight: 500 }}>
            Spring Boot REST API
          </span>
        </div>
        <div style={{ fontSize: '0.73rem', color: '#6A7282', marginBottom: '0.65rem' }}>
          Port: 8081 • Service Online
        </div>
        <a
          href="http://localhost:8081/swagger-ui.html"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '0.74rem',
            color: 'var(--terracotta-400)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            textDecoration: 'none',
          }}
        >
          <span>OpenAPI / Swagger Docs</span>
          <ExternalLink size={12} />
        </a>
      </div>

      <style>{`
        .sidebar-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          color: #A6AFBF;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: all var(--transition-fast);
          position: relative;
        }

        .sidebar-nav-link:hover {
          color: #FAF7F2;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .sidebar-nav-link.active {
          color: #FFFFFF;
          background-color: rgba(194, 94, 56, 0.15);
          font-weight: 600;
        }

        .sidebar-nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 6px;
          bottom: 6px;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background-color: var(--terracotta-500);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
