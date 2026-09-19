import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { TITLE_OPTIONS, NOMINEE_RELATIONSHIP_OPTIONS } from '../../data/registrationOptions';
import { Users, Calendar, ShieldAlert } from 'lucide-react';

export function StepNominee({ data = {}, errors = {}, onChange }) {
  // Helper to handle DOB change & calculate age
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    let calculatedAge = '';
    let isMinor = false;

    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      calculatedAge = age > 0 ? String(age) : '0';
      isMinor = age < 18;
    }

    onChange('dob', dobValue);
    onChange('age', calculatedAge);
    onChange('isMinor', isMinor);
  };

  const isMinor = data.isMinor || (data.age && parseInt(data.age, 10) < 18);

  return (
    <FormSection
      title={
        <span className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-700 inline-block" />
          NOMINEE / BENEFICIARY DETAILS
        </span>
      }
      subtitle="Nominee will be legally entitled to deposit settlement and shares according to Section 72 of the Companies Act."
    >
      <div className="space-y-6">
        {/* ROW 1: 4 COLUMNS ON DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nominee Title */}
          <FormSelect
            label="Nominee Title"
            name="title"
            value={data.title || 'Mrs.'}
            onChange={(e) => onChange('title', e.target.value)}
            options={TITLE_OPTIONS}
            required
            error={errors.title}
          />

          {/* Nominee First Name */}
          <FormInput
            label="Nominee First Name"
            name="firstName"
            value={data.firstName || data.fullName?.split(' ')[0] || ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange('firstName', val);
              onChange('fullName', `${val} ${data.lastName || ''}`.trim());
            }}
            placeholder="First Name"
            required
            error={errors.firstName || errors.fullName}
          />

          {/* Nominee Last Name */}
          <FormInput
            label="Nominee Last Name"
            name="lastName"
            value={data.lastName || data.fullName?.split(' ').slice(1).join(' ') || ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange('lastName', val);
              onChange('fullName', `${data.firstName || ''} ${val}`.trim());
            }}
            placeholder="Last Name"
            error={errors.lastName}
          />

          {/* Relationship with Member */}
          <FormSelect
            label="Relationship with Member"
            name="relationship"
            value={data.relationship || 'Spouse'}
            onChange={(e) => onChange('relationship', e.target.value)}
            options={NOMINEE_RELATIONSHIP_OPTIONS}
            required
            error={errors.relationship}
          />
        </div>

        {/* ROW 2: 3 COLUMNS ON DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Nominee Date of Birth */}
          <FormInput
            label="Nominee Date of Birth"
            name="dob"
            type="date"
            value={data.dob}
            onChange={handleDobChange}
            icon={Calendar}
            error={errors.dob}
          />

          {/* Nominee Age */}
          <FormInput
            label="Nominee Age"
            name="age"
            type="number"
            value={data.age || ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange('age', val);
              onChange('isMinor', parseInt(val, 10) < 18);
            }}
            placeholder="32"
            error={errors.age}
          />

          {/* Nominee Mobile Number */}
          <FormInput
            label="Nominee Mobile Number"
            name="mobile"
            type="tel"
            value={data.mobile}
            onChange={(e) => onChange('mobile', e.target.value)}
            placeholder="10-digit mobile"
            error={errors.mobile}
          />
        </div>

        {/* ROW 3: 2 COLUMNS ON DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nominee Address */}
          <FormInput
            label="Nominee Address"
            name="address"
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="Leave blank to use member permanent address"
            error={errors.address}
          />

          {/* Nominee Identity Details */}
          <FormInput
            label="Nominee Identity Details (Aadhaar / Voter / PAN)"
            name="identityDetails"
            value={data.identityDetails}
            onChange={(e) => onChange('identityDetails', e.target.value)}
            placeholder="e.g. Aadhaar: XXXX-XXXX-1234"
            error={errors.identityDetails}
          />
        </div>

        {/* MINOR GUARDIAN CONDITIONAL CONTAINER */}
        {isMinor && (
          <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-5 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Nominee is a Minor (Under 18 Years) — Guardian Details Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Legal Guardian Full Name"
                name="guardianName"
                value={data.guardianName}
                onChange={(e) => onChange('guardianName', e.target.value)}
                placeholder="Full name of legal guardian"
                required={isMinor}
                error={errors.guardianName}
              />

              <FormInput
                label="Guardian Relationship to Minor"
                name="guardianRelationship"
                value={data.guardianRelationship}
                onChange={(e) => onChange('guardianRelationship', e.target.value)}
                placeholder="e.g. Father / Mother / Court Appointed Guardian"
                required={isMinor}
                error={errors.guardianRelationship}
              />
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
}
