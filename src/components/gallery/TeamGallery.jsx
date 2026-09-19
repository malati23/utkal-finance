import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { GalleryCard } from './GalleryCard';
import { GalleryLightbox } from './GalleryLightbox';

import teamPhoto1 from '../../assets/image copy 22.png';
import teamPhoto2 from '../../assets/image copy 24.png';

export function TeamGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const teamPhotos = [
    {
      id: 1,
      image: teamPhoto1,
      label: "OUR TEAM",
      title: "Executive Leadership & Board Team",
      description: "Working together with a shared vision for growth and service.",
      modalTitle: "Executive Leadership & Board Team",
      modalCaption: "Working together with a shared vision for growth and service."
    },
    {
      id: 2,
      image: teamPhoto2,
      label: "OUR TEAM",
      title: "Team Moments",
      description: "Celebrating the people and teamwork behind New Utkal Finance.",
      modalTitle: "Team Moments",
      modalCaption: "Celebrating the people and teamwork behind New Utkal Finance."
    }
  ];

  const handleOpenLightbox = (index) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % teamPhotos.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 font-sans">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200/80 uppercase tracking-widest mb-2">
          <Users className="w-3.5 h-3.5 text-blue-600" />
          <span>OUR TEAM</span>
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          People behind New Utkal Finance
        </h2>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal mt-2">
          Meet the people who contribute to our vision, growth and commitment to our members.
        </p>
      </div>

      {/* Two Team Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
        {teamPhotos.map((photo, index) => (
          <GalleryCard
            key={photo.id}
            image={photo.image}
            label={photo.label}
            title={photo.title}
            description={photo.description}
            index={index}
            onClick={() => handleOpenLightbox(index)}
          />
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={selectedIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        photos={teamPhotos}
      />
    </section>
  );
}

export default TeamGallery;

