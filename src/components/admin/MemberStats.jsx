import React from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';

export function MemberStats({ members = [] }) {
  const total = members.length;
  const active = members.filter((m) => m.membershipStatus === 'Active').length;
  const inactive = members.filter((m) => m.membershipStatus === 'Inactive').length;

  // New members joined in current month/year
  const currentYear = new Date().getFullYear().toString();
  const newMembers = members.filter((m) => m.joiningDate && m.joiningDate.includes(currentYear)).length;

  const stats = [
    {
      label: 'TOTAL MEMBERS',
      value: total,
      subtext: 'Approved statutory members',
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50/80',
      borderColor: 'border-blue-100',
    },
    {
      label: 'ACTIVE MEMBERS',
      value: active,
      subtext: 'Good standing ledger',
      icon: UserCheck,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-100',
    },
    {
      label: 'INACTIVE MEMBERS',
      value: inactive,
      subtext: 'Deactivated accounts',
      icon: UserX,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50/80',
      borderColor: 'border-rose-100',
    },
    {
      label: 'NEW MEMBERS',
      value: newMembers,
      subtext: 'Enrolled this period',
      icon: UserPlus,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/80',
      borderColor: 'border-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all text-left space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MemberStats;
