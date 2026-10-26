import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  title = 'Delete Art Studio',
  studioName = '',
  studioId = null,
  isProcessing = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isProcessing) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isProcessing, onCancel]);

  if (!isOpen) return null;

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
      aria-labelledby="confirm-dialog-title"
    >
      <div
        className="artistry-card"
        style={{
          maxWidth: '480px',
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
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-danger-bg)',
                color: 'var(--status-danger-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <h3
              id="confirm-dialog-title"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--charcoal-900)',
                margin: 0,
              }}
            >
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--charcoal-400)',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-xs)',
            }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--charcoal-700)', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: 1.5 }}>
            Are you sure you want to permanently delete this art studio from the database?
          </p>

          <div
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              border: '1px solid var(--charcoal-200)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--charcoal-500)', fontWeight: 600, letterSpacing: '0.04em' }}>
              Target Studio Record
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--charcoal-900)', fontSize: '1rem' }}>
                {studioName || 'Unnamed Studio'}
              </span>
              {studioId && (
                <span className="col-id" style={{ fontSize: '0.78rem' }}>
                  ID: #{studioId}
                </span>
              )}
            </div>
          </div>

          <p style={{ color: 'var(--charcoal-500)', fontSize: '0.82rem', margin: 0 }}>
            This action will issue a real <code>DELETE</code> request to the Spring Boot backend and remove the record permanently from PostgreSQL.
          </p>
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
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="btn-artistry-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="btn-artistry-danger"
          >
            <Trash2 size={15} />
            {isProcessing ? 'Deleting...' : 'Delete Studio'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
