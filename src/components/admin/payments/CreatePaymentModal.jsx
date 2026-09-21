import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  User,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { generatePaymentId } from '../../../utils/paymentStorage';

export function CreatePaymentModal({
  isOpen,
  onClose,
  members = [],
  onCreatePayment,
}) {
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [purpose, setPurpose] = useState('Membership Application Fee');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay)');
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  );
  const [utrNo, setUtrNo] = useState('');
  const [status, setStatus] = useState('Paid');
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
  const appId = selectedMember?.applicationId || selectedMember?.app?.id || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedMember || !memberId) {
      setErrorMsg('Please select an existing approved member.');
      return;
    }

    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMsg('Please enter a valid payment amount greater than ₹0.');
      return;
    }

    const generatedUtr = utrNo.trim() || `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    const paymentId = generatePaymentId();

    const newPaymentData = {
      paymentId,
      id: paymentId,
      memberId,
      memberName,
      applicantName: memberName,
      applicationId: appId,
      purpose,
      amount: numericAmount,
      paymentMethod,
      utrNo: generatedUtr,
      transactionId: generatedUtr,
      date,
      rawDate: new Date().toISOString(),
      status,
      notes: notes.trim(),
    };

    onCreatePayment(newPaymentData);
    onClose();

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
                Record Member Payment
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Record a statutory fee, deposit contribution, or share payment
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
                No approved members found in Member Management. Please approve a member first.
              </div>
            )}

            {/* PREVIEW CARD */}
            {selectedMember && (
              <div className="mt-2 bg-blue-50/60 border border-blue-100 rounded-2xl p-3 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{memberName}</span>
                  <span className="text-slate-500 text-[11px] block">{selectedMember.email || selectedMember.mobile}</span>
                </div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
                  {memberId}
                </span>
              </div>
            )}
          </div>

          {/* PURPOSE & AMOUNT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Payment Purpose <span className="text-rose-500">*</span>
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Membership Application Fee">Membership Application Fee</option>
                <option value="Fixed Deposit Opening">Fixed Deposit Opening</option>
                <option value="Recurring Deposit Installment">Recurring Deposit Installment</option>
                <option value="Share Capital Allotment">Share Capital Allotment</option>
                <option value="Loan EMI Collection">Loan EMI Collection</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 500"
                min="1"
                step="10"
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

          {/* DATE & STATUS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Payment Date
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
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Paid">Paid / Confirmed</option>
                <option value="Pending">Pending Verification</option>
                <option value="Failed">Failed / Declined</option>
              </select>
            </div>
          </div>

          {/* NOTES */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Admin Notes &amp; Remarks (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Cash collected at Nayapalli HQ branch"
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
              <span>Record Payment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePaymentModal;
