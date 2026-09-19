import React, { useState } from 'react';
import { ValidationMessage } from './ValidationMessage';
import { Eye, EyeOff } from 'lucide-react';

export function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  readOnly = false,
  icon: Icon,
  helperText,
  min,
  max,
  step,
  autoComplete,
  className = '',
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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

        <input
          id={name}
          name={name}
          type={inputType}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          min={min}
          max={max}
          step={step}
          autoComplete={autoComplete}
          className={`w-full text-xs font-medium rounded-xl border transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : 'pl-3.5'}
            ${isPassword ? 'pr-10' : 'pr-3.5'} py-2.5
            ${
              error
                ? 'border-rose-400 bg-rose-50/40 text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : readOnly || disabled
                ? 'border-slate-200 bg-slate-100/80 text-slate-600 cursor-not-allowed'
                : 'border-slate-300/90 bg-white text-slate-900 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15'
            }
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="text-[11px] text-slate-500 font-normal">{helperText}</p>
      )}

      <ValidationMessage message={error} />
    </div>
  );
}
