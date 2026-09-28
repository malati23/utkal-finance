import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Award,
  PiggyBank,
  CreditCard,
  ArrowLeftRight,
  FolderLock,
  Bell,
  KeyRound,
  LogOut,
  X,
} from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';

/**
 * MemberMobileMenu component
 * Slide-in drawer for mobile viewports (< 1024px).
 */
export function MemberMobileMenu({
  isOpen,
  onClose,
  onChangePassword,
  onLogout,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    if (onLogout) {
      onLogout();
    } else {
      navigate('/member-login');
    }
  };

  const links = [
    { label: 'Dashboard', path: '/member-dashboard', icon: LayoutDashboard, end: true },
    { label: 'My Profile', path: '/member-dashboard/profile', icon: User },
    { label: 'My Membership', path: '/member-dashboard/membership', icon: Award },
    { label: 'My Deposits', path: '/member-dashboard/deposits', icon: PiggyBank },
    { label: 'My Payments', path: '/member-dashboard/payments', icon: CreditCard },
    { label: 'My Transactions', path: '/member-dashboard/transactions', icon: ArrowLeftRight },
    { label: 'My Documents', path: '/member-dashboard/documents', icon: FolderLock },
    { label: 'Notifications', path: '/member-dashboard/notifications', icon: Bell },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Dark transparent backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in drawer container */}
      <div className="relative w-80 max-w-[85vw] bg-[#0B1528] text-white h-full flex flex-col z-10 shadow-2xl animate-fade-in border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div
            onClick={() => {
              navigate('/');
              onClose();
            }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 p-1 flex items-center justify-center shrink-0">
              <img src={brandLogo} alt="New Utkal Finance Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-black text-xs text-white block tracking-tight">
                NEW UTKAL FINANCE LTD.
              </span>
              <span className="text-[9px] text-blue-400 font-extrabold uppercase tracking-widest block">
                MEMBER PORTAL
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close menu drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <span className="px-3 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase block mb-1">
            MEMBER MENU
          </span>
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#004085] text-white shadow-md border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-2 border-t border-slate-800/80 mt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onChangePassword?.();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer text-left"
            >
              <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Change Password</span>
            </button>
          </div>
        </div>

        <div className="p-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberMobileMenu;
