import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div
      className="artistry-card"
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--terracotta-subtle)',
          color: 'var(--terracotta-500)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <Compass size={32} />
      </div>

      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--terracotta-500)',
          marginBottom: '0.25rem',
        }}
      >
        HTTP 404 Error
      </span>

      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.85rem',
          fontWeight: 600,
          color: 'var(--charcoal-900)',
          marginBottom: '0.5rem',
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: 'var(--charcoal-500)',
          fontSize: '0.92rem',
          maxWidth: '400px',
          marginBottom: '1.5rem',
          lineHeight: 1.5,
        }}
      >
        The art studio page or resource you are looking for does not exist or has been relocated.
      </p>

      <Link to="/" className="btn-artistry-primary">
        <ArrowLeft size={16} />
        <span>Return to Overview</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
