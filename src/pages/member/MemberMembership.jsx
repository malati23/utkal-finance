import React from 'react';
import {
  Award,
  ShieldCheck,
  FileCheck,
  Download,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { MemberPageHeader } from '../../components/member/MemberPageHeader';
import { StatusBadge } from '../../components/member/StatusBadge';
import { useMemberAuth } from '../../hooks/useMemberAuth';

/**
 * MemberMembership Page (/member-dashboard/membership)
 * Displays statutory membership credentials, share capital, and contribution ledger for the member.
 */
export function MemberMembership() {
  const { memberUser, application } = useMemberAuth();

  const memberId = memberUser?.memberId || application?.memberId || '—';
  const applicationId = application?.applicationId || application?._id || '—';
  const status = memberUser?.status === 'active' ? 'Active' : (memberUser?.status || 'Active');

  const m = application?.membershipDetails || {};
  const membershipType = m.membershipType || application?.membershipType || 'Associate Member';
  const membershipAmount = m.membershipAmount ? `₹${m.membershipAmount}` : '₹200';
  const numberOfShares = m.numberOfShares ? String(m.numberOfShares) : '10';
  const shareValue = m.shareValue ? `₹${m.shareValue}` : '₹10';
  const processingFee = m.processingFee ? `₹${m.processingFee}` : '₹100';
  const totalContribution = m.totalContribution ? `₹${m.totalContribution}` : '₹200';

  const joiningDate = application?.reviewedAt
    ? new Date(application.reviewedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : (application?.submittedAt
      ? new Date(application.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '—');

  const membershipFields = [
    { label: 'Member ID', value: memberId, helper: 'Unique membership number' },
    { label: 'Application ID', value: applicationId, helper: 'Statutory registration ref' },
    { label: 'Membership Type', value: membershipType, helper: 'Ordinary / Associate class' },
    { label: 'Membership Status', value: status, isStatus: true, helper: 'Active & Verified' },
    { label: 'Membership Amount', value: membershipAmount, helper: 'Qualifying contribution' },
    { label: 'Number of Shares', value: numberOfShares, helper: 'Statutory equity units' },
    { label: 'Share Value', value: shareValue, helper: 'Nominal face value per share' },
    { label: 'Processing Fee', value: processingFee, helper: 'Statutory admission fee' },
    { label: 'Total Contribution', value: totalContribution, helper: 'Combined initial allotment' },
    { label: 'Joining Date', value: joiningDate, helper: 'Official enrollment date' },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <MemberPageHeader
        title="My Membership"
        description="Statutory membership details, equity share allotment, and mutual benefit records."
        badge="STATUTORY LEDGER"
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer transition-colors shadow-xs"
          onClick={() => window.print()}
          title="Print official membership record"
        >
          <Download className="w-4 h-4" />
          <span>Print Member Record</span>
        </button>
      </MemberPageHeader>

      {/* TOP MEMBERSHIP OVERVIEW CARD */}
      <div className="bg-gradient-to-r from-[#0B1528] to-[#122A50] rounded-3xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>Shareholding Credential</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              New Utkal Finance Limited Membership
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              As a bona fide member, you hold statutory equity shares conferring participatory rights, dividend entitlements, and access to mutual savings schemes.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xs p-4 rounded-2xl border border-slate-700/80 shrink-0 text-center sm:text-right space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Enrollment Status
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-1.5 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Active Member</span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Member ID: {memberId}
            </span>
          </div>
        </div>
      </div>

      {/* 10 STATUTORY REAL FIELDS */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-black text-slate-900">
              Statutory Allotment Particulars
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Form INC-33 / AOA Registry
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {membershipFields.map((field, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70 hover:bg-slate-50 transition-colors space-y-1"
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                {field.label}
              </span>
              <div className="pt-0.5">
                {field.isStatus ? (
                  <StatusBadge status={field.value} />
                ) : (
                  <span className="text-base font-black text-slate-900 font-mono tracking-tight block truncate">
                    {field.value}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 block truncate">
                {field.helper}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STATUTORY CERTIFICATE & NOMINATION NOTICE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span>Digital Share Certificate</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Upon verification and allotment approval by the Board of Directors, your signed Digital Share Certificate bearing the common seal is preserved in our registry.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Nominee Registration</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Statutory nominee particulars submitted during application are preserved under seal and can be verified by visiting your home branch.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemberMembership;
