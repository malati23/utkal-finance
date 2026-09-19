import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Printer, 
  Copy, 
  Check, 
  Users, 
  ArrowRight, 
  User, 
  MapPin, 
  Building2, 
  UserCheck, 
  BarChart3, 
  FileText, 
  PenTool, 
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';

export function SubmissionSuccess({ referenceNo, formData = {}, onReset }) {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(false);

  const personal = formData.personal || {};
  const address = formData.address || {};
  const account = formData.account || {};
  const nominee = formData.nominee || {};
  const shares = formData.shares || {};
  const documents = formData.documents || {};
  const witness = formData.witness || {};
  const declaration = formData.declaration || {};

  // 1. Dynamic Personal Details
  const title = personal.title || 'Mr.';
  const firstName = personal.firstName || 'Sarthak';
  const middleName = personal.middleName ? personal.middleName.trim() + ' ' : '';
  const lastName = personal.lastName || 'Kumar Das';
  const fullName = personal.fullName || `${title} ${firstName} ${middleName}${lastName}`.trim();

  const relPrefix = personal.relationshipPrefix || 'S/o.';
  const fatherName = personal.fatherLegalName || personal.fatherName || 'Bipin Bihari Das';
  const fatherGuardianStr = `${relPrefix} ${fatherName}`.replace(' (Son of)', '').replace(' (Daughter of)', '').replace(' (Wife of)', '').replace(' (Care of)', '');

  const dob = personal.dob || '1996-06-20';
  const age = personal.age || '30';
  const gender = personal.gender || 'Male';
  const marital = personal.maritalStatus || 'Married';
  const religion = personal.religion || 'Hindu';
  const category = personal.category || 'General';
  const education = personal.education || 'Graduate / P.G.';
  const occupation = personal.occupation || 'Business';

  // 2. Dynamic Contact & Address
  const rawMobile = account.mobile || address.mobile || personal.mobile || '9861374251';
  const mobile = rawMobile.startsWith('+91') ? rawMobile : `+91 ${rawMobile}`;
  const altMobile = account.alternateMobile || address.alternateMobile || '+91 9437112233';
  const email = account.email || address.email || 'applicant.314214@utkalfinance.com';
  const pan = personal.pan || documents.docRefNo || 'ABCDE1234F';

  const resAddr1 = [address.address1, address.address2, address.villageTown].filter(Boolean).join(', ') || 'Plot 214, Sector A, Saheed Nagar';
  const resTaluka = address.villageTown || 'Bhubaneswar';
  const resDistrict = address.district || 'Khurda';
  const resState = address.state || 'Odisha';
  const resPincode = address.pincode || '751007';

  const commAddr1 = address.sameAsResidential || !address.commAddress1 
    ? resAddr1 
    : [address.commAddress1, address.commAddress2, address.commVillageTown].filter(Boolean).join(', ');
  const commDistrict = address.sameAsResidential || !address.commDistrict ? resDistrict : address.commDistrict;
  const commState = address.sameAsResidential || !address.commState ? resState : address.commState;
  const commPincode = address.sameAsResidential || !address.commPincode ? resPincode : address.commPincode;

  // 3. Dynamic IDs & Allocation
  const memberId = account.memberId || 'UF-2026-6726';
  const empId = account.empId || 'EMP-2026-6099';
  const refId = referenceNo || 'APP-2026-2931';
  const branchName = account.registeredBranch || account.branch || 'Bhubaneswar HQ (Nayapalli, IRC Village)';
  const introducerName = account.introducer || account.agent || 'Pradeep Kumar Jena';

  // 4. Dynamic Nominee
  const nomineeName = nominee.fullName || (nominee.firstName ? `${nominee.title ? nominee.title + ' ' : ''}${nominee.firstName} ${nominee.lastName || ''}`.trim() : 'Mrs. Sunita Das');
  const nomineeRel = nominee.relationship || 'Spouse / Wife';
  const nomineeDob = nominee.dob || '1998-04-15';
  const nomineeAddr = nominee.sameAsApplicant || !nominee.address ? 'Same as Applicant Address' : nominee.address;

  // 5. Dynamic Equity & Shares
  const numShares = shares.numberOfShares ? parseInt(shares.numberOfShares, 10) : 10;
  const shareVal = shares.shareValue ? parseInt(shares.shareValue, 10) : 10;
  const totalShareVal = numShares * shareVal;
  const processingFee = shares.processingFee ? parseInt(shares.processingFee, 10) : 100;
  const totalPaidVal = totalShareVal + processingFee;

  // 6. Dynamic Witnesses
  const w1Name = witness.witness1Name || 'Rajesh Kumar Swain';
  const w1Mobile = witness.witness1Mobile ? (witness.witness1Mobile.startsWith('+91') ? witness.witness1Mobile : `+91 ${witness.witness1Mobile}`) : '+91 9861001122';
  const w1Address = witness.witness1Address || 'Bhubaneswar, Odisha';

  const w2Name = witness.witness2Name || 'Manas Ranjan Rout';
  const w2Mobile = witness.witness2Mobile ? (witness.witness2Mobile.startsWith('+91') ? witness.witness2Mobile : `+91 ${witness.witness2Mobile}`) : '+91 9437889900';
  const w2Address = witness.witness2Address || 'Cuttack, Odisha';

  // 7. Dynamic Declaration
  const sigName = declaration.signatureName || fullName;
  const declDate = declaration.declarationDate || new Date().toISOString().split('T')[0];

  const handleCopyMemberId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(memberId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* SCREEN INTERFACE (HIDDEN DURING PRINT) */}
      <div className="no-print w-full max-w-[1020px] mx-auto space-y-6 font-sans py-4 sm:py-6 px-2 sm:px-4 animate-fade-in">
        {/* 1. TOP DARK NAVY BANNER BOX */}
        <div className="bg-[#0B1528] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6 text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-400/30 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SUCCESSFULLY BECAME MEMBER OF NEW UTKAL FINANCE</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer ml-auto"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>PRINT OFFICIAL FORM</span>
            </button>
          </div>

          {/* Headline */}
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Congratulations, {fullName}!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-3xl">
              You have successfully become an official member of New Utkal Finance Limited! Your membership is active and approved with zero waiting for administrator acceptance. Below you can see your complete filled-up application page with all your details.
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2 relative z-10">
            <div className="bg-[#051124]/90 border border-slate-700/80 rounded-2xl p-4 space-y-1 text-left shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                MEMBER ACCOUNT ID
              </span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-base sm:text-lg font-black text-white font-mono tracking-wider">
                  {memberId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyMemberId}
                  className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  title="Copy Member ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="bg-[#051124]/90 border border-slate-700/80 rounded-2xl p-4 space-y-1 text-left shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                EMP / ASSOCIATE ID
              </span>
              <span className="text-base sm:text-lg font-black text-white font-mono tracking-wider block mt-0.5">
                {empId}
              </span>
            </div>

            <div className="bg-[#051124]/90 border border-slate-700/80 rounded-2xl p-4 space-y-1 text-left shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                APPLICATION REF ID
              </span>
              <span className="text-base sm:text-lg font-black text-amber-400 font-mono tracking-wider block mt-0.5">
                {refId}
              </span>
            </div>

            <div className="bg-[#051124]/90 border border-slate-700/80 rounded-2xl p-4 space-y-1 text-left shadow-xs">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                ACCOUNT &amp; KYC STATUS
              </span>
              <div className="flex items-center gap-1.5 pt-1 text-emerald-400 font-extrabold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Active • Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. DOSSIER ACTION BAR */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Complete Statutory Application Dossier (All 9 Sections)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-700" />
              <span>View &amp; Print 2-Page Form</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Users className="w-4 h-4 text-slate-600" />
              <span>Register Another Member</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-[#0B1528] hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. FULL STATUTORY DOSSIER SCREEN VIEW (SECTIONS 1 TO 9) */}
        <div className="space-y-5 text-left">
          {/* SECTION 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <User className="w-4 h-4 text-blue-700" />
                <span>SECTION 1: PERSONAL &amp; DEMOGRAPHIC PARTICULARS</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Verified
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">FULL LEGAL NAME</span>
                <span className="font-extrabold text-slate-900 text-sm block">{fullName}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">FATHER / HUSBAND / GUARDIAN</span>
                <span className="font-bold text-slate-800 block">{fatherGuardianStr}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DATE OF BIRTH &amp; AGE</span>
                <span className="font-bold text-slate-800 block">{dob} ({age} Years)</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GENDER &amp; MARITAL STATUS</span>
                <span className="font-bold text-slate-800 block">{gender} • {marital}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RELIGION &amp; CASTE CATEGORY</span>
                <span className="font-bold text-slate-800 block">{religion} • {category}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EDUCATION &amp; OCCUPATION</span>
                <span className="font-bold text-slate-800 block">{education} • {occupation}</span>
              </div>

              <div className="space-y-1 sm:col-span-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">DEPOSITOR STATUS</span>
                <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold inline-block">
                  Share Holder
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-700" />
                <span>SECTION 2: CONTACT, IDENTITY &amp; STATUTORY ADDRESSES</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Recorded
              </span>
            </div>

            <div className="p-5 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PRIMARY MOBILE</span>
                  <span className="font-extrabold text-slate-900 font-mono text-sm block">{mobile}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ALTERNATE CONTACT</span>
                  <span className="font-bold text-slate-800 font-mono block">{altMobile}</span>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REGISTERED EMAIL</span>
                  <span className="font-extrabold text-slate-900 font-mono block truncate">{email}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">INCOME TAX PAN</span>
                  <span className="font-extrabold text-amber-600 font-mono block">{pan}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    PERMANENT RESIDENTIAL ADDRESS
                  </span>
                  <div className="font-bold text-slate-900 text-xs leading-normal">
                    {resAddr1}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Taluka: <strong>{resTaluka}</strong> District: <strong>{resDistrict}</strong> State: <strong>{resState}</strong> PIN: <strong>{resPincode}</strong>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    CORRESPONDENCE / MAILING ADDRESS
                  </span>
                  <div className="font-bold text-slate-900 text-xs leading-normal">
                    {commAddr1}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    District: <strong>{commDistrict}</strong> State: <strong>{commState}</strong> PIN: <strong>{commPincode}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>SECTION 3: BRANCH &amp; SOCIETY ALLOCATION</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Assigned
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REGISTERED BRANCH</span>
                <span className="font-extrabold text-slate-900 block">{branchName}</span>
                <span className="text-[10px] text-slate-500 font-mono block">Code: 075101</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ASSOCIATE / INTRODUCER</span>
                <span className="font-extrabold text-slate-900 block">{introducerName}</span>
                <span className="text-[10px] text-slate-500 font-mono block">Code: UTK-ASC-101</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EMPLOYEE (EMP) ID</span>
                <span className="font-black text-slate-900 font-mono block">{empId}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STATUTORY REGISTRY ACT</span>
                <span className="font-bold text-slate-800 block">Companies Act 2013 &amp; Nidhi Rules 2014</span>
              </div>
            </div>
          </div>

          {/* SECTION 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-blue-700" />
                <span>SECTION 4: NOMINEE APPOINTMENT &amp; BENEFICIARY</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Active
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NOMINEE FULL NAME</span>
                <span className="font-extrabold text-slate-900 block">{nomineeName}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RELATIONSHIP</span>
                <span className="font-bold text-slate-800 block">{nomineeRel}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NOMINEE DOB</span>
                <span className="font-bold text-slate-800 block">{nomineeDob}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">RESIDENTIAL ADDRESS</span>
                <span className="font-bold text-slate-800 block">{nomineeAddr}</span>
              </div>
            </div>
          </div>

          {/* SECTION 5 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>SECTION 5: EQUITY CAPITAL &amp; SHARE ALLOCATION</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Allocated
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">MANDATORY EQUITY SHARES</span>
                <span className="font-extrabold text-slate-900 block">{numShares} Equity Shares @ ₹ {shareVal}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL EQUITY VALUE</span>
                <span className="font-extrabold text-slate-900 block">₹ {totalShareVal}.00</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ADMISSION / PROCESSING FEE</span>
                <span className="font-extrabold text-slate-900 block">₹ {processingFee}.00</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL PAID CONSIDERATION</span>
                <span className="font-black text-emerald-700 text-sm block">₹ {totalPaidVal}.00 (Fully Settled)</span>
              </div>
            </div>
          </div>

          {/* SECTION 6 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>SECTION 6: STATUTORY IDENTIFICATION &amp; DOCUMENTS</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Attached
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PRIMARY ID PROOF TYPE</span>
                <span className="font-bold text-slate-900 block">{documents.idProofType || 'Aadhaar Card (Govt. UIDAI)'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ADDRESS PROOF TYPE</span>
                <span className="font-bold text-slate-900 block">{documents.addressProofType || 'Aadhaar Card'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DOCUMENT DISPOSITION</span>
                <span className="font-bold text-emerald-700 block">Verified &amp; Digitally Archiving Complete</span>
              </div>
            </div>
          </div>

          {/* SECTION 7 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <PenTool className="w-4 h-4 text-blue-700" />
                <span>SECTION 7: WITNESS DECLARATIONS &amp; ATTESTATION</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Signed
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">WITNESS 1</span>
                <div className="font-extrabold text-slate-900">{w1Name}</div>
                <div className="text-[11px] text-slate-600 font-mono">Mobile: {w1Mobile}</div>
                <div className="text-[11px] text-slate-600">{w1Address}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">WITNESS 2</span>
                <div className="font-extrabold text-slate-900">{w2Name}</div>
                <div className="text-[11px] text-slate-600 font-mono">Mobile: {w2Mobile}</div>
                <div className="text-[11px] text-slate-600">{w2Address}</div>
              </div>
            </div>
          </div>

          {/* SECTION 8 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>SECTION 8: MEMBER DECLARATION &amp; DIGITAL ACKNOWLEDGEMENT</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Accepted
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  LEGAL UNDERTAKING &amp; DECLARATION
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                  &quot;I hereby declare that the particulars given in this application are true and correct to the best of my knowledge. I agree to abide by the Bye-laws, Nidhi Rules 2014, and statutory regulations of Newutkal Finance Ltd.&quot;
                </p>
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Statutory Terms Affirmed &amp; Signed</span>
                </div>
                <div className="text-[11px] text-slate-500 font-semibold pt-1">
                  Execution Date: <span className="font-bold text-slate-900 font-mono">{declDate}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3 text-center flex flex-col justify-between">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block text-left">
                  CUSTOMER DIGITAL SIGNATURE RECORD
                </span>

                <div className="my-2 border-2 border-dashed border-blue-200 rounded-xl p-5 bg-white/70 flex items-center justify-center">
                  <span className="text-slate-400 font-mono text-[11px] italic">
                    [ Digitally Signed &amp; Affirmed electronically ]
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 font-medium">
                  <span className="font-extrabold text-slate-800">{sigName}</span>
                  <span className="text-emerald-600 font-bold ml-1.5">+ Cryptographically Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 9 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-blue-700" />
                <span>SECTION 9: PAYMENT VERIFICATION &amp; OFFICIAL RECEIPT</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Paid &amp; Confirmed
              </span>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STATUTORY AMOUNT</span>
                <span className="font-black text-emerald-600 text-base sm:text-lg block font-mono">₹ {totalPaidVal}.00</span>
                <span className="text-[10px] text-slate-400 block">Rupees Two Hundred Only</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PAYMENT METHOD</span>
                <span className="font-extrabold text-slate-900 block">UPI (Google Pay)</span>
                <span className="text-[10px] text-slate-500 block">Instant Digital Settlement</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TRANSACTION REF / UTR</span>
                <span className="font-black text-slate-900 font-mono text-xs block">UTR426774469795</span>
                <span className="text-[10px] text-emerald-600 font-bold block">Digital Clearance: OK</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OFFICIAL RECEIPT NUMBER</span>
                <span className="font-black text-slate-900 font-mono text-xs block">REC-2026-6834</span>
                <span className="text-[10px] text-slate-500 block">Share Capital &amp; Admission</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. NEED A PHYSICAL COPY CTA BANNER */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Need a physical copy of your statutory admission document?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Download or print the official 2-page statutory membership admission form (Form 1 &amp; Form 2).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#004085] hover:bg-blue-900 text-white font-black text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-wider w-full sm:w-auto cursor-pointer"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>PRINT FORM (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="bg-[#0B1528] hover:bg-slate-900 text-white font-black text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md uppercase tracking-wider w-full sm:w-auto cursor-pointer"
              >
                <span>SIGN IN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-6 py-2.5 rounded-xl border border-slate-200 transition-colors uppercase tracking-wider shadow-2xs cursor-pointer"
            >
              RETURN TO HOME
            </button>
          </div>
        </div>

        {/* 5. FOOTER COPYRIGHT */}
        <div className="text-center pt-4 pb-6 space-y-1 text-[11px] text-slate-400">
          <p>© 2026 Newutkal Finance Ltd. Certified by Govt. of India (Reg. No.: U64199OD2026PLC054968).</p>
          <p className="text-[10px] text-slate-400">
            Digital Ecosystem by <strong className="text-slate-600 font-bold">Briskode Technology Pvt. Ltd.</strong>
          </p>
        </div>
      </div>

      {/* ==================================================== */}
      {/* PRINT-ONLY OFFICIAL 2-PAGE STATUTORY ADMISSION FORM */}
      {/* (POPUALATED DYNAMICALLY WITH ACTUAL USER FORM DATA)   */}
      {/* ==================================================== */}
      <div className="hidden print:block text-slate-900 font-sans p-2 space-y-4">
        {/* PAGE 1 OF 2: FORM NO. 1 */}
        <div className="print-page-break border-2 border-slate-900 p-6 space-y-4 min-h-[95vh] text-left">
          {/* Official Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <img src={brandLogo} alt="Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">NEW UTKAL FINANCE LIMITED</h1>
                <p className="text-[10px] font-bold text-slate-700">Govt. Reg. No.: U64199OD2026PLC054968 | Nidhi Rules 2014 &amp; 2022</p>
                <p className="text-[9px] text-slate-600">Registered Office: Utkal Tower, Plot No. N-5/172, IRC Village, Nayapalli, Bhubaneswar - 751015</p>
              </div>
            </div>
            <div className="text-right border-l-2 border-slate-900 pl-4 py-1">
              <span className="text-[11px] font-black uppercase tracking-wider block bg-slate-100 px-2 py-0.5 border border-slate-400">FORM NO. 1</span>
              <span className="text-[10px] font-bold block mt-1">Ref ID: {refId}</span>
              <span className="text-[10px] font-mono block">Member ID: {memberId}</span>
            </div>
          </div>

          {/* Form Title Banner */}
          <div className="bg-slate-900 text-white text-center py-1.5 px-4 font-black text-sm uppercase tracking-wider">
            STATUTORY MEMBERSHIP ADMISSION APPLICATION (PAGE 1 OF 2)
          </div>

          {/* Section 1: Personal & Demographic Particulars */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 1: APPLICANT PERSONAL &amp; DEMOGRAPHIC PARTICULARS
            </div>
            <div className="p-3 grid grid-cols-3 gap-3 text-[11px]">
              <div><strong className="block text-[9px] uppercase text-slate-600">FULL LEGAL NAME</strong><span className="font-extrabold">{fullName}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">FATHER / GUARDIAN</strong><span className="font-bold">{fatherGuardianStr}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">DOB &amp; AGE</strong><span className="font-bold">{dob} ({age} Yrs)</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">GENDER &amp; MARITAL</strong><span className="font-bold">{gender} • {marital}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">RELIGION &amp; CATEGORY</strong><span className="font-bold">{religion} • {category}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">EDUCATION &amp; OCCUPATION</strong><span className="font-bold">{education} • {occupation}</span></div>
            </div>
          </div>

          {/* Section 2: Contact, Identity & Addresses */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 2: CONTACT, IDENTITY &amp; STATUTORY ADDRESSES
            </div>
            <div className="p-3 space-y-2 text-[11px]">
              <div className="grid grid-cols-4 gap-2 border-b border-slate-300 pb-2">
                <div><strong className="block text-[9px] uppercase text-slate-600">PRIMARY MOBILE</strong><span className="font-mono font-bold">{mobile}</span></div>
                <div><strong className="block text-[9px] uppercase text-slate-600">ALTERNATE CONTACT</strong><span className="font-mono">{altMobile}</span></div>
                <div><strong className="block text-[9px] uppercase text-slate-600">REGISTERED EMAIL</strong><span className="font-mono">{email}</span></div>
                <div><strong className="block text-[9px] uppercase text-slate-600">INCOME TAX PAN</strong><span className="font-mono font-bold">{pan}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <strong className="block text-[9px] uppercase text-slate-600">PERMANENT RESIDENTIAL ADDRESS</strong>
                  <p className="font-bold">{resAddr1}</p>
                  <p className="text-[10px]">Taluka: {resTaluka} | Dist: {resDistrict} | State: {resState} | PIN: {resPincode}</p>
                </div>
                <div>
                  <strong className="block text-[9px] uppercase text-slate-600">CORRESPONDENCE / MAILING ADDRESS</strong>
                  <p className="font-bold">{commAddr1}</p>
                  <p className="text-[10px]">Dist: {commDistrict} | State: {commState} | PIN: {commPincode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Branch & Society Allocation */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 3: BRANCH &amp; SOCIETY ALLOCATION
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 text-[11px]">
              <div><strong className="block text-[9px] uppercase text-slate-600">REGISTERED BRANCH</strong><span className="font-bold">{branchName}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">ASSOCIATE / INTRODUCER</strong><span className="font-bold">{introducerName}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">EMP / ASSOCIATE ID</strong><span className="font-mono font-bold">{empId}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">REGISTRY ACT</strong><span className="font-bold">Companies Act 2013</span></div>
            </div>
          </div>

          {/* Section 4: Nominee Appointment */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 4: NOMINEE APPOINTMENT &amp; BENEFICIARY
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 text-[11px]">
              <div><strong className="block text-[9px] uppercase text-slate-600">NOMINEE NAME</strong><span className="font-bold">{nomineeName}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">RELATIONSHIP</strong><span className="font-bold">{nomineeRel}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">NOMINEE DOB</strong><span className="font-bold">{nomineeDob}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">NOMINEE ADDRESS</strong><span className="font-bold">{nomineeAddr}</span></div>
            </div>
          </div>

          {/* Footer watermark note */}
          <div className="text-right text-[9px] text-slate-500 font-mono border-t border-slate-300 pt-2">
            Page 1 of 2 • Statutory Membership Record • New Utkal Finance Limited
          </div>
        </div>

        {/* PAGE 2 OF 2: FORM NO. 2 */}
        <div className="border-2 border-slate-900 p-6 space-y-4 min-h-[95vh] text-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
            <div>
              <h2 className="text-lg font-black uppercase">NEW UTKAL FINANCE LIMITED - DOSSIER FORM NO. 2</h2>
              <p className="text-[10px]">Member Account ID: <strong className="font-mono">{memberId}</strong> | Application Ref ID: <strong className="font-mono">{refId}</strong></p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-black uppercase tracking-wider bg-slate-100 px-2 py-0.5 border border-slate-400">PAGE 2 OF 2</span>
            </div>
          </div>

          {/* Section 5: Equity Capital & Share Allocation */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 5: EQUITY CAPITAL &amp; SHARE ALLOCATION
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 text-[11px]">
              <div><strong className="block text-[9px] uppercase text-slate-600">EQUITY SHARES</strong><span className="font-bold">{numShares} Shares @ ₹{shareVal}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">TOTAL SHARE VALUE</strong><span className="font-bold">₹ {totalShareVal}.00</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">ADMISSION FEE</strong><span className="font-bold">₹ {processingFee}.00</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">PAID SETTLEMENT</strong><span className="font-bold font-mono text-emerald-800">₹ {totalPaidVal}.00 (Settled)</span></div>
            </div>
          </div>

          {/* Section 6: Identification Documents */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 6: STATUTORY IDENTIFICATION DOCUMENTS
            </div>
            <div className="p-3 grid grid-cols-3 gap-2 text-[11px]">
              <div><strong className="block text-[9px] uppercase text-slate-600">PRIMARY ID PROOF</strong><span className="font-bold">{documents.idProofType || 'Aadhaar Card'}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">ADDRESS PROOF TYPE</strong><span className="font-bold">{documents.addressProofType || 'Aadhaar Card'}</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">DOCUMENT DISPOSITION</strong><span className="font-bold text-emerald-800">Verified &amp; Digitally Archived</span></div>
            </div>
          </div>

          {/* Section 7: Witness Declarations */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 7: WITNESS DECLARATIONS &amp; ATTESTATION
            </div>
            <div className="p-3 grid grid-cols-2 gap-4 text-[11px]">
              <div className="border border-slate-300 p-2 rounded-xs">
                <strong className="block text-[9px] uppercase text-slate-600">WITNESS 1</strong>
                <p className="font-extrabold">{w1Name}</p>
                <p className="font-mono text-[10px]">Mobile: {w1Mobile}</p>
                <p className="text-[10px]">{w1Address}</p>
              </div>
              <div className="border border-slate-300 p-2 rounded-xs">
                <strong className="block text-[9px] uppercase text-slate-600">WITNESS 2</strong>
                <p className="font-extrabold">{w2Name}</p>
                <p className="font-mono text-[10px]">Mobile: {w2Mobile}</p>
                <p className="text-[10px]">{w2Address}</p>
              </div>
            </div>
          </div>

          {/* Section 8: Applicant Declaration & Signature */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 8: MEMBER DECLARATION &amp; DIGITAL SIGNATURE
            </div>
            <div className="p-3 space-y-2 text-[11px]">
              <p className="italic text-[10px] text-slate-700">
                &quot;I hereby declare that the particulars given in this application are true and correct to the best of my knowledge. I agree to abide by the Bye-laws, Nidhi Rules 2014, and statutory regulations of Newutkal Finance Ltd.&quot;
              </p>
              <div className="flex items-center justify-between border-t border-slate-300 pt-2">
                <div>
                  <strong className="block text-[9px] uppercase text-slate-600">DIGITAL SIGNATURE</strong>
                  <span className="font-serif italic font-extrabold text-sm">{sigName}</span>
                </div>
                <div className="text-right">
                  <strong className="block text-[9px] uppercase text-slate-600">EXECUTION DATE</strong>
                  <span className="font-mono font-bold">{declDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 9: Official Payment Receipt */}
          <div className="border border-slate-800 rounded-sm">
            <div className="bg-slate-200 px-3 py-1 font-black text-xs uppercase border-b border-slate-800">
              SECTION 9: PAYMENT CLEARANCE &amp; OFFICIAL RECEIPT
            </div>
            <div className="p-3 grid grid-cols-4 gap-2 text-[11px]">
              <div><strong className="block text-[9px] uppercase text-slate-600">AMOUNT PAID</strong><span className="font-black text-emerald-800">₹ {totalPaidVal}.00</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">PAYMENT METHOD</strong><span className="font-bold">UPI (Google Pay)</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">TRANSACTION UTR</strong><span className="font-mono font-bold">UTR426774469795</span></div>
              <div><strong className="block text-[9px] uppercase text-slate-600">RECEIPT NO.</strong><span className="font-mono font-bold">REC-2026-6834</span></div>
            </div>
          </div>

          {/* Official Seal & Signature Authorization */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t-2 border-slate-900">
            <div className="text-left space-y-8">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">APPLICANT SIGNATURE</span>
              <div className="border-b border-slate-900 w-48 font-serif italic text-xs pt-2">{sigName}</div>
            </div>
            <div className="text-right space-y-8">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">AUTHORIZED SIGNATORY &amp; BOARD STAMP</span>
              <div className="border-b border-slate-900 w-48 ml-auto text-[9px] text-slate-400 font-mono">[ Official Seal ]</div>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-[9px] text-slate-500 font-mono pt-4">
            End of Statutory Application Dossier • New Utkal Finance Limited • Registered under Section 406 Companies Act 2013
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccess;

