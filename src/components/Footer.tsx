import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface FooterProps {
  onOpenSheetsModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSheetsModal }) => {
  return (
    <footer className="bg-[#485646] text-[#F7F2E9] py-16 sm:py-24 border-t border-[#3B483A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Monogram Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#F7F2E9]/30 flex items-center justify-center bg-[#F7F2E9] mb-6 shadow-md p-2 overflow-hidden">
          <img
            src="/monograma.png"
            alt="Monograma Gabriela e Carlos"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Names */}
        <h2 className="font-display text-3xl sm:text-5xl text-white font-normal tracking-tight mb-2 flex items-center justify-center flex-wrap">
          <span className="font-display font-normal">Gabriela</span>
          <span className="font-display italic text-2xl sm:text-4xl text-[#F3B99A] mx-2 sm:mx-3 font-normal">
            &
          </span>
          <span className="font-display font-normal">Carlos</span>
        </h2>

        {/* Tagline */}
        <p className="font-serif italic text-base sm:text-xl text-[#F7F2E9]/80 mb-6 font-light">
          One love, a lifetime together
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-[1px] bg-[#F7F2E9]/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#DF806E]" />
          <span className="w-12 h-[1px] bg-[#F7F2E9]/20" />
        </div>

        {/* Date & Location */}
        <div className="text-xs sm:text-sm font-serif tracking-[0.25em] uppercase text-[#F1D487] font-normal mb-8">
          05.09.2027 • SÍTIO DOIS LAGOS
        </div>

        {/* Warm Dedication */}
        <p className="text-xs text-[#F7F2E9]/70 font-light tracking-wide max-w-sm mb-6">
          Feito com amor para celebrar o nosso para sempre.
        </p>

        {/* Discreet Wedding Couple Admin Link */}
        {onOpenSheetsModal && (
          <button
            type="button"
            onClick={onOpenSheetsModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F7F2E9]/20 bg-white/5 hover:bg-white/10 text-xs text-[#F7F2E9]/80 hover:text-white transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#F1D487]" />
            <span>Área dos Noivos • Planilha Google Sheets</span>
          </button>
        )}
      </div>
    </footer>
  );
};
