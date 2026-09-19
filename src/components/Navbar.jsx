import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Shield,
  Bell,
  UserPlus,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import brandLogo from '../assets/image copy 7.png';

export function Navbar({ onOpenApplyModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'About Us', path: '/about' },
    // { name: 'My Application', path: '/my-application' },
    { name: 'Become a Member', path: '/register' },
    { name: 'Brochure', path: '/brochure' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Help & Support', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-xs font-sans">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/90 p-1 shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
              <img 
                src={brandLogo} 
                alt="New Utkal Finance Emblem" 
                className="w-full h-full object-contain" 
              />
            </div>
            {/* Status Indicator Dot */}
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white absolute -top-0.5 -right-0.5" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                NEW UTKAL
              </span>
              <span className="text-base sm:text-lg font-black text-blue-800 tracking-tight">
                FINANCE
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-500 tracking-widest uppercase mt-0.5 block">
              TRUST • GROWTH • PROSPERITY
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs sm:text-sm font-bold transition-colors ${
                isActive(link.path)
                  ? 'text-blue-700 font-extrabold'
                  : 'text-slate-700 hover:text-blue-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Notification Bell & Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Bell Notification Button */}
          <button
            type="button"
            className="relative w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shadow-xs"
            title="Notifications"
            onClick={() => alert("No new notifications")}
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border-2 border-white absolute top-2 right-2" />
          </button>

          {/* Join Button */}
          <Link
            to="/register"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-xl shadow-md shadow-blue-700/20 transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join</span>
          </Link>

          {/* Console Button */}
          <Link
            to="/admin"
            className="bg-[#0B1528] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-slate-800"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Console</span>
          </Link>

          {/* Sign Out / Sign In Link */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors ml-1"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors ml-1"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join Utkal Finance</span>
            </Link>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#0B1528] text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Console</span>
            </Link>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center text-xs font-semibold text-slate-500 py-2 hover:text-red-600"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-xs font-semibold text-slate-500 py-2 hover:text-slate-900"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

