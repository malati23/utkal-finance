import React from 'react';
import { FormSection } from './FormSection';
import { FormSelect } from './FormSelect';
import { BRANCH_OPTIONS, AGENT_OPTIONS } from '../../data/registrationOptions';
import { Building2 } from 'lucide-react';

export function StepAccount({ data = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title={
        <span className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-700 inline-block" />
          COMPANY ASSOCIATION &amp; MEMBERSHIP FEE
        </span>
      }
      subtitle="Select your operational branch, statutory membership classification, and optional associate referral."
    >
      <div className="space-y-6">
        {/* ROW: ASSIGNED BRANCH & ASSOCIATE AGENT CODE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ASSIGNED BRANCH */}
          <FormSelect
            label="Assigned Branch"
            name="assignedBranch"
            value={data.assignedBranch || 'Bhubaneswar HQ (Nayapalli, Khurda)'}
            onChange={(e) => onChange('assignedBranch', e.target.value)}
            options={BRANCH_OPTIONS}
            required
            error={errors.assignedBranch}
          />

          {/* ASSOCIATE AGENT CODE */}
          <FormSelect
            label="Associate Agent Code"
            name="agentCode"
            value={data.agentCode || 'Pradeep Kumar Jena (UTK-AS01)'}
            onChange={(e) => onChange('agentCode', e.target.value)}
            options={AGENT_OPTIONS}
            error={errors.agentCode}
          />
        </div>

        {/* STATUTORY ASSOCIATE MEMBERSHIP FEE */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold text-sm sm:text-base text-amber-950 tracking-tight">
              Statutory Associate Membership Fee
            </h4>
            <p className="text-xs text-amber-900/80 font-normal leading-relaxed">
              As per Nidhi Company rules 2013 &amp; 2014, Rs. 200 associate membership fee is applicable upon acceptance.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              ₹ 200.00
            </span>
          </div>
        </div>
      </div>
    </FormSection>
  );
}

export default StepAccount;
