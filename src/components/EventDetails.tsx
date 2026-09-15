import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const address = "Estr. Mun. Santo Antonio, 270 - Jardim Sandra II, Mairiporã - SP, 07631-315";
  const mapsUrl = "https://maps.app.goo.gl/CKtM7sHc2Vt9mYKy9";

  return (
    <section id="o-evento" className="py-20 sm:py-28 bg-white border-y border-[#7F9078]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            CERIMÔNIA & RECEPÇÃO
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            O Evento
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif italic text-base sm:text-lg text-[#505F4E] font-light">
            Será uma tarde para celebrar o amor com quem amamos. Anote na agenda e venha comemorar conosco.
          </p>
        </div>

        {/* Card Enclosure */}
        <div className="bg-white rounded-3xl border border-[#7F9078]/20 shadow-md p-6 sm:p-10 md:p-12">
          {/* 3 Metric Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#7F9078]/15 pb-8 sm:pb-10">
            
            {/* 1. Data e Horário */}
            <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
              <div className="w-13 h-13 rounded-2xl bg-[#A8C3AE]/20 border border-[#A8C3AE]/40 flex items-center justify-center text-[#505F4E] mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#7F9078] font-normal mb-1">
                DATA & HORÁRIO
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#3E483D] font-normal">
                05 de setembro de 2027
              </p>
              <p className="font-serif text-lg sm:text-xl text-[#DF806E] font-medium mt-1">
                às 14h30
              </p>
              <span className="text-xs text-[#505F4E]/80 mt-1 font-light">
                Domingo à tarde
              </span>
            </div>

            {/* 2. Foto do Local */}
            <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0 md:px-4">
              <div className="w-full max-w-[240px] h-48 rounded-2xl overflow-hidden border border-[#7F9078]/25 shadow-md group">
                <img
                  src="/venue-photo.jpg?v=3"
                  alt="Sítio Dois Lagos — Local da cerimônia e recepção"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#7F9078] font-normal mt-2.5">
                NOSSO CENÁRIO
              </span>
            </div>

            {/* 3. Local */}
            <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0 md:pl-4">
              <div className="w-13 h-13 rounded-2xl bg-[#F1D487]/30 border border-[#F1D487]/50 flex items-center justify-center text-[#7F9078] mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-[#7F9078] font-normal mb-1">
                LOCAL
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#3E483D] font-normal">
                Sítio Dois Lagos
              </p>
              <span className="text-xs text-[#505F4E]/80 mt-1 font-light">
                Mairiporã — São Paulo
              </span>
            </div>

          </div>

          {/* Full Address Bar */}
          <div className="pt-8 border-t border-[#7F9078]/15 text-center flex flex-col items-center">
            <p className="font-serif text-base sm:text-lg text-[#505F4E] max-w-xl mx-auto mb-6 leading-relaxed font-normal">
              {address}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-center">
              {/* Google Maps Button */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="open-google-maps-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7F9078] hover:bg-[#687961] text-white text-xs sm:text-sm font-normal tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>ABRIR NO GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
