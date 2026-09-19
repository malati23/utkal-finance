import React from 'react';

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignStyles = {
    center: 'text-center mx-auto max-w-3xl',
    left: 'text-left max-w-2xl',
    right: 'text-right ml-auto max-w-2xl',
  };

  return (
    <div className={`mb-12 ${alignStyles[align]} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 tracking-wide uppercase mb-3 shadow-xs">
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
