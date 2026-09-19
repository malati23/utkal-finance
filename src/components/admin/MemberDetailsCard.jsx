import React from 'react';

export function MemberDetailsCard({ title, icon: Icon, sectionNo, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden text-left">
      <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          {Icon && <Icon className="w-4 h-4 text-blue-700" />}
          <span>{title}</span>
        </div>
        {sectionNo && <span className="text-xs font-bold text-slate-400 font-mono">{sectionNo}</span>}
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
}

export default MemberDetailsCard;
