import React from 'react';
import { Palette, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  title = 'No studios recorded yet',
  description = 'Your studio portfolio is currently empty. Add your first art workspace to manage tenancy, monthly lease rates, and active occupancies.',
  actionLabel = 'Add First Studio',
  actionTo = '/studios/new',
  onActionClick,
}) => {
  return (
    <div
      className="artistry-card"
      style={{
        padding: '3.5rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="region"
      aria-label="Empty state"
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
          border: '1px solid var(--terracotta-border)',
        }}
      >
        <Palette size={32} strokeWidth={1.75} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.45rem',
          fontWeight: 600,
          color: 'var(--charcoal-900)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: 'var(--charcoal-500)',
          fontSize: '0.92rem',
          maxWidth: '460px',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
        }}
      >
        {description}
      </p>

      {actionTo ? (
        <Link to={actionTo} className="btn-artistry-primary">
          <PlusCircle size={16} />
          {actionLabel}
        </Link>
      ) : onActionClick ? (
        <button type="button" onClick={onActionClick} className="btn-artistry-primary">
          <PlusCircle size={16} />
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
