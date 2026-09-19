import { useState, useEffect } from 'react';

export function useHeroCarousel(totalSlides = 7, autoIntervalMs = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!totalSlides) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoIntervalMs);

    return () => clearInterval(interval);
  }, [totalSlides, autoIntervalMs]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    setCurrentSlide,
  };
}
