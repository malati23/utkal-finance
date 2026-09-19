import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { LoanCard } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLoans } from '../hooks/useLoans';
import { Search, Filter } from 'lucide-react';

export function LoanProducts() {
  const { openApplyModal } = useOutletContext();
  const { loans, loading } = useLoans();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Individual', 'Commercial', 'Property', 'Secured', 'Vehicle', 'Micro'];

  const filteredLoans = loans.filter((loan) => {
    const matchesCategory =
      selectedCategory === 'All' || loan.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      loan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-3xl relative z-10">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">
            Loan Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Explore Our Loan Products
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Find the right loan option for personal needs, business expansion, home buying, or gold financing.
          </p>
        </div>
      </section>

      {/* Filters & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search loan products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 font-medium">No loan products found matching your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-sm text-blue-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onApply={(selected) => openApplyModal(selected)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
