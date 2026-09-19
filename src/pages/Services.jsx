import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import {
  Briefcase,
  UserCheck,
  Home,
  Coins,
  ShieldCheck,
  FileCheck,
  Calculator,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export function Services() {
  const { openApplyModal } = useOutletContext();

  const servicesList = [
    {
      icon: UserCheck,
      title: 'Personal Financial Assistance',
      desc: 'Quick unsecured loans for marriage, medical emergencies, education, travel, or home upgrades.',
      features: ['Up to ₹15 Lakhs', 'Tenure 12-60 months', 'Fast approval within 48 hours'],
    },
    {
      icon: Briefcase,
      title: 'Business & Working Capital Loans',
      desc: 'Capital for inventory purchase, machinery upgrade, invoice financing, and business expansion.',
      features: ['Up to ₹50 Lakhs', 'Customized EMI cycles', 'Minimal balance sheet requirements'],
    },
    {
      icon: Home,
      title: 'Housing & Property Finance',
      desc: 'Long-term financing for buying residential plots, home construction, renovation, or balance transfer.',
      features: ['Competitive interest rates', 'Tenure up to 20 years', 'Property valuation support'],
    },
    {
      icon: Coins,
      title: 'Gold Loan Assistance',
      desc: 'Instant liquidity against gold jewelry with high per-gram valuation and safe vault storage.',
      features: ['Same-day disbursal', 'Bullet repayment option', '100% safe vault protection'],
    },
    {
      icon: FileCheck,
      title: 'Loan Advisory & Eligibility Guidance',
      desc: 'Expert guidance on credit scoring, documentation, and selecting optimal repayment schedules.',
      features: ['Personalized consultation', 'No upfront advisory fees', 'Step-by-step assistance'],
    },
    {
      icon: Calculator,
      title: 'EMI Planning & Restructuring',
      desc: 'Interactive tools and advisors to structure your monthly debt ratios comfortably.',
      features: ['Budget optimization', 'Clear interest breakdown', 'Pre-payment options'],
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
            Our Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Financial Services Tailored For You
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From short-term personal liquidity to long-term commercial loans, explore our full spectrum of financial assistance products.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-xs">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => openApplyModal()}
                >
                  Apply For Service
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">Need a custom loan package?</h3>
            <p className="text-slate-400 text-sm">
              Our financial officers can structure loan terms according to your cash flow cycles.
            </p>
          </div>
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => openApplyModal()}>
            Request Free Advisory
          </Button>
        </div>
      </section>
    </div>
  );
}
