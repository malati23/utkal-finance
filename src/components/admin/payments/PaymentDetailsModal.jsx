import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Edit3,
  Save,
  RotateCcw,
  History,
  Lock,
  FileText,
  PiggyBank,
} from 'lucide-react';
import { PaymentStatusBadge } from './PaymentStatusBadge';

export function PaymentDetailsModal({
  payment,
  isOpen,
  onClose,
  members = [],
  onUpdatePaymentRecord,
  onVerifyPaymentRecord,
  onRefundPaymentRecord,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
  const [showRefundConfirm, setShowRefundConfirm] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Editable Form Fields
  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState('');
  const [utrNo, setUtrNo] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (payment) {
      setPurpose(payment.purpose || 'Membership Fee');
      setAmount(payment.amount !== undefined ? String(payment.amount) : '');
      setPaymentMethod(payment.paymentMethod || payment.method || 'UPI (Google Pay)');
      setDate(payment.date || '');
      setUtrNo(payment.utrNo || payment.utr || payment.transactionId || '');
      setStatus(payment.status || 'Paid');
      setNotes(payment.notes || '');
    }
    setIsEditing(false);
    setShowVerifyConfirm(false);
    setShowRefundConfirm(false);
    setSuccessMsg('');
    setErrorMsg('');
  }, [payment, isOpen]);

  if (!isOpen || !payment) return null;

  const pId = payment.paymentId || payment.id || 'Not available';
  const currentPurpose = payment.purpose || 'Membership Fee';
  const currentAmount = payment.amount !== undefined ? `₹${Number(payment.amount).toLocaleString('en-IN')}` : 'Not available';
  const currentMethod = payment.paymentMethod || payment.method || 'Not available';
  const currentDate = payment.date || 'Not available';
  const currentUtr = payment.utrNo || payment.utr || payment.transactionId || 'Not available';
  const currentStatus = payment.status || 'Pending';
  const appId = payment.applicationId || payment.appId || null;
  const depId = payment.depositId || null;
  const auditLogs = Array.isArray(payment.history) ? payment.history : [];

  // Find linked member
  const linkedMember = members.find(
    (m) =>
      (m.memberId && m.memberId === payment.memberId) ||
      (m.id && m.id === payment.memberId) ||
      (m.applicantName && m.applicantName.toLowerCase() === (payment.memberName || payment.member || '').toLowerCase())
  );

  const memberId = linkedMember?.memberId || payment.memberId || 'N/A';
  const memberName = linkedMember?.applicantName || linkedMember?.name || payment.memberName || payment.member || 'Member information unavailable';

  const handleStartEdit = () => {
    setIsEditing(true);
    setShowVerifyConfirm(false);
    setShowRefundConfirm(false);
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
      setErrorMsg('Payment amount must be a valid number greater than ₹0.');
      return;
    }

    const requiresUtr = ['UPI', 'Net Banking', 'Razorpay', 'IMPS', 'Cheque'].some((m) =>
      paymentMethod.toLowerCase().includes(m.toLowerCase())
    );
    if (requiresUtr && !utrNo.trim()) {
      setErrorMsg(`UTR / Transaction reference is required for ${paymentMethod}.`);
      return;
    }

    const updatedFields = {
      purpose: purpose.trim(),
      amount: numAmount,
      paymentMethod,
      utrNo: utrNo.trim(),
      transactionId: utrNo.trim() || payment.transactionId,
      date: date.trim(),
      status,
      notes: notes.trim(),
    };

    if (onUpdatePaymentRecord) {
      onUpdatePaymentRecord(pId, updatedFields);
    }

    setSuccessMsg('Payment updated successfully.');
    setIsEditing(false);

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleConfirmVerify = () => {
    if (onVerifyPaymentRecord) {
      onVerifyPaymentRecord(pId);
    }
    setSuccessMsg('Payment verified successfully.');
    setShowVerifyConfirm(false);

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleConfirmRefund = () => {
    if (onRefundPaymentRecord) {
      onRefundPaymentRecord(pId);
    }
    setSuccessMsg('Payment marked as refunded successfully.');
    setShowRefundConfirm(false);

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

      {/* Modal Dialog / Mobile Bottom Sheet Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-0 sm:my-8 animate-fade-in border border-slate-200">
        {/* MODAL HEADER */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {isEditing ? 'Edit Payment Record' : 'Payment Details'}
                </h2>
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {pId}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Track, verify and manage member transaction records
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

        {/* VERIFY PAYMENT CONFIRMATION OVERLAY */}
        {showVerifyConfirm && (
          <div className="mx-6 mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 animate-fade-in text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Verify this payment?</span>
            </div>
            <p className="text-emerald-800 font-medium">
              You are confirming receipt of payment <strong className="font-mono">{pId}</strong> for{' '}
              <strong>{memberName}</strong> ({currentAmount}).
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowVerifyConfirm(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmVerify}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-all"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}

        {/* REFUND PAYMENT CONFIRMATION OVERLAY */}
        {showRefundConfirm && (
          <div className="mx-6 mt-4 p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-3 animate-fade-in text-xs">
            <div className="flex items-center gap-2 text-purple-900 font-black text-sm">
              <RotateCcw className="w-5 h-5 text-purple-600" />
              <span>Mark this payment as refunded?</span>
            </div>
            <p className="text-purple-800 font-medium">
              This will update payment <strong className="font-mono">{pId}</strong> status to{' '}
              <strong>Refunded</strong>. The original record will be maintained for audit purposes.
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowRefundConfirm(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRefund}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-all"
              >
                Confirm Refund
              </button>
            </div>
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
                  <span>Transaction Identifiers (Read-Only)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="text-slate-500 block font-semibold">Payment ID</span>
                    <span className="font-mono font-bold text-slate-900">{pId}</span>
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
                {/* PAYMENT PURPOSE */}
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
                    step="50"
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

                {/* UTR / TRANSACTION ID */}
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

                {/* PAYMENT DATE */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Payment Date &amp; Time
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 21 Sep 2026"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* PAYMENT STATUS */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Payment Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs rounded-xl p-2.5 focus:border-blue-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Paid">Paid / Confirmed</option>
                    <option value="Pending">Pending Verification</option>
                    <option value="Failed">Failed / Declined</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                {/* ADMIN NOTES */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Admin Remarks &amp; Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Add operational notes or verification comments..."
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
              {/* SECTION 1: TRANSACTION DETAILS */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>Transaction Overview</span>
                  </div>
                  <PaymentStatusBadge status={currentStatus} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block font-semibold">Payment ID</span>
                    <span className="font-mono font-bold text-slate-900">{pId}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Purpose</span>
                    <span className="font-bold text-slate-900">{currentPurpose}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Amount</span>
                    <span className="font-black text-slate-900 text-sm">{currentAmount}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Payment Method</span>
                    <span className="font-bold text-slate-900">{currentMethod}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">UTR / Ref Number</span>
                    <span className="font-mono font-medium text-slate-900">{currentUtr}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-semibold">Date &amp; Time</span>
                    <span className="font-medium text-slate-800">{currentDate}</span>
                  </div>

                  {appId && (
                    <div>
                      <span className="text-slate-500 block font-semibold">Related Application</span>
                      <span className="font-mono font-bold text-blue-700">{appId}</span>
                    </div>
                  )}

                  {depId && (
                    <div>
                      <span className="text-slate-500 block font-semibold">Related Deposit</span>
                      <span className="font-mono font-bold text-indigo-700">{depId}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-slate-500 block font-semibold">Status</span>
                    <span className="font-bold text-slate-900">{currentStatus}</span>
                  </div>
                </div>

                {payment.notes && (
                  <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700">
                    <span className="font-semibold text-slate-500 block">Admin Notes</span>
                    <p className="mt-0.5 font-medium italic text-slate-800">{payment.notes}</p>
                  </div>
                )}
              </div>

              {/* SECTION 2: MEMBER INFORMATION */}
              <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm border-b border-slate-200/80 pb-3">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Member Information</span>
                </div>

                {linkedMember || payment.memberName || payment.member || payment.memberId ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block font-semibold">Member ID</span>
                      <span className="font-mono font-bold text-slate-900">{memberId}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block font-semibold">Member Name</span>
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

              {/* SECTION 3: AUDIT HISTORY LOG */}
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
                    No previous payment changes or verifications recorded.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          {!isEditing && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Payment</span>
              </button>

              {currentStatus.toLowerCase().includes('pending') && (
                <button
                  type="button"
                  onClick={() => setShowVerifyConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Payment</span>
                </button>
              )}

              {currentStatus.toLowerCase() !== 'refunded' && (
                <button
                  type="button"
                  onClick={() => setShowRefundConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refund</span>
                </button>
              )}
            </div>
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

export default PaymentDetailsModal;
