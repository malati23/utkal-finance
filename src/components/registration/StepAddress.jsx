import React from 'react';
import { FormSection } from './FormSection';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { STATE_OPTIONS } from '../../data/registrationOptions';
import { MapPin, Home, Building2, Globe, Phone, Mail } from 'lucide-react';

export function StepAddress({ data = {}, errors = {}, onChange }) {
  const isSame = data.sameAsResidential !== false; // Default true

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    onChange('sameAsResidential', checked);
  };

  return (
    <FormSection
      title="RESIDENTIAL & COMMUNICATION ADDRESS"
      subtitle="Provide verified postal location details, contact mobile number, and email address for statutory correspondence."
    >
      <div className="space-y-6">
        {/* APPLICANT CONTACT DETAILS */}
        <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Applicant Contact Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              value={data.mobile}
              onChange={(e) => onChange('mobile', e.target.value)}
              placeholder="10-digit Indian mobile number"
              icon={Phone}
              required
              error={errors.mobile}
              helperText="For official communications & OTP"
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="you@domain.com"
              icon={Mail}
              required
              error={errors.email}
              helperText="For digital statements & notices"
            />
          </div>
        </div>

        {/* RESIDENTIAL ADDRESS CONTAINER */}
        <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Home className="w-4 h-4 text-blue-700" />
            <span>Permanent Residential Address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput
              label="Address Line 1"
              name="address1"
              value={data.address1}
              onChange={(e) => onChange('address1', e.target.value)}
              placeholder="House/Plot No., Building Name, Street"
              className="sm:col-span-2"
              icon={MapPin}
              required
              error={errors.address1}
            />

            <FormInput
              label="Address Line 2"
              name="address2"
              value={data.address2}
              onChange={(e) => onChange('address2', e.target.value)}
              placeholder="Landmark, Area, Colony"
            />

            <FormInput
              label="Village / Town"
              name="villageTown"
              value={data.villageTown}
              onChange={(e) => onChange('villageTown', e.target.value)}
              placeholder="e.g. Nayapalli / Bhubaneswar"
              icon={Building2}
            />

            <FormInput
              label="District"
              name="district"
              value={data.district}
              onChange={(e) => onChange('district', e.target.value)}
              placeholder="e.g. Khurda"
              required
              error={errors.district}
            />

            <FormSelect
              label="State"
              name="state"
              value={data.state || 'Odisha'}
              onChange={(e) => onChange('state', e.target.value)}
              options={STATE_OPTIONS}
              required
              error={errors.state}
            />

            <FormInput
              label="PIN Code"
              name="pincode"
              value={data.pincode}
              onChange={(e) => onChange('pincode', e.target.value)}
              placeholder="6-digit Indian PIN (e.g. 751015)"
              required
              error={errors.pincode}
            />

            <FormInput
              label="Country"
              name="country"
              value={data.country || 'India'}
              onChange={(e) => onChange('country', e.target.value)}
              icon={Globe}
              readOnly
              required
            />
          </div>
        </div>

        {/* COMMUNICATION ADDRESS CHECKBOX */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-800">
            <input
              type="checkbox"
              checked={isSame}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded text-blue-700 focus:ring-blue-600 border-slate-300"
            />
            <span>Communication Address is same as Residential Address</span>
          </label>
        </div>

        {/* COMMUNICATION ADDRESS CONDITIONAL FIELDS */}
        {!isSame && (
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Communication / Present Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormInput
                label="Communication Address Line 1"
                name="commAddress1"
                value={data.commAddress1}
                onChange={(e) => onChange('commAddress1', e.target.value)}
                placeholder="House/Plot No., Street"
                className="sm:col-span-2"
                required
                error={errors.commAddress1}
              />

              <FormInput
                label="Communication Address Line 2"
                name="commAddress2"
                value={data.commAddress2}
                onChange={(e) => onChange('commAddress2', e.target.value)}
                placeholder="Landmark, Area"
              />

              <FormInput
                label="Village / Town"
                name="commVillageTown"
                value={data.commVillageTown}
                onChange={(e) => onChange('commVillageTown', e.target.value)}
              />

              <FormInput
                label="District"
                name="commDistrict"
                value={data.commDistrict}
                onChange={(e) => onChange('commDistrict', e.target.value)}
                required
                error={errors.commDistrict}
              />

              <FormSelect
                label="State"
                name="commState"
                value={data.commState || 'Odisha'}
                onChange={(e) => onChange('commState', e.target.value)}
                options={STATE_OPTIONS}
                required
              />

              <FormInput
                label="PIN Code"
                name="commPincode"
                value={data.commPincode}
                onChange={(e) => onChange('commPincode', e.target.value)}
                placeholder="6-digit PIN"
                required
                error={errors.commPincode}
              />
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
}
