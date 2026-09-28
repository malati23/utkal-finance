import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable MemberPageHeader component
 * Displays title, contextual description, breadcrumb or status badge, and optional action buttons.
 */
export function MemberPageHeader({
  title,
  description,
  badge,
  breadcrumbs,
  children,
}) {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-200/80">
      <div className="space-y-1">
        {/* Optional Breadcrumb or Category Badge */}
        {breadcrumbs ? (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1">
            <Link to="/member-dashboard" className="hover:text-blue-700 transition-colors">
              Portal
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-blue-700 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-bold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : badge ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200/80 mb-1">
            {badge}
          </div>
        ) : null}

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Action buttons (e.g. Make a Deposit, Filter, Export) */}
      {children && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default MemberPageHeader;
