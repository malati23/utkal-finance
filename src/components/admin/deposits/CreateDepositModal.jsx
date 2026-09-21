import React, { useState, useEffect } from 'react';
import {
  X,
  PiggyBank,
  User,
  CreditCard,
  Calendar,
  Layers,
  FileText,
  AlertCircle,
  PlusCircle,
  CheckCircle2,
  Percent,
  Clock,
} from 'lucide-react';
import { generateDepositId } from '../../../utils/depositStorage';

export function CreateDepositModal({
  isOpen,
  onClose,
  members = [],
  onCreateDeposit,
}) {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [depositType, setDepositType] = useState('Fixed Deposit');
  const [amount, setAmount] = useState('');
  const [depositDate, setDepositDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [tenure, setTenure] = useState('12 Months');
  const [interestRate, setInterestRate] = useState('8.25%');
  const [maturityDate, setMaturityDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay)');
  const [utrNo, setUtrNo] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Active');

  const [errorMsg, setErrorMsg] = useState('');

  // Auto-calculate default maturity date whenever depositDate or tenure changes
  useEffect(() => {
    if (!depositDate) return;
    const dateObj = new Date(depositDate);
    if (isNaN(dateObj.getTime())) return;

    let monthsToAdd = 12;
    if (tenure.includes('6 Months')) monthsToAdd = 6;
    else if (tenure.includes('12 Months')) monthsToAdd = 12;
    else if (tenure.includes('24 Months')) monthsToAdd = 24;
    else if (tenure.includes('36 Months')) monthsToAdd = 36;
    else if (tenure.includes('60 Months')) monthsToAdd = 60;

    dateObj.setMonth(dateObj.getMonth() + monthsToAdd);
    setMaturityDate(dateObj.toISOString().split('T')[0]);
  }, [depositDate, tenure]);

  // Pre-select first member if available and none selected
  useEffect(() => {
    if (isOpen && members.length > 0 && !selectedMemberId) {
      setSelectedMemberId(members[0].memberId || members[0].id || '');
    }
  }, [isOpen, members, selectedMemberId]);

  if (!isOpen) return null;

  // Selected member object preview
  const selectedMember = members.find(
    (m) => m.memberId === selectedMemberId || m.id === selectedMemberId
  );

  const memberName = selectedMember?.applicantName || selectedMember?.name || '';
  const memberId = selectedMember?.memberId || selectedMember?.id || '';
  const appId = selectedMember?.applicationId || selectedMember?.app?.id || 'N/A';
  const email = selectedMember?.email || 'N/A';
  const mobile = selectedMember?.mobile || 'N/A';
  const branch = selectedMember?.branch || 'Bhubaneswar HQ';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedMember || !memberId) {
      setErrorMsg('Please select an existing approved member.');
      return;
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg('Please enter a valid deposit amount greater than ₹0.');
      return;
    }

    const generatedUtr = utrNo.trim() || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const depositId = generateDepositId();

    const formattedDepositDate = new Date(depositDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const formattedMaturityDate = maturityDate
      ? new Date(maturityDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'N/A';

    const newDepositData = {
      depositId,
      id: depositId,
      memberId,
      applicantName: memberName,
      memberName,
      email,
      mobile,
      applicationId: appId,
      branch,
      depositType,
      amount: numericAmount,
      duration: tenure,
      interestRate,
      depositDate: formattedDepositDate,
      startDate: depositDate,
      maturityDate: formattedMaturityDate,
      paymentMethod,
      paymentId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      transactionId: generatedUtr,
      utrNo: generatedUtr,
      status,
      notes: notes.trim(),
    };

    onCreateDeposit(newDepositData);
    onClose();

    // Reset form fields
    setAmount('');
    setUtrNo('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 animate-fade-in border border-slate-200">
        {/* HEADER */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                Create Member Deposit
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Issue a new term/savings deposit account for an approved member
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700 font-bold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. MEMBER SELECTION */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Select Approved Member <span className="text-rose-500">*</span></span>
            </label>

            {members.length > 0 ? (
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                required
              >
                {members.map((m) => {
                  const mId = m.memberId || m.id;
                  const mName = m.applicantName || m.name;
                  return (
                    <option key={mId} value={mId}>
                      {mName} ({mId})
                    </option>
                  );
                })}
              </select>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
                No approved members found in Member Management. Please approve a member application first.
              </div>
            )}

            {/* AUTO-DISPLAY MEMBER DETAILS CARD */}
            {selectedMember && (
              <div className="mt-3 bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Member Verified</span>
                  </span>
                  <span className="font-mono text-[11px] font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {memberId}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-slate-500 block font-semibold">Name</span>
                    <span className="font-bold text-slate-900 block truncate">{memberName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">App ID</span>
                    <span className="font-mono text-slate-800 block truncate">{appId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Email</span>
                    <span className="text-slate-800 block truncate">{email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Mobile</span>
                    <span className="font-mono text-slate-800 block truncate">{mobile}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. DEPOSIT TYPE & AMOUNT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Deposit Type</span>
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

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>Amount (₹) <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 50000"
                min="100"
                step="100"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                required
              />
            </div>
          </div>

          {/* 3. DATE, TENURE, INTEREST & MATURITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Deposit Date
              </label>
              <input
                type="date"
                value={depositDate}
                onChange={(e) => setDepositDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Tenure / Duration
              </label>
              <select
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months (1 Year)</option>
                <option value="24 Months">24 Months (2 Years)</option>
                <option value="36 Months">36 Months (3 Years)</option>
                <option value="60 Months">60 Months (5 Years)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Interest Rate
              </label>
              <input
                type="text"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="e.g. 8.25%"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Maturity Date
              </label>
              <input
                type="date"
                value={maturityDate}
                onChange={(e) => setMaturityDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* 4. PAYMENT METHOD & UTR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                <span>Payment Method</span>
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

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                UTR / Reference Number
              </label>
              <input
                type="text"
                value={utrNo}
                onChange={(e) => setUtrNo(e.target.value)}
                placeholder="Leave blank to auto-generate UTR"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-sans"
              />
            </div>
          </div>

          {/* 5. INITIAL STATUS & NOTES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-1">
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
                <option value="Matured">Matured</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Internal Admin Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Approved via Branch Cash Receipt REC-901"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={members.length === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0b1c3d] hover:bg-blue-900 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" />
              <span>Create Deposit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDepositModal;
