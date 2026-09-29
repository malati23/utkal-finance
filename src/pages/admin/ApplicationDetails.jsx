import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Edit,
  Printer,
  AlertCircle,
  User,
  MapPin,
  Building2,
  UserCheck,
  BarChart3,
  FileText,
  PenTool,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  Download,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { EditApplicationModal } from '../../components/admin/EditApplicationModal';
import { PaymentReceiptModal } from '../../components/admin/PaymentReceiptModal';
import { getBackendAssetUrl } from '../../config/env';
import indusIndQr from '../../assets/image copy 23.png';

export function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplicationStatus, updateApplication } = useAdmin();

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const app = applications.find((a) => a._id === id || a.id === id || a.applicationId === id);

  const handleStatusChange = async (newStatus) => {
    if (!app) return;
    try {
      setIsProcessing(true);
      setErrorMessage('');
      const mongoId = app._id || app.id;
      const targetStatus = newStatus.toLowerCase();
      await updateApplicationStatus(mongoId, targetStatus);
      if (targetStatus === 'approved') {
        setMessage('Application approved successfully.');
      } else {
        setMessage(`Application status updated to "${newStatus}"`);
      }
      setIsReceiptModalOpen(false);
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Error updating status:', err);
      setErrorMessage(err.message || 'Failed to update application status.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveEdit = async (appId, payload) => {
    try {
      await updateApplication(appId, payload);
      setMessage('Application details updated successfully.');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      console.error('Error saving application edit:', err);
      setErrorMessage(err.message || 'Failed to update application');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (!app) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">Application not found.</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">No application record matched ID "{id}".</p>
        <button
          onClick={() => navigate('/admin-dashboard/applications')}
          className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const statusLower = (app.status || '').toLowerCase();
  const isPending = statusLower === 'pending';

  let receiptUrl = app.paymentReceiptUrl || app.paymentDetails?.receiptUrl;
  if (!receiptUrl && Array.isArray(app.documentDetails?.additionalDocuments)) {
    const found = app.documentDetails.additionalDocuments.find(
      (d) => d.documentType === 'Payment Receipt' || d.documentName?.includes('Payment')
    );
    if (found) receiptUrl = found.documentUrl;
  }
  const displayReceiptUrl = receiptUrl ? getBackendAssetUrl(receiptUrl) : indusIndQr;

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* BACK BUTTON & TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin-dashboard/applications')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
            title="Back to Applications"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{app.applicantName}</h1>
              <StatusBadge status={app.status} />
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Ref ID: {app.refId} • Member ID: {app.memberId} • ID: {app.id}
            </p>
          </div>
        </div>

        {/* TOP ACTIONS TOOLBAR */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsReceiptModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition-colors border border-indigo-300 cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 text-indigo-700" />
            <span>View Payment Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors border border-amber-300 cursor-pointer shadow-xs"
          >
            <Edit className="w-4 h-4 text-amber-700" />
            <span>Edit Application</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-300 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            <span>Download / Print Dossier</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange('Correction Required')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors border border-amber-200 cursor-pointer"
          >
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Request Correction</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange('Approved')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00C853] hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve Application</span>
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange('Rejected')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject Application</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* 9 STATUTORY SECTIONS GRID */}
      <div className="space-y-5">
        {/* SECTION 1: PERSONAL DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <User className="w-4 h-4 text-blue-700" />
              <span>1. PERSONAL DETAILS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 01</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div><strong className="block text-[10px] text-slate-400 uppercase">FULL LEGAL NAME</strong><span className="font-extrabold text-slate-900">{app.applicantName}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">FATHER / HUSBAND / GUARDIAN</strong><span className="font-bold text-slate-800">{app.relationshipPrefix} {app.fatherLegalName}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">DATE OF BIRTH &amp; AGE</strong><span className="font-bold text-slate-800">{app.dob} ({app.age} Years)</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">GENDER &amp; MARITAL STATUS</strong><span className="font-bold text-slate-800">{app.gender} • {app.maritalStatus}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">RELIGION &amp; CASTE CATEGORY</strong><span className="font-bold text-slate-800">{app.religion} • {app.category}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">EDUCATION &amp; OCCUPATION</strong><span className="font-bold text-slate-800">{app.education} • {app.occupation}</span></div>
          </div>
        </div>

        {/* SECTION 2: ADDRESS & CONTACT */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>2. ADDRESS &amp; CONTACT DETAILS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 02</span>
          </div>

          <div className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-100 pb-3">
              <div><strong className="block text-[10px] text-slate-400 uppercase">PRIMARY MOBILE</strong><span className="font-mono font-bold text-slate-900">+91 {app.mobile}</span></div>
              <div><strong className="block text-[10px] text-slate-400 uppercase">ALTERNATE CONTACT</strong><span className="font-mono text-slate-700">+91 {app.altMobile}</span></div>
              <div><strong className="block text-[10px] text-slate-400 uppercase">REGISTERED EMAIL</strong><span className="font-mono font-bold text-slate-900 truncate block">{app.email}</span></div>
              <div><strong className="block text-[10px] text-slate-400 uppercase">INCOME TAX PAN</strong><span className="font-mono font-bold text-amber-600">{app.pan}</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                <strong className="block text-[10px] text-slate-500 uppercase">PERMANENT RESIDENTIAL ADDRESS</strong>
                <p className="font-bold text-slate-900">{app.address1}</p>
                <p className="text-[11px] text-slate-600">Taluka: {app.villageTown} | District: {app.district} | State: {app.state} | PIN: {app.pincode}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                <strong className="block text-[10px] text-slate-500 uppercase">MAILING ADDRESS</strong>
                <p className="font-bold text-slate-900">{app.address1}</p>
                <p className="text-[11px] text-slate-600">District: {app.district} | State: {app.state} | PIN: {app.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: ACCOUNT & BRANCH ALLOCATION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-blue-700" />
              <span>3. ACCOUNT &amp; BRANCH DETAILS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 03</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div><strong className="block text-[10px] text-slate-400 uppercase">REGISTERED BRANCH</strong><span className="font-extrabold text-slate-900">{app.branch}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">INTRODUCER / ASSOCIATE</strong><span className="font-extrabold text-slate-900">{app.introducer}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">EMPLOYEE (EMP) ID</strong><span className="font-mono font-bold text-slate-900">{app.empId}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">REGISTRY ACT</strong><span className="font-bold text-slate-800">Companies Act 2013 &amp; Nidhi Rules 2014</span></div>
          </div>
        </div>

        {/* SECTION 4: NOMINEE DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <UserCheck className="w-4 h-4 text-blue-700" />
              <span>4. NOMINEE DETAILS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 04</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div><strong className="block text-[10px] text-slate-400 uppercase">NOMINEE NAME</strong><span className="font-extrabold text-slate-900">{app.nomineeName}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">RELATIONSHIP</strong><span className="font-bold text-slate-800">{app.nomineeRel}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">NOMINEE DOB</strong><span className="font-bold text-slate-800">{app.nomineeDob}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">ADDRESS</strong><span className="font-bold text-slate-800">{app.nomineeAddr}</span></div>
          </div>
        </div>

        {/* SECTION 5: MEMBERSHIP & EQUITY DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <BarChart3 className="w-4 h-4 text-blue-700" />
              <span>5. MEMBERSHIP &amp; EQUITY DETAILS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 05</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div><strong className="block text-[10px] text-slate-400 uppercase">EQUITY SHARES ALLOTTED</strong><span className="font-bold text-slate-900">{app.numberOfShares} Shares @ ₹{app.shareValue}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">SHARE CAPITAL VALUE</strong><span className="font-bold text-slate-900">₹ {app.numberOfShares * app.shareValue}.00</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">ADMISSION FEE</strong><span className="font-bold text-slate-900">₹ {app.processingFee}.00</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">TOTAL PAID CONSIDERATION</strong><span className="font-black text-emerald-700 font-mono text-sm">₹ {app.totalPaid}.00 (Settled)</span></div>
          </div>
        </div>

        {/* SECTION 6: DOCUMENTS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>6. IDENTIFICATION DOCUMENTS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 06</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><strong className="block text-[10px] text-slate-400 uppercase">PRIMARY ID PROOF TYPE</strong><span className="font-bold text-slate-900">{app.idProofType}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">ADDRESS PROOF TYPE</strong><span className="font-bold text-slate-900">{app.addressProofType}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">DIGITAL ARCHIVE STATUS</strong><span className="font-bold text-emerald-700">Verified &amp; Archived</span></div>
          </div>
        </div>

        {/* SECTION 7: WITNESS DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <PenTool className="w-4 h-4 text-blue-700" />
              <span>7. WITNESS DETAILS</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 07</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
              <strong className="block text-[10px] text-slate-500 uppercase">WITNESS 1</strong>
              <div className="font-extrabold text-slate-900">{app.witness1Name}</div>
              <div className="text-[11px] text-slate-600 font-mono">Mobile: +91 {app.witness1Mobile}</div>
              <div className="text-[11px] text-slate-600">{app.witness1Address}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
              <strong className="block text-[10px] text-slate-500 uppercase">WITNESS 2</strong>
              <div className="font-extrabold text-slate-900">{app.witness2Name}</div>
              <div className="text-[11px] text-slate-600 font-mono">Mobile: +91 {app.witness2Mobile}</div>
              <div className="text-[11px] text-slate-600">{app.witness2Address}</div>
            </div>
          </div>
        </div>

        {/* SECTION 8: DECLARATION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>8. STATUTORY DECLARATION</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 08</span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div><strong className="block text-[10px] text-slate-400 uppercase">DIGITAL SIGNATURE</strong><span className="font-serif italic font-extrabold text-slate-900 text-sm">{app.sigName}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">EXECUTION DATE</strong><span className="font-bold text-slate-800 font-mono">{app.declarationDate}</span></div>
            <div><strong className="block text-[10px] text-slate-400 uppercase">COMPLIANCE AFFIRMED</strong><span className="font-bold text-emerald-700">Nidhi Rules 2014 &amp; 2022 Accepted</span></div>
          </div>
        </div>

        {/* SECTION 9: PAYMENT */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-blue-700" />
              <span>9. PAYMENT CLEARANCE &amp; RECEIPT VERIFICATION</span>
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">Section 09</span>
          </div>

          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border-b border-slate-100 pb-4">
              <div><strong className="block text-[10px] text-slate-400 uppercase">PAYMENT METHOD</strong><span className="font-extrabold text-slate-900">{app.paymentMethod}</span></div>
              <div><strong className="block text-[10px] text-slate-400 uppercase">TRANSACTION UTR</strong><span className="font-mono font-black text-blue-700">{app.utrNo}</span></div>
              <div><strong className="block text-[10px] text-slate-400 uppercase">TOTAL PAID CONSIDERATION</strong><span className="font-mono font-black text-emerald-700">₹{app.totalPaid || 200}.00 (Settled)</span></div>
            </div>

            {/* RECEIPT SCREENSHOT PREVIEW CARD */}
            <div className="bg-slate-50 rounded-2xl p-4.5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setIsReceiptModalOpen(true)}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950 border-2 border-blue-600/60 p-1 flex items-center justify-center overflow-hidden cursor-pointer shrink-0 shadow-md group relative hover:scale-105 transition-transform"
                >
                  <img
                    src={displayReceiptUrl}
                    alt="Payment Screenshot Preview"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-900 text-sm">
                      Uploaded Payment Receipt Screenshot
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ₹{app.totalPaid || 200} Attached
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    UPI payment confirmation uploaded by applicant for statutory admission fee.
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsReceiptModalOpen(true)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Inspect Full Screenshot</span>
                    </button>
                    <span>•</span>
                    <a
                      href={displayReceiptUrl}
                      download={`Payment_Receipt_${app.id || 'NUF'}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* DIRECT APPROVAL BUTTON IN SECTION 9 */}
              <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
                {isPending ? (
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleStatusChange('Approved')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#00C853] hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>Approving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-slate-950" />
                        <span>APPROVE APPLICATION</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold bg-white px-4 py-2 rounded-xl border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Payment &amp; Membership Cleared</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT RECEIPT MODAL */}
      <PaymentReceiptModal
        isOpen={isReceiptModalOpen}
        application={app}
        onClose={() => setIsReceiptModalOpen(false)}
        onApprove={() => handleStatusChange('Approved')}
        onReject={() => handleStatusChange('Rejected')}
        isProcessing={isProcessing}
      />

      {/* EDIT APPLICATION MODAL */}
      <EditApplicationModal
        isOpen={isEditModalOpen}
        application={app}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default ApplicationDetails;
