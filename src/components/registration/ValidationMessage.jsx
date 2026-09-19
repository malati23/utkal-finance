import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ValidationMessage({ message }) {
  if (!message) return null;

  return (
    <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 mt-1.5 animate-shake">
      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
      <span>{message}</span>
    </p>
  );
}
