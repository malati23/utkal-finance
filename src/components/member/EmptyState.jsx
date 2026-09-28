import React from 'react';
import { Inbox } from 'lucide-react';

/**
 * Reusable EmptyState component for Member Portal
 * Used across tables, notifications, documents, and transaction logs.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'When new activities, records, or updates are processed, they will appear here.',
  actionText,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-dashed border-slate-200/90 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-4 shadow-2xs group-hover:scale-105 transition-transform">
        <Icon className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-xs text-slate-500 max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-xs cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
