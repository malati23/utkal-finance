import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  User,
  ChevronDown,
  LogOut,
  KeyRound,
  Award,
} from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';

/**
 * MemberHeader component
 * Header for the Member Portal with branding, page title, notifications popover, and profile dropdown.
 */
export function MemberHeader({
  onToggleMobileMenu,
  onChangePassword,
  onLogout,
  pageTitle,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
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

  // Compute a clean title if not explicitly passed
  const getComputedTitle = () => {
    if (pageTitle) return pageTitle;
    const path = location.pathname;
    if (path.includes('/profile')) return 'My Profile';
    if (path.includes('/membership')) return 'My Membership';
    if (path.includes('/deposits')) return 'My Deposits';
    if (path.includes('/payments')) return 'My Payments';
    if (path.includes('/transactions')) return 'My Transactions';
    if (path.includes('/documents')) return 'My Documents';
    if (path.includes('/notifications')) return 'Notifications';
    return 'Member Portal Dashboard';
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/member-login');
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 w-full shadow-2xs select-none">
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* LEFT: MOBILE TOGGLE & BRANDING / PAGE TITLE */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer shrink-0"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>

          {/* MOBILE BRAND LOGO (Shown only on small screens) */}
          <div
            onClick={() => navigate('/')}
            className="lg:hidden flex items-center gap-2 cursor-pointer min-w-0"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-900 p-0.5 border border-slate-700 shrink-0">
              <img
                src={brandLogo}
                alt="New Utkal Finance Emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden xs:block sm:block truncate">
              <span className="text-xs font-black text-slate-900 tracking-tight block leading-tight">
                NEW UTKAL <span className="text-blue-700">FINANCE</span>
              </span>
              <span className="text-[8.5px] font-extrabold text-slate-400 tracking-wider uppercase block leading-none">
                MEMBER PORTAL
              </span>
            </div>
          </div>

          {/* DESKTOP PAGE TITLE */}
          <div className="hidden lg:flex items-center gap-3">
            <h1 className="text-sm font-black text-slate-900 tracking-tight">
              {getComputedTitle()}
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
              Member ID: —
            </span>
          </div>
        </div>

        {/* RIGHT: NOTIFICATIONS & MEMBER PROFILE DROPDOWN */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* NOTIFICATION POPOVER */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotifPopoverOpen(!notifPopoverOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>

            {notifPopoverOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl py-3 z-50 text-left animate-fade-in">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">
                    Notifications
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                    0 New
                  </span>
                </div>
                <div className="p-6 text-center text-slate-500 text-xs">
                  <p className="font-semibold text-slate-700">No new notifications.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    System circulars and notices will show here.
                  </p>
                  <Link
                    to="/member-dashboard/notifications"
                    onClick={() => setNotifPopoverOpen(false)}
                    className="inline-block mt-3 text-[11px] font-bold text-blue-700 hover:underline"
                  >
                    View Notification Center →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* MEMBER PROFILE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 sm:gap-2.5 p-1.5 pl-2 sm:pl-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-xs shadow-xs">
                M
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-black text-slate-900 leading-tight">
                  Member
                </div>
                <div className="text-[10px] font-mono text-slate-500 leading-tight">
                  ID: —
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-left animate-fade-in space-y-1">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-black text-slate-900">Member Portal</p>
                  <p className="text-[11px] text-slate-500 font-mono">Status: Pending Verification</p>
                </div>

                <Link
                  to="/member-dashboard/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/member-dashboard/membership"
                  onClick={() => setUserDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4 text-slate-500" />
                  <span>My Membership</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onChangePassword?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-left"
                >
                  <KeyRound className="w-4 h-4 text-slate-500" />
                  <span>Change Password</span>
                </button>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out</span>
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

export default MemberHeader;
