import React from 'react';

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeMap[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs animate-pulse">
      <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
      <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-2" />
      <div className="h-4 bg-slate-200 rounded-md w-1/2 mb-4" />
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
        <div className="h-3 bg-slate-200 rounded w-4/6" />
      </div>
      <div className="h-10 bg-slate-200 rounded-xl w-full" />
    </div>
  );
}
