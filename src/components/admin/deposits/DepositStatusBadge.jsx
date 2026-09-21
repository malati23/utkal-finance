import React from 'react';
import { Clock, CheckCircle2, ShieldCheck, Award, Lock, XCircle } from 'lucide-react';

export function DepositStatusBadge({ status }) {
  const normalized = (status || 'Pending').trim();

  switch (normalized) {
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active</span>
        </span>
      );

    case 'Approved':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Approved</span>
        </span>
      );

    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Pending</span>
        </span>
      );

    case 'Matured':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs">
          <Award className="w-3.5 h-3.5 text-purple-600" />
          <span>Matured</span>
        </span>
      );

    case 'Closed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Closed</span>
        </span>
      );

    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Rejected</span>
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
          <span>{status || 'Unknown'}</span>
        </span>
      );
  }
}

export default DepositStatusBadge;
