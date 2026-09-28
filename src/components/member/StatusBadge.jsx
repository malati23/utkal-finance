import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

/**
 * Reusable StatusBadge component for Member Portal
 * Handles member statuses, payments, deposits, and document states.
 */
export function StatusBadge({ status, size = 'sm' }) {
  if (!status || status === '—' || status === '-') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
        <span>—</span>
      </span>
    );
  }

  const normalized = String(status).trim().toLowerCase();

  const sizeClasses = size === 'xs' 
    ? 'text-[10px] px-2 py-0.5' 
    : 'text-[11px] px-2.5 py-0.5';

  if (
    normalized === 'approved' ||
    normalized === 'active' ||
    normalized === 'verified' ||
    normalized === 'successful' ||
    normalized === 'completed'
  ) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses}`}>
        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
        <span className="capitalize">{status}</span>
      </span>
    );
  }

  if (
    normalized === 'pending' ||
    normalized === 'pending verification' ||
    normalized === 'under review' ||
    normalized === 'processing'
  ) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200/80 ${sizeClasses}`}>
        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
        <span className="capitalize">{status}</span>
      </span>
    );
  }

  if (
    normalized === 'unverified' ||
    normalized === 'not uploaded' ||
    normalized === 'action required'
  ) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold bg-orange-50 text-orange-700 border border-orange-200/80 ${sizeClasses}`}>
        <AlertTriangle className="w-3 h-3 text-orange-600 shrink-0" />
        <span className="capitalize">{status}</span>
      </span>
    );
  }

  if (
    normalized === 'rejected' ||
    normalized === 'failed' ||
    normalized === 'inactive' ||
    normalized === 'cancelled'
  ) {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-bold bg-rose-50 text-rose-700 border border-rose-200/80 ${sizeClasses}`}>
        <XCircle className="w-3 h-3 text-rose-600 shrink-0" />
        <span className="capitalize">{status}</span>
      </span>
    );
  }

  // Default fallback badge
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
      <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
      <span>{status}</span>
    </span>
  );
}

export default StatusBadge;
