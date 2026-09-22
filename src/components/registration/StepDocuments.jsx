import React, { useRef } from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { ID_PROOF_TYPES } from '../../data/registrationOptions';
import { FileText, Upload, Sparkles, CheckCircle2, Trash2, AlertCircle } from 'lucide-react';

export function StepDocuments({ data = {}, errors = {}, onFileSelect, onFileRemove, onChange }) {
  const fileInputRefs = {
    doc1_photo: useRef(null),
    doc2_govId: useRef(null),
    doc3_eduCert: useRef(null),
    doc4_birthCert: useRef(null),
    doc5_utility: useRef(null),
  };

  const CHECKLIST_ITEMS = [
    { key: 'doc1_photo', id: 1, title: '3 Colour Photographs', accept: '.jpg,.jpeg,.png' },
    { key: 'doc2_govId', id: 2, title: 'Aadhaar / Voter ID / PAN Card / Driving Licence', accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'doc3_eduCert', id: 3, title: 'Educational Certificate', accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'doc4_birthCert', id: 4, title: 'Birth Certificate', accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'doc5_utility', id: 5, title: 'Ration Card / Account Statement / Electricity Bill', accept: '.pdf,.jpg,.jpeg,.png' },
  ];

  // Calculate uploaded count
  const uploadedCount = CHECKLIST_ITEMS.filter((item) => !!data[item.key]).length;

  const handleFileUpload = (itemKey, e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const mockFileObj = {
      name: selected.name,
      size: `${(selected.size / (1024 * 1024)).toFixed(2)} MB`,
      previewUrl: selected.type.startsWith('image/') ? URL.createObjectURL(selected) : null,
    };

    if (onFileSelect) {
      onFileSelect(itemKey, mockFileObj);
    } else if (onChange) {
      onChange(itemKey, mockFileObj);
    }
  };

  const handleRemoveFile = (itemKey) => {
    if (onFileRemove) {
      onFileRemove(itemKey);
    } else if (onChange) {
      onChange(itemKey, null);
    }
  };

  const handleAutoAttachSampleDocs = () => {
    onChange('docRefNo', '9874 5612 3041');
    const samples = {
      doc1_photo: { name: '3_Colour_Photographs_Specimen.jpg', size: '450 KB' },
      doc2_govId: { name: 'Aadhaar_Card_Priyabrata_Mohapatra.pdf', size: '1.2 MB' },
      doc3_eduCert: { name: 'Graduate_Degree_Certificate_Utkal.pdf', size: '980 KB' },
      doc4_birthCert: { name: 'Birth_Certificate_Bhubaneswar_MC.pdf', size: '650 KB' },
      doc5_utility: { name: 'Electricity_Bill_Bhubaneswar_Nayapalli.pdf', size: '820 KB' },
    };

    Object.entries(samples).forEach(([key, val]) => {
      if (onFileSelect) {
        onFileSelect(key, val);
      } else if (onChange) {
        onChange(key, val);
      }
    });
  };

  return (
    <FormSection
      title={
        <span className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-700 inline-block" />
          STATUTORY IDENTIFICATION DOCUMENTS &amp; UPLOAD STATUS
        </span>
      }
      subtitle="Upload supporting KYC documents listed in the official statutory application form. All 5 attachment checklist items are required."
      rightAction={
        <button
          type="button"
          onClick={handleAutoAttachSampleDocs}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-bold transition-all border border-slate-200 hover:border-amber-300 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Auto-attach Sample Docs</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* TOP GRID BOX: PRIMARY GOVT ID & REFERENCE NUMBER */}
        <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label="Primary Government ID Proof"
            name="idProofType"
            value={data.idProofType || 'Aadhaar Card'}
            onChange={(e) => onChange('idProofType', e.target.value)}
            options={ID_PROOF_TYPES}
            required
            error={errors.idProofType}
          />

          <FormInput
            label="Document Reference Number"
            name="docRefNo"
            value={data.docRefNo || ''}
            onChange={(e) => onChange('docRefNo', e.target.value)}
            placeholder="Enter ID / Card Number (e.g. 9874 5612 3041)"
            required
            error={errors.docRefNo}
          />
        </div>

        {/* CHECKLIST HEADER ROW */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
            <span>MANDATORY ATTACHMENTS CHECKLIST (ALL 5 REQUIRED)</span>
            <span className="text-rose-500 font-bold">*</span>
          </h4>
          <span className={`text-xs font-bold ${uploadedCount === 5 ? 'text-emerald-700' : 'text-slate-500'}`}>
            {uploadedCount} of 5 Uploaded
          </span>
        </div>

        {/* ERROR BANNER FOR ALL DOCUMENTS */}
        {errors.allDocs && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2 shadow-2xs">
            <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
            <span>{errors.allDocs}</span>
          </div>
        )}

        {/* 5 MANDATORY ATTACHMENT CARDS */}
        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const fileData = data[item.key];
            const isUploaded = !!fileData;
            const itemError = errors[item.key];

            return (
              <div
                key={item.key}
                className={`bg-white rounded-2xl border p-4 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs transition-all ${
                  itemError ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRefs[item.key]}
                  onChange={(e) => handleFileUpload(item.key, e)}
                  accept={item.accept}
                  className="hidden"
                />

                {/* Left Number & Details */}
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                    isUploaded ? 'bg-emerald-100 text-emerald-800' : itemError ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.id}
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <span className="text-rose-500 font-extrabold" title="Required Document">*</span>
                    </h5>

                    {/* Status Pill Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      {isUploaded ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Attached ({fileData.name})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Required (Pending)</span>
                        </span>
                      )}
                    </div>

                    {itemError && (
                      <p className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{itemError}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Upload / Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {isUploaded ? (
                    <>
                      <button
                        type="button"
                        onClick={() => fileInputRefs[item.key].current?.click()}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(item.key)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove attachment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefs[item.key].current?.click()}
                      className={`text-xs font-bold px-4 py-2 rounded-xl border inline-flex items-center gap-1.5 transition-colors ${
                        itemError
                          ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-600 shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File *</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FormSection>
  );
}

