import React from 'react';
import {
  User,
  Mail,
  MapPin,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { MemberPageHeader } from '../../components/member/MemberPageHeader';
import { StatusBadge } from '../../components/member/StatusBadge';
import { useMemberAuth } from '../../hooks/useMemberAuth';

/**
 * MemberProfile Page (/member-dashboard/profile)
 * Displays authenticated member KYC, personal, contact, and address records.
 */
export function MemberProfile() {
  const { memberUser, application } = useMemberAuth();

  const memberId = memberUser?.memberId || application?.memberId || '—';
  const name = memberUser?.name || application?.applicantName || 'Member';
  const email = memberUser?.email || application?.contactDetails?.email || '—';
  const mobile = memberUser?.mobile || application?.contactDetails?.mobile || '—';
  const altMobile = application?.contactDetails?.altMobile || application?.altMobile || '—';
  const status = memberUser?.status === 'active' ? 'Active' : (memberUser?.status || 'Active');

  const p = application?.personalDetails || {};
  const a = application?.addressDetails || {};

  const dob = p.dob || '—';
  const gender = p.gender || '—';
  const occupation = p.occupation || '—';

  const addressLine = a.address1 || a.address2 || '—';
  const district = a.district || '—';
  const state = a.state || 'Odisha';
  const pincode = a.pincode || '—';

  const memberInitial = name.charAt(0).toUpperCase() || 'M';

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <MemberPageHeader
        title="My Profile"
        description="Official member details and KYC records registered with New Utkal Finance."
        badge="MEMBER CREDENTIALS"
      />

      {/* MEMBER BADGE & TOP IDENTITY BANNER */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
            {memberInitial}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {name}
              </h2>
              <StatusBadge status={status} />
            </div>
            <p className="text-xs font-mono text-slate-500">
              Member ID: <span className="font-bold text-blue-700">{memberId}</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Account status: <span className="font-semibold text-emerald-600">Active & Verified</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>KYC: Verified</span>
          </span>
        </div>
      </div>

      {/* THREE MAIN INFO SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. PERSONAL INFORMATION */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                Personal Information
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Full Name</span>
                <span className="font-bold text-slate-900">{name}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Date of Birth</span>
                <span className="font-bold text-slate-900">{dob}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Gender</span>
                <span className="font-bold text-slate-900">{gender}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Occupation</span>
                <span className="font-bold text-slate-900">{occupation}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
            * Recorded as per statutory membership declaration
          </div>
        </div>

        {/* 2. CONTACT INFORMATION */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                Contact Information
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Email Address</span>
                <span className="font-bold text-slate-900 font-mono text-[11px] truncate max-w-[150px]">{email}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Mobile Number</span>
                <span className="font-bold text-slate-900 font-mono text-[11px]">+91 {mobile}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Alternate Mobile</span>
                <span className="font-bold text-slate-900 font-mono text-[11px]">{altMobile !== '—' ? `+91 ${altMobile}` : '—'}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Communication</span>
                <span className="font-bold text-blue-700">SMS & Email</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
            * Notifications and OTPs will be dispatched to these channels
          </div>
        </div>

        {/* 3. ADDRESS */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                Registered Address
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Address</span>
                <span className="font-bold text-slate-900 text-right truncate max-w-[140px]">{addressLine}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">District</span>
                <span className="font-bold text-slate-900">{district}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">State</span>
                <span className="font-bold text-slate-900">{state}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Pincode</span>
                <span className="font-bold text-slate-900 font-mono text-[11px]">{pincode}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 text-[10px] text-slate-400">
            * Verified against official address proof document
          </div>
        </div>
      </div>

      {/* KYC UPDATE NOTICE */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 leading-relaxed">
          <span className="font-bold">Need to update your personal details or contact address?</span> In accordance with statutory compliance guidelines, any modifications to verified identity or contact information require verification from your assigned branch administrator.
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
