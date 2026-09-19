import React from 'react';

export function FormSection({ title, subtitle, rightAction, children, className = '' }) {
  return (
    <div className={`space-y-5 ${className}`}>
      {(title || rightAction) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            {title && (
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {rightAction && <div className="shrink-0">{rightAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
