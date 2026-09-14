import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onRsvpClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  // Target wedding date: September 5, 2027 at 14:30:00 (America/Sao_Paulo)
  const targetDate = new Date(2027, 8, 5, 14, 30, 0).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section
      id="topo"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Romantic Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Gabriela e Carlos celebrando o amor"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-1000"
          style={{ animationDuration: '8s' }}
        />
        {/* Soft elegant overlay to ensure pristine readability matching palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E382D]/45 via-[#2E382D]/35 to-[#2E382D]/75 backdrop-contrast-105" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#F7F2E9]/10 to-[#2E382D]/40 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center text-white flex flex-col items-center">
        {/* Couple Names */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-md mb-2 sm:mb-3 flex items-center justify-center flex-wrap">
          <span className="font-display font-normal">Gabriela</span>
          <span className="font-display italic text-4xl sm:text-6xl md:text-7xl text-[#F3B99A] mx-3 sm:mx-4 font-normal">
            &
          </span>
          <span className="font-display font-normal">Carlos</span>
        </h1>

        {/* Welcome Phrase */}
        <p className="font-serif italic text-lg sm:text-2xl text-[#F7F2E9]/90 tracking-wide font-light max-w-xl mb-4 sm:mb-5">
          One love, a lifetime together
        </p>

        {/* Wedding Date Highlight */}
        <div className="inline-flex items-center text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F1D487] font-normal mb-8 sm:mb-10 bg-black/20 backdrop-blur-xs px-5 py-1.5 rounded-full border border-white/15">
          <span>05 . 09 . 2027</span>
        </div>

        {/* Countdown Timer Capsules */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md sm:max-w-lg w-full mb-10 sm:mb-12">
          {/* Days */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center shadow-lg transition-transform hover:scale-105 duration-300">
            <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#F7F2E9]/80 mt-1 font-normal">
              DIAS
            </span>
          </div>

          {/* Hours */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center shadow-lg transition-transform hover:scale-105 duration-300">
            <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#F7F2E9]/80 mt-1 font-normal">
              HORAS
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center shadow-lg transition-transform hover:scale-105 duration-300">
            <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#F7F2E9]/80 mt-1 font-normal">
              MIN
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center shadow-lg transition-transform hover:scale-105 duration-300">
            <span className="block font-display text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#F7F2E9]/80 mt-1 font-normal">
              SEG
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#confirmar-presenca"
            id="hero-rsvp-cta"
            className="group inline-flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-full bg-[#F7F2E9] hover:bg-white text-[#3E483D] hover:text-[#2E382D] text-xs sm:text-sm font-normal tracking-[0.2em] uppercase shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>CONFIRMAR PRESENÇA</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 sm:mt-16 animate-bounce">
          <a
            href="#nossa-historia"
            className="inline-flex flex-col items-center text-white/70 hover:text-white transition-colors"
            aria-label="Rolar para ver a história"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>

      </div>
    </section>
  );
};
