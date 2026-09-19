import React, { useEffect } from 'react';
import { BrochureHero } from '../components/brochure/BrochureHero';
import { BrochurePreview } from '../components/brochure/BrochurePreview';
import { BrochureAnnexures } from '../components/brochure/BrochureAnnexures';
import { BrochureContactCTA } from '../components/brochure/BrochureContactCTA';

export function Brochure() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f2f5f8] min-h-screen pb-20 font-sans selection:bg-blue-600 selection:text-white">
      <BrochureHero />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-8">
        <BrochurePreview />
        <BrochureAnnexures />
        <BrochureContactCTA />
      </div>
    </div>
  );
}

export default Brochure;
