import React from 'react';

export function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  options = [], // for select type
  rows = 4, // for textarea type
  className = '',
  disabled = false,
  helperText,
}) {
  const isSelect = type === 'select';
  const isTextarea = type === 'textarea';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && !isTextarea && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}

        {isSelect ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full py-2.5 ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-8 bg-white border ${
              error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600'
            } rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-4 transition-all duration-150 appearance-none disabled:bg-slate-50`}
          >
            <option value="">{placeholder || 'Select option'}</option>
            {options.map((opt) => (
              <option key={opt.value || opt} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            ))}
          </select>
        ) : isTextarea ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full p-3.5 bg-white border ${
              error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600'
            } rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-4 transition-all duration-150 disabled:bg-slate-50`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full py-2.5 ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 bg-white border ${
              error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-600'
            } rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-4 transition-all duration-150 disabled:bg-slate-50`}
          />
        )}

        {isSelect && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
