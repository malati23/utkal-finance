import React, { useState, useEffect } from 'react';
import {
  X,
  PiggyBank,
  User,
  CreditCard,
  Receipt,
  Building2,
  Calendar,
  Layers,
  ShieldCheck,
  AlertCircle,
  FileText,
  Clock,
  Edit3,
  CheckCircle2,
  RotateCcw,
  Save,
  History,
  Lock,
} from 'lucide-react';
import { DepositStatusBadge } from './DepositStatusBadge';

export function DepositDetailsModal({
  deposit,
  isOpen,
  onClose,
  members = [],
  payments = [],
  onUpdateDepositRecord,
  onUpdateStatus,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Editable form state fields
  const [depositType, setDepositType] = useState('');
  const [amount, setAmount] = useState('');
  const [depositDate, setDepositDate] = useState('');
  const [maturityDate, setMaturityDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [utrNo, setUtrNo] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  // Reset/populate edit form fields when deposit or modal open changes
  useEffect(() => {
    if (deposit) {
      setDepositType(deposit.depositType || 'Fixed Deposit');
      setAmount(deposit.amount !== undefined ? String(deposit.amount) : '');

      // Parse dates for HTML date inputs
      let rawStartDate = deposit.startDate || deposit.depositDate || '';
      if (rawStartDate && !rawStartDate.includes('-')) {
        const parsed = new Date(rawStartDate);
        if (!isNaN(parsed.getTime())) {
          rawStartDate = parsed.toISOString().split('T')[0];
        }
      }
      setDepositDate(rawStartDate);

      let rawMaturityDate = deposit.maturityDate || '';
      if (rawMaturityDate && !rawMaturityDate.includes('-')) {
        const parsed = new Date(rawMaturityDate);
        if (!isNaN(parsed.getTime())) {
          rawMaturityDate = parsed.toISOString().split('T')[0];
        }
      }
      setMaturityDate(rawMaturityDate);

      setPaymentMethod(deposit.paymentMethod || 'UPI (Google Pay)');
      setUtrNo(deposit.utrNo || deposit.transactionId || '');
      setStatus(deposit.status || 'Active');
      setNotes(deposit.notes || '');
    }
    setIsEditing(false);
    setSuccessMsg('');
    setErrorMsg('');
  }, [deposit, isOpen]);

  if (!isOpen || !deposit) return null;

  const depId = deposit.depositId || deposit.id || 'Not available';
  const currentDepType = deposit.depositType || 'Not available';
  const currentAmount = deposit.amount !== undefined ? `₹${Number(deposit.amount).toLocaleString('en-IN')}` : 'Not available';
  const duration = deposit.duration || deposit.tenure || 'Not available';
  const startDate = deposit.startDate || deposit.depositDate || 'Not available';
  const currentMaturityDate = deposit.maturityDate || 'Not available';
  const currentStatus = deposit.status || 'Pending';
  const branch = deposit.branch || 'Bhubaneswar HQ';
  const interestRate = deposit.interestRate || 'Not available';

  // Find linked member from existing member records
  const linkedMember = members.find(
    (m) =>
      (m.memberId && m.memberId === deposit.memberId) ||
      (m.id && m.id === deposit.memberId) ||
      (m.applicantName && m.applicantName.toLowerCase() === (deposit.applicantName || '').toLowerCase())
  );

  const memberId = linkedMember?.memberId || deposit.memberId || 'Not available';
  const memberName = linkedMember?.applicantName || linkedMember?.name || deposit.applicantName || deposit.memberName || 'Not available';

  // Find linked payment from existing payment records
  const linkedPayment = payments.find(
    (p) =>
      (deposit.paymentId && p.txnId === deposit.paymentId) ||
      (deposit.utrNo && p.utr === deposit.utrNo) ||
      (deposit.transactionId && p.txnId === deposit.transactionId) ||
      (deposit.depositId && p.appId === deposit.depositId)
  );

  const txnId = deposit.transactionId || deposit.utrNo || linkedPayment?.txnId || null;
  const currentUtrNo = deposit.utrNo || linkedPayment?.utr || null;
  const auditLogs = Array.isArray(deposit.history) ? deposit.history : [];

  const handleStartEdit = () => {
    setIsEditing(true);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMsg('');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // 1. Validate amount > 0
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Deposit amount must be a valid number greater than ₹0.');
      return;
    }

    // 2. Validate maturity date >= deposit date
    if (depositDate && maturityDate) {
      const d1 = new Date(depositDate);
      const d2 = new Date(maturityDate);
      if (!isNaN(d1.getTime()) && !isNaN(d2.getTime()) && d2 < d1) {
        setErrorMsg('Maturity date cannot be earlier than the deposit start date.');
        return;
      }
    }

    // 3. Validate UTR/reference number required for electronic payment methods
    const requiresUtr = ['UPI', 'Net Banking', 'Razorpay', 'IMPS', 'Cheque'].some((m) =>
      paymentMethod.toLowerCase().includes(m.toLowerCase())
    );
    if (requiresUtr && !utrNo.trim()) {
      setErrorMsg(`UTR / Reference number is required for ${paymentMethod}.`);
      return;
    }

    // Format display dates
    const formattedDepositDate = depositDate.includes('-')
      ? new Date(depositDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : depositDate;

    const formattedMaturityDate = maturityDate.includes('-')
      ? new Date(maturityDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : maturityDate;

    const updatedFields = {
      depositType,
      amount: numAmount,
      startDate: depositDate,
      depositDate: formattedDepositDate,
      maturityDate: formattedMaturityDate,
      paymentMethod,
      utrNo: utrNo.trim(),
      transactionId: utrNo.trim() || deposit.transactionId,
      status,
      notes: notes.trim(),
    };

    if (onUpdateDepositRecord) {
      onUpdateDepositRecord(depId, updatedFields);
    } else if (onUpdateStatus && status !== currentStatus) {
      onUpdateStatus(depId, status);
    }

    setSuccessMsg('Deposit updated successfully.');
    setIsEditing(false);

    // Auto clear success message after 4 seconds
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-fade-in border border-slate-200">
        {/* MODAL HEADER */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {isEditing ? 'Edit Deposit Record' : 'Deposit Details'}
                </h2>
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {depId}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {isEditing
                  ? 'Update deposit terms, payment method, dates and status'
                  : 'Detailed deposit statement & connected member account information'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Deposit</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-bold animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {isEditing ? (
            /* ================= EDIT MODE FORM ================= */
            <form onSubmit={handleSaveChanges} className="space-y-5">
              {/* READ-ONLY INFORMATIONAL BANNER */}
              <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Account Identifiers (Read-Only)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-500 block font-semibold">Deposit ID</span>
                    <span className="font-mono font-bold text-slate-900">{depId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Member ID</span>
                    <span className="font-mono font-bold text-slate-900">{memberId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Member Name</span>
                    <span className="font-bold text-slate-900">{memberName}</span>
                  </div>
                </div>
              </div>

              {/* EDITABLE FIELDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* DEPOSIT TYPE */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Deposit Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={depositType}
                    onChange={(e) => setDepositType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Fixed Deposit">Fixed Deposit (FD)</option>
                    <option value="Recurring Deposit">Recurring Deposit (RD)</option>
                    <option value="Savings Deposit">Savings Deposit (BSBDA)</option>
                    <option value="Term Deposit">Term Deposit</option>
                  </select>
                </div>

                {/* AMOUNT */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Deposit Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="100"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* DEPOSIT DATE */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Deposit Date
                  </label>
                  <input
                    type="date"
                    value={depositDate}
                    onChange={(e) => setDepositDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  />
                </div>

                {/* MATURITY DATE */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Maturity Date
                  </label>
                  <input
                    type="date"
                    value={maturityDate}
                    onChange={(e) => setMaturityDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  />
                </div>

                {/* PAYMENT METHOD */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="UPI (Google Pay)">UPI (Google Pay / PhonePe / Paytm)</option>
                    <option value="Razorpay / Net Banking">Razorpay / Net Banking</option>
                    <option value="Branch Cash">Branch Cash Receipt</option>
                    <option value="Cheque / DD">Cheque / Demand Draft</option>
                    <option value="IMPS / NEFT">Bank Transfer (IMPS / NEFT)</option>
                  </select>
                </div>

                {/* UTR / REFERENCE NUMBER */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    UTR / Transaction Reference
                  </label>
                  <input
                    type="text"
                    value={utrNo}
                    onChange={(e) => setUtrNo(e.target.value)}
                    placeholder="Enter UTR or bank reference"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* DEPOSIT STATUS */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Deposit Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Matured">Matured</option>
                    <option value="Closed">Closed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* ADMIN NOTES */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Admin Notes & Remarks
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Add audit notes or update remarks..."
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            /* ================= VIEW MODE DETAILS ================= */
            <>
              {/* SECTION 1: DEPOSIT INFORMATION */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <PiggyBank className="w-4 h-4 text-blue-600" />
                    <span>Deposit Information</span>
                  </div>
                  <DepositStatusBadge status={currentStatus} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block font-semibold">Deposit ID</span>
                    <span className="font-mono font-bold text-slate-900">{depId}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Deposit Type</span>
                    <span className="font-bold text-slate-900">{currentDepType}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Deposit Amount</span>
                    <span className="font-black text-slate-900 text-sm">{currentAmount}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Duration / Tenure</span>
                    <span className="font-bold text-slate-900">{duration}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Interest Rate</span>
                    <span className="font-bold text-slate-900">{interestRate}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Branch</span>
                    <span className="font-bold text-slate-900">{branch}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Start / Deposit Date</span>
                    <span className="font-medium text-slate-800">{startDate}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Maturity Date</span>
                    <span className="font-medium text-slate-800">{currentMaturityDate}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Status</span>
                    <span className="font-bold text-slate-900">{currentStatus}</span>
                  </div>
                </div>

                {deposit.notes && (
                  <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                    <span className="font-semibold text-slate-500 block">Admin Notes</span>
                    <p className="mt-0.5 font-medium italic text-slate-800">{deposit.notes}</p>
                  </div>
                )}
              </div>

              {/* SECTION 2: MEMBER INFORMATION */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Member Information</span>
                </div>

                {linkedMember || deposit.applicantName || deposit.memberId ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block font-semibold">Member ID</span>
                      <span className="font-mono font-bold text-slate-900">{memberId}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Full Name</span>
                      <span className="font-bold text-slate-900">{memberName}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Email</span>
                      <span className="font-medium text-slate-800">
                        {linkedMember?.email || deposit.email || 'Not available'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Mobile</span>
                      <span className="font-mono text-slate-900 font-medium">
                        {linkedMember?.mobile || deposit.mobile || 'Not available'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Branch</span>
                      <span className="font-medium text-slate-800">
                        {linkedMember?.branch || deposit.branch || 'Not available'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Membership Status</span>
                      <span className="font-bold text-slate-900">
                        {linkedMember?.status || linkedMember?.membershipStatus || 'Active Member'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-xs text-amber-800 font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Member information unavailable</span>
                  </div>
                )}
              </div>

              {/* SECTION 3: PAYMENT & TRANSACTION INFORMATION */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Payment & Transaction Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block font-semibold">Payment ID</span>
                    <span className="font-mono font-bold text-slate-900">
                      {deposit.paymentId || linkedPayment?.txnId || 'Not available'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Payment Method</span>
                    <span className="font-bold text-slate-900">
                      {deposit.paymentMethod || linkedPayment?.method || 'Not available'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">UTR / Ref Number</span>
                    <span className="font-mono font-medium text-slate-900">
                      {currentUtrNo || 'Not available'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Payment Status</span>
                    <span className="font-bold text-slate-900">
                      {linkedPayment?.status || deposit.paymentStatus || 'Successful'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Payment Date</span>
                    <span className="font-medium text-slate-800">
                      {linkedPayment?.date || startDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: AUDIT HISTORY LOG */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <History className="w-4 h-4 text-purple-600" />
                  <span>Audit & Change Log History</span>
                </div>

                {auditLogs.length > 0 ? (
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {auditLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-slate-200/90 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 block">
                            Field Changed: <span className="text-blue-700">{log.field}</span>
                          </span>
                          <div className="text-slate-600 text-[11px] flex items-center gap-1.5 flex-wrap">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 line-through">
                              {log.oldValue}
                            </span>
                            <span>→</span>
                            <span className="bg-emerald-50 text-emerald-800 font-semibold px-1.5 py-0.5 rounded border border-emerald-200">
                              {log.newValue}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400 font-medium text-left sm:text-right shrink-0">
                          <div>{log.changedAt}</div>
                          <div className="text-slate-500 font-semibold">By: {log.changedBy || 'Admin'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-500 font-medium italic">
                    No previous edits or status changes recorded.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          {!isEditing && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Deposit</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="ml-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositDetailsModal;
