import React, { useState } from 'react';
import { User, Shield, Mail, Phone, Lock, CheckCircle2, KeyRound } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function AdminProfile() {
  const { adminUser, setAdminUser } = useAdmin();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(adminUser.name);
  const [email, setEmail] = useState(adminUser.email);
  const [phone, setPhone] = useState(adminUser.phone);

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setAdminUser((prev) => ({ ...prev, name, email, phone }));
    setIsEditing(false);
    setMessage('Profile details updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('New password and confirmation do not match.');
      return;
    }
    setPasswordModalOpen(false);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setMessage('Password changed successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in max-w-4xl">
      {/* PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Admin Profile &amp; Security</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Manage administrator account settings, contact email, and security credentials.
        </p>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="bg-[#0B1528] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white font-black text-3xl flex items-center justify-center shrink-0 border-2 border-blue-400 shadow-inner">
            A
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-white">{adminUser.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-[10px] font-extrabold uppercase">
                {adminUser.role}
              </span>
            </div>
            <p className="text-slate-300 text-xs font-mono">{adminUser.email}</p>
            <p className="text-slate-400 text-[11px] pt-1">
              Registered Branch: <strong className="text-white">{adminUser.branch}</strong>
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Account Information</h3>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5 text-white" />
                <span>Change Password</span>
              </button>
            </div>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ADMIN NAME</span>
                <span className="font-extrabold text-slate-900 text-sm block">{adminUser.name}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">EMAIL ADDRESS</span>
                <span className="font-extrabold text-slate-900 text-sm font-mono block">{adminUser.email}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PHONE NUMBER</span>
                <span className="font-bold text-slate-800 font-mono block">{adminUser.phone}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SECURITY ROLE</span>
                <span className="font-bold text-blue-700 block">{adminUser.role}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Admin Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#00C853] hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-5 sm:p-8 w-[calc(100%-24px)] max-w-md max-h-[85vh] overflow-y-auto space-y-5 animate-fade-in text-left">
            <h3 className="text-lg font-black text-slate-900">Change Admin Password</h3>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">New Password</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl p-3 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#004085] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
