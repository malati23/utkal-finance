import React from 'react';
import { ValidationMessage } from './ValidationMessage';
import { ChevronDown } from 'lucide-react';

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  required = false,
  error,
  disabled = false,
  icon: Icon,
  helperText,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-xs font-bold text-slate-700 tracking-wide">
          {label}
          {required && <span className="text-rose-500 ml-1 font-extrabold">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <select
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          disabled={disabled}
          className={`w-full text-xs font-medium rounded-xl border transition-all duration-200 outline-none appearance-none cursor-pointer
            ${Icon ? 'pl-10' : 'pl-3.5'} pr-10 py-2.5
            ${
              error
                ? 'border-rose-400 bg-rose-50/40 text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : disabled
                ? 'border-slate-200 bg-slate-100/80 text-slate-600 cursor-not-allowed'
                : 'border-slate-300/90 bg-white text-slate-900 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15'
            }
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {helperText && !error && (
        <p className="text-[11px] text-slate-500 font-normal">{helperText}</p>
      )}

      <ValidationMessage message={error} />
    </div>
  );
}
