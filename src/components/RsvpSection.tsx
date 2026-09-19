import React, { useState } from 'react';
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Minus,
  Plus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { addRsvpRecord } from '../services/rsvpStorage';
import { getAccessToken, getStoredSpreadsheetId } from '../services/googleSheets';

export const RsvpSection: React.FC = () => {
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

      const formDataObj = {
        'form-name': 'rsvp',
        fullName: fullName.trim(),
        attending: attending === 'yes' ? 'Sim, estarei lá!' : 'Não poderei ir',
        guestCount: String(guestCount),
        companionNames: formattedCompanions,
        message: message.trim(),
      };

      // 1. Submit to Google Sheets via Google Apps Script Web App
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymE0Wwm00pUyF0CIkCorkGiCFoApJgjiB-Rg6DnQ7VbvKjEbM9sPmUNcR44NIMeKwy/exec';
      try {
        const payload = {
          fullName: fullName.trim(),
          attending: attending,
          guestCount,
          companionNames: formattedCompanions,
          message: message.trim(),
          timestamp: new Date().toISOString(),
        };

        // Envia via fetch com mode 'no-cors' para contornar redirecionamentos nativos do Google Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } catch (sheetsErr) {
        console.warn('Erro ao salvar no Google Sheets:', sheetsErr);
      }

      // 2. Submit to Netlify Forms (backup e controle pelo painel do Netlify)
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formDataObj).toString(),
        });
      } catch (postErr) {
        console.warn('Netlify form submission notice:', postErr);
      }

      // 3. Also save locally in browser storage as backup
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
    <section id="confirmar-presenca" className="py-20 sm:py-28 bg-white border-t border-[#7F9078]/15">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#DF806E] font-bold block mb-2">
            VOCÊ É NOSSO CONVIDADO
          </span>
          <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#3E483D] font-normal mb-3">
            Confirmar Presença
          </h2>
          <div className="w-12 h-[1px] bg-[#7F9078]/40 mx-auto mb-4" />
          <p className="font-serif italic text-base sm:text-lg text-[#2B332A] font-light leading-relaxed">
            Ficaremos muito felizes em celebrar com você! Por favor, confirme sua presença até 05 de julho de 2027.
          </p>
        </div>

        {/* Guest Restriction Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-white/80 border border-[#7F9078]/25 shadow-xs flex items-center gap-3 text-xs sm:text-sm text-[#2B332A]">
          <ShieldCheck className="w-5 h-5 text-[#7F9078] shrink-0" />
          <span>
            <span className="text-[#3E483D] font-medium">Confirmação individual:</span> Por favor, informe o número de acompanhantes indicado no seu convite.
          </span>
        </div>

        {/* Card Form */}
        <div className="bg-[#EAF2EC] rounded-3xl border border-[#7F9078]/25 shadow-md p-6 sm:p-10 md:p-12">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-white/80 border border-[#7F9078]/30 flex items-center justify-center mx-auto text-[#2B332A]">
                <CheckCircle2 className="w-10 h-10 text-[#7F9078]" />
              </div>
              <h3 className="font-serif text-3xl text-[#3E483D] font-normal">
                Presença Registrada!
              </h3>
              <p className="font-serif text-base sm:text-lg text-[#2B332A] max-w-md mx-auto leading-relaxed font-normal">
                {attending === 'yes' ? (
                  <>
                    Muito obrigado, <span className="text-[#3E483D] font-medium">{fullName}</span>! Sua presença foi confirmada e registrada com sucesso na lista oficial dos noivos.
                  </>
                ) : (
                  <>
                    Muito obrigado por nos avisar, <span className="text-[#3E483D] font-medium">{fullName}</span>! Sua resposta foi registrada na lista do casamento. Sentiremos sua falta!
                  </>
                )}
              </p>
              <div className="pt-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-[#7F9078]/30 bg-white text-xs uppercase tracking-wider text-[#2B332A] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                >
                  Enviar outra confirmação
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              name="rsvp"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-6"
            >
              {/* Hidden inputs for Netlify Form Submission */}
              <input type="hidden" name="form-name" value="rsvp" />
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="attending" value={attending === 'yes' ? 'Sim, estarei lá!' : 'Não poderei ir'} />
              <input type="hidden" name="guestCount" value={String(guestCount)} />
              <input
                type="hidden"
                name="companionNames"
                value={guestCount > 0 ? companionNames.map((n) => n.trim()).filter(Boolean).join(', ') : ''}
              />
              
              {/* Nome Completo */}
              <div>
                <label
                  htmlFor="rsvp-full-name"
                  className="block text-xs font-normal uppercase tracking-wider text-[#2B332A] mb-2"
                >
                  NOME COMPLETO *
                </label>
                <input
                  id="rsvp-full-name"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome e sobrenome"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#7F9078]/30 focus:border-[#7F9078] focus:ring-2 focus:ring-[#7F9078]/20 outline-hidden text-sm text-[#3E483D] placeholder-[#2B332A]/50 transition-all font-normal shadow-2xs"
                />
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs font-normal uppercase tracking-wider text-[#2B332A] mb-2">
                  VOCÊ PODERÁ COMPARECER? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-normal tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'bg-[#7F9078] text-white border-[#7F9078] shadow-xs'
                        : 'bg-white text-[#2B332A] border-[#7F9078]/30 hover:border-[#7F9078]'
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
                        : 'bg-white text-[#2B332A] border-[#7F9078]/30 hover:border-[#7F9078]'
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
                      <label className="text-xs font-normal uppercase tracking-wider text-[#2B332A]">
                        QUANTIDADE DE ACOMPANHANTES
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#7F9078]/30 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleGuestCountChange(Math.max(0, guestCount - 1))}
                        disabled={guestCount === 0}
                        className="w-10 h-10 rounded-lg bg-[#EAF2EC] border border-[#7F9078]/30 flex items-center justify-center text-[#2B332A] disabled:opacity-40 hover:bg-[#dce9df] transition-colors cursor-pointer"
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
                        className="w-10 h-10 rounded-lg bg-[#EAF2EC] border border-[#7F9078]/30 flex items-center justify-center text-[#2B332A] disabled:opacity-40 hover:bg-[#dce9df] transition-colors cursor-pointer"
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
                        <label className="block text-xs font-normal uppercase tracking-wider text-[#2B332A]">
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
                                className="block text-xs text-[#2B332A] font-medium"
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
                              className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#7F9078]/30 focus:border-[#7F9078] focus:ring-2 focus:ring-[#7F9078]/20 outline-hidden text-sm text-[#3E483D] placeholder-[#2B332A]/50 transition-all font-normal shadow-2xs"
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
                  className="block text-xs font-normal uppercase tracking-wider text-[#2B332A] mb-2"
                >
                  RECADO PARA OS NOIVOS (OPCIONAL)
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Deixe um carinho para Gabriela e Carlos..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#7F9078]/30 focus:border-[#7F9078] focus:ring-2 focus:ring-[#7F9078]/20 outline-hidden text-sm text-[#3E483D] placeholder-[#2B332A]/50 transition-all resize-none font-normal shadow-2xs"
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
              <p className="text-center text-[11px] text-[#2B332A]/85 mt-2 font-normal">
                Ao clicar em enviar, sua confirmação será registrada diretamente na lista oficial dos noivos.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
