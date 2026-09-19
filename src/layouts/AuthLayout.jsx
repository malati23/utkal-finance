import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import brandLogo from '../assets/image copy 7.png';

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 font-sans antialiased">
      {/* Left Branding Side */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
        {/* Background glow circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={brandLogo} 
              alt="New Utkal Finance Logo" 
              className="h-12 w-auto object-contain bg-white/95 px-3 py-1.5 rounded-xl" 
            />
          </Link>

          <div className="mt-20">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-3">
              Secure Account Access
            </span>
            <h1 className="text-3xl font-extrabold leading-tight mb-4">
              Manage your loan applications & track status effortlessly.
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Welcome to the Utkal Finance portal. Log in or create an account to view repayment schedules, check loan status, or submit new requests.
            </p>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Real-time status tracking for applied loans</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Download detailed repayment schedules and EMI breakups</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>256-bit bank-grade encryption security</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-xs text-slate-500 border-t border-slate-800 pt-6">
          © {new Date().getFullYear()} Utkal Finance Limited. All Rights Reserved.
        </div>
      </div>

      {/* Right Form Area */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <img 
                src={brandLogo} 
                alt="New Utkal Finance Logo" 
                className="h-10 w-auto object-contain" 
              />
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
