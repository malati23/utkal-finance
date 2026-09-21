import React from 'react';
import { CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';

export function TransactionStatusBadge({ status }) {
  const normalized = (status || 'Completed').trim().toLowerCase();

  if (normalized === 'completed' || normalized === 'successful' || normalized === 'posted') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Completed</span>
      </span>
    );
  }

  if (normalized === 'pending' || normalized === 'in progress') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span>Pending</span>
      </span>
    );
  }

  if (normalized === 'failed' || normalized === 'declined') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>Failed</span>
      </span>
    );
  }

  if (normalized === 'reversed' || normalized === 'refunded') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs">
        <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
        <span>Reversed</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
      <span>{status || 'Unknown'}</span>
    </span>
  );
}

export default TransactionStatusBadge;
