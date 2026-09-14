import React, { useState } from 'react';
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Minus,
  Plus,
  FileSpreadsheet,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { addRsvpRecord } from '../services/rsvpStorage';
import { getAccessToken, getStoredSpreadsheetId } from '../services/googleSheets';

interface RsvpSectionProps {
  onOpenSheetsModal?: () => void;
  spreadsheetUrl?: string | null;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  onOpenSheetsModal,
  spreadsheetUrl,
}) => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(0); // 0 = Somente eu
  const [companionNames, setCompanionNames] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGuestCountChange = (newCount: number) => {
    setGuestCount(newCount);
    setCompanionNames((prev) => {
      if (newCount === 0) return [];
      const next = [...prev];
      if (newCount > next.length) {
        while (next.length < newCount) {
          next.push('');
        }
      } else if (newCount < next.length) {
        next.length = newCount;
      }
      return next;
    });
  };

  const handleCompanionChange = (index: number, val: string) => {
    setCompanionNames((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formattedCompanions =
        guestCount > 0
          ? companionNames
              .map((n) => n.trim())
              .filter(Boolean)
              .join(', ')
          : '';

      // 1. Save locally and sync directly to Google Sheets if connected
      const token = getAccessToken();
      const sheetId = getStoredSpreadsheetId();

      await addRsvpRecord(
        {
          fullName: fullName.trim(),
          attending: attending === 'yes',
          guestCount,
          companionNames: formattedCompanions,
          message: message.trim(),
        },
        token,
        sheetId
      );

      setSubmitted(true);

      if (attending === 'yes') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7F9078', '#DF806E', '#F3B99A', '#F1D487'],
        });
      }
    } catch (err) {
      console.error('Erro ao processar confirmação:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setMessage('');
    setGuestCount(0);
    setCompanionNames([]);
    setAttending('yes');
  };

  return (
    <section id="confirmar-presenca" className="py-20 sm:py-28 bg-[#FAF7F0] border-t border-[#7F9078]/15">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#F3B99A] font-normal block mb-2">
            VOCÊ É NOSSO CONVIDADO
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#3E483D] font-normal tracking-tight mb-4">
            Confirmar Presença
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif italic text-base sm:text-lg text-[#505F4E] font-light leading-relaxed">
            Ficaremos muito felizes em celebrar com você! Por favor, confirme sua presença até 05 de julho de 2027.
          </p>
        </div>

        {/* Guest Restriction Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-white/80 border border-[#7F9078]/25 shadow-xs flex items-center justify-between gap-3 text-xs sm:text-sm text-[#505F4E]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#7F9078] shrink-0" />
            <span>
              <span className="text-[#3E483D]">Confirmação individual:</span> Por favor, informe o número de acompanhantes indicado no seu convite.
            </span>
          </div>

          {spreadsheetUrl && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8C3AE]/25 text-[#505F4E] text-xs font-normal whitespace-nowrap">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#7F9078]" />
              <span>Google Sheets ativo</span>
            </span>
          )}
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl border border-[#7F9078]/20 shadow-md p-6 sm:p-10 md:p-12">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#A8C3AE]/25 border border-[#A8C3AE] flex items-center justify-center mx-auto text-[#505F4E]">
                <CheckCircle2 className="w-10 h-10 text-[#7F9078]" />
              </div>
              <h3 className="font-serif text-3xl text-[#3E483D] font-normal">
                Presença Registrada!
              </h3>
              <p className="font-serif text-base sm:text-lg text-[#505F4E] max-w-md mx-auto leading-relaxed font-normal">
                {attending === 'yes' ? (
                  <>
                    Muito obrigado, <span className="text-[#3E483D]">{fullName}</span>! Sua presença foi confirmada e registrada com sucesso na lista oficial dos noivos.
                  </>
                ) : (
                  <>
                    Muito obrigado por nos avisar, <span className="text-[#3E483D]">{fullName}</span>! Sua resposta foi registrada na lista do casamento. Sentiremos sua falta!
                  </>
                )}
              </p>
              <div className="pt-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-[#7F9078]/30 text-xs uppercase tracking-wider text-[#505F4E] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                >
                  Enviar outra confirmação
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Nome Completo */}
              <div>
                <label
                  htmlFor="rsvp-full-name"
                  className="block text-xs font-normal uppercase tracking-wider text-[#505F4E] mb-2"
                >
                  NOME COMPLETO *
                </label>
                <input
                  id="rsvp-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome e sobrenome"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAF7F0]/60 border border-[#7F9078]/30 focus:border-[#7F9078] focus:bg-white focus:ring-2 focus:ring-[#7F9078]/20 outline-hidden text-sm text-[#3E483D] placeholder-[#505F4E]/50 transition-all font-normal"
                />
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs font-normal uppercase tracking-wider text-[#505F4E] mb-2">
                  VOCÊ PODERÁ COMPARECER? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-normal tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'bg-[#7F9078] text-white border-[#7F9078] shadow-xs'
                        : 'bg-[#FAF7F0]/40 text-[#505F4E] border-[#7F9078]/25 hover:bg-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Sim, estarei lá!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-normal tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      attending === 'no'
                        ? 'bg-[#505F4E] text-white border-[#505F4E] shadow-xs'
                        : 'bg-[#FAF7F0]/40 text-[#505F4E] border-[#7F9078]/25 hover:bg-white'
                    }`}
                  >
                    <span>Não poderei ir</span>
                  </button>
                </div>
              </div>

              {/* Quantidade de Acompanhantes e Nomes dos Acompanhantes */}
              {attending === 'yes' && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-2">
                      <label className="text-xs font-normal uppercase tracking-wider text-[#505F4E]">
                        QUANTIDADE DE ACOMPANHANTES
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F0]/60 border border-[#7F9078]/30">
                      <button
                        type="button"
                        onClick={() => handleGuestCountChange(Math.max(0, guestCount - 1))}
                        disabled={guestCount === 0}
                        className="w-10 h-10 rounded-lg bg-white border border-[#7F9078]/30 flex items-center justify-center text-[#505F4E] disabled:opacity-40 hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                        aria-label="Diminuir acompanhantes"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="font-serif text-lg font-normal text-[#3E483D]">
                        {guestCount === 0 ? 'Somente eu' : `${guestCount} acompanhante(s)`}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleGuestCountChange(Math.min(5, guestCount + 1))}
                        disabled={guestCount >= 5}
                        className="w-10 h-10 rounded-lg bg-white border border-[#7F9078]/30 flex items-center justify-center text-[#505F4E] disabled:opacity-40 hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                        aria-label="Aumentar acompanhantes"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Linha(s) de Nome do Acompanhante: visível SOMENTE quando guestCount > 0 */}
                  {guestCount > 0 && (
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-normal uppercase tracking-wider text-[#505F4E]">
                          {guestCount === 1 ? 'NOME DO ACOMPANHANTE *' : 'NOMES DOS ACOMPANHANTES *'}
                        </label>
                        <span className="text-xs text-[#7F9078] font-normal">
                          {guestCount} {guestCount === 1 ? 'acompanhante' : 'acompanhantes'}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {companionNames.map((name, index) => (
                          <div key={index} className="space-y-1">
                            {guestCount > 1 && (
                              <label
                                htmlFor={`rsvp-companion-${index}`}
                                className="block text-xs text-[#505F4E] font-medium"
                              >
                                {index + 1}º Acompanhante
                              </label>
                            )}
                            <input
                              id={`rsvp-companion-${index}`}
                              type="text"
                              required
                              value={name}
                              onChange={(e) => handleCompanionChange(index, e.target.value)}
                              placeholder={
                                guestCount === 1
                                  ? 'Nome completo do acompanhante'
                                  : `Nome completo do ${index + 1}º acompanhante`
                              }
                              className="w-full px-4 py-3.5 rounded-xl bg-[#FAF7F0]/60 border border-[#7F9078]/30 focus:border-[#7F9078] focus:bg-white focus:ring-2 focus:ring-[#7F9078]/20 outline-hidden text-sm text-[#3E483D] placeholder-[#505F4E]/50 transition-all font-normal"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recado Opcional */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-xs font-normal uppercase tracking-wider text-[#505F4E] mb-2"
                >
                  RECADO PARA OS NOIVOS (OPCIONAL)
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Deixe um carinho para Gabriela e Carlos..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0]/60 border border-[#7F9078]/30 focus:border-[#7F9078] focus:bg-white focus:ring-2 focus:ring-[#7F9078]/20 outline-hidden text-sm text-[#3E483D] placeholder-[#505F4E]/50 transition-all resize-none font-normal"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-rsvp-btn"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-[#DF806E] hover:bg-[#d07261] text-white text-xs sm:text-sm font-normal tracking-[0.2em] uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'REGISTRANDO...' : 'ENVIAR CONFIRMAÇÃO'}</span>
                <Send className="w-4 h-4" />
              </button>

              {/* Submission Note */}
              <p className="text-center text-[11px] text-[#505F4E]/80 mt-2 font-normal">
                Ao clicar em enviar, sua confirmação será registrada diretamente na lista oficial dos noivos.
              </p>
            </form>
          )}

          {/* Area dos Noivos */}
          {onOpenSheetsModal && (
            <div className="mt-8 pt-6 border-t border-[#7F9078]/15 flex items-center justify-center text-center">
              <button
                type="button"
                onClick={onOpenSheetsModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7F9078]/30 bg-[#FAF7F0] hover:bg-white text-xs text-[#505F4E] hover:text-[#3E483D] transition-colors cursor-pointer font-normal"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#7F9078]" />
                <span>Área dos Noivos: Google Sheets</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
