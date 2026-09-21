import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  User,
  CreditCard,
  PiggyBank,
  CheckCircle2,
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Edit3,
  Save,
  History,
  Lock,
} from 'lucide-react';
import { TransactionStatusBadge } from './TransactionStatusBadge';

export function TransactionDetailsModal({
  transaction,
  isOpen,
  onClose,
  members = [],
  deposits = [],
  payments = [],
  onUpdateTransactionRecord,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Editable Form Fields
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState('Credit');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [utrNo, setUtrNo] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (transaction) {
      setType(transaction.type || 'Payment');
      setDescription(transaction.description || 'Ledger entry');
      setAmount(transaction.amount !== undefined ? String(transaction.amount) : '');
      setDirection(transaction.direction || 'Credit');
      setPaymentMethod(transaction.paymentMethod || 'UPI (Google Pay)');
      setUtrNo(transaction.utrNo || transaction.transactionId || '');
      setStatus(transaction.status || 'Completed');
      setNotes(transaction.notes || '');
    }
    setIsEditing(false);
    setSuccessMsg('');
    setErrorMsg('');
  }, [transaction, isOpen]);

  if (!isOpen || !transaction) return null;

  const tId = transaction.txnId || transaction.transactionId || transaction.id || 'Not available';
  const currentType = transaction.type || 'Transaction';
  const currentDesc = transaction.description || 'Ledger Entry';
  const currentAmount = transaction.amount !== undefined ? `₹${Number(transaction.amount).toLocaleString('en-IN')}` : 'Not available';
  const currentDirection = transaction.direction || 'Credit';
  const isCredit = currentDirection.toLowerCase() === 'credit';
  const currentMethod = transaction.paymentMethod || 'Not available';
  const currentDate = transaction.date || 'Not available';
  const currentUtr = transaction.utrNo || transaction.transactionId || 'Not available';
  const currentStatus = transaction.status || 'Completed';

  const pId = transaction.paymentId || null;
  const depId = transaction.depositId || null;
  const appId = transaction.applicationId || null;
  const auditLogs = Array.isArray(transaction.history) ? transaction.history : [];

  // Find linked member
  const linkedMember = members.find(
    (m) =>
      (m.memberId && m.memberId === transaction.memberId) ||
      (m.id && m.id === transaction.memberId) ||
      (m.applicantName && m.applicantName.toLowerCase() === (transaction.memberName || '').toLowerCase())
  );

  const memberId = linkedMember?.memberId || transaction.memberId || 'N/A';
  const memberName = linkedMember?.applicantName || linkedMember?.name || transaction.memberName || 'Member information unavailable';

  // Find linked deposit
  const linkedDeposit = deposits.find(
    (d) => (d.depositId && d.depositId === depId) || (d.id && d.id === depId)
  );

  // Find linked payment
  const linkedPayment = payments.find(
    (p) => (p.paymentId && p.paymentId === pId) || (p.id && p.id === pId) || (p.txnId && p.txnId === pId)
  );

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

    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Transaction amount must be a valid number greater than ₹0.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('Transaction description cannot be empty.');
      return;
    }

    const updatedFields = {
      type,
      description: description.trim(),
      amount: numAmount,
      direction,
      paymentMethod,
      utrNo: utrNo.trim(),
      transactionId: utrNo.trim() || transaction.transactionId,
      status,
      notes: notes.trim(),
    };

    if (onUpdateTransactionRecord) {
      onUpdateTransactionRecord(tId, updatedFields);
    }

    setSuccessMsg('Transaction updated successfully.');
    setIsEditing(false);

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-0 sm:my-8 animate-fade-in border border-slate-200">
        {/* MODAL HEADER */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {isEditing ? 'Edit Financial Transaction' : 'Transaction Details'}
                </h2>
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {tId}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Financial ledger statement &amp; connected account records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
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
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto">
          {isEditing ? (
            /* ================= EDIT MODE FORM ================= */
            <form onSubmit={handleSaveChanges} className="space-y-5">
              {/* READ-ONLY BANNER */}
              <div className="bg-slate-100 rounded-2xl border border-slate-200 p-4 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ledger Identifiers (Read-Only)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block font-semibold">Transaction ID</span>
                    <span className="font-mono font-bold text-slate-900">{tId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Member ID</span>
                    <span className="font-mono font-bold text-slate-900">{memberId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-semibold">Member Identity</span>
                    <span className="font-bold text-slate-900">{memberName}</span>
                  </div>
                </div>
              </div>

              {/* EDITABLE FIELDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* TYPE */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Transaction Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Deposit">Deposit</option>
                    <option value="Payment">Payment</option>
                    <option value="Withdrawal">Withdrawal</option>
                    <option value="Refund">Refund</option>
                    <option value="Fee">Fee</option>
                  </select>
                </div>

                {/* DIRECTION */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Direction (Credit / Debit)
                  </label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Credit">Credit (+ Incoming)</option>
                    <option value="Debit">Debit (- Outgoing)</option>
                  </select>
                </div>

                {/* AMOUNT */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Amount (₹) <span className="text-rose-500">*</span>
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

                {/* DESCRIPTION */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Transaction description"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>

                {/* UTR */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    UTR / Reference Number
                  </label>
                  <input
                    type="text"
                    value={utrNo}
                    onChange={(e) => setUtrNo(e.target.value)}
                    placeholder="Enter UTR reference"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* STATUS */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Ledger Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Reversed">Reversed</option>
                  </select>
                </div>

                {/* NOTES */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Admin Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Add operational notes..."
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
              {/* SECTION 1: TRANSACTION STATEMENT */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span>Ledger Statement</span>
                  </div>
                  <TransactionStatusBadge status={currentStatus} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block font-semibold">Transaction ID</span>
                    <span className="font-mono font-bold text-slate-900">{tId}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Transaction Type</span>
                    <span className="font-bold text-slate-900">{currentType}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Description</span>
                    <span className="font-bold text-slate-900">{currentDesc}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Amount</span>
                    <span
                      className={`font-mono font-black text-sm flex items-center gap-1 ${
                        isCredit ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      )}
                      {isCredit ? '+' : '-'}{currentAmount}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Direction</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                        isCredit ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {currentDirection}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Payment Method</span>
                    <span className="font-bold text-slate-900">{currentMethod}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">UTR / Reference</span>
                    <span className="font-mono font-medium text-slate-900">{currentUtr}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Date &amp; Time</span>
                    <span className="font-medium text-slate-800">{currentDate}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Status</span>
                    <span className="font-bold text-slate-900">{currentStatus}</span>
                  </div>
                </div>

                {transaction.notes && (
                  <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                    <span className="font-semibold text-slate-500 block">Admin Notes</span>
                    <p className="mt-0.5 font-medium italic text-slate-800">{transaction.notes}</p>
                  </div>
                )}
              </div>

              {/* SECTION 2: MEMBER INFORMATION */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Member Information</span>
                </div>

                {linkedMember || transaction.memberName || transaction.memberId ? (
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
                        {linkedMember?.email || 'Not available'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Mobile</span>
                      <span className="font-mono text-slate-900 font-medium">
                        {linkedMember?.mobile || 'Not available'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Branch</span>
                      <span className="font-medium text-slate-800">
                        {linkedMember?.branch || 'Bhubaneswar HQ'}
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

              {/* SECTION 3: RELATED INFORMATION (PAYMENT & DEPOSIT LINKS) */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Related System Records</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-semibold mb-1 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                      <span>Related Payment</span>
                    </span>
                    {pId ? (
                      <span className="font-mono font-bold text-blue-700 text-xs block">{pId}</span>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Not linked to a payment</span>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-semibold mb-1 flex items-center gap-1">
                      <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Related Deposit</span>
                    </span>
                    {depId ? (
                      <span className="font-mono font-bold text-emerald-700 text-xs block">{depId}</span>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Not linked to a deposit</span>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block font-semibold mb-1 flex items-center gap-1">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Related Application</span>
                    </span>
                    {appId ? (
                      <span className="font-mono font-bold text-indigo-700 text-xs block">{appId}</span>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Not available</span>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 4: AUDIT HISTORY LOG */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <History className="w-4 h-4 text-purple-600" />
                  <span>Audit History Log</span>
                </div>

                {auditLogs.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
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
                    No previous ledger changes recorded.
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Transaction</span>
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

export default TransactionDetailsModal;
