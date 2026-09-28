import React from 'react';
import {
  User,
  Mail,
  MapPin,
  Info,
  Clock,
} from 'lucide-react';
import { MemberPageHeader } from '../../components/member/MemberPageHeader';
import { StatusBadge } from '../../components/member/StatusBadge';

/**
 * MemberProfile Page (/member-dashboard/profile)
 * Displays member KYC, personal, contact, and address records with empty/placeholder states.
 */
export function MemberProfile() {
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
            M
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Member Profile
              </h2>
              <StatusBadge status="—" />
            </div>
            <p className="text-xs font-mono text-slate-500">
              Member ID: <span className="font-bold text-slate-700">—</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Account status: <span className="font-semibold text-slate-600">Pending Backend Verification</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>KYC: Pending</span>
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
                <span className="font-bold text-slate-900">—</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Date of Birth</span>
                <span className="font-bold text-slate-900">—</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Gender</span>
                <span className="font-bold text-slate-900">—</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Occupation</span>
                <span className="font-bold text-slate-900">—</span>
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
                <span className="font-bold text-slate-900 font-mono text-[11px]">—</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Mobile Number</span>
                <span className="font-bold text-slate-900 font-mono text-[11px]">—</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Alternate Mobile</span>
                <span className="font-bold text-slate-900 font-mono text-[11px]">—</span>
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
                <span className="font-bold text-slate-900 text-right">—</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">District</span>
                <span className="font-bold text-slate-900">—</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">State</span>
                <span className="font-bold text-slate-900">—</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Pincode</span>
                <span className="font-bold text-slate-900 font-mono text-[11px]">—</span>
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
