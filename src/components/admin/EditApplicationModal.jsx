import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Save,
  User,
  Phone,
  MapPin,
  Building2,
  UserCheck,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';

export function EditApplicationModal({ isOpen, application, onClose, onSave }) {
  const [activeSection, setActiveSection] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const scrollContainerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    // Personal Details
    title: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    relationshipPrefix: 'S/o.',
    fatherLegalName: '',
    dob: '',
    age: '',
    gender: 'Male',
    maritalStatus: 'Married',
    religion: 'Hindu',
    category: 'General',
    education: 'Graduate / P.G.',
    occupation: 'Business',
    pan: '',

    // Contact Details
    mobile: '',
    altMobile: '',
    email: '',

    // Address Details
    address1: '',
    villageTown: '',
    district: 'Khurda',
    state: 'Odisha',
    pincode: '',

    // Branch & Introducer
    branch: 'Bhubaneswar HQ (Nayapalli, IRC Village)',
    introducer: '',
    empId: '',

    // Nominee Details
    nomineeName: '',
    nomineeRel: 'Spouse',
    nomineeDob: '',
    nomineeMobile: '',
    nomineeAddr: '',

    // Share & Fees
    numberOfShares: 10,
    shareValue: 10,
    processingFee: 100,

    // Status
    status: 'pending',
  });

  // Load existing application data when modal opens or application changes
  useEffect(() => {
    if (application) {
      const p = application.personalDetails || {};
      const c = application.contactDetails || {};
      const a = application.addressDetails || {};
      const n = application.nomineeDetails || {};
      const m = application.membershipDetails || {};

      let initialFirstName = application.firstName || p.firstName || '';
      let initialMiddleName = application.middleName || p.middleName || '';
      let initialLastName = application.lastName || p.lastName || '';
      let initialTitle = application.title || p.title || 'Mr.';

      if (!initialFirstName && application.applicantName) {
        const cleaned = application.applicantName.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s+/i, '');
        const parts = cleaned.split(' ');
        initialFirstName = parts[0] || '';
        if (parts.length > 2) {
          initialMiddleName = parts.slice(1, -1).join(' ');
          initialLastName = parts[parts.length - 1];
        } else if (parts.length === 2) {
          initialLastName = parts[1];
        }
      }

      setFormData({
        title: initialTitle,
        firstName: initialFirstName,
        middleName: initialMiddleName,
        lastName: initialLastName,
        relationshipPrefix: application.relationshipPrefix || p.relationshipPrefix || 'S/o.',
        fatherLegalName: application.fatherLegalName || p.fatherLegalName || '',
        dob: application.dob || p.dob || '',
        age: application.age || p.age || '',
        gender: application.gender || p.gender || 'Male',
        maritalStatus: application.maritalStatus || p.maritalStatus || 'Married',
        religion: application.religion || p.religion || 'Hindu',
        category: application.category || p.category || 'General',
        education: application.education || p.education || 'Graduate / P.G.',
        occupation: application.occupation || p.occupation || 'Business',
        pan: application.pan || p.pan || '',

        mobile: application.mobile || c.mobile || '',
        altMobile: application.altMobile || c.altMobile || '',
        email: application.email || c.email || '',

        address1: application.address1 || a.address1 || '',
        villageTown: application.villageTown || a.villageTown || '',
        district: application.district || a.district || 'Khurda',
        state: application.state || a.state || 'Odisha',
        pincode: application.pincode || a.pincode || '',

        branch: application.branch || m.branch || 'Bhubaneswar HQ (Nayapalli, IRC Village)',
        introducer: application.introducer || m.introducer || '',
        empId: application.empId || m.empId || '',

        nomineeName: application.nomineeName || n.fullName || '',
        nomineeRel: application.nomineeRel || n.relationship || 'Spouse',
        nomineeDob: application.nomineeDob || n.dob || '',
        nomineeMobile: application.nomineeMobile || n.mobile || '',
        nomineeAddr: application.nomineeAddr || n.address || '',

        numberOfShares: Number(application.numberOfShares || m.numberOfShares) || 10,
        shareValue: Number(application.shareValue || m.shareValue) || 10,
        processingFee: Number(application.processingFee || m.processingFee) || 100,

        status: (application.status || 'pending').toLowerCase(),
      });
      setError('');
      setActiveSection('personal');
    }
  }, [application]);

  // Ensure scroll resets to top whenever modal opens & lock body scrolling
  useEffect(() => {
    if (isOpen) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !application) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'dob' && value) {
        const birthDate = new Date(value);
        if (!isNaN(birthDate.getTime())) {
          const diff = Date.now() - birthDate.getTime();
          const ageDate = new Date(diff);
          const computedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
          if (computedAge > 0 && computedAge < 120) {
            updated.age = String(computedAge);
          }
        }
      }
      return updated;
    });
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`edit-section-${sectionId}`);
    if (element && scrollContainerRef.current) {
      const parentTop = scrollContainerRef.current.getBoundingClientRect().top;
      const elemTop = element.getBoundingClientRect().top;
      const currentScroll = scrollContainerRef.current.scrollTop;
      const targetScroll = currentScroll + (elemTop - parentTop) - 10;
      scrollContainerRef.current.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim()) {
      setError('Applicant first name is required.');
      scrollToSection('personal');
      return;
    }
    if (!formData.mobile.trim()) {
      setError('Applicant primary mobile number is required.');
      scrollToSection('contact');
      return;
    }
    if (!formData.email.trim()) {
      setError('Applicant email address is required.');
      scrollToSection('contact');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      const nameParts = [
        formData.title,
        formData.firstName.trim(),
        formData.middleName.trim(),
        formData.lastName.trim(),
      ].filter(Boolean);
      const applicantName = nameParts.join(' ');

      const totalContribution =
        Number(formData.numberOfShares) * Number(formData.shareValue) +
        Number(formData.processingFee);

      const payload = {
        applicantName,
        title: formData.title,
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        relationshipPrefix: formData.relationshipPrefix,
        fatherLegalName: formData.fatherLegalName.trim(),
        dob: formData.dob,
        age: formData.age,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        religion: formData.religion,
        category: formData.category,
        education: formData.education,
        occupation: formData.occupation,
        pan: formData.pan.toUpperCase().trim(),
        mobile: formData.mobile.trim(),
        altMobile: formData.altMobile.trim(),
        email: formData.email.toLowerCase().trim(),
        address1: formData.address1.trim(),
        villageTown: formData.villageTown.trim(),
        district: formData.district.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        branch: formData.branch,
        introducer: formData.introducer.trim(),
        empId: formData.empId.trim(),
        nomineeName: formData.nomineeName.trim(),
        nomineeRel: formData.nomineeRel,
        nomineeDob: formData.nomineeDob,
        nomineeMobile: formData.nomineeMobile.trim(),
        nomineeAddr: formData.nomineeAddr.trim(),
        numberOfShares: Number(formData.numberOfShares),
        shareValue: Number(formData.shareValue),
        processingFee: Number(formData.processingFee),
        totalPaid: totalContribution,
        status: formData.status,

        personalDetails: {
          title: formData.title,
          firstName: formData.firstName.trim(),
          middleName: formData.middleName.trim(),
          lastName: formData.lastName.trim(),
          relationshipPrefix: formData.relationshipPrefix,
          fatherLegalName: formData.fatherLegalName.trim(),
          dob: formData.dob,
          age: formData.age,
          gender: formData.gender,
          maritalStatus: formData.maritalStatus,
          religion: formData.religion,
          category: formData.category,
          education: formData.education,
          occupation: formData.occupation,
          pan: formData.pan.toUpperCase().trim(),
        },
        contactDetails: {
          mobile: formData.mobile.trim(),
          altMobile: formData.altMobile.trim(),
          email: formData.email.toLowerCase().trim(),
        },
        addressDetails: {
          address1: formData.address1.trim(),
          villageTown: formData.villageTown.trim(),
          district: formData.district.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },
        nomineeDetails: {
          fullName: formData.nomineeName.trim(),
          relationship: formData.nomineeRel,
          dob: formData.nomineeDob,
          mobile: formData.nomineeMobile.trim(),
          address: formData.nomineeAddr.trim(),
        },
        membershipDetails: {
          branch: formData.branch,
          introducer: formData.introducer.trim(),
          empId: formData.empId.trim(),
          numberOfShares: Number(formData.numberOfShares),
          shareValue: Number(formData.shareValue),
          processingFee: Number(formData.processingFee),
          totalContribution: totalContribution,
        },
      };

      await onSave(application._id || application.id, payload);
      onClose();
    } catch (err) {
      console.error('Error saving application:', err);
      setError(err.message || 'Failed to save application changes');
    } finally {
      setIsSaving(false);
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xs select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[88vh] sm:max-h-[90vh] flex flex-col text-left overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. FIXED MODAL HEADER - ALWAYS AT THE VERY TOP */}
        <div className="bg-[#0b1c3d] text-white px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-blue-900/60 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center font-black text-blue-200 shrink-0">
              <User className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Edit Application Details
                </h2>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  {application.id || application.applicationId}
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                Modify statutory member dossier particulars and synchronize changes instantly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. FIXED STICKY QUICK-SECTION NAV BAR - ALWAYS UNDER HEADER */}
        <div className="bg-slate-50 border-b border-slate-200/90 px-4 sm:px-6 py-2.5 flex items-center gap-1.5 overflow-x-auto shrink-0 shadow-xs z-10">
          <button
            type="button"
            onClick={() => scrollToSection('personal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'personal'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Personal</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'contact'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>2. Contact</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('address')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'address'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>3. Address</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('branch')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'branch'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>4. Branch</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('nominee')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'nominee'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>5. Nominee</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('shares')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'shares'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>6. Shares &amp; Fees</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('status')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'status'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>7. Status</span>
          </button>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 3. FORM WRAPPER (FILLS REMAINING HEIGHT WITH PINNED FOOTER) */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* CONTINUOUS SCROLLABLE CONTENT WITH ALWAYS-VISIBLE RIGHT-SIDE SCROLLBAR */}
          <div
            ref={scrollContainerRef}
            className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-6 text-xs"
          >
            {/* SECTION 1: PERSONAL DETAILS */}
            <div id="edit-section-personal" className="space-y-3.5 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <User className="w-4 h-4 text-blue-700" />
                <span>1. Applicant Personal Identification</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Title
                  </label>
                  <select
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleChange('middleName', e.target.value)}
                    placeholder="Middle Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Relationship Prefix
                  </label>
                  <select
                    value={formData.relationshipPrefix}
                    onChange={(e) => handleChange('relationshipPrefix', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="S/o.">S/o (Son of)</option>
                    <option value="D/o.">D/o (Daughter of)</option>
                    <option value="W/o.">W/o (Wife of)</option>
                    <option value="C/o.">C/o (Care of)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Father / Spouse Legal Name
                  </label>
                  <input
                    type="text"
                    value={formData.fatherLegalName}
                    onChange={(e) => handleChange('fatherLegalName', e.target.value)}
                    placeholder="Father or Husband Full Legal Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange('dob', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    placeholder="Age"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => handleChange('maritalStatus', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Religion
                  </label>
                  <input
                    type="text"
                    value={formData.religion}
                    onChange={(e) => handleChange('religion', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Caste Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="SEBC">SEBC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Education
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                  Income Tax PAN Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={formData.pan}
                  onChange={(e) => handleChange('pan', e.target.value.toUpperCase())}
                  placeholder="e.g. ABCDE1234F"
                  className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-700 uppercase focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* SECTION 2: CONTACT DETAILS */}
            <div id="edit-section-contact" className="space-y-3.5 pt-4 border-t border-slate-200 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <Phone className="w-4 h-4 text-blue-700" />
                <span>2. Contact &amp; Communication Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Primary Mobile *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    placeholder="98610 xxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Alternate Contact
                  </label>
                  <input
                    type="text"
                    value={formData.altMobile}
                    onChange={(e) => handleChange('altMobile', e.target.value)}
                    placeholder="94371 xxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Registered Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="applicant@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: RESIDENTIAL ADDRESS */}
            <div id="edit-section-address" className="space-y-3.5 pt-4 border-t border-slate-200 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-blue-700" />
                <span>3. Permanent Residential Address</span>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                  Residential Street Address Line
                </label>
                <textarea
                  rows={2}
                  value={formData.address1}
                  onChange={(e) => handleChange('address1', e.target.value)}
                  placeholder="Plot/House No., Street, Landmark..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Village / Town / Taluka
                  </label>
                  <input
                    type="text"
                    value={formData.villageTown}
                    onChange={(e) => handleChange('villageTown', e.target.value)}
                    placeholder="e.g. Nayapalli"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="Khurda"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="Odisha"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Postal PIN Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    placeholder="751012"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: BRANCH & INTRODUCER */}
            <div id="edit-section-branch" className="space-y-3.5 pt-4 border-t border-slate-200 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>4. Branch Allocation &amp; Associate</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Registered Branch
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => handleChange('branch', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Bhubaneswar HQ (Nayapalli, IRC Village)">Bhubaneswar HQ (Nayapalli)</option>
                    <option value="Cuttack Branch (Badambadi)">Cuttack Branch (Badambadi)</option>
                    <option value="Berhampur Branch (Ganjam Hub)">Berhampur Branch</option>
                    <option value="Rourkela Branch (Panposh)">Rourkela Branch</option>
                    <option value="Sambalpur Branch (Khetrajpur)">Sambalpur Branch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Introducer / Agent Associate
                  </label>
                  <input
                    type="text"
                    value={formData.introducer}
                    onChange={(e) => handleChange('introducer', e.target.value)}
                    placeholder="Introducer Legal Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Employee (EMP) ID
                  </label>
                  <input
                    type="text"
                    value={formData.empId}
                    onChange={(e) => handleChange('empId', e.target.value)}
                    placeholder="EMP-2026-XXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 5: NOMINEE BENEFICIARY */}
            <div id="edit-section-nominee" className="space-y-3.5 pt-4 border-t border-slate-200 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-blue-700" />
                <span>5. Nominee Beneficiary Particulars</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Nominee Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.nomineeName}
                    onChange={(e) => handleChange('nomineeName', e.target.value)}
                    placeholder="Nominee Legal Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Relationship
                  </label>
                  <select
                    value={formData.nomineeRel}
                    onChange={(e) => handleChange('nomineeRel', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Nominee DOB
                  </label>
                  <input
                    type="date"
                    value={formData.nomineeDob}
                    onChange={(e) => handleChange('nomineeDob', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Nominee Contact Number
                  </label>
                  <input
                    type="text"
                    value={formData.nomineeMobile}
                    onChange={(e) => handleChange('nomineeMobile', e.target.value)}
                    placeholder="+91 98610 xxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Nominee Residential Address
                  </label>
                  <input
                    type="text"
                    value={formData.nomineeAddr}
                    onChange={(e) => handleChange('nomineeAddr', e.target.value)}
                    placeholder="Same as applicant address or enter full address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 6: SHARE CAPITAL & FEES */}
            <div id="edit-section-shares" className="space-y-3.5 pt-4 border-t border-slate-200 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>6. Statutory Equity Shareholding &amp; Fees</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Equity Shares Allotted
                  </label>
                  <input
                    type="number"
                    min={10}
                    value={formData.numberOfShares}
                    onChange={(e) => handleChange('numberOfShares', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Face Value per Share (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.shareValue}
                    onChange={(e) => handleChange('shareValue', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase mb-1">
                    Admission / Processing Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.processingFee}
                    onChange={(e) => handleChange('processingFee', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 flex flex-col justify-center">
                  <span className="block text-[10px] font-extrabold text-emerald-800 uppercase">
                    Total Consideration
                  </span>
                  <div className="text-base font-black text-emerald-900 font-mono mt-0.5">
                    ₹{Number(formData.numberOfShares) * Number(formData.shareValue) + Number(formData.processingFee)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">Admission Consideration</span>
                </div>
              </div>
            </div>

            {/* SECTION 7: APPLICATION STATUS */}
            <div id="edit-section-status" className="space-y-3.5 pt-4 border-t border-slate-200 scroll-mt-2">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-xs font-black text-slate-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <span>7. Application Review Status</span>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-700 uppercase mb-2">
                  Select Statutory Decision Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleChange('status', 'pending')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formData.status === 'pending'
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-black shadow-xs ring-2 ring-amber-300'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Pending Review</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange('status', 'approved')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formData.status === 'approved'
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-black shadow-xs ring-2 ring-emerald-300'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Approved</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange('status', 'rejected')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formData.status === 'rejected'
                        ? 'bg-rose-100 border-rose-400 text-rose-900 font-black shadow-xs ring-2 ring-rose-300'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-700" />
                    <span>Rejected</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange('status', 'correction_required')}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formData.status === 'correction_required'
                        ? 'bg-blue-100 border-blue-400 text-blue-900 font-black shadow-xs ring-2 ring-blue-300'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-blue-700" />
                    <span>Correction Req.</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. PINNED MODAL ACTIONS FOOTER - ALWAYS VISIBLE AT BOTTOM */}
          <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 bg-slate-50/90 flex items-center justify-between shrink-0 shadow-xs z-10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500">
                {application.id}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-extrabold uppercase text-slate-600">
                Status: <span className="font-bold text-slate-900 capitalize">{formData.status.replace('_', ' ')}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isSaving}
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-[#0b1c3d] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>SAVE CHANGES</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}

export default EditApplicationModal;
