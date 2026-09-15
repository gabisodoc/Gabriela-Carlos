import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TIMELINE_CHAPTERS } from '../data/timeline';

export const Timeline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = TIMELINE_CHAPTERS.length;
  const currentChapter = TIMELINE_CHAPTERS[currentIndex];

  // Auto-play presentation every 6 seconds if not paused
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, total]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleSelectChapter = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="nossa-historia" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            COMO TUDO ACONTECEU
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            Nossa História
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif italic text-base sm:text-lg text-[#2B332A] font-light">
            Momentos especiais que nos trouxeram até aqui, contados com o coração.
          </p>
        </div>

        {/* Single Slideshow Presentation Card */}
        <div 
          className="relative bg-white rounded-3xl sm:rounded-[36px] border border-[#7F9078]/25 p-5 sm:p-8 md:p-12 shadow-sm"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
            
            {/* Left/Main Photo Column with Arched Top Frame */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative group max-w-xs sm:max-w-sm w-full">
                {/* Decorative backdrop shadow ring */}
                <div className="absolute -inset-3 rounded-t-[140px] rounded-b-3xl bg-radial from-[#DF806E]/20 via-[#A8C3AE]/15 to-transparent blur-md -z-10" />
                
                {/* Main Photo Card with Arch */}
                <div className="overflow-hidden rounded-t-[120px] rounded-b-2xl shadow-md aspect-4/5 bg-[#E8A7A0]/10 relative">
                  <img
                    key={currentChapter.photoUrl}
                    src={currentChapter.photoUrl}
                    alt={currentChapter.photoAlt}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out animate-fadeIn"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Text & Details Column */}
            <div className="md:col-span-6 flex flex-col justify-center text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3E483D] font-normal tracking-tight mb-4">
                {currentChapter.title}
              </h3>

              {/* Reduced concise text */}
              <p className="font-serif text-base sm:text-lg leading-relaxed text-[#2B332A] font-light mb-8 max-w-md mx-auto md:mx-0">
                {currentChapter.text}
              </p>

              {/* Navigation Controls: Arrows and Dots */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#7F9078]/30 bg-white flex items-center justify-center text-[#3E483D] hover:bg-[#505F4E] hover:text-white hover:border-[#505F4E] transition-all shadow-xs cursor-pointer"
                  aria-label="Momento anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Progress Dots */}
                <div className="flex items-center gap-1.5 px-2">
                  {TIMELINE_CHAPTERS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectChapter(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === currentIndex
                          ? 'w-6 bg-[#505F4E]'
                          : 'w-2 bg-[#7F9078]/30 hover:bg-[#7F9078]/60'
                      }`}
                      aria-label={`Ir para momento ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#7F9078]/30 bg-white flex items-center justify-center text-[#3E483D] hover:bg-[#505F4E] hover:text-white hover:border-[#505F4E] transition-all shadow-xs cursor-pointer"
                  aria-label="Próximo momento"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Counter label */}
              <div className="mt-4 text-xs font-serif text-[#7F9078] tracking-wider">
                {currentIndex + 1} de {total}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};


