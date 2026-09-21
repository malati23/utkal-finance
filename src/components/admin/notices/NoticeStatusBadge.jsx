import React from 'react';
import { CheckCircle2, Clock, Calendar, Archive } from 'lucide-react';

export function NoticeStatusBadge({ status }) {
  const normalized = (status || 'Draft').toLowerCase();

  switch (normalized) {
    case 'published':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Published</span>
        </span>
      );
    case 'scheduled':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
          <Calendar className="w-3 h-3 text-blue-600" />
          <span>Scheduled</span>
        </span>
      );
    case 'archived':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-600 border border-slate-300 shadow-2xs">
          <Archive className="w-3 h-3 text-slate-500" />
          <span>Archived</span>
        </span>
      );
    case 'draft':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>Draft</span>
        </span>
      );
  }
}
