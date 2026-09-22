/**
 * Options and constant data for the Statutory Membership Application Wizard
 */

export const BANK_CONFIG = {
  BANK_NAME: 'INDUSIND BANK',
  BANK_IFSC: 'INDB0002319',
  BANK_ACCOUNT_MASKED: '••••••••5240',
  BANK_VPA: 'Pos.11428726@indus',
  ALT_VPA: 'newutkalfinance@sbi',
};

export const TITLE_OPTIONS = [
  'Mr.',
  'Mrs.',
  'Ms.',
  'Dr.',
];

export const RELATIONSHIP_PREFIX_OPTIONS = [
  'S/o (Son of)',
  'D/o (Daughter of)',
  'W/o (Wife of)',
  'C/o (Care of)',
];

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other',
];

export const MARITAL_STATUS_OPTIONS = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
];

export const EDUCATION_OPTIONS = [
  '10th Standard',
  '12th Standard',
  'Graduate / P.G.',
  'Doctorate / Professional',
  'Other',
];

export const RELIGION_OPTIONS = [
  'Hinduism',
];

export const CATEGORY_OPTIONS = [
  'General',
  'OBC',
  'SC',
  'ST',
  'EWS',
  'Other',
];

export const OCCUPATION_OPTIONS = [
  'Salaried (Govt)',
  'Salaried (Private)',
  'Self-Employed / Business',
  'Farmer / Agriculture',
  'Homemaker',
  'Retired',
  'Student',
  'Professional',
  'Other',
];

export const STATE_OPTIONS = [
  'Odisha',
  'West Bengal',
  'Jharkhand',
  'Bihar',
  'Chhattisgarh',
  'Andhra Pradesh',
  'Telangana',
  'Delhi',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Assam',
  'Other',
];

export const MEMBERSHIP_TYPE_OPTIONS = [
  'Associate Member',
  'Ordinary Member',
  'Class A Equity Member',
  'Institutional Member',
];

export const COMMUNICATION_PREFERENCE_OPTIONS = [
  'SMS',
  'Email',
  'Both',
];

export const NOMINEE_RELATIONSHIP_OPTIONS = [
  'Spouse',
  'Son',
  'Daughter',
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Guardian',
  'Other',
];

export const ID_PROOF_TYPES = [
  'Aadhaar Card',
  'PAN Card',
  'Voter ID',
  'Passport',
  'Driving Licence',
];

export const ADDRESS_PROOF_TYPES = [
  'Aadhaar Card',
  'Voter ID',
  'Passport',
  'Utility Bill (Electricity/Water)',
  'Bank Passbook',
];

export const BRANCH_OPTIONS = [
  'Bhubaneswar HQ (Nayapalli, Khurda)',
  'Cuttack Central Branch (Choudhury Bazar)',
  'Berhampur Branch (Ganjam)',
  'Rourkela Sector Branch (Sundargarh)',
  'Balasore Town Branch',
  'Sambalpur Regional Office',
];

export const AGENT_OPTIONS = [
  'Pradeep Kumar Jena (UTK-AS01)',
  'Rashmi Rekha Das (UTK-AS02)',
  'Soumya Ranjan Swain (UTK-AS03)',
  'Direct Application (No Agent Referral)',
];

export const STEPS_CONFIG = [
  { id: 1, key: 'personal', label: 'Personal', title: 'APPLICANT PERSONAL & STATUTORY INFORMATION', subtitle: 'Enter legal identification information exactly as stated in your official government records.' },
  { id: 2, key: 'address', label: 'Address', title: 'RESIDENTIAL & COMMUNICATION ADDRESS', subtitle: 'Provide verified postal location details for statutory correspondence and branch assignment.' },
  { id: 3, key: 'account', label: 'Account', title: 'COMPANY ASSOCIATION & MEMBERSHIP FEE', subtitle: 'Select your operational branch, statutory membership classification, and optional associate referral.' },
  { id: 4, key: 'nominee', label: 'Nominee', title: 'NOMINEE / BENEFICIARY DETAILS', subtitle: 'Nominee will be legally entitled to deposit settlement and shares according to Section 72 of the Companies Act.' },
  { id: 5, key: 'shares', label: 'Shares', title: 'SHARE HOLDER & STATUS OF THE DEPOSITOR', subtitle: 'Statutory depositor and share allotment preferences as specified on the statutory form.' },
  { id: 6, key: 'documents', label: 'Documents', title: 'STATUTORY IDENTIFICATION DOCUMENTS & UPLOAD STATUS', subtitle: 'Upload supporting KYC documents listed in the official statutory application form.' },
  { id: 7, key: 'witness', label: 'Witness', title: 'WITNESS DETAILS', subtitle: 'Provide details of two independent adult witnesses verifying your membership application.' },
  { id: 8, key: 'declaration', label: 'Declaration', title: 'DECLARATION & CONSENT', subtitle: 'Read statutory undertakings and provide formal electronic consent & signature.' },
  { id: 9, key: 'review', label: 'Review', title: 'REVIEW APPLICATION', subtitle: 'Verify all entered details carefully before final submission to New Utkal Finance.' },
];

