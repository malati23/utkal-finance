import React from 'react';

/**
 * Reusable MemberStatCard component
 * Displays key financial metrics and count summaries with elegant icons and subtle gradients.
 */
export function MemberStatCard({
  title,
  value = '₹0',
  icon: Icon,
  iconColor = 'text-blue-600 bg-blue-50 border-blue-100',
  subtitle,
  badge,
  badgeColor = 'bg-slate-100 text-slate-600',
  className = '',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-blue-300' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 block">
            {title}
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {value}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border ${iconColor} shadow-2xs`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || badge) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
          {subtitle && (
            <span className="text-slate-500 truncate">{subtitle}</span>
          )}
          {badge && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${badgeColor}`}
            >
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default MemberStatCard;
