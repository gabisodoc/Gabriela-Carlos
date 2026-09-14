import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Download,
  Users,
  UserCheck,
  UserX,
  LogOut,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  getAccessToken,
  findOrCreateSpreadsheet,
  SPREADSHEET_TITLE,
  getStoredSpreadsheetId,
} from '../services/googleSheets';
import {
  getStoredRsvps,
  syncAllPendingRsvps,
  exportRsvpsToCsv,
} from '../services/rsvpStorage';
import { RsvpRecord } from '../services/googleSheets';

interface AdminSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  spreadsheetUrl: string | null;
  onSpreadsheetUrlChange: (url: string | null) => void;
}

export const AdminSheetsModal: React.FC<AdminSheetsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChange,
  spreadsheetUrl,
  onSpreadsheetUrlChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);

  // Load RSVPs whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setRsvps(getStoredRsvps());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onUserChange(res.user);
        setStatusMessage('Conectado com sucesso! Localizando ou criando a planilha...');
        
        // Find or create spreadsheet
        const sheetRes = await findOrCreateSpreadsheet(res.accessToken);
        onSpreadsheetUrlChange(sheetRes.spreadsheetUrl);
        setStatusMessage(
          sheetRes.createdNew
            ? 'Nova planilha criada com sucesso no seu Google Drive!'
            : 'Planilha oficial conectada ao seu Google Drive!'
        );

        // Auto-sync any pending RSVPs
        const syncResult = await syncAllPendingRsvps(res.accessToken, sheetRes.spreadsheetId);
        if (syncResult.syncedCount > 0) {
          setStatusMessage(
            `Planilha conectada e ${syncResult.syncedCount} confirmação(ões) pendente(s) sincronizada(s)!`
          );
        }
        setRsvps(getStoredRsvps());
      }
    } catch (err: unknown) {
      console.error('Erro ao conectar Google:', err);
      const message = err instanceof Error ? err.message : 'Erro ao conectar';
      setStatusMessage(`Falha ao conectar: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrConnectSheet = async () => {
    const token = getAccessToken();
    if (!token) {
      setStatusMessage('Sessão expirada. Por favor, conecte-se novamente.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    try {
      const sheetRes = await findOrCreateSpreadsheet(token);
      onSpreadsheetUrlChange(sheetRes.spreadsheetUrl);
      setStatusMessage(
        sheetRes.createdNew
          ? 'Nova planilha criada no seu Google Drive!'
          : 'Planilha vinculada com sucesso!'
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro ao processar planilha';
      setStatusMessage(`Erro: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    const token = getAccessToken();
    const sheetId = getStoredSpreadsheetId();

    if (!token || !sheetId) {
      setStatusMessage('Conecte sua conta Google e a planilha antes de sincronizar.');
      return;
    }

    setSyncing(true);
    setStatusMessage(null);
    try {
      const res = await syncAllPendingRsvps(token, sheetId);
      setRsvps(getStoredRsvps());
      if (res.totalPending === 0) {
        setStatusMessage('Todas as confirmações já estão sincronizadas com o Google Sheets!');
      } else {
        setStatusMessage(
          `${res.syncedCount} de ${res.totalPending} confirmação(ões) enviada(s) para a planilha com sucesso!`
        );
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro na sincronização';
      setStatusMessage(`Erro na sincronização: ${message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    onUserChange(null);
    setStatusMessage('Desconectado da conta Google.');
  };

  // Metrics calculation
  const totalResponses = rsvps.length;
  const confirmedResponses = rsvps.filter((r) => r.attending);
  const totalGuests = confirmedResponses.reduce((acc, r) => acc + 1 + (r.guestCount || 0), 0);
  const declinedResponses = rsvps.filter((r) => !r.attending);
  const pendingSyncCount = rsvps.filter((r) => !r.syncedToSheets).length;

  const filteredRsvps = rsvps.filter((r) =>
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.companionNames && r.companionNames.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (r.message && r.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl border border-[#7F9078]/30 shadow-2xl p-6 sm:p-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#7F9078]/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#A8C3AE]/30 flex items-center justify-center text-[#505F4E]">
              <FileSpreadsheet className="w-5 h-5 text-[#7F9078]" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#F3B99A] block font-normal">
                PAINEL DOS NOIVOS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#3E483D] font-normal">
                Confirmações & Google Sheets
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#7F9078]/25 flex items-center justify-center text-[#505F4E] hover:bg-[#F7F2E9] transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          
          {/* Status Message */}
          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-white border border-[#7F9078]/30 flex items-center gap-3 text-xs sm:text-sm text-[#3E483D]">
              <CheckCircle2 className="w-4 h-4 text-[#7F9078] shrink-0" />
              <span className="font-normal">{statusMessage}</span>
            </div>
          )}

          {/* Google Account Connection Status */}
          <div className="bg-white rounded-2xl border border-[#7F9078]/20 p-5 sm:p-6 shadow-xs">
            {!currentUser ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs uppercase tracking-wider text-[#7F9078] block mb-1 font-normal">
                    CONECTAR AO GOOGLE DRIVE
                  </span>
                  <p className="text-sm text-[#505F4E] font-normal max-w-md">
                    Conecte a sua conta do Google para gerar automaticamente a planilha oficial e manter as presenças sincronizadas em tempo real.
                  </p>
                </div>

                {/* Official GSI Styled Button */}
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="gsi-material-button shrink-0 cursor-pointer"
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {loading ? 'Conectando...' : 'Conectar com Google'}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#7F9078]/15">
                  <div className="flex items-center gap-3">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'Usuário'}
                        className="w-10 h-10 rounded-full border border-[#7F9078]/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#7F9078] text-white flex items-center justify-center font-normal text-sm">
                        {currentUser.displayName?.charAt(0) || 'G'}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-normal text-[#3E483D]">
                          {currentUser.displayName || 'Gabriela Oliveira'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#A8C3AE]/30 text-[#505F4E] text-[10px] font-normal">
                          Conectado
                        </span>
                      </div>
                      <span className="text-xs text-[#505F4E]/80 font-normal">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#7F9078]/25 text-xs text-[#505F4E] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair da conta</span>
                  </button>
                </div>

                {/* Spreadsheet status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#7F9078] block font-normal">
                      PLANILHA OFICIAL NO GOOGLE DRIVE
                    </span>
                    <span className="font-serif text-base text-[#3E483D] font-normal block">
                      {SPREADSHEET_TITLE}
                    </span>
                    {pendingSyncCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-[#DF806E] mt-1 font-normal">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {pendingSyncCount} confirmação(ões) pendente(s) de sincronização
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {spreadsheetUrl ? (
                      <a
                        href={spreadsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#7F9078] hover:bg-[#6b7b65] text-white text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer font-normal"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Abrir no Google Sheets</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCreateOrConnectSheet}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#7F9078] text-white text-xs tracking-wider uppercase transition-colors cursor-pointer font-normal"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Criar Planilha no Sheets</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleSync}
                      disabled={syncing}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#7F9078]/30 bg-[#FAF7F0] hover:bg-white text-xs text-[#505F4E] tracking-wider uppercase transition-colors cursor-pointer font-normal"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-[#7F9078]' : ''}`} />
                      <span>{syncing ? 'Sincronizando...' : 'Sincronizar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl border border-[#7F9078]/20 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#7F9078]/25 flex items-center justify-center mx-auto mb-2 text-[#505F4E]">
                <Users className="w-4 h-4 text-[#7F9078]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#505F4E] block font-normal">
                RESPOSTAS
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#3E483D] font-normal">
                {totalResponses}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#7F9078]/20 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-[#A8C3AE]/30 border border-[#A8C3AE] flex items-center justify-center mx-auto mb-2 text-[#505F4E]">
                <UserCheck className="w-4 h-4 text-[#7F9078]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#505F4E] block font-normal">
                CONFIRMADOS
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#7F9078] font-normal">
                {confirmedResponses.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#7F9078]/20 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-[#F3B99A]/30 border border-[#F3B99A] flex items-center justify-center mx-auto mb-2 text-[#505F4E]">
                <Users className="w-4 h-4 text-[#DF806E]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#505F4E] block font-normal">
                TOTAL PESSOAS
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#3E483D] font-normal">
                {totalGuests}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#7F9078]/20 p-4 text-center">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#7F9078]/25 flex items-center justify-center mx-auto mb-2 text-[#505F4E]">
                <UserX className="w-4 h-4 text-[#505F4E]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#505F4E] block font-normal">
                RECUSAS
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#505F4E] font-normal">
                {declinedResponses.length}
              </span>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F9078]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome do convidado ou recado..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#7F9078]/30 focus:border-[#7F9078] outline-hidden text-xs sm:text-sm text-[#3E483D] placeholder-[#505F4E]/50 font-normal"
              />
            </div>

            <button
              type="button"
              onClick={exportRsvpsToCsv}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#7F9078]/30 text-xs text-[#505F4E] hover:bg-[#FAF7F0] transition-colors cursor-pointer font-normal whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-[#7F9078]" />
              <span>Baixar Planilha (CSV)</span>
            </button>
          </div>

          {/* Table of Guests */}
          <div className="bg-white rounded-2xl border border-[#7F9078]/20 overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-72">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#7F9078]/20 bg-[#FAF7F0]/60 text-[11px] uppercase tracking-wider text-[#505F4E] font-normal">
                    <th className="py-3 px-4">Data/Hora</th>
                    <th className="py-3 px-4">Convidado</th>
                    <th className="py-3 px-4">Presença</th>
                    <th className="py-3 px-4">Acompanhante</th>
                    <th className="py-3 px-4">Pessoas</th>
                    <th className="py-3 px-4">Recado</th>
                    <th className="py-3 px-4 text-right">Status Sheets</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#7F9078]/10 text-xs sm:text-sm text-[#3E483D]">
                  {filteredRsvps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#505F4E]/70 font-normal">
                        Nenhuma confirmação encontrada.
                      </td>
                    </tr>
                  ) : (
                    filteredRsvps.map((r) => (
                      <tr key={r.id} className="hover:bg-[#FAF7F0]/40 transition-colors">
                        <td className="py-3 px-4 text-xs text-[#505F4E]/80 whitespace-nowrap font-normal">
                          {r.timestamp}
                        </td>
                        <td className="py-3 px-4 font-normal whitespace-nowrap">
                          {r.fullName}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {r.attending ? (
                            <span className="inline-flex items-center gap-1 text-xs text-[#7F9078] font-normal">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Confirmado
                            </span>
                          ) : (
                            <span className="text-xs text-[#505F4E]/70 font-normal">
                              Não comparecerá
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#505F4E] font-normal whitespace-nowrap">
                          {r.companionNames || '-'}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#505F4E] font-normal whitespace-nowrap">
                          {r.attending
                            ? r.guestCount === 0
                              ? '1 (Somente ele)'
                              : `${1 + r.guestCount} (${r.guestCount} acompanhante${r.guestCount > 1 ? 's' : ''})`
                            : '0'}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#505F4E] max-w-xs truncate font-normal">
                          {r.message || '-'}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {r.syncedToSheets ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#A8C3AE]/30 text-[#505F4E] text-[10px] font-normal">
                              Sincronizado
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-[#F3B99A]/40 text-[#DF806E] text-[10px] font-normal">
                              Pendente
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-[#7F9078]/20 flex items-center justify-between text-xs text-[#505F4E]/80 font-normal">
          <span>
            Arquivo oficial: <span className="text-[#3E483D]">{SPREADSHEET_TITLE}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-[#7F9078]/30 hover:bg-white text-[#3E483D] transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
