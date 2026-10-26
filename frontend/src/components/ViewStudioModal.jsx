import React from 'react';
import { X, Building2, User, IndianRupee, Activity, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ViewStudioModal = ({ isOpen, studio, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !studio) return null;

  const formattedRent = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(studio.monthlyRent || 0);

  const annualRent = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format((studio.monthlyRent || 0) * 12);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 26, 32, 0.6)',
        backdropFilter: 'blur(3px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="artistry-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--charcoal-200)',
          overflow: 'hidden',
          animation: 'fadeIn 0.15s ease-out',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--charcoal-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--terracotta-subtle)',
                color: 'var(--terracotta-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={18} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--charcoal-900)',
                  margin: 0,
                }}
              >
                Studio Details
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-500)' }}>
                Database Record #{studio.id}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--charcoal-400)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-xs)',
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--charcoal-500)', fontWeight: 600 }}>
              Studio Name
            </span>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--charcoal-900)', marginTop: '0.2rem' }}>
              {studio.studioName}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--charcoal-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--charcoal-500)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase' }}>
                <User size={14} /> Owner
              </div>
              <div style={{ fontWeight: 600, color: 'var(--charcoal-900)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                {studio.ownerName}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-surface-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--charcoal-100)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--charcoal-500)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase' }}>
                <Activity size={14} /> Tenancy Status
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <span className={`badge-status ${studio.active ? 'badge-status-active' : 'badge-status-inactive'}`}>
                  {studio.active ? 'Active Studio' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--terracotta-50)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--terracotta-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--terracotta-700)', fontWeight: 600 }}>
                  Monthly Rent Rate
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal-900)', marginTop: '0.15rem' }}>
                  {formattedRent}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-500)', fontWeight: 500 }}>
                  Annualized Run-Rate
                </span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal-700)' }}>
                  {annualRent}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--bg-surface-subtle)',
            borderTop: '1px solid var(--charcoal-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.75rem',
          }}
        >
          <button type="button" onClick={onClose} className="btn-artistry-secondary">
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(`/studios/${studio.id}/edit`);
            }}
            className="btn-artistry-primary"
          >
            <Edit3 size={15} />
            Edit Studio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudioModal;
