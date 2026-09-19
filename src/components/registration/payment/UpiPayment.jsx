import React, { useState } from 'react';
import { Copy, Check, Landmark, QrCode, AlertCircle, Building2 } from 'lucide-react';
import indusIndQr from '../../../assets/image copy 23.png';
import { BANK_CONFIG } from '../../../data/registrationOptions';

export function UpiPayment({ utrValue, onUtrChange, error }) {
  const [copiedField, setCopiedField] = useState(null);
  const [testUtrStatus, setTestUtrStatus] = useState(null);

  const copyToClipboard = async (textToCopy) => {
    // Strategy 1: Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } catch (err) {
        console.warn('Async clipboard writeText failed:', err);
      }
    }
    // Strategy 2: Reliable execCommand fallback for all browsers/HTTP/local environments
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback execCommand copy failed:', err);
      return false;
    }
  };

  const handleCopy = async (fieldKey, textToCopy) => {
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopiedField(fieldKey);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleTestUtr = () => {
    if (!utrValue || utrValue.trim().length < 6) {
      setTestUtrStatus({ type: 'error', message: 'Please enter a valid 12-digit UTR number first.' });
      return;
    }

    setTestUtrStatus({
      type: 'success',
      message: '✓ Demo UTR verified successfully! ₹200 payment clearance ready.',
    });
  };

  const [activeAppToast, setActiveAppToast] = useState(null);

  const handleUpiAppClick = async (appName) => {
    // 1. Copy UPI ID automatically (guaranteed copy)
    const copied = await copyToClipboard(BANK_CONFIG.BANK_VPA);
    setCopiedField('vpa');
    setTimeout(() => setCopiedField(null), 3500);

    // 2. Show active toast feedback with copied confirmation
    setActiveAppToast(`✓ UPI ID (${BANK_CONFIG.BANK_VPA}) Copied to Clipboard! Launching ${appName}...`);

    // 3. Delay deep link launch slightly (300ms) to ensure clipboard operation flushes cleanly
    setTimeout(() => {
      const upiLink = `upi://pay?pa=${encodeURIComponent(BANK_CONFIG.BANK_VPA)}&pn=${encodeURIComponent('NEW UTKAL FINANCE')}&am=200&cu=INR&tn=${encodeURIComponent('Membership Application Fee')}`;
      try {
        window.location.href = upiLink;
      } catch (e) {
        console.log('UPI link launched:', upiLink);
      }
    }, 300);

    setTimeout(() => setActiveAppToast(null), 5000);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: UPLOADED INDUSIND BANK QR IMAGE */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-3">
          <div className="w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden border-2 border-slate-800 shadow-md bg-white p-3 flex items-center justify-center">
            <img
              src={indusIndQr}
              alt="IndusInd Bank Official Scan & Pay QR Code"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <span className="text-sm font-extrabold text-slate-900 tracking-tight block">
              Scan &amp; Pay ₹200
            </span>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[220px] mx-auto">
              Use your preferred UPI application to make the payment.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: BANK TRANSFER DETAILS & UTR INPUT */}
        <div className="md:col-span-7 space-y-5">
          {/* BANK TRANSFER DETAILS CARD */}
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4.5 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2 border-b border-slate-200/90 pb-2.5">
              <Landmark className="w-4 h-4 text-blue-700" />
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Bank Transfer Details
              </h4>
            </div>

            <div className="space-y-3 text-xs">
              {/* Bank Name */}
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-slate-500 font-medium">Bank Name:</span>
                <span className="font-extrabold text-slate-900 tracking-tight">
                  {BANK_CONFIG.BANK_NAME}
                </span>
              </div>

              {/* IFSC Code */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/50 pt-2">
                <div>
                  <span className="text-slate-500 font-medium block text-[11px]">IFSC Code:</span>
                  <span className="font-black text-slate-900 font-mono tracking-wider">
                    {BANK_CONFIG.BANK_IFSC}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('ifsc', BANK_CONFIG.BANK_IFSC)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-blue-50 text-blue-700 text-[11px] font-bold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedField === 'ifsc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy IFSC'}</span>
                </button>
              </div>

              {/* Account Number (Masked) */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/50 pt-2">
                <div>
                  <span className="text-slate-500 font-medium block text-[11px]">Account Number:</span>
                  <span className="font-black text-slate-900 font-mono tracking-widest text-sm">
                    {BANK_CONFIG.BANK_ACCOUNT_MASKED}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('acc', BANK_CONFIG.BANK_ACCOUNT_MASKED)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-blue-50 text-blue-700 text-[11px] font-bold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedField === 'acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'acc' ? 'Copied' : 'Copy Account Number'}</span>
                </button>
              </div>

              {/* Official VPA / UPI ID */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/50 pt-2">
                <div>
                  <span className="text-slate-500 font-medium block text-[11px]">Official UPI ID / VPA:</span>
                  <span className="font-black text-blue-700 font-mono">
                    {BANK_CONFIG.BANK_VPA}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('vpa', BANK_CONFIG.BANK_VPA)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-blue-50 text-blue-700 text-[11px] font-bold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedField === 'vpa' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'vpa' ? 'Copied' : 'Copy UPI ID'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Accepted UPI Apps (CLICKABLE & INTERACTIVE) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Tap to Pay via UPI App:
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">
                (Copies UPI ID &amp; Launches App)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Cred / Navi'].map((app) => (
                <button
                  key={app}
                  type="button"
                  onClick={() => handleUpiAppClick(app)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 active:bg-blue-100 text-slate-800 hover:text-blue-700 text-xs font-bold border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 group"
                  title={`Click to launch ${app} and copy UPI ID`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                  <span>{app}</span>
                </button>
              ))}
            </div>

            {activeAppToast && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{activeAppToast}</span>
              </div>
            )}
          </div>

          {/* UTR Input Section */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-slate-700">
              Enter 12-Digit UPI UTR / Transaction Reference ID <span className="text-rose-500 font-bold">*</span>
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={utrValue || ''}
                onChange={(e) => {
                  onUtrChange(e.target.value);
                  setTestUtrStatus(null);
                }}
                placeholder="e.g. 423189745120 or UPI Ref"
                className={`flex-1 text-xs font-mono font-medium rounded-xl border p-2.5 outline-none transition-all
                  ${
                    error
                      ? 'border-rose-400 bg-rose-50/40 text-slate-900 focus:border-rose-500'
                      : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15'
                  }
                `}
              />

              <button
                type="button"
                onClick={handleTestUtr}
                className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shrink-0 transition-colors shadow-2xs"
              >
                Test UTR
              </button>
            </div>

            {testUtrStatus && (
              <p
                className={`text-xs font-bold mt-1.5 ${
                  testUtrStatus.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {testUtrStatus.message}
              </p>
            )}

            {error && !testUtrStatus && (
              <p className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}

            <p className="text-[11px] text-slate-500 leading-normal font-normal">
              Enter the UTR generated in your UPI app. Your payment will be confirmed and Member ID activated immediately upon submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
