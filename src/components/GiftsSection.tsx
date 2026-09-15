import React, { useState, useMemo } from 'react';
import { GiftItem } from '../types';
import { WEDDING_GIFTS } from '../data/gifts';
import { GiftModal } from './GiftModal';
import { ChevronDown, ChevronUp, Gift } from 'lucide-react';

const INITIAL_VISIBLE_COUNT = 8;

export const GiftsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'ate-500' | '500-1000' | 'acima-1000'>('todos');
  const [showAll, setShowAll] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  // Filter gifts based on selection
  const filteredGifts = useMemo(() => {
    return WEDDING_GIFTS.filter((gift) => {
      if (activeFilter === 'ate-500') return gift.price <= 500;
      if (activeFilter === '500-1000') return gift.price > 500 && gift.price <= 1000;
      if (activeFilter === 'acima-1000') return gift.price > 1000;
      return true;
    });
  }, [activeFilter]);

  // Initial display shows first 9 options; "Ver mais opções" reveals all remaining
  const displayedGifts = showAll ? filteredGifts : filteredGifts.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingCount = Math.max(0, filteredGifts.length - INITIAL_VISIBLE_COUNT);

  return (
    <section id="presentes" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            COM CARINHO
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            Lista de Presentes
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-5" />
          
          {/* Explicativo inicial sutil e carinhoso */}
          <p className="font-serif italic text-lg sm:text-xl text-[#2B332A] font-light leading-relaxed">
            Sua presença é o nosso maior presente! Mas, se quiser nos abençoar com um mimo para a nossa Lua de Mel, preparamos algumas opções simbólicas.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mb-8 sm:mb-10 px-1">
          <button
            type="button"
            onClick={() => {
              setActiveFilter('todos');
              setShowAll(false);
            }}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-serif tracking-tight sm:tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'todos'
                ? 'bg-[#7F9078] text-white shadow-xs font-normal'
                : 'bg-white/80 text-[#505F4E] hover:bg-white border border-[#7F9078]/20 font-normal'
            }`}
          >
            TODOS <span className="hidden sm:inline">({WEDDING_GIFTS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter('ate-500');
              setShowAll(false);
            }}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-serif tracking-tight sm:tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'ate-500'
                ? 'bg-[#7F9078] text-white shadow-xs font-normal'
                : 'bg-white/80 text-[#505F4E] hover:bg-white border border-[#7F9078]/20 font-normal'
            }`}
          >
            ATÉ R$ 500
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter('500-1000');
              setShowAll(false);
            }}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-serif tracking-tight sm:tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === '500-1000'
                ? 'bg-[#7F9078] text-white shadow-xs font-normal'
                : 'bg-white/80 text-[#505F4E] hover:bg-white border border-[#7F9078]/20 font-normal'
            }`}
          >
            <span className="sm:hidden">R$ 500 - 1.000</span>
            <span className="hidden sm:inline">R$ 500 A R$ 1.000</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter('acima-1000');
              setShowAll(false);
            }}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-serif tracking-tight sm:tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'acima-1000'
                ? 'bg-[#7F9078] text-white shadow-xs font-normal'
                : 'bg-white/80 text-[#505F4E] hover:bg-white border border-[#7F9078]/20 font-normal'
            }`}
          >
            <span className="sm:hidden">+ R$ 1.000</span>
            <span className="hidden sm:inline">R$ 1.000 A R$ 5.000</span>
          </button>
        </div>

        {/* Gifts Grid: Cards with realistic background photos of the experience */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {displayedGifts.map((gift) => {
            const formattedPrice = gift.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            return (
              <div
                key={gift.id}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-500 group flex flex-col justify-end h-[250px] sm:h-[280px] border border-[#7F9078]/20"
              >
                {/* Realistic Background Image */}
                <img
                  src={gift.image}
                  alt={gift.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Elegant Dark Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 group-hover:via-black/55 transition-colors" />

                {/* Bottom Content: Title, Price and Button "Presentear" */}
                <div className="relative z-10 p-3 sm:p-4 flex flex-col">
                  {/* Title of the gift */}
                  <h3 className="font-serif text-sm sm:text-base text-white font-normal leading-snug drop-shadow-sm line-clamp-2 min-h-[40px] flex items-end">
                    {gift.title}
                  </h3>

                  {/* Price */}
                  <div className="my-1.5 sm:my-2 font-display text-lg sm:text-xl text-[#F1D487] font-normal tracking-tight drop-shadow-sm">
                    {formattedPrice}
                  </div>

                  {/* Button "Presentear" */}
                  <button
                    type="button"
                    onClick={() => setSelectedGift(gift)}
                    className="w-full py-1.5 sm:py-2 px-3 rounded-full bg-[#7F9078] hover:bg-[#687961] text-white text-[11px] sm:text-xs font-serif font-normal tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                  >
                    <span>Presentear</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Button "Ver mais opções" */}
        {filteredGifts.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-12 sm:mt-14 text-center">
            <button
              type="button"
              id="toggle-more-gifts-btn"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF7F0] text-[#3E483D] text-xs sm:text-sm font-serif font-normal tracking-widest uppercase border border-[#7F9078]/30 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Gift className="w-4 h-4 text-[#7F9078]" />
              <span>
                {showAll
                  ? 'Ver Menos Opções'
                  : `Ver Mais Opções (${remainingCount} opções disponíveis)`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-[#7F9078]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#7F9078]" />
              )}
            </button>
          </div>
        )}

      </div>

      {/* Gift Modal: Pagamento Direto via Pix com QR Code e Chave Pix */}
      <GiftModal
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
      />
    </section>
  );
};
