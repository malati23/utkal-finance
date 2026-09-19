import React, { useState } from 'react';
import { RegistrationProgress } from './RegistrationProgress';
import { StepNavigation } from './StepNavigation';
import { StepPersonal } from './StepPersonal';
import { StepAddress } from './StepAddress';
import { StepAccount } from './StepAccount';
import { StepNominee } from './StepNominee';
import { StepShares } from './StepShares';
import { StepDocuments } from './StepDocuments';
import { StepWitness } from './StepWitness';
import { StepDeclaration } from './StepDeclaration';
import { StepReview } from './StepReview';
import { SubmissionSuccess } from './SubmissionSuccess';
import { DEMO_QUICKFILL_DATA } from '../../data/registrationOptions';
import { validateEmail, validatePhone } from '../../utils/validators';
import { saveApplication } from '../../utils/storage';
import { ArrowLeft, ArrowRight, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export function RegistrationWizard({ activeStep = 1, onQuickFillTrigger }) {
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    personal: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      relationshipPrefix: '',
      fatherLegalName: '',
      dob: '',
      age: '',
      gender: '',
      maritalStatus: '',
      education: '',
      religion: '',
      category: '',
      occupation: '',
    },
    address: {
      address1: '',
      address2: '',
      villageTown: '',
      district: '',
      state: 'Odisha',
      pincode: '',
      country: 'India',
      sameAsResidential: true,
      commAddress1: '',
      commAddress2: '',
      commVillageTown: '',
      commDistrict: '',
      commState: 'Odisha',
      commPincode: '',
      commCountry: 'India',
    },
    account: {
      mobile: '',
      email: '',
      password: '',
      confirmPassword: '',
      membershipType: 'Associate Member',
      membershipAmount: '200',
      preferredCommunication: 'Both',
    },
    nominee: {
      fullName: '',
      relationship: '',
      dob: '',
      mobile: '',
      address: '',
      sameAsApplicant: true,
      isMinor: false,
      guardianName: '',
      guardianRelationship: '',
    },
    shares: {
      numberOfShares: 10,
      shareValue: 10,
      processingFee: 100,
      totalContribution: 200,
    },
    documents: {
      idProofType: 'Aadhaar Card',
      idProofFile: null,
      addressProofType: 'Aadhaar Card',
      addressProofFile: null,
      photoFile: null,
      signatureFile: null,
    },
    witness: {
      witness1Name: '',
      witness1Mobile: '',
      witness1Address: '',
      witness1Occupation: '',
      witness1Relationship: '',
      witness2Name: '',
      witness2Mobile: '',
      witness2Address: '',
      witness2Occupation: '',
      witness2Relationship: '',
    },
    declaration: {
      confirmInfoTrue: false,
      agreeTerms: false,
      consentProcessing: false,
      signatureName: '',
      declarationDate: new Date().toISOString().split('T')[0],
    },
  });

  const [errors, setErrors] = useState({});

  // Central handle change for any step
  const handleStepDataChange = (stepKey, field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [stepKey]: {
          ...prev[stepKey],
          [field]: value,
        },
      };

      if (field === 'mobile' || field === 'email') {
        updated.address = { ...updated.address, [field]: value };
        updated.account = { ...updated.account, [field]: value };
      }

      return updated;
    });

    // Clear error for field
    if (errors[stepKey]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [stepKey]: {
          ...prev[stepKey],
          [field]: null,
        },
      }));
    }
  };

  // Document file select handler
  const handleDocumentSelect = (fileName, fileObj, errorMsg) => {
    if (errorMsg) {
      setErrors((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [fileName]: errorMsg,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [fileName]: fileObj,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [fileName]: null,
      },
    }));
  };

  const handleDocumentRemove = (fileName) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [fileName]: null,
      },
    }));
  };

  // Quick fill handler
  const handleQuickFill = () => {
    setFormData(DEMO_QUICKFILL_DATA);
    setErrors({});
  };

  // Validate step before moving forward
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      const p = formData.personal;
      if (!p.title) newErrors.title = 'Title is required';
      if (!p.firstName || p.firstName.trim().length < 2) newErrors.firstName = 'First Name is required';
      if (!p.lastName || p.lastName.trim().length < 1) newErrors.lastName = 'Last Name is required';
      if (!p.relationshipPrefix) newErrors.relationshipPrefix = 'Relationship prefix is required';
      if (!p.fatherLegalName || p.fatherLegalName.trim().length < 3) newErrors.fatherLegalName = 'Legal Guardian/Father Name is required';
      if (!p.dob) newErrors.dob = 'Date of Birth is required';
      if (!p.age || parseInt(p.age, 10) < 18) newErrors.age = 'Applicant must be at least 18 years old';
      if (!p.gender) newErrors.gender = 'Gender selection is required';
      if (!p.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
      if (!p.education) newErrors.education = 'Educational qualification is required';
      if (!p.religion) newErrors.religion = 'Religion is required';
      if (!p.category) newErrors.category = 'Category is required';
      if (!p.occupation) newErrors.occupation = 'Occupation is required';
    }

    if (step === 2) {
      const a = formData.address;
      if (!a.address1 || a.address1.trim().length < 3) newErrors.address1 = 'Address Line 1 is required';
      if (!a.district || a.district.trim().length < 2) newErrors.district = 'District is required';
      if (!a.state) newErrors.state = 'State is required';
      if (!a.pincode || !/^\d{6}$/.test(a.pincode.trim())) newErrors.pincode = 'Please enter a valid 6-digit Indian PIN code';

      if (a.sameAsResidential === false) {
        if (!a.commAddress1 || a.commAddress1.trim().length < 3) newErrors.commAddress1 = 'Communication Address is required';
        if (!a.commDistrict || a.commDistrict.trim().length < 2) newErrors.commDistrict = 'Communication District is required';
        if (!a.commPincode || !/^\d{6}$/.test(a.commPincode.trim())) newErrors.commPincode = 'Valid 6-digit PIN code required';
      }
    }

    if (step === 3) {
      const acc = formData.account;
      if (acc.password && acc.password.length > 0 && acc.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (acc.password && acc.confirmPassword && acc.password !== acc.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 4) {
      const n = formData.nominee;
      if (!n.fullName || n.fullName.trim().length < 3) newErrors.fullName = 'Nominee Full Name is required';
      if (!n.relationship) newErrors.relationship = 'Relationship with nominee is required';
      if (!n.dob) newErrors.dob = 'Nominee Date of Birth is required';
      if (n.sameAsApplicant === false && (!n.address || n.address.trim().length < 5)) newErrors.address = 'Nominee address is required';
      if (n.isMinor) {
        if (!n.guardianName || n.guardianName.trim().length < 3) newErrors.guardianName = 'Guardian Name is required for minor nominee';
        if (!n.guardianRelationship) newErrors.guardianRelationship = 'Guardian Relationship is required';
      }
    }

    if (step === 5) {
      const s = formData.shares;
      if (!s.numberOfShares || parseInt(s.numberOfShares, 10) < 10) newErrors.numberOfShares = 'Minimum 10 equity shares required';
    }

    if (step === 6) {
      const d = formData.documents;
      if (!d.idProofType) newErrors.idProofType = 'Please select ID Proof Type';
      if (!d.docRefNo || d.docRefNo.trim().length < 3) newErrors.docRefNo = 'Document Reference Number is required';
    }

    if (step === 7) {
      const w = formData.witness;
      if (!w.witness1Name || w.witness1Name.trim().length < 3) newErrors.witness1Name = 'Witness 1 Full Name is required';
      if (!w.witness1Mobile || !validatePhone(w.witness1Mobile)) newErrors.witness1Mobile = 'Valid 10-digit mobile required for Witness 1';
      if (!w.witness1Address || w.witness1Address.trim().length < 5) newErrors.witness1Address = 'Witness 1 address is required';
      if (!w.witness2Name || w.witness2Name.trim().length < 3) newErrors.witness2Name = 'Witness 2 Full Name is required';
      if (!w.witness2Mobile || !validatePhone(w.witness2Mobile)) newErrors.witness2Mobile = 'Valid 10-digit mobile required for Witness 2';
      if (!w.witness2Address || w.witness2Address.trim().length < 5) newErrors.witness2Address = 'Witness 2 address is required';
    }

    if (step === 8) {
      const dec = formData.declaration;
      if (!dec.confirmInfoTrue || !dec.agreeTerms || !dec.consentProcessing) {
        newErrors.checkboxes = 'All three statutory declaration checkboxes must be accepted to proceed.';
      }
      if (!dec.signatureName || dec.signatureName.trim().length < 3) {
        newErrors.signatureName = 'Digital signature name is required.';
      }
    }

    const stepKeys = ['personal', 'address', 'account', 'nominee', 'shares', 'documents', 'witness', 'declaration'];
    const currentStepKey = stepKeys[step - 1];

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        [currentStepKey]: newErrors,
      }));
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      if (currentStep < 9) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepId) => {
    if (stepId >= 1 && stepId <= 9) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = () => {
    // Save application to localStorage using storage.js
    const createdApp = saveApplication(formData);
    setReferenceNo(createdApp.refId || `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <SubmissionSuccess
        referenceNo={referenceNo}
        formData={formData}
        onReset={() => {
          setIsSubmitted(false);
          setCurrentStep(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-[1020px] mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden my-3 sm:my-5">
      {/* Wizard Header Progress Bar */}
      <RegistrationProgress currentStep={currentStep} />

      {/* 9-Step Horizontal Navigation Bar */}
      <StepNavigation
        currentStep={currentStep}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
      />

      {/* STEP CONTENT BODY */}
      <div className="p-4 sm:p-6 md:p-8 min-h-[360px]">
        {currentStep === 1 && (
          <StepPersonal
            data={formData.personal}
            errors={errors.personal || {}}
            onChange={(field, val) => handleStepDataChange('personal', field, val)}
          />
        )}

        {currentStep === 2 && (
          <StepAddress
            data={formData.address}
            errors={errors.address || {}}
            onChange={(field, val) => handleStepDataChange('address', field, val)}
          />
        )}

        {currentStep === 3 && (
          <StepAccount
            data={formData.account}
            errors={errors.account || {}}
            onChange={(field, val) => handleStepDataChange('account', field, val)}
          />
        )}

        {currentStep === 4 && (
          <StepNominee
            data={formData.nominee}
            errors={errors.nominee || {}}
            onChange={(field, val) => handleStepDataChange('nominee', field, val)}
          />
        )}

        {currentStep === 5 && (
          <StepShares
            data={formData.shares}
            errors={errors.shares || {}}
            onChange={(field, val) => handleStepDataChange('shares', field, val)}
            onGoToStep={handleStepClick}
          />
        )}

        {currentStep === 6 && (
          <StepDocuments
            data={formData.documents}
            errors={errors.documents || {}}
            onFileSelect={handleDocumentSelect}
            onFileRemove={handleDocumentRemove}
            onChange={(field, val) => handleStepDataChange('documents', field, val)}
          />
        )}

        {currentStep === 7 && (
          <StepWitness
            data={formData.witness}
            errors={errors.witness || {}}
            onChange={(field, val) => handleStepDataChange('witness', field, val)}
          />
        )}

        {currentStep === 8 && (
          <StepDeclaration
            data={formData.declaration}
            errors={errors.declaration || {}}
            onChange={(field, val) => handleStepDataChange('declaration', field, val)}
          />
        )}

        {currentStep === 9 && (
          <StepReview
            formData={formData}
            onGoToStep={handleStepClick}
            onSubmit={handleSubmitApplication}
            errors={errors.review || {}}
          />
        )}
      </div>

      {/* BOTTOM WIZARD NAVIGATION BAR */}
      <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={handlePrevious}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border
            ${
              currentStep === 1
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <div className="flex items-center gap-3 ml-auto">
          {/* Shortcut to Review & Pay */}
          {currentStep < 9 && (
            <button
              type="button"
              onClick={() => handleStepClick(9)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors border border-slate-300 shadow-xs"
            >
              <span>Slide 9 (Review &amp; Pay)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          )}

          {/* Continue to Next Step / Submit */}
          {currentStep < 9 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-blue-900/20 transition-all"
            >
              <span>CONTINUE TO STEP {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitApplication}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#00C853] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>SUBMIT MEMBERSHIP APPLICATION</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
