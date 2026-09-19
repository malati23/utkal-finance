import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function GalleryHero() {
  return (
    <section className="bg-slate-50 border-b border-slate-200/80 py-6 sm:py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-blue-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Gallery</span>
        </nav>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight pt-1">
          Moments That Reflect Our Journey
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
          Explore moments from our team, workplace, and growing financial community.
        </p>
      </div>
    </section>
  );
}

export default GalleryHero;

