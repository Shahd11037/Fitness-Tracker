import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function StatsCard({ title, value, trend = 12, trendType = 'up' }) {
  return (
    <div className="stats-card">
      <h2 className="stats-title">{title}</h2>
      <p className="stats-value">{value}</p>
      
      {trend && (
        <div className={`stats-trend ${trendType === 'up' ? 'stats-trend-up' : 'stats-trend-down'}`}>
          {trendType === 'up' ? (
            <FaArrowUp className="stats-trend-icon" size={12} />
          ) : (
            <FaArrowDown className="stats-trend-icon" size={12} />
          )}
          <span>{trend}% {trendType === 'up' ? 'increase' : 'decrease'}</span>
        </div>
      )}
    </div>
  );
}