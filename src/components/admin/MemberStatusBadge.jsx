import React from 'react';

export function MemberStatusBadge({ status }) {
  const isInactive = status === 'Inactive';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${
        isInactive
          ? 'bg-rose-50 text-rose-700 border-rose-200'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isInactive ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
      {status || 'Active'}
    </span>
  );
}

export default MemberStatusBadge;
