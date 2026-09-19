import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, User, Settings, LogOut, ChevronDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

import brandLogo from '../../assets/image copy 7.png';

export function AdminHeader({ onToggleMobileMenu }) {
  const { adminUser, logoutAdmin, applications } = useAdmin();
  const navigate = useNavigate();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const pendingCount = applications.filter((a) => a.status === 'Pending').length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 w-full shadow-2xs select-none">
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* LEFT: MOBILE TOGGLE & BRAND TITLE / SEARCH */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-md">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer shrink-0"
            aria-label="Open navigation menu drawer"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>

          {/* MOBILE BRAND LOGO (Shown only on small screens) */}
          <div 
            onClick={() => navigate('/')} 
            className="lg:hidden flex items-center gap-2 cursor-pointer min-w-0"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-900 p-0.5 border border-slate-700 shrink-0">
              <img src={brandLogo} alt="New Utkal Finance Emblem" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-black text-slate-900 tracking-tight truncate hidden xs:block sm:block">
              NEW UTKAL FINANCE
            </span>
          </div>

          {/* DESKTOP SEARCH BAR */}
          <div className="relative w-full max-w-sm hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search applications, members, UTR..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-900 rounded-xl pl-9 pr-4 py-2 border border-slate-200 focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* RIGHT: NOTIFICATION & ADMIN USER PROFILE DROPDOWN */}
        <div className="flex items-center gap-3">
          {/* NOTIFICATION POPOVER */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifPopoverOpen(!notifPopoverOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white">
                  {pendingCount}
                </span>
              )}
            </button>

            {notifPopoverOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl py-3 z-50 text-left animate-fade-in">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">Notifications</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                    {pendingCount} Pending
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 text-xs">
                  {applications
                    .filter((a) => a.status === 'Pending')
                    .slice(0, 4)
                    .map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setNotifPopoverOpen(false);
                          navigate(`/admin-dashboard/applications/${app.id}`);
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900">{app.applicantName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{app.id}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">New Membership Application pending approval.</p>
                      </div>
                    ))}
                  {pendingCount === 0 && (
                    <div className="p-4 text-center text-slate-400 text-xs">No pending notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ADMIN USER PROFILE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0B1528] text-white flex items-center justify-center font-black text-xs shadow-xs border border-slate-700">
                A
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-black text-slate-900 leading-tight">Admin</div>
                <div className="text-[10px] font-bold text-slate-500 leading-tight">Administrator</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-left animate-fade-in space-y-1">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-black text-slate-900">{adminUser.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">{adminUser.email}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    navigate('/admin-dashboard/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    navigate('/admin-dashboard/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
