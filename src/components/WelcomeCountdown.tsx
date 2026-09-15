import React, { useState, useEffect } from 'react';

export const WelcomeCountdown: React.FC = () => {
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
      id="boas-vindas" 
      className="py-16 sm:py-24 bg-white border-b border-[#7F9078]/15 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Monograma Ampliado sem medalhão */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-105">
          <img
            src="/monograma.png"
            alt="Monograma Gabriela e Carlos"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Section Title in Dancing Script */}
        <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
          CONTAGEM REGRESSIVA
        </span>
        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
          Falta pouco para o Sim!
        </h2>
        <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-8" />

        {/* Countdown Timer Capsules (antes do texto de bem-vindos) */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md sm:max-w-lg w-full mb-10 sm:mb-12">
          {/* Days */}
          <div className="bg-[#FAF7F0] border border-[#7F9078]/20 rounded-2xl p-3 sm:p-4 text-center shadow-xs transition-transform hover:-translate-y-1 duration-300">
            <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#3E483D] tracking-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#7F9078] mt-1 font-semibold">
              DIAS
            </span>
          </div>

          {/* Hours */}
          <div className="bg-[#FAF7F0] border border-[#7F9078]/20 rounded-2xl p-3 sm:p-4 text-center shadow-xs transition-transform hover:-translate-y-1 duration-300">
            <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#3E483D] tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#7F9078] mt-1 font-semibold">
              HORAS
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-[#FAF7F0] border border-[#7F9078]/20 rounded-2xl p-3 sm:p-4 text-center shadow-xs transition-transform hover:-translate-y-1 duration-300">
            <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#3E483D] tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#7F9078] mt-1 font-semibold">
              MIN
            </span>
          </div>

          {/* Seconds */}
          <div className="bg-[#FAF7F0] border border-[#7F9078]/20 rounded-2xl p-3 sm:p-4 text-center shadow-xs transition-transform hover:-translate-y-1 duration-300">
            <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#DF806E] tracking-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="block text-[9px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#7F9078] mt-1 font-semibold">
              SEG
            </span>
          </div>
        </div>

        {/* Welcome Message */}
        <p className="font-serif italic text-base sm:text-lg text-[#505F4E] font-light leading-relaxed max-w-2xl mx-auto">
          Sejam bem-vindos ao nosso site de casamento. Aqui vocês encontram tudo sobre o nosso grande dia, do horário da cerimônia ao caminho até a festa!
        </p>

      </div>
    </section>
  );
};
