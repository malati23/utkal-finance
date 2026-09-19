import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ShieldCheck, FileText, FileDown, Phone, Mail, Globe, MapPin } from 'lucide-react';
import brandLogo from '../../assets/image copy 7.png';

export function ManagingDirector({ onApplyNow }) {
  const navigate = useNavigate();
  const context = useOutletContext();
  const handleApply = onApplyNow || (context && context.openApplyModal);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Rooted in Odisha & Trust details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge / Pill */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100/70 text-amber-900 border border-amber-300/80 uppercase tracking-wider shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>GOVT. CERTIFIED ACCREDITATION</span>
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Rooted in Odisha, Built on Ethical Trust &amp; Stability
          </h2>

          {/* Body Paragraph */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Registered under the provisions of the Companies Act 2013 &amp; 2014 rules respectively, working on the lines of a Nidhi Company. Associate Membership fee of <strong className="font-bold text-slate-800">₹ 200</strong> entitles members to high-yield deposit options, affordable loans, and full institutional participation.
          </p>

          {/* 3 Info Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Registration No.
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 block mt-1 tracking-tight font-mono">
                U64199OD2026PLC054968
              </span>
            </div>

            <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Capital Governance
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-blue-700 block mt-1">
                ₹ 250+ Cr Assets
              </span>
            </div>

            <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Principal Location
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 block mt-1">
                Bhubaneswar, Odisha
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => handleApply && handleApply()}
              className="bg-[#003B95] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>STATUTORY MEMBERSHIP FORM (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/brochure');
                window.scrollTo(0, 0);
              }}
              className="border border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all flex items-center gap-2.5 bg-white shadow-2xs hover:bg-slate-50 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-slate-600" />
              <span>CORPORATE BROCHURE</span>
            </button>
          </div>
        </div>

        {/* Right Column: Managing Director's Desk Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#051124] text-white rounded-[28px] p-6 sm:p-7 shadow-2xl border border-slate-800/80 relative overflow-hidden">
            {/* Ambient Lighting Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-5 relative z-10">
              <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">
                MANAGING DIRECTOR'S DESK
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-70">
                ODISHA
              </span>
            </div>

            {/* Quote */}
            <blockquote className="text-slate-200 text-xs sm:text-sm italic leading-relaxed mb-6 font-normal relative z-10">
              "Our mission is clear: absolute protection of member deposits, complete transparency in credit, and empowering Odisha's local enterprises to thrive."
            </blockquote>

            {/* MD Profile info */}
            <div className="flex items-center gap-3.5 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center shrink-0 shadow-md">
                BM
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white leading-tight">Bhagirathi Mohapatra</h4>
                <p className="text-xs text-amber-400 font-bold mt-0.5">
                  Managing Director • Newutkal Finance Ltd.
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Mobile: +91 9776175240</p>
              </div>
            </div>

            {/* Official Business / Certificate Card Graphic */}
            <div className="bg-white text-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xl relative overflow-hidden space-y-3 z-10">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-full border border-slate-200 p-0.5 bg-white shadow-2xs flex items-center justify-center shrink-0">
                    <img
                      src={brandLogo}
                      alt="New Utkal Finance Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      CERTIFIED BY GOVT. OF INDIA
                    </div>
                    <div className="text-xs font-black text-slate-900 tracking-tight mt-0.5">
                      NEWUTKAL <span className="text-blue-800">FINANCE LIMITED</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="bg-[#051124] text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                    REG. NO.: U64199OD2026PLC054968
                  </span>
                </div>
              </div>

              {/* MD Info inside card */}
              <div className="pt-0.5">
                <h5 className="font-extrabold text-slate-900 text-sm leading-tight">Bhagirathi Mohapatra</h5>
                <p className="text-amber-600 font-bold text-[11px]">Managing Director</p>
              </div>

              {/* Contact Info List */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] font-medium text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-blue-700 shrink-0" />
                  <span>+91 9776175240</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-blue-700 shrink-0" />
                  <span className="truncate">bhagirathimohapatra79@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-blue-700 shrink-0" />
                  <span>www.newutkalfinance.com</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="w-3 h-3 text-blue-700 shrink-0" />
                  <span className="truncate">Plot no-N/5-172, Nayapalli, IRC village, Bhubaneswar-751015</span>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute bottom-0 right-0 w-28 h-2.5 bg-gradient-to-r from-blue-900 via-amber-400 to-amber-500 rounded-tl-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManagingDirector;

