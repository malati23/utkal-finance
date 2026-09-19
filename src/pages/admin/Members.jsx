import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { MemberStats } from '../../components/admin/MemberStats';
import { MemberTable } from '../../components/admin/MemberTable';

export function Members() {
  const { members, updateMemberStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter members by search query and active/inactive status filter
  const filtered = members.filter((m) => {
    const memberId = m.memberId || m.id || '';
    const appId = m.applicationId || m.app?.id || '';
    const name = m.applicantName || m.name || '';
    const email = m.email || '';
    const mobile = m.mobile || '';

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      memberId.toLowerCase().includes(search.toLowerCase()) ||
      appId.toLowerCase().includes(search.toLowerCase()) ||
      mobile.includes(search) ||
      email.toLowerCase().includes(search.toLowerCase());

    let matchesStatus = true;
    if (filterStatus === 'Active') {
      matchesStatus = m.membershipStatus === 'Active';
    } else if (filterStatus === 'Inactive') {
      matchesStatus = m.membershipStatus === 'Inactive';
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Members</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Manage approved New Utkal Finance members.
        </p>
      </div>

      {/* MEMBER STATS CARDS */}
      <MemberStats members={members} />

      {/* FILTER & SEARCH CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* SEARCH FIELD */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members by ID, App ID, name, email..."
              className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            {['All', 'Active', 'Inactive'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#0b1c3d] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* MEMBER TABLE */}
        <MemberTable members={filtered} onToggleStatus={updateMemberStatus} />
      </div>
    </div>
  );
}

export default Members;
