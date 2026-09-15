import React from 'react';
import { Clock, Heart, Wine, Utensils, Music } from 'lucide-react';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SCHEDULE_EVENTS: ScheduleItem[] = [
  {
    time: '14h30',
    title: 'Chegada dos Convidados',
    description:
      'Sejam bem-vindos! Acomodem-se com calma, respirem o ar puro e aproveitem para tirar as primeiras fotos no sítio enquanto nos preparamos.',
    icon: <Clock className="w-5 h-5 text-[#7F9078]" />
  },
  {
    time: '15h00',
    title: 'A Cerimônia',
    description:
      'O momento mais esperado! Hora do "Sim", das promessas e de celebrarmos o nosso amor cercados por quem amamos. Preparem os lenços!',
    icon: <Heart className="w-5 h-5 text-[#DF806E]" />
  },
  {
    time: '16h00',
    title: 'Coquetel & Fotos',
    description:
      'Brindes, comidinhas deliciosas e muitos abraços. Aproveitem o coquetel enquanto registramos esses momentos inesquecíveis.',
    icon: <Wine className="w-5 h-5 text-[#7F9078]" />
  },
  {
    time: '17h00',
    title: 'O Jantar',
    description:
      'Hora de sentar com os amigos e a família para saborear um jantar especial preparado com muito carinho.',
    icon: <Utensils className="w-5 h-5 text-[#7F9078]" />
  },
  {
    time: '18h30',
    title: 'Pista Aberta & Festa!',
    description:
      'Troquem os saltos, preparem os drinks e venham pra pista! A celebração só está começando e não tem hora para acabar.',
    icon: <Music className="w-5 h-5 text-[#DF806E]" />
  }
];

export const ScheduleSection: React.FC = () => {
  return (
    <section
      id="programacao"
      className="py-16 sm:py-24 bg-white border-b border-[#7F9078]/15 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            CRONOGRAMA
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            Programação do Nosso Grande Dia
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif italic text-base sm:text-lg text-[#505F4E] font-light">
            Cada detalhe pensado com carinho para vivermos momentos inesquecíveis juntos.
          </p>
        </div>

        {/* Schedule Timeline */}
        <div className="relative">
          {/* Vertical Center Line for Desktop / Left Line for Mobile */}
          <div className="absolute top-4 bottom-4 left-6 md:left-1/2 w-[1px] bg-[#7F9078]/25 -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {SCHEDULE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.time}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Pin Indicator */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-[#7F9078]/30 shadow-xs flex items-center justify-center z-10">
                    <div className="w-8 h-8 rounded-full bg-[#FAF7F0] flex items-center justify-center">
                      {event.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isEven
                        ? 'md:pl-10 lg:pl-14 text-left'
                        : 'md:pr-10 lg:pr-14 md:text-right text-left'
                    }`}
                  >
                    <div className="bg-[#FAF7F0]/90 border border-[#7F9078]/20 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#7F9078]/40 transition-all duration-300">
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'justify-start' : 'md:justify-end justify-start'
                        }`}
                      >
                        <span className="font-serif tracking-[0.15em] text-xs uppercase font-bold text-[#DF806E]">
                          {event.time}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#3E483D] font-normal mb-2">
                        {event.title}
                      </h3>

                      <p className="font-serif text-sm sm:text-base text-[#505F4E] font-light leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
