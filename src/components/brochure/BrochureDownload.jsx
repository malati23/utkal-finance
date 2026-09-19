import React from 'react';
import { Download, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../Button';

export function BrochureDownload() {
  const handleDownload = () => {
    const element = document.createElement('a');
    const fileContent = `
====================================================
 NEW UTKAL FINANCE LIMITED - CORPORATE BROCHURE
 Registration No: U64199OD2026PLC054968
 Registered Office: Utkal Tower, Plot no-N/5-172, Nayapalli, Bhubaneswar - 751015, Odisha
====================================================

ABOUT NEW UTKAL FINANCE:
New Utkal Finance Limited is a premier financial institution working under Section 406 of the Companies Act, 2013 and Nidhi Rules 2014 & 2022. We provide safe savings schemes, competitive fixed deposits, and affordable credit facilities.

FINANCIAL PRODUCTS & SERVICES:
1. Standard & Premium Savings Accounts (Up to 4.5% p.a.)
2. Fixed Deposits (FD) (Up to 8.50% p.a. for Senior Citizens)
3. Recurring Deposits (RD) (Flexible monthly tenures)
4. Home & Property Loans (Competitive interest rates)
5. Gold Loans & MSME Business Credit Facilities

MEMBERSHIP ELIGIBILITY:
As a Nidhi company, services are exclusively rendered to registered members. Minimum 10 equity shares of ₹10 each (Total ₹100 + ₹100 Processing Fee).

CONTACT US:
- Helpline: 1800 123 9878 / 1800 200 1788
- Email: customercare@utkalfinance.com
- Website: https://utkalfinance.com
====================================================
`;
    const file = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'New_Utkal_Finance_Brochure_2026.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="w-full py-4 sm:py-6">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B1528] via-slate-900 to-[#0B1528] border border-slate-800 shadow-2xl p-8 sm:p-12 lg:p-16 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 group">
        
        {/* Decorative Gradients & Accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Content Side */}
        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OFFICIAL DOCUMENTATION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Get the Complete Brochure
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Learn more about New Utkal Finance, our services and membership opportunities.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" /> PDF Format (2.4 MB)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified & Compliance Approved
            </span>
          </div>
        </div>

        {/* Download Button Action */}
        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            icon={Download}
            onClick={handleDownload}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-8 py-4 text-base shadow-xl shadow-amber-400/20 hover:scale-102 transition-transform duration-200"
          >
            Download Brochure
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BrochureDownload;
