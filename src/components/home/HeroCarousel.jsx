import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../../data/heroSlides';
import { useHeroCarousel } from '../../hooks/useHeroCarousel';

export function HeroCarousel() {
  const slides = HERO_SLIDES;
  const totalSlides = slides.length;
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useHeroCarousel(totalSlides, 5000);

  return (
    <section className="relative w-full bg-slate-100">
      <div className="relative w-full sm:max-h-[520px] sm:overflow-hidden group">
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={slide}
            alt={`Utkal Finance Banner ${idx + 1}`}
            className={`w-full h-auto object-contain sm:object-cover sm:max-h-[520px] object-center transition-all duration-700 ease-in-out ${
              currentSlide === idx ? 'opacity-100 block animate-fade-in' : 'opacity-0 hidden'
            }`}
          />
        ))}

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all border border-slate-200 focus:outline-none z-10"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all border border-slate-200 focus:outline-none z-10"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Slide Indicator Badge */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-semibold shadow-xl border border-slate-700/60 z-10">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {slides.map((_, idx) => (
              <span
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-4 sm:w-6 bg-amber-400' : 'w-1.5 sm:w-2 bg-slate-500 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-slate-300 pl-1.5 sm:pl-2 border-l border-slate-700">
            0{currentSlide + 1} / 0{totalSlides}
          </span>
        </div>
      </div>
    </section>
  );
}
