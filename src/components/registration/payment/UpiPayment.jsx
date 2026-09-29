import React, { useState, useRef } from 'react';
import { Copy, Check, Landmark, Upload, FileText, CheckCircle2, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import indusIndQr from '../../../assets/image copy 23.png';
import { BANK_CONFIG } from '../../../data/registrationOptions';

export function UpiPayment({
  receiptFile,
  onReceiptChange,
  error,
}) {
  const [copiedField, setCopiedField] = useState(null);
  const fileInputRef = useRef(null);

  const copyToClipboard = async (textToCopy) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } catch (err) {
        console.warn('Async clipboard writeText failed:', err);
      }
    }
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
      console.error('Fallback copy failed:', err);
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

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    const fileObj = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type,
      previewUrl: isImage ? URL.createObjectURL(file) : null,
      rawFile: file,
    };

    if (onReceiptChange) {
      onReceiptChange(fileObj);
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onReceiptChange) {
      onReceiptChange(null);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INDUSIND BANK QR IMAGE */}
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

        {/* RIGHT COLUMN: BANK TRANSFER DETAILS & FILE UPLOAD BUTTON */}
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

          {/* UPLOADED FILE BUTTON SECTION (REPLACED UTR NUMBER INPUT) */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-700">
              Upload Payment Receipt / Screenshot <span className="text-rose-500 font-bold">*</span>
            </label>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".png,.jpg,.jpeg,.pdf"
              className="hidden"
            />

            {receiptFile ? (
              <div className="bg-slate-50 border border-slate-300/90 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
                    {receiptFile.previewUrl ? (
                      <img
                        src={receiptFile.previewUrl}
                        alt="Payment Receipt Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {receiptFile.name || 'Payment_Receipt.png'}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
                      <span>{receiptFile.size || 'Attachment'}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Receipt Attached
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleTriggerUpload}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove receipt"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleTriggerUpload}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 group
                  ${
                    error
                      ? 'border-rose-400 bg-rose-50/40 hover:bg-rose-50/70'
                      : 'border-blue-300/80 bg-blue-50/30 hover:bg-blue-50/60 hover:border-blue-500'
                  }
                `}
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-blue-200 shadow-2xs text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 hover:underline block">
                    Click to Upload Payment Receipt / Screenshot
                  </span>
                  <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                    Supports JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}

            <p className="text-[11px] text-slate-500 leading-normal font-normal">
              Upload the payment confirmation screenshot or receipt from your UPI application (Google Pay, PhonePe, Paytm, etc.).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpiPayment;
