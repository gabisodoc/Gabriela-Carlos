import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Share2 } from 'lucide-react';
import { GiftItem } from '../types';
import { PIX_CONFIG } from '../data/gifts';
import confetti from 'canvas-confetti';

interface GiftModalProps {
  gift: GiftItem | null;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ gift, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!gift) return null;

  const formattedPrice = gift.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_CONFIG.pixKey);
    setCopied(true);

    // Efeito comemorativo suave
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#7F9078', '#F3B99A', '#E8A7A0', '#F1D487']
    });

    setTimeout(() => setCopied(false), 3000);
  };

  // Link para avisar no WhatsApp diretamente
  const generateWhatsAppLink = () => {
    const text = `Oi Gabriela e Carlos! Acabei de presentear vocês com: *${gift.title}* (${formattedPrice}) para a Lua de Mel na Itália e Grécia! Felicidades e muito amor ao casal! ❤️`;
    return `https://wa.me/5511970436692?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-xs transition-opacity duration-300"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#7F9078]/25 text-[#3E483D] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#505F4E] hover:text-[#3E483D] hover:bg-[#7F9078]/10 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gift Summary Header */}
        <div className="text-center mb-6">
          <span className="font-serif tracking-[0.2em] text-[11px] uppercase text-[#7F9078] font-normal block mb-1">
            PRESENTE ESCOLHIDO
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#3E483D] font-normal leading-snug">
            {gift.title}
          </h3>
          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-[#7F9078]/15 border border-[#7F9078]/30 font-display text-xl sm:text-2xl text-[#3E483D] font-normal">
            {formattedPrice}
          </div>
        </div>

        {/* ============================================================ */}
        {/* Pagamento Via Pix Direto (Sem popup intermediário de mensagem) */}
        {/* ============================================================ */}
        <div className="space-y-5">
          {/* Aviso de Pix Direto */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#A8C3AE]/20 border border-[#A8C3AE]/40 text-xs font-serif text-[#2B332A]">
            <ShieldCheck className="w-5 h-5 text-[#7F9078] shrink-0" />
            <span>
              <span className="text-[#3E483D] font-medium">Pix Direto sem intermediários:</span> O valor cai diretamente na conta da noiva, sem taxas.
            </span>
          </div>

          {/* O QR Code do Pix */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-[#7F9078]/20 shadow-xs">
            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs flex flex-col items-center">
              <img
                src="/pix-qrcode.png"
                alt="QR Code Pix Oficial"
                className="w-48 h-auto sm:w-56 object-contain rounded-lg"
              />
            </div>
            <span className="font-serif text-xs text-[#2B332A] mt-2.5 font-normal">
              Abra o app do seu banco e aponte a câmera para o QR Code
            </span>
          </div>

          {/* A Chave Pix do casal */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-serif font-normal uppercase tracking-wider text-[#2B332A]">
                Chave Pix (Copia e Cola)
              </label>
              <span className="text-xs font-serif text-[#7F9078]">Qualquer banco</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#7F9078]/30 overflow-hidden">
              <div className="font-serif text-xs text-[#3E483D] break-all select-all leading-relaxed">
                {PIX_CONFIG.pixKey}
              </div>
            </div>
          </div>

          {/* Botão Interativo: "Copiar Chave Pix" */}
          <button
            type="button"
            id="btn-copiar-chave-pix"
            onClick={handleCopyPix}
            className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-serif font-normal tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-[#7F9078] hover:bg-[#687961] text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Chave Pix Copiada com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Chave Pix</span>
              </>
            )}
          </button>

          {/* Detalhes do Favorecido */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#7F9078]/20 text-xs font-serif text-[#2B332A] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#2B332A]/80">Titular da Conta:</span>
              <span className="font-normal text-[#3E483D]">{PIX_CONFIG.beneficiaryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2B332A]/80">Cidade:</span>
              <span>{PIX_CONFIG.bankCity}</span>
            </div>
          </div>

          {/* Botão para avisar aos noivos no WhatsApp */}
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-full bg-transparent hover:bg-[#7F9078]/10 text-xs font-serif font-normal tracking-wider uppercase text-[#2B332A] border border-[#7F9078]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#7F9078]" />
            <span>Avisar aos Noivos no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
