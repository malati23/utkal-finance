import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export function NoticePriorityBadge({ priority }) {
  const normalized = (priority || 'Normal').toLowerCase();

  switch (normalized) {
    case 'urgent':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
          <AlertTriangle className="w-3 h-3 text-rose-600" />
          <span>Urgent</span>
        </span>
      );
    case 'important':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          <span>Important</span>
        </span>
      );
    case 'normal':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
          <Info className="w-3 h-3 text-slate-500" />
          <span>Normal</span>
        </span>
      );
  }
}
