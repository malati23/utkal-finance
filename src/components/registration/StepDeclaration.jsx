import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { ValidationMessage } from './ValidationMessage';
import { ShieldCheck, FileText, Calendar, PenTool, CheckSquare } from 'lucide-react';

export function StepDeclaration({ data = {}, errors = {}, onChange }) {
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <FormSection
      title="DECLARATION & CONSENT"
      subtitle="Read statutory undertakings and provide formal electronic consent & signature."
    >
      <div className="space-y-6">
        {/* STATUTORY DECLARATION BOX */}
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-3 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>STATUTORY MEMBERSHIP UNDERTAKING (NIDHI RULES, 2014)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            "I hereby solemnly declare that all statements made and information furnished in this Statutory Membership Application Form are true, complete, and correct to the best of my knowledge and belief. I confirm that I am an Indian Citizen aged 18 years or older and eligible to become an Equity Member under Section 406 of the Companies Act, 2013 read with Nidhi Rules 2014 &amp; 2022. I understand that services of New Utkal Finance Limited are rendered exclusively to registered members."
          </p>
        </div>

        {/* CHECKBOX CONSENTS */}
        <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <CheckSquare className="w-4 h-4 text-blue-700" />
            <span>Mandatory Declarations (Check all to proceed)</span>
          </div>

          {/* Checkbox 1 */}
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-white border border-slate-200/80 hover:bg-blue-50/50 transition-colors">
            <input
              type="checkbox"
              checked={data.confirmInfoTrue === true}
              onChange={(e) => onChange('confirmInfoTrue', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-blue-700 focus:ring-blue-600 border-slate-300 shrink-0"
            />
            <span className="text-xs font-semibold text-slate-800 leading-normal">
              I confirm that the information provided in this application is true and correct to the best of my knowledge. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>

          {/* Checkbox 2 */}
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-white border border-slate-200/80 hover:bg-blue-50/50 transition-colors">
            <input
              type="checkbox"
              checked={data.agreeTerms === true}
              onChange={(e) => onChange('agreeTerms', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-blue-700 focus:ring-blue-600 border-slate-300 shrink-0"
            />
            <span className="text-xs font-semibold text-slate-800 leading-normal">
              I agree to the membership terms, conditions, and statutory rules of New Utkal Finance Limited. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>

          {/* Checkbox 3 */}
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-white border border-slate-200/80 hover:bg-blue-50/50 transition-colors">
            <input
              type="checkbox"
              checked={data.consentProcessing === true}
              onChange={(e) => onChange('consentProcessing', e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-blue-700 focus:ring-blue-600 border-slate-300 shrink-0"
            />
            <span className="text-xs font-semibold text-slate-800 leading-normal">
              I consent to the electronic processing and statutory verification of my application information. <span className="text-rose-500 font-bold">*</span>
            </span>
          </label>

          <ValidationMessage message={errors.checkboxes} />
        </div>

        {/* SIGNATURE & DATE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Applicant Digital Signature (Type Full Legal Name)"
            name="signatureName"
            value={data.signatureName}
            onChange={(e) => onChange('signatureName', e.target.value)}
            placeholder="Type your full legal name as digital signature"
            icon={PenTool}
            required
            error={errors.signatureName}
          />

          <FormInput
            label="Filing Date"
            name="declarationDate"
            type="date"
            value={data.declarationDate || todayStr}
            onChange={(e) => onChange('declarationDate', e.target.value)}
            icon={Calendar}
            readOnly
            required
          />
        </div>
      </div>
    </FormSection>
  );
}
