import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Shield,
  Bell,
  UserPlus,
  LogOut,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import brandLogo from '../assets/image copy 7.png';

export function Navbar({ onOpenApplyModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const desktopDropdownRef = useRef(null);

  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const productItems = [
    { name: 'Finance', path: '/finance' },
    { name: 'Real Estate', path: '/real-estate' },
    { name: 'Insurance', path: '/insurance' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isProductsActive = productItems.some((item) => isActive(item.path));

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setDesktopProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-xs font-sans select-none">
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
          <Link
            to="/about"
            className={`text-xs sm:text-sm font-bold transition-colors ${
              isActive('/about') ? 'text-blue-700 font-extrabold' : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            About Us
          </Link>

          <Link
            to="/register"
            className={`text-xs sm:text-sm font-bold transition-colors ${
              isActive('/register') ? 'text-blue-700 font-extrabold' : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            Become a Member
          </Link>

          <Link
            to="/brochure"
            className={`text-xs sm:text-sm font-bold transition-colors ${
              isActive('/brochure') ? 'text-blue-700 font-extrabold' : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            Brochure
          </Link>

          <Link
            to="/gallery"
            className={`text-xs sm:text-sm font-bold transition-colors ${
              isActive('/gallery') ? 'text-blue-700 font-extrabold' : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            Gallery
          </Link>

          {/* DESKTOP PRODUCTS DROPDOWN */}
          <div 
            className="relative" 
            ref={desktopDropdownRef}
            onMouseEnter={() => setDesktopProductsOpen(true)}
            onMouseLeave={() => setDesktopProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDesktopProductsOpen(!desktopProductsOpen)}
              className={`text-xs sm:text-sm font-bold transition-colors flex items-center gap-1 cursor-pointer py-1 ${
                isProductsActive ? 'text-blue-700 font-extrabold' : 'text-slate-700 hover:text-blue-700'
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${desktopProductsOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
            </button>

            {desktopProductsOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl border border-slate-200/90 shadow-xl py-2 z-50 text-left animate-fade-in">
                <div className="px-3 pb-1.5 mb-1 border-b border-slate-100">
                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block">
                    OUR PRODUCTS
                  </span>
                </div>
                {productItems.map((prod) => (
                  <Link
                    key={prod.name}
                    to={prod.path}
                    onClick={() => setDesktopProductsOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors mx-1 ${
                      isActive(prod.path)
                        ? 'bg-blue-50 text-blue-700 font-extrabold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                    }`}
                  >
                    <span>{prod.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={`text-xs sm:text-sm font-bold transition-colors ${
              isActive('/contact') ? 'text-blue-700 font-extrabold' : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            Help &amp; Support
          </Link>
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
              className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors ml-1 cursor-pointer"
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
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in text-left">
          <nav className="flex flex-col gap-1">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/about') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/register') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Become a Member</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/brochure"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/brochure') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Brochure</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/gallery') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Gallery</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            {/* MOBILE PRODUCTS ACCORDION */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  isProductsActive || mobileProductsOpen
                    ? 'bg-blue-50/80 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    mobileProductsOpen ? 'rotate-180 text-blue-700' : ''
                  }`}
                />
              </button>

              {/* Accordion Submenu Items */}
              {mobileProductsOpen && (
                <div className="ml-3 mt-1 pl-3 border-l-2 border-blue-200 space-y-1 py-1">
                  {productItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProductsOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      <span className="text-blue-500 font-extrabold text-sm">›</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                isActive('/contact') ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>Help &amp; Support</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
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
                className="w-full text-center text-xs font-semibold text-slate-500 py-2 hover:text-red-600 cursor-pointer"
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

export default Navbar;

