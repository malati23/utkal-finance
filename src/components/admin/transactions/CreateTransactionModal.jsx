import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  User,
  PlusCircle,
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
} from 'lucide-react';
import { generateTransactionId } from '../../../utils/transactionStorage';

export function CreateTransactionModal({
  isOpen,
  onClose,
  members = [],
  deposits = [],
  payments = [],
  onCreateTransaction,
}) {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [direction, setDirection] = useState('Credit');
  const [type, setType] = useState('Payment');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay)');
  const [utrNo, setUtrNo] = useState('');
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  );
  const [relatedDepositId, setRelatedDepositId] = useState('');
  const [relatedPaymentId, setRelatedPaymentId] = useState('');
  const [status, setStatus] = useState('Completed');
  const [notes, setNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen && members.length > 0 && !selectedMemberId) {
      setSelectedMemberId(members[0].memberId || members[0].id || '');
    }
  }, [isOpen, members, selectedMemberId]);

  if (!isOpen) return null;

  const selectedMember = members.find(
    (m) => m.memberId === selectedMemberId || m.id === selectedMemberId
  );

  const memberName = selectedMember?.applicantName || selectedMember?.name || '';
  const memberId = selectedMember?.memberId || selectedMember?.id || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedMember || !memberId) {
      setErrorMsg('Please select an existing approved member.');
      return;
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg('Please enter a valid transaction amount greater than ₹0.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('Transaction description is required.');
      return;
    }

    const generatedUtr = utrNo.trim() || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const txnId = generateTransactionId();

    const newTxnData = {
      id: txnId,
      txnId,
      transactionId: txnId,
      memberId,
      memberName,
      applicantName: memberName,
      direction,
      type,
      description: description.trim(),
      amount: numericAmount,
      paymentMethod,
      utrNo: generatedUtr,
      date,
      depositId: relatedDepositId,
      paymentId: relatedPaymentId,
      status,
      notes: notes.trim(),
    };

    onCreateTransaction(newTxnData);
    onClose();

    setAmount('');
    setDescription('');
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
                Add Financial Transaction
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Record an internal credit or debit entry in the financial ledger
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

          {/* MEMBER SELECTION */}
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
                No approved members found. Please approve a member application first.
              </div>
            )}
          </div>

          {/* DIRECTION & TYPE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Direction (Credit / Debit) <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('Credit')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    direction === 'Credit'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Credit (+)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDirection('Debit')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    direction === 'Debit'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Debit (-)</span>
                </button>
              </div>
            </div>

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
          </div>

          {/* DESCRIPTION & AMOUNT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Description <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Deposit installment receipt"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                min="1"
                step="100"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* METHOD & UTR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                UTR / Reference Number
              </label>
              <input
                type="text"
                value={utrNo}
                onChange={(e) => setUtrNo(e.target.value)}
                placeholder="Leave blank to auto-generate UTR"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* OPTIONAL RELATED LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <PiggyBank className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link to Deposit ID (Optional)</span>
              </label>
              <select
                value={relatedDepositId}
                onChange={(e) => setRelatedDepositId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="">None (Standalone Ledger)</option>
                {deposits.map((d) => {
                  const dId = d.depositId || d.id;
                  return (
                    <option key={dId} value={dId}>
                      {dId} - {d.applicantName || d.memberName} (₹{d.amount})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>Link to Payment ID (Optional)</span>
              </label>
              <select
                value={relatedPaymentId}
                onChange={(e) => setRelatedPaymentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="">None (Standalone Ledger)</option>
                {payments.map((p) => {
                  const pId = p.paymentId || p.id;
                  return (
                    <option key={pId} value={pId}>
                      {pId} - {p.memberName || p.member} (₹{p.amount})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* DATE & STATUS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Transaction Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 21 Sep 2026"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>

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
          </div>

          {/* NOTES */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Admin Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Manual ledger adjustment"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
            />
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
              <span>Post Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTransactionModal;
