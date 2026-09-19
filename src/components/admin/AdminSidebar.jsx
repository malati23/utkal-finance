import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderCheck,
  CreditCard,
  Bell,
  Image as ImageIcon,
  UserCheck,
  User,
  LogOut,
  BookOpen
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import brandLogo from '../../assets/image copy 7.png';

export function AdminSidebar() {
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'MEMBERSHIP',
      items: [
        { label: 'Applications', path: '/admin-dashboard/applications', icon: FileText },
        { label: 'Members', path: '/admin-dashboard/members', icon: Users },
        { label: 'Documents', path: '/admin-dashboard/documents', icon: FolderCheck },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { label: 'Payments', path: '/admin-dashboard/payments', icon: CreditCard },
      ],
    },
    {
      title: 'CONTENT & RESOURCES',
      items: [
        { label: 'Notices', path: '/admin-dashboard/notices', icon: Bell },
        { label: 'Gallery', path: '/admin-dashboard/gallery', icon: ImageIcon },
        { label: 'Company Brochure', path: '/brochure', icon: BookOpen },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { label: 'Team', path: '/admin-dashboard/team', icon: UserCheck },
        { label: 'Admin Profile', path: '/admin-dashboard/profile', icon: User },
      ],
    },
  ];

  return (
    <aside className="w-full bg-[#0B1528] text-white flex flex-col h-full border-r border-slate-800 select-none">
      {/* BRANDING HEADER */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3">
        <div 
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 p-1 flex items-center justify-center shrink-0 cursor-pointer shadow-md"
        >
          <img src={brandLogo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-0.5">
          <h1 
            onClick={() => navigate('/')}
            className="text-sm font-black tracking-tight text-white cursor-pointer leading-none flex items-center gap-1"
          >
            NEW UTKAL <span className="text-blue-400">FINANCE</span>
          </h1>
          <div className="flex items-center gap-1 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
              ADMIN PORTAL
            </span>
          </div>
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h2 className="px-3 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
              {section.title}
            </h2>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin-dashboard'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#004085] text-white shadow-md border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 text-slate-300" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER LOGOUT */}
      <div className="p-3 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
