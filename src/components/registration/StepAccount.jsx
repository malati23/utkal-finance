import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { BRANCH_OPTIONS, AGENT_OPTIONS } from '../../data/registrationOptions';
import { Building2, Lock, RotateCw } from 'lucide-react';

export function StepAccount({ data = {}, errors = {}, onChange }) {
  // Generate random IDs if not present
  const empId = data.empId || 'EMP-2026-8529';
  const membershipId = data.membershipId || 'UF-2026-4271';

  const handleRegenerateEmpId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    onChange('empId', `EMP-2026-${randomNum}`);
  };

  const handleRegenerateMembershipId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    onChange('membershipId', `UF-2026-${randomNum}`);
  };

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
        {/* FIRST ROW: 4 FIELDS IN 1 ROW ON DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. EMP ID */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>
                EMP ID <span className="text-rose-500 font-extrabold">*</span>
              </span>
              <button
                type="button"
                onClick={handleRegenerateEmpId}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 transition-colors"
              >
                <RotateCw className="w-3 h-3" />
                <span>Unique</span>
              </button>
            </div>
            <FormInput
              name="empId"
              value={empId}
              onChange={(e) => onChange('empId', e.target.value)}
              placeholder="EMP-2026-8529"
              error={errors.empId}
            />
          </div>

          {/* 2. MEMBERSHIP ID */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>
                Membership ID <span className="text-rose-500 font-extrabold">*</span>
              </span>
              <button
                type="button"
                onClick={handleRegenerateMembershipId}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 transition-colors"
              >
                <RotateCw className="w-3 h-3" />
                <span>Unique</span>
              </button>
            </div>
            <FormInput
              name="membershipId"
              value={membershipId}
              onChange={(e) => onChange('membershipId', e.target.value)}
              placeholder="UF-2026-4271"
              error={errors.membershipId}
            />
          </div>

          {/* 3. ASSIGNED BRANCH */}
          <FormSelect
            label="Assigned Branch"
            name="assignedBranch"
            value={data.assignedBranch || 'Bhubaneswar HQ (Nayapalli, Khurda)'}
            onChange={(e) => onChange('assignedBranch', e.target.value)}
            options={BRANCH_OPTIONS}
            required
            error={errors.assignedBranch}
          />

          {/* 4. ASSOCIATE AGENT CODE */}
          <FormSelect
            label="Associate Agent Code"
            name="agentCode"
            value={data.agentCode || 'Pradeep Kumar Jena (UTK-AS01)'}
            onChange={(e) => onChange('agentCode', e.target.value)}
            options={AGENT_OPTIONS}
            error={errors.agentCode}
          />
        </div>

        {/* SECOND CONTAINER: MEMBER PORTAL LOGIN PASSWORD */}
        <div className="bg-blue-50/50 border border-blue-200/70 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 tracking-wide uppercase">
              <Lock className="w-4 h-4 text-blue-700" />
              <span>MEMBER PORTAL LOGIN PASSWORD</span>
            </div>

            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-100/80 text-blue-800 text-[11px] font-bold">
              Default: member123
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Set Password"
              name="password"
              type="password"
              value={data.password}
              onChange={(e) => onChange('password', e.target.value)}
              placeholder="Leave blank for default (member123)"
              error={errors.password}
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={data.confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              placeholder="Re-enter password"
              error={errors.confirmPassword}
            />
          </div>
        </div>

        {/* THIRD BOX: STATUTORY ASSOCIATE MEMBERSHIP FEE */}
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1">
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
