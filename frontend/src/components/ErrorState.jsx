import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
  title = 'Failed to communicate with Art Studio service',
  message = 'An error occurred while communicating with the backend. Please ensure the Spring Boot service is running.',
  onRetry,
}) => {
  return (
    <div
      className="artistry-card"
      style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft: '4px solid var(--status-danger-text)',
      }}
      role="alert"
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--status-danger-bg)',
          color: 'var(--status-danger-text)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          border: '1px solid var(--status-danger-border)',
        }}
      >
        <AlertCircle size={28} strokeWidth={2} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--charcoal-900)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: 'var(--charcoal-600)',
          fontSize: '0.9rem',
          maxWidth: '480px',
          marginBottom: '1.5rem',
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>

      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-artistry-secondary">
          <RefreshCw size={15} />
          Retry Connection
        </button>
      )}
    </div>
  );
};

export default ErrorState;
