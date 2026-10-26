import React from 'react';

export const StatCard = ({
  label,
  value,
  icon: Icon,
  metaText,
  theme = 'default',
}) => {
  const iconClass =
    theme === 'active'
      ? 'stat-card-icon-wrap active-theme'
      : theme === 'inactive'
      ? 'stat-card-icon-wrap inactive-theme'
      : 'stat-card-icon-wrap';

  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <h4 className="stat-card-label">{label}</h4>
        {Icon && (
          <div className={iconClass}>
            <Icon size={20} strokeWidth={1.8} />
          </div>
        )}
      </div>

      <div>
        <div className="stat-card-value">{value}</div>
        {metaText && <div className="stat-card-meta">{metaText}</div>}
      </div>
    </div>
  );
};

export default StatCard;
