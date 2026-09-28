import React, { useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';

/**
 * MemberSidebar component
 * Primary navigation for the New Utkal Finance Member Portal.
 */
export function MemberSidebar({ onChangePassword, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (activeRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = activeRef.current;

      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;

      if (itemTop < containerTop) {
        container.scrollTo({ top: Math.max(0, itemTop - 12), behavior: 'smooth' });
      } else if (itemBottom > containerBottom) {
        container.scrollTo({ top: itemBottom - container.clientHeight + 12, behavior: 'smooth' });
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/member-login');
    }
  };

  const navSections = [
    {
      title: 'CORE PORTAL',
      items: [
        { label: 'Dashboard', path: '/member-dashboard', icon: LayoutDashboard, end: true },
        { label: 'My Profile', path: '/member-dashboard/profile', icon: User },
        { label: 'My Membership', path: '/member-dashboard/membership', icon: Award },
      ],
    },
    {
      title: 'FINANCIAL SERVICES',
      items: [
        { label: 'My Deposits', path: '/member-dashboard/deposits', icon: PiggyBank },
        { label: 'My Payments', path: '/member-dashboard/payments', icon: CreditCard },
        { label: 'My Transactions', path: '/member-dashboard/transactions', icon: ArrowLeftRight },
      ],
    },
    {
      title: 'VAULT & NOTICES',
      items: [
        { label: 'My Documents', path: '/member-dashboard/documents', icon: FolderLock },
        { label: 'Notifications', path: '/member-dashboard/notifications', icon: Bell },
      ],
    },
  ];

  return (
    <aside className="w-full bg-[#0B1528] text-white flex flex-col h-full border-r border-slate-800/80 select-none overflow-hidden">
      {/* BRANDING HEADER - STICKY TOP */}
      <div className="p-3.5 sm:p-4 border-b border-slate-800/90 flex items-center gap-3 shrink-0 bg-[#0B1528] z-10">
        <div
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 p-1 flex items-center justify-center shrink-0 cursor-pointer shadow-md hover:border-blue-500 transition-colors"
          title="Go to Website Home"
        >
          <img src={brandLogo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-1.5">
            <h1
              onClick={() => navigate('/')}
              className="text-xs font-black tracking-tight text-white cursor-pointer leading-tight truncate hover:text-blue-300 transition-colors"
            >
              NEW UTKAL <span className="text-blue-400">FINANCE</span>
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] font-extrabold tracking-wider uppercase text-blue-300 bg-blue-900/60 px-1.5 py-0.2 rounded border border-blue-700/50">
              MEMBER PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* SCROLLABLE NAVIGATION LINKS */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h2 className="px-2.5 text-[9px] font-black tracking-widest text-slate-400 uppercase">
              {section.title}
            </h2>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#004085] text-white shadow-md border border-blue-400/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <div
                        ref={isActive ? activeRef : null}
                        className="flex items-center justify-between w-full min-w-0"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-blue-300' : 'text-slate-400'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isActive && (
                          <ChevronRight className="w-3.5 h-3.5 text-blue-300 shrink-0 opacity-80" />
                        )}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

        {/* SECURITY & CREDENTIALS SECTION */}
        <div className="space-y-1 pt-1">
          <h2 className="px-2.5 text-[9px] font-black tracking-widest text-slate-400 uppercase">
            SECURITY & SETTINGS
          </h2>
          <button
            type="button"
            onClick={onChangePassword}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Change Password</span>
            </div>
          </button>
        </div>
      </div>

      {/* FOOTER LOGOUT - STICKY BOTTOM */}
      <div className="p-2.5 border-t border-slate-800/90 shrink-0 bg-[#0B1528] space-y-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer border border-rose-500/20"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Member</span>
        </button>

        <div className="flex items-center justify-center gap-1 text-[9px] text-slate-500 font-medium">
          <ShieldCheck className="w-3 h-3 text-slate-500" />
          <span>Statutory Member Services</span>
        </div>
      </div>
    </aside>
  );
}

export default MemberSidebar;
