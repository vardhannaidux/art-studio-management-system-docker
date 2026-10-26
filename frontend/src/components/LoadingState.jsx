import React from 'react';

export const LoadingState = ({ message = 'Loading studio records...', rows = 4 }) => {
  return (
    <div className="artistry-card" style={{ padding: '2.5rem 2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '3px solid var(--charcoal-100)',
            borderTopColor: 'var(--terracotta-500)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span style={{ fontSize: '0.92rem', color: 'var(--charcoal-500)', fontWeight: 500 }}>
          {message}
        </span>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 0.9; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