export const STEP_PERCENTAGES = {
  1: 11,
  2: 22,
  3: 33,
  4: 44,
  5: 56,
  6: 67,
  7: 78,
  8: 89,
  9: 100,
};

// Demo quick-fill data for testing
export const DEMO_QUICKFILL_DATA = {
  personal: {
    title: 'Mr.',
    firstName: 'Priyabrata',
    middleName: 'Kumar',
    lastName: 'Mohapatra',
    relationshipPrefix: 'S/o (Son of)',
    fatherLegalName: 'Ramesh Chandra Mohapatra',
    dob: '1992-05-15',
    age: '34',
    gender: 'Male',
    maritalStatus: 'Married',
    education: 'Graduate / P.G.',
    religion: 'Hinduism',
    category: 'General',
    occupation: 'Salaried (Private)',
  },
  address: {
    address1: 'Plot No. N-5/172, Utkal Tower',
    address2: 'IRC Village, IRC Post Office',
    villageTown: 'Bhubaneswar',
    district: 'Khurda',
    state: 'Odisha',
    pincode: '751015',
    country: 'India',
    sameAsResidential: true,
    commAddress1: '',
    commAddress2: '',
    commVillageTown: '',
    commDistrict: '',
    commState: 'Odisha',
    commPincode: '',
    commCountry: 'India',
    mobile: '9861054321',
    email: 'priyabrata.mohapatra@example.com',
  },
  account: {
    mobile: '9861054321',
    email: 'priyabrata.mohapatra@example.com',
    password: 'Password@123',
    confirmPassword: 'Password@123',
    membershipType: 'Associate Member',
    membershipAmount: '200',
    preferredCommunication: 'Both',
  },
  nominee: {
    title: 'Mrs.',
    firstName: 'Sunita',
    lastName: 'Mohapatra',
    fullName: 'Sunita Mohapatra',
    relationship: 'Spouse',
    dob: '1995-08-20',
    age: '32',
    mobile: '9861098765',
    address: '',
    identityDetails: 'Aadhaar: 4892-1204-8921',
    sameAsApplicant: true,
    isMinor: false,
    guardianName: '',
    guardianRelationship: '',
  },
  shares: {
    repaymentPreference: 'First depositor',
    numberOfShares: 10,
    allocatedShareValue: 200,
    tdsOption: 'No (Form 15G/15H Enclosed)',
    noTdsTaxExempt: true,
    shareValue: 10,
    processingFee: 100,
    totalContribution: 200,
  },
  documents: {
    idProofType: 'Aadhaar Card',
    docRefNo: '9874 5612 3041',
    doc1_photo: { name: '3_Colour_Photographs_Specimen.jpg', size: '450 KB' },
    doc2_govId: { name: 'Aadhaar_Card_Priyabrata_Mohapatra.pdf', size: '1.2 MB' },
    doc3_eduCert: { name: 'Graduate_Degree_Certificate_Utkal.pdf', size: '980 KB' },
    doc4_birthCert: { name: 'Birth_Certificate_Bhubaneswar_MC.pdf', size: '650 KB' },
    doc5_utility: { name: 'Electricity_Bill_Bhubaneswar_Nayapalli.pdf', size: '820 KB' },
  },
  witness: {
    witness1Name: 'Subhasish Dash',
    witness1Mobile: '9437012345',
    witness1Address: 'Plot 45, Saheed Nagar, Bhubaneswar, Odisha',
    witness1Occupation: 'Business',
    witness1Relationship: 'Neighbor / Colleague',
    witness2Name: 'Manas Ranjan Sahoo',
    witness2Mobile: '9861122334',
    witness2Address: 'House No 12, Jayadev Vihar, Bhubaneswar, Odisha',
    witness2Occupation: 'Salaried (Govt)',
    witness2Relationship: 'Friend',
  },
  declaration: {
    confirmInfoTrue: true,
    agreeTerms: true,
    consentProcessing: true,
    signatureName: 'Priyabrata Kumar Mohapatra',
    declarationDate: new Date().toISOString().split('T')[0],
  }
};
