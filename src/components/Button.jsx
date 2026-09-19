import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm active:scale-[0.98]';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 hover:shadow-blue-500/25 hover:shadow-lg',
    secondary:
      'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 hover:shadow-emerald-500/25 hover:shadow-lg',
    outline:
      'border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-500',
    dark: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-700 hover:shadow-slate-900/30 hover:shadow-lg',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400 shadow-none',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
