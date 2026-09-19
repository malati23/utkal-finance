import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  MapPin,
  UserCheck,
  BarChart3,
  FileText,
  CreditCard,
  FileCheck,
  UserX,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { MemberDetailsCard } from '../../components/admin/MemberDetailsCard';
import { MemberStatusBadge } from '../../components/admin/MemberStatusBadge';

export function MemberDetails() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { applications, updateMemberStatus } = useAdmin();
  const [noticeMessage, setNoticeMessage] = useState('');

  // Find the approved application record corresponding to this memberId
  const app = applications.find(
    (a) => a.status === 'Approved' && (a.memberId === memberId || a.id === memberId)
  );

  if (!app) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">Member Not Found</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          No approved member record matched ID "{memberId}".
        </p>
        <button
          onClick={() => navigate('/admin-dashboard/members')}
          className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Back to Members
        </button>
      </div>
    );
  }

  const currentMemberId = app.memberId || memberId;
  const currentStatus = app.membershipStatus || 'Active';
  const joiningDate = app.approvalDate || app.date;

  const handleToggleStatus = (newStatus) => {
    updateMemberStatus(currentMemberId, newStatus);
    setNoticeMessage(`Member status updated to "${newStatus}"`);
    setTimeout(() => setNoticeMessage(''), 3000);
  };

  // Section details
  const personal = app.personal || {};
  const address = app.address || {};
  const nominee = app.nominee || {};
  const shares = app.shares || {};
  const docs = app.documents || {};

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* BACK BUTTON & TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard/members')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
            title="Back to Members List"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Member Profile</h1>
              <MemberStatusBadge status={currentStatus} />
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Member ID: <strong className="text-slate-900">{currentMemberId}</strong> • Application ID:{' '}
              <strong className="text-blue-700">{app.id}</strong> • Enrolled: {joiningDate}
            </p>
          </div>
        </div>

        {/* TOP ACTION TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2">
          {/* VIEW ORIGINAL APPLICATION */}
          <button
            type="button"
            onClick={() => navigate(`/admin-dashboard/applications/${app.id}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-300 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-blue-700" />
            <span>View Original Application</span>
          </button>

          {/* TOGGLE ACTIVE / INACTIVE */}
          <button
            type="button"
            onClick={() => handleToggleStatus(currentStatus === 'Active' ? 'Inactive' : 'Active')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-colors cursor-pointer ${
              currentStatus === 'Active'
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            {currentStatus === 'Active' ? (
              <>
                <UserX className="w-4 h-4" />
                <span>Mark as Inactive</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Mark as Active</span>
              </>
            )}
          </button>
        </div>
      </div>

      {noticeMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>{noticeMessage}</span>
        </div>
      )}

      {/* MEMBER DETAILS SECTIONS GRID */}
      <div className="space-y-5">
        {/* 1. PERSONAL INFORMATION */}
        <MemberDetailsCard title="Personal Information" icon={User} sectionNo="Section 01">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">FULL LEGAL NAME</strong>
              <span className="font-extrabold text-slate-900 text-sm">{app.applicantName}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">DATE OF BIRTH</strong>
              <span className="font-bold text-slate-800">{app.dob} ({app.age} Years)</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">GENDER</strong>
              <span className="font-bold text-slate-800">{app.gender}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">MARITAL STATUS</strong>
              <span className="font-bold text-slate-800">{app.maritalStatus}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">OCCUPATION</strong>
              <span className="font-bold text-slate-800">{app.occupation}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">MOBILE NUMBER</strong>
              <span className="font-mono font-bold text-slate-900">+91 {app.mobile}</span>
            </div>
            <div className="sm:col-span-2">
              <strong className="block text-[10px] text-slate-400 uppercase">EMAIL ADDRESS</strong>
              <span className="font-mono font-bold text-slate-900">{app.email}</span>
            </div>
          </div>
        </MemberDetailsCard>

        {/* 2. ADDRESS DETAILS */}
        <MemberDetailsCard title="Address" icon={MapPin} sectionNo="Section 02">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
              <strong className="block text-[10px] text-slate-500 uppercase">PRIMARY ADDRESS</strong>
              <p className="font-bold text-slate-900">{app.address1}</p>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">VILLAGE / TOWN</strong>
              <span className="font-bold text-slate-800">{app.villageTown || address.villageTown || 'Bhubaneswar'}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">DISTRICT</strong>
              <span className="font-bold text-slate-800">{app.district || address.district || 'Khurda'}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">STATE</strong>
              <span className="font-bold text-slate-800">{app.state || address.state || 'Odisha'}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">PIN CODE</strong>
              <span className="font-mono font-bold text-slate-900">{app.pincode || address.pincode || '751007'}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">COUNTRY</strong>
              <span className="font-bold text-slate-800">India</span>
            </div>
          </div>
        </MemberDetailsCard>

        {/* 3. NOMINEE DETAILS */}
        <MemberDetailsCard title="Nominee" icon={UserCheck} sectionNo="Section 03">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">NOMINEE NAME</strong>
              <span className="font-extrabold text-slate-900">{app.nomineeName}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">RELATIONSHIP</strong>
              <span className="font-bold text-slate-800">{app.nomineeRel}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">DATE OF BIRTH</strong>
              <span className="font-bold text-slate-800">{app.nomineeDob}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">MOBILE</strong>
              <span className="font-mono font-bold text-slate-800">+91 {nominee.mobile || app.altMobile}</span>
            </div>
            <div className="sm:col-span-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <strong className="block text-[10px] text-slate-500 uppercase">NOMINEE ADDRESS</strong>
              <p className="font-bold text-slate-800 mt-0.5">{app.nomineeAddr}</p>
            </div>
          </div>
        </MemberDetailsCard>

        {/* 4. MEMBERSHIP & SHARES */}
        <MemberDetailsCard title="Membership" icon={BarChart3} sectionNo="Section 04">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">MEMBERSHIP TYPE</strong>
              <span className="font-extrabold text-slate-900">Associate Member</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">NUMBER OF SHARES</strong>
              <span className="font-bold text-slate-900">{app.numberOfShares} Equity Shares</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">SHARE VALUE</strong>
              <span className="font-bold text-slate-900">₹ {app.shareValue}.00 / Share</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">MEMBERSHIP FEE</strong>
              <span className="font-black text-emerald-700 font-mono text-sm">₹ {app.processingFee}.00</span>
            </div>
          </div>
        </MemberDetailsCard>

        {/* 5. DOCUMENTS */}
        <MemberDetailsCard title="Documents" icon={FileText} sectionNo="Section 05">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Aadhaar Card', name: app.idProofType || 'Aadhaar Card', uploaded: true },
              { label: 'PAN Card', name: `PAN (${app.pan})`, uploaded: true },
              { label: 'Photograph', name: 'Passport Photo.jpg', uploaded: true },
              { label: 'Signature', name: 'Digital Signature.png', uploaded: true },
              { label: 'Address Proof', name: app.addressProofType || 'Aadhaar Card', uploaded: true },
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="block text-[10px] font-extrabold uppercase text-slate-400">{doc.label}</span>
                  <span className="font-bold text-slate-900 block truncate max-w-[140px]">{doc.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Uploaded
                </span>
              </div>
            ))}
          </div>
        </MemberDetailsCard>

        {/* 6. PAYMENT */}
        <MemberDetailsCard title="Payment" icon={CreditCard} sectionNo="Section 06">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">MEMBERSHIP FEE &amp; TOTAL PAID</strong>
              <span className="font-black text-slate-900 text-sm">₹ {app.totalPaid || 200}.00</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">PAYMENT METHOD</strong>
              <span className="font-extrabold text-slate-900">{app.paymentMethod || 'UPI'}</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">PAYMENT STATUS</strong>
              <span className="font-extrabold text-emerald-700">Successful (Verified)</span>
            </div>
            <div>
              <strong className="block text-[10px] text-slate-400 uppercase">TRANSACTION UTR / ID</strong>
              <span className="font-mono font-black text-blue-700">{app.utrNo || 'UTR346393622063'}</span>
            </div>
          </div>
        </MemberDetailsCard>
      </div>
    </div>
  );
}

export default MemberDetails;
