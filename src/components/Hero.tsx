import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onRsvpClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="topo"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Gabriela e Carlos celebrando o amor"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        {/* Very light, natural gradient only to give subtle contrast to white texts without darkening the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center text-white flex flex-col items-center">
        {/* Couple Names */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-lg mb-4 sm:mb-6 flex items-center justify-center flex-wrap">
          <span className="font-display font-normal">Gabriela</span>
          <span className="font-display italic text-4xl sm:text-6xl md:text-7xl text-white mx-3 sm:mx-4 font-normal">
            &
          </span>
          <span className="font-display font-normal">Carlos</span>
        </h1>

        {/* Wedding Date Highlight */}
        <div className="text-xl sm:text-2xl md:text-3xl tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white font-serif font-normal drop-shadow-lg mb-16 sm:mb-24 md:mb-28">
          <span>05 . 09 . 2027</span>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#confirmar-presenca"
            id="hero-rsvp-cta"
            className="group inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#FAF7F0] text-[#3E483D] hover:text-[#2E382D] text-xs sm:text-sm font-normal tracking-[0.2em] uppercase shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>CONFIRMAR PRESENÇA</span>
          </a>
        </div>

        {/* Scroll Indicator pointing to the welcome section */}
        <div className="mt-8 sm:mt-12 animate-bounce">
          <a
            href="#boas-vindas"
            className="inline-flex flex-col items-center text-white/75 hover:text-white transition-colors"
            aria-label="Rolar para a contagem regressiva e boas-vindas"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>

      </div>
    </section>
  );
};
