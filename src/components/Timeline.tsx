import React from 'react';
import { TIMELINE_CHAPTERS } from '../data/timeline';

export const Timeline: React.FC = () => {
  return (
    <section id="nossa-historia" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            COMO TUDO ACONTECEU
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            Nossa História
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif italic text-base sm:text-lg text-[#505F4E] font-light">
            Momentos especiais que nos trouxeram até aqui, contados com o coração.
          </p>
        </div>

        {/* Timeline Stories with Alternating Layout */}
        <div className="space-y-16 sm:space-y-28">
          {TIMELINE_CHAPTERS.map((item, index) => {
            const isTextLeft = item.photoPosition === 'right';

            return (
              <div
                key={item.title || index}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center"
              >
                {/* Text Column */}
                <div
                  className={`md:col-span-6 flex flex-col justify-center ${
                    isTextLeft
                      ? 'md:order-1 md:pr-4 lg:pr-8 text-left'
                      : 'md:order-2 md:pl-4 lg:pl-8 text-left'
                  }`}
                >
                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#3E483D] font-normal tracking-tight mb-4">
                    {item.title}
                  </h3>

                  {/* Chapter Text */}
                  <div className="space-y-3 sm:space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#505F4E] font-normal">
                    {item.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Photo Column with Arched Top Frame */}
                <div
                  className={`md:col-span-6 flex justify-center ${
                    isTextLeft ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <div className="relative group max-w-sm sm:max-w-md w-full">
                    {/* Decorative backdrop shadow ring */}
                    <div className="absolute -inset-3 rounded-t-[140px] rounded-b-3xl bg-radial from-[#F3B99A]/20 via-[#A8C3AE]/10 to-transparent blur-md -z-10 group-hover:scale-102 transition-transform duration-500" />
                    
                    {/* Main Photo Card with Arch */}
                    <div className="overflow-hidden rounded-t-[120px] rounded-b-2xl shadow-xl aspect-4/5 bg-[#E8A7A0]/10">
                      <img
                        src={item.photoUrl}
                        alt={item.photoAlt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
