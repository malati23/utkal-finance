import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase();

  if (normalized === 'approved' || normalized === 'active' || normalized === 'verified' || normalized === 'successful') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>{status}</span>
      </span>
    );
  }

  if (normalized === 'pending' || normalized === 'pending verification') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-600" />
        <span>{status}</span>
      </span>
    );
  }

  if (normalized === 'under review') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
        <AlertTriangle className="w-3 h-3 text-blue-600" />
        <span>{status}</span>
      </span>
    );
  }

  if (normalized === 'rejected' || normalized === 'failed' || normalized === 'inactive') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
        <XCircle className="w-3 h-3 text-rose-600" />
        <span>{status}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
      <span>{status}</span>
    </span>
  );
}

export default StatusBadge;
