import React from 'react';
import { CheckCircle2, Clock, XCircle, RotateCcw, ShieldCheck } from 'lucide-react';

export function PaymentStatusBadge({ status }) {
  const normalized = (status || 'Pending').trim().toLowerCase();

  if (normalized === 'paid' || normalized === 'successful' || normalized === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Paid</span>
      </span>
    );
  }

  if (normalized === 'pending' || normalized === 'pending verification') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span>Pending</span>
      </span>
    );
  }

  if (normalized === 'failed' || normalized === 'rejected') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>Failed</span>
      </span>
    );
  }

  if (normalized === 'refunded') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs">
        <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
        <span>Refunded</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
      <span>{status || 'Unknown'}</span>
    </span>
  );
}

export default PaymentStatusBadge;
