import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import {
  TITLE_OPTIONS,
  RELATIONSHIP_PREFIX_OPTIONS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  EDUCATION_OPTIONS,
  RELIGION_OPTIONS,
  CATEGORY_OPTIONS,
  OCCUPATION_OPTIONS,
} from '../../data/registrationOptions';
import { User, Calendar, Briefcase, GraduationCap } from 'lucide-react';

export function StepPersonal({ data = {}, errors = {}, onChange }) {
  // Helper to handle DOB change & auto calculate age
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    let calculatedAge = '';

    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      calculatedAge = age > 0 ? String(age) : '0';
    }

    onChange('dob', dobValue);
    onChange('age', calculatedAge);
  };

  return (
    <FormSection
      title="APPLICANT PERSONAL & STATUTORY INFORMATION"
      subtitle="Enter legal identification information exactly as stated in your official government records."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Title */}
        <FormSelect
          label="Title"
          name="title"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          options={TITLE_OPTIONS}
          required
          error={errors.title}
        />

        {/* First Name */}
        <FormInput
          label="First Name"
          name="firstName"
          value={data.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="e.g. Priyabrata"
          icon={User}
          required
          error={errors.firstName}
        />

        {/* Middle Name */}
        <FormInput
          label="Middle Name"
          name="middleName"
          value={data.middleName}
          onChange={(e) => onChange('middleName', e.target.value)}
          placeholder="e.g. Kumar"
        />

        {/* Last Name */}
        <FormInput
          label="Last Name"
          name="lastName"
          value={data.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          placeholder="e.g. Mohapatra"
          required
          error={errors.lastName}
        />

        {/* Relationship Prefix */}
        <FormSelect
          label="Relationship Prefix"
          name="relationshipPrefix"
          value={data.relationshipPrefix}
          onChange={(e) => onChange('relationshipPrefix', e.target.value)}
          options={RELATIONSHIP_PREFIX_OPTIONS}
          required
          error={errors.relationshipPrefix}
        />

        {/* Father/Husband/Guardian Legal Name */}
        <FormInput
          label="Father / Husband / Guardian Legal Name"
          name="fatherLegalName"
          value={data.fatherLegalName}
          onChange={(e) => onChange('fatherLegalName', e.target.value)}
          placeholder="Full legal name as per ID"
          className="sm:col-span-2 lg:col-span-3"
          required
          error={errors.fatherLegalName}
        />

        {/* Date of Birth */}
        <FormInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={data.dob}
          onChange={handleDobChange}
          icon={Calendar}
          required
          error={errors.dob}
        />

        {/* Age (Years) */}
        <FormInput
          label="Age (Years)"
          name="age"
          type="number"
          value={data.age}
          onChange={(e) => onChange('age', e.target.value)}
          placeholder="e.g. 25"
          min="18"
          max="120"
          helperText="Min age 18 required"
          required
          error={errors.age}
        />

        {/* Gender */}
        <FormSelect
          label="Gender"
          name="gender"
          value={data.gender}
          onChange={(e) => onChange('gender', e.target.value)}
          options={GENDER_OPTIONS}
          required
          error={errors.gender}
        />

        {/* Marital Status */}
        <FormSelect
          label="Marital Status"
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={(e) => onChange('maritalStatus', e.target.value)}
          options={MARITAL_STATUS_OPTIONS}
          required
          error={errors.maritalStatus}
        />

        {/* Educational Qualification */}
        <FormSelect
          label="Educational Qualification"
          name="education"
          value={data.education}
          onChange={(e) => onChange('education', e.target.value)}
          options={EDUCATION_OPTIONS}
          icon={GraduationCap}
          required
          error={errors.education}
        />

        {/* Religion */}
        <FormSelect
          label="Religion"
          name="religion"
          value={data.religion}
          onChange={(e) => onChange('religion', e.target.value)}
          options={RELIGION_OPTIONS}
          required
          error={errors.religion}
        />

        {/* Category */}
        <FormSelect
          label="Category"
          name="category"
          value={data.category}
          onChange={(e) => onChange('category', e.target.value)}
          options={CATEGORY_OPTIONS}
          required
          error={errors.category}
        />

        {/* Occupation */}
        <FormSelect
          label="Occupation"
          name="occupation"
          value={data.occupation}
          onChange={(e) => onChange('occupation', e.target.value)}
          options={OCCUPATION_OPTIONS}
          icon={Briefcase}
          required
          error={errors.occupation}
        />
      </div>
    </FormSection>
  );
}
