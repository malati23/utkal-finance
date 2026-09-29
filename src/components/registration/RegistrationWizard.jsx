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
import { uploadDocumentsApi, createApplicationApi } from '../../services/applicationService';
import { ArrowLeft, ArrowRight, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export function RegistrationWizard({ activeStep = 1, onQuickFillTrigger }) {
  const [currentStep, setCurrentStep] = useState(activeStep);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');


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
      religion: 'Hinduism',
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
      mobile: '9861374251',
      email: 'applicant@utkalfinance.com',
    },
    account: {
      mobile: '9861374251',
      email: 'applicant@utkalfinance.com',
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
    payment: {
      method: 'upi',
      receiptFile: null,
      utr: '',
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
      if (!a.mobile || !validatePhone(a.mobile)) {
        newErrors.mobile = 'Valid 10-digit Indian mobile number required';
      }
      if (!a.email || !validateEmail(a.email)) {
        newErrors.email = 'Valid email address required';
      }
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
      const d = formData.documents || {};
      // Document uploads and ID reference numbers are optional - applicant can move to next step without uploading files
      if (d.docRefNo && d.docRefNo.trim().length > 0 && d.docRefNo.trim().length < 3) {
        newErrors.docRefNo = 'Document Reference Number must be at least 3 characters if provided';
      }
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
    if (stepId < currentStep) {
      // Allow navigating back to completed steps
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (stepId > currentStep) {
      // Validate preceding steps sequentially before advancing forward
      for (let s = currentStep; s < stepId; s++) {
        if (!validateStep(s)) {
          setCurrentStep(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (!completedSteps.includes(s)) {
          setCompletedSteps((prev) => [...prev, s]);
        }
      }
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = async (customPaymentData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const docs = formData.documents || {};
      const paymentInfo = (customPaymentData && typeof customPaymentData === 'object' && customPaymentData.receiptFile !== undefined)
        ? customPaymentData
        : (formData.payment?.data || formData.payment || {});
      const receiptFileObj = paymentInfo.receiptFile || formData.payment?.data?.receiptFile || formData.payment?.receiptFile;

      const fileFormData = new FormData();
      let hasFiles = false;

      if (docs.idProofFile instanceof File) {
        fileFormData.append('idProof', docs.idProofFile);
        hasFiles = true;
      }
      if (docs.addressProofFile instanceof File) {
        fileFormData.append('addressProof', docs.addressProofFile);
        hasFiles = true;
      }
      if (docs.photoFile instanceof File) {
        fileFormData.append('photo', docs.photoFile);
        hasFiles = true;
      }
      if (docs.signatureFile instanceof File) {
        fileFormData.append('signature', docs.signatureFile);
        hasFiles = true;
      }
      if (docs.doc3_eduCert instanceof File) {
        fileFormData.append('doc3_eduCert', docs.doc3_eduCert);
        hasFiles = true;
      }
      if (docs.doc4_birthCert instanceof File) {
        fileFormData.append('doc4_birthCert', docs.doc4_birthCert);
        hasFiles = true;
      }
      if (docs.doc5_utility instanceof File) {
        fileFormData.append('doc5_utility', docs.doc5_utility);
        hasFiles = true;
      }

      // Extract raw receipt file
      let receiptRaw = null;
      if (receiptFileObj instanceof File) {
        receiptRaw = receiptFileObj;
      } else if (receiptFileObj?.rawFile instanceof File) {
        receiptRaw = receiptFileObj.rawFile;
      }

      if (receiptRaw) {
        fileFormData.append('paymentReceipt', receiptRaw);
        fileFormData.append('receiptFile', receiptRaw);
        hasFiles = true;
      }

      let uploadedFileUrls = {};
      if (hasFiles) {
        try {
          uploadedFileUrls = await uploadDocumentsApi(fileFormData);
        } catch (uploadErr) {
          console.warn('File upload warning:', uploadErr.message);
        }
      }

      const additionalDocs = Array.isArray(docs.additionalDocuments) ? [...docs.additionalDocuments] : [];
      if (uploadedFileUrls.doc3_eduCert) {
        additionalDocs.push({
          documentType: 'Educational Certificate',
          documentName: 'Educational Degree / Marks Card',
          documentUrl: uploadedFileUrls.doc3_eduCert,
          uploadedAt: new Date(),
        });
      }
      if (uploadedFileUrls.doc4_birthCert) {
        additionalDocs.push({
          documentType: 'Birth / PAN Certificate',
          documentName: 'Birth / PAN Card Certificate',
          documentUrl: uploadedFileUrls.doc4_birthCert,
          uploadedAt: new Date(),
        });
      }
      if (uploadedFileUrls.doc5_utility) {
        additionalDocs.push({
          documentType: 'Financial / Utility Document',
          documentName: 'Electricity Bill / Bank Statement',
          documentUrl: uploadedFileUrls.doc5_utility,
          uploadedAt: new Date(),
        });
      }

      const paymentReceiptUrl =
        uploadedFileUrls.paymentReceipt ||
        uploadedFileUrls.receiptFile ||
        receiptFileObj?.dataUrl ||
        receiptFileObj?.previewUrl ||
        (typeof receiptFileObj === 'string' ? receiptFileObj : '');

      if (paymentReceiptUrl && !additionalDocs.some((d) => d.documentType === 'Payment Receipt')) {
        additionalDocs.push({
          documentType: 'Payment Receipt',
          documentName: '₹200 Statutory Membership Payment Screenshot',
          documentUrl: paymentReceiptUrl,
          uploadedAt: new Date(),
        });
      }

      const payload = {
        ...formData,
        payment: {
          method: paymentInfo.method || 'UPI (IndusInd Bank QR)',
          amount: 200,
          receiptUrl: paymentReceiptUrl,
          receiptFileName: receiptFileObj?.name || 'UPI_Payment_Receipt.png',
          utrNumber: paymentInfo.utr || 'UPI_PAYMENT_VERIFIED',
          paidAt: new Date(),
        },
        paymentDetails: {
          method: paymentInfo.method || 'UPI (IndusInd Bank QR)',
          amount: 200,
          receiptUrl: paymentReceiptUrl,
          receiptFileName: receiptFileObj?.name || 'UPI_Payment_Receipt.png',
          utrNumber: paymentInfo.utr || 'UPI_PAYMENT_VERIFIED',
          paidAt: new Date(),
        },
        documents: {
          idProofType: docs.idProofType || 'Aadhaar Card',
          idProofUrl: uploadedFileUrls.idProof || (typeof docs.idProofFile === 'string' ? docs.idProofFile : (docs.idProofUrl || '')),
          addressProofType: docs.addressProofType || 'Aadhaar Card',
          addressProofUrl: uploadedFileUrls.addressProof || (typeof docs.addressProofFile === 'string' ? docs.addressProofFile : (docs.addressProofUrl || '')),
          photoUrl: uploadedFileUrls.photo || (typeof docs.photoFile === 'string' ? docs.photoFile : (docs.photoUrl || '')),
          signatureUrl: uploadedFileUrls.signature || (typeof docs.signatureFile === 'string' ? docs.signatureFile : (docs.signatureUrl || '')),
          paymentReceiptUrl: paymentReceiptUrl,
          additionalDocuments: additionalDocs,
        },
      };

      console.log("Submitting application payload to backend:", payload);

      const data = await createApplicationApi(payload);
      console.log("Application API response:", data);

      if (data?.success && data?.application?.applicationId) {
        const generatedAppId = data.application.applicationId;
        saveApplication({
          ...payload,
          applicationId: generatedAppId,
        });

        setReferenceNo(generatedAppId);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(data.message || 'Validation or server error occurred. Please check details and try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Unable to submit application. Please check your server connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        {submitError && (
          <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2">
            <span>{submitError}</span>
          </div>
        )}

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
            onPaymentChange={(val) => handleStepDataChange('payment', 'data', val)}
            errors={errors.review || {}}
          />
        )}
      </div>

      {/* BOTTOM WIZARD NAVIGATION BAR */}
      <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentStep === 1 || isSubmitting}
          onClick={handlePrevious}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border
            ${
              currentStep === 1 || isSubmitting
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-xs'
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <div className="flex items-center gap-3 ml-auto">
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
              disabled={isSubmitting}
              onClick={handleSubmitApplication}
              className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#00C853] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT MEMBERSHIP APPLICATION'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

