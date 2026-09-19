import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { UserCheck, Phone, MapPin, Briefcase, Heart } from 'lucide-react';

export function StepWitness({ data = {}, errors = {}, onChange }) {
  return (
    <FormSection
      title="WITNESS DETAILS"
      subtitle="Provide details of two independent adult witnesses verifying your statutory membership application."
    >
      <div className="space-y-6">
        {/* WITNESS 1 CARD */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px] font-black">
              1
            </span>
            <span>First Independent Witness</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput
              label="Witness 1 Full Name"
              name="witness1Name"
              value={data.witness1Name}
              onChange={(e) => onChange('witness1Name', e.target.value)}
              placeholder="e.g. Subhasish Dash"
              icon={UserCheck}
              required
              error={errors.witness1Name}
            />

            <FormInput
              label="Witness 1 Mobile Number"
              name="witness1Mobile"
              type="tel"
              value={data.witness1Mobile}
              onChange={(e) => onChange('witness1Mobile', e.target.value)}
              placeholder="10-digit mobile"
              icon={Phone}
              required
              error={errors.witness1Mobile}
            />

            <FormInput
              label="Occupation"
              name="witness1Occupation"
              value={data.witness1Occupation}
              onChange={(e) => onChange('witness1Occupation', e.target.value)}
              placeholder="e.g. Business / Govt Service"
              icon={Briefcase}
            />

            <FormInput
              label="Witness 1 Postal Address"
              name="witness1Address"
              value={data.witness1Address}
              onChange={(e) => onChange('witness1Address', e.target.value)}
              placeholder="Full residence address"
              className="sm:col-span-2"
              icon={MapPin}
              required
              error={errors.witness1Address}
            />

            <FormInput
              label="Relationship with Applicant"
              name="witness1Relationship"
              value={data.witness1Relationship}
              onChange={(e) => onChange('witness1Relationship', e.target.value)}
              placeholder="e.g. Colleague / Neighbor"
              icon={Heart}
            />
          </div>
        </div>

        {/* WITNESS 2 CARD */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
              2
            </span>
            <span>Second Independent Witness</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput
              label="Witness 2 Full Name"
              name="witness2Name"
              value={data.witness2Name}
              onChange={(e) => onChange('witness2Name', e.target.value)}
              placeholder="e.g. Manas Ranjan Sahoo"
              icon={UserCheck}
              required
              error={errors.witness2Name}
            />

            <FormInput
              label="Witness 2 Mobile Number"
              name="witness2Mobile"
              type="tel"
              value={data.witness2Mobile}
              onChange={(e) => onChange('witness2Mobile', e.target.value)}
              placeholder="10-digit mobile"
              icon={Phone}
              required
              error={errors.witness2Mobile}
            />

            <FormInput
              label="Occupation"
              name="witness2Occupation"
              value={data.witness2Occupation}
              onChange={(e) => onChange('witness2Occupation', e.target.value)}
              placeholder="e.g. Salaried"
              icon={Briefcase}
            />

            <FormInput
              label="Witness 2 Postal Address"
              name="witness2Address"
              value={data.witness2Address}
              onChange={(e) => onChange('witness2Address', e.target.value)}
              placeholder="Full residence address"
              className="sm:col-span-2"
              icon={MapPin}
              required
              error={errors.witness2Address}
            />

            <FormInput
              label="Relationship with Applicant"
              name="witness2Relationship"
              value={data.witness2Relationship}
              onChange={(e) => onChange('witness2Relationship', e.target.value)}
              placeholder="e.g. Friend"
              icon={Heart}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
}
