import React, { useState } from 'react';
import { Search, Download, CheckCircle2, XCircle, FileText, UserPlus, Filter } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ApplicationTable } from '../../components/admin/ApplicationTable';

export function Applications() {
  const { applications, updateApplicationStatus } = useAdmin();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionType, setActionType] = useState(null); // 'Approve' or 'Reject'

  // Quick Add Member Bar toggle
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickForm, setQuickForm] = useState({
    name: '',
    email: '',
    mobile: '',
    city: 'Bhubaneswar',
    deposit: '25000',
  });

  // Calculate Stat Counts
  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === 'Pending').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length;
  const pendingKycCount = applications.filter(
    (a) => a.status === 'Pending' || a.status === 'Correction Required'
  ).length;

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.mobile.includes(search) ||
      app.email.toLowerCase().includes(search.toLowerCase());

    let matchesStatus = true;
    if (filterStatus === 'Submitted') {
      matchesStatus = app.status === 'Pending';
    } else if (filterStatus === 'Payment') {
      matchesStatus = app.status === 'Pending';
    } else if (filterStatus === 'PendingDocs') {
      matchesStatus = app.status === 'Correction Required' || app.status === 'Pending';
    } else if (filterStatus === 'Approved') {
      matchesStatus = app.status === 'Approved';
    } else if (filterStatus !== 'All') {
      matchesStatus = app.status.toLowerCase() === filterStatus.toLowerCase();
    }

    let matchesBranch = true;
    if (selectedBranch !== 'All Branches') {
      matchesBranch = (app.branch || '').toLowerCase().includes(selectedBranch.toLowerCase());
    }

    return matchesSearch && matchesStatus && matchesBranch;
  });

  const handleOpenModal = (app, type) => {
    setSelectedApp(app);
    setActionType(type);
  };

  const handleConfirmAction = () => {
    if (selectedApp && actionType) {
      const newStatus = actionType === 'Approve' ? 'Approved' : 'Rejected';
      updateApplicationStatus(selectedApp.id, newStatus);
      setSelectedApp(null);
      setActionType(null);
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert('No application records to export.');
      return;
    }
    const headers = ['Application ID', 'Applicant Name', 'Email', 'Mobile', 'Branch', 'Status', 'Date', 'Amount'];
    const rows = applications.map((a) => [
      a.id,
      `"${a.applicantName}"`,
      a.email,
      a.mobile,
      `"${a.branch}"`,
      a.status,
      a.date,
      a.totalPaid || 200,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Membership_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* QUICK ADD MEMBER BAR (Optional Expandable Top Banner) */}
      <div className="bg-[#0b1c3d] text-white rounded-2xl border border-blue-900 shadow-md p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400">
              <UserPlus className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase">QUICK ADD MEMBER BAR</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-800 text-blue-200">
                  ADMIN ACTION
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80 font-medium">
                Instantly enroll a new member into the core ledger with allocated Core Member ID
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="text-xs font-bold text-blue-300 hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-lg bg-white/10"
            >
              {showQuickAdd ? 'Hide Form' : 'Detailed Form'}
            </button>
          </div>
        </div>

        {showQuickAdd && (
          <div className="pt-3 border-t border-blue-900/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end">
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-blue-300 mb-1">
                FULL LEGAL NAME *
              </label>
              <input
                type="text"
                placeholder="e.g. Suman Mohanty"
                value={quickForm.name}
                onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                className="w-full bg-slate-950/80 border border-blue-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-blue-300 mb-1">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="e.g. suman@gmail.com"
                value={quickForm.email}
                onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                className="w-full bg-slate-950/80 border border-blue-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-blue-300 mb-1">
                MOBILE NUMBER
              </label>
              <input
                type="text"
                placeholder="+91 98610 xxxxx"
                value={quickForm.mobile}
                onChange={(e) => setQuickForm({ ...quickForm, mobile: e.target.value })}
                className="w-full bg-slate-950/80 border border-blue-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-blue-300 mb-1">
                HUB / CITY
              </label>
              <input
                type="text"
                placeholder="Bhubaneswar"
                value={quickForm.city}
                onChange={(e) => setQuickForm({ ...quickForm, city: e.target.value })}
                className="w-full bg-slate-950/80 border border-blue-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase text-blue-300 mb-1">
                INITIAL DEPOSIT
              </label>
              <input
                type="text"
                placeholder="25000"
                value={quickForm.deposit}
                onChange={(e) => setQuickForm({ ...quickForm, deposit: e.target.value })}
                className="w-full bg-slate-950/80 border border-blue-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuickForm({ name: '', email: '', mobile: '', city: 'Bhubaneswar', deposit: '25000' })}
                className="text-xs text-slate-400 hover:text-white px-2 py-1.5"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => alert('Quick Member enrollment feature available via full 9-step registration or statutory import.')}
                className="w-full bg-[#00C853] hover:bg-emerald-600 text-slate-950 font-extrabold text-xs py-2 px-3 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                + ADD MEMBER NOW
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Membership Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
              {pendingCount} Pending Review
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Administer statutory associate membership applications, verify KYC proofs, and allocate Member &amp; EMP IDs
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* 5 SUMMARY STAT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* CARD 1: TOTAL APPLICATIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs text-left space-y-1">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
            TOTAL APPLICATIONS
          </span>
          <div className="text-2xl font-black text-slate-900 font-mono">{totalCount}</div>
          <p className="text-[11px] text-slate-400 font-medium">All recorded dossiers</p>
        </div>

        {/* CARD 2: SUBMITTED / REVIEW */}
        <div className="bg-amber-50/40 rounded-2xl border border-amber-300 p-4 shadow-xs text-left space-y-1">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-700">
            SUBMITTED / REVIEW
          </span>
          <div className="text-2xl font-black text-amber-800 font-mono">{pendingCount}</div>
          <p className="text-[11px] text-amber-700 font-medium">Awaiting decision</p>
        </div>

        {/* CARD 3: PENDING KYC CHECK */}
        <div className="bg-indigo-50/30 rounded-2xl border border-indigo-200 p-4 shadow-xs text-left space-y-1">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-indigo-700">
            PENDING KYC CHECK
          </span>
          <div className="text-2xl font-black text-indigo-900 font-mono">{pendingKycCount}</div>
          <p className="text-[11px] text-indigo-600 font-medium">Unverified document cards</p>
        </div>

        {/* CARD 4: APPROVED MEMBERS */}
        <div className="bg-emerald-50/30 rounded-2xl border border-emerald-300 p-4 shadow-xs text-left space-y-1">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-700">
            APPROVED MEMBERS
          </span>
          <div className="text-2xl font-black text-emerald-800 font-mono">{approvedCount}</div>
          <p className="text-[11px] text-emerald-700 font-medium">Allocated UF-2026 IDs</p>
        </div>

        {/* CARD 5: REJECTED */}
        <div className="bg-rose-50/30 rounded-2xl border border-rose-200 p-4 shadow-xs text-left space-y-1">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-rose-700">
            REJECTED
          </span>
          <div className="text-2xl font-black text-rose-800 font-mono">{rejectedCount}</div>
          <p className="text-[11px] text-rose-600 font-medium">With recorded grounds</p>
        </div>
      </div>

      {/* FILTER TABS & CONTROLS BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* FILTER PILLS */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setFilterStatus('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'All'
                  ? 'bg-[#0b1c3d] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>All Applications</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${filterStatus === 'All' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'}`}>
                {totalCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('Payment')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'Payment'
                  ? 'bg-[#0b1c3d] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>Payment Verification</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-200 text-slate-800">
                {pendingCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('Submitted')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'Submitted'
                  ? 'bg-[#0b1c3d] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>New / Submitted</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-200 text-slate-800">
                {pendingCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('PendingDocs')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'PendingDocs'
                  ? 'bg-[#0b1c3d] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>Pending Docs</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-200 text-slate-800">
                {pendingKycCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('Approved')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterStatus === 'Approved'
                  ? 'bg-[#0b1c3d] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>Approved Members</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-200 text-slate-800">
                {approvedCount}
              </span>
            </button>
          </div>

          {/* SEARCH & BRANCH SELECTOR */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applications..."
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none transition-all cursor-pointer"
            >
              <option value="All Branches">All Branches</option>
              <option value="Bhubaneswar">Bhubaneswar HQ</option>
              <option value="Cuttack">Cuttack Branch</option>
              <option value="Berhampur">Berhampur Branch</option>
              <option value="Rourkela">Rourkela Branch</option>
              <option value="Sambalpur">Sambalpur Branch</option>
            </select>
          </div>
        </div>

        {/* APPLICATION TABLE */}
        <ApplicationTable
          applications={filtered}
          onApprove={(app) => handleOpenModal(app, 'Approve')}
          onReject={(app) => handleOpenModal(app, 'Reject')}
        />
      </div>

      {/* CONFIRMATION MODAL */}
      {selectedApp && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-md w-full space-y-5 animate-fade-in text-left">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  actionType === 'Approve'
                    ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                    : 'bg-rose-100 text-rose-600 border border-rose-200'
                }`}
              >
                {actionType === 'Approve' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {actionType} Application?
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedApp.id} • {selectedApp.applicantName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to <strong>{actionType.toLowerCase()}</strong> this statutory application? This will update member enrollment status immediately.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null);
                  setActionType(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-5 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer ${
                  actionType === 'Approve'
                    ? 'bg-[#00C853] hover:bg-emerald-600'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                Confirm {actionType}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;

