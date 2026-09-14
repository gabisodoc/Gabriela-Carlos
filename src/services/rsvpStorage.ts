import { RsvpRecord, appendRsvpToSheet } from './googleSheets';

const STORAGE_KEY = 'wedding_local_rsvps';

export const getStoredRsvps = (): RsvpRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveRsvps = (list: RsvpRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const addRsvpRecord = async (
  record: Omit<RsvpRecord, 'id' | 'timestamp' | 'syncedToSheets'>,
  accessToken?: string | null,
  spreadsheetId?: string | null
): Promise<RsvpRecord> => {
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  const newRecord: RsvpRecord = {
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: formattedDate,
    fullName: record.fullName,
    attending: record.attending,
    guestCount: record.guestCount,
    companionNames: record.companionNames,
    message: record.message,
    syncedToSheets: false,
  };

  // If connected, sync right away
  if (accessToken && spreadsheetId) {
    try {
      const ok = await appendRsvpToSheet(accessToken, spreadsheetId, newRecord);
      if (ok) {
        newRecord.syncedToSheets = true;
      }
    } catch (err) {
      console.warn('Erro ao sincronizar direto no Google Sheets:', err);
    }
  }

  const existing = getStoredRsvps();
  const updated = [newRecord, ...existing];
  saveRsvps(updated);

  return newRecord;
};

export const syncAllPendingRsvps = async (
  accessToken: string,
  spreadsheetId: string
): Promise<{ syncedCount: number; totalPending: number }> => {
  const current = getStoredRsvps();
  const pending = current.filter((r) => !r.syncedToSheets);

  if (pending.length === 0) {
    return { syncedCount: 0, totalPending: 0 };
  }

  let syncedCount = 0;
  const updated = [...current];

  for (const item of pending) {
    try {
      const ok = await appendRsvpToSheet(accessToken, spreadsheetId, item);
      if (ok) {
        const idx = updated.findIndex((r) => r.id === item.id);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], syncedToSheets: true };
          syncedCount++;
        }
      }
    } catch (err) {
      console.error(`Erro ao sincronizar RSVP ${item.fullName}:`, err);
    }
  }

  saveRsvps(updated);
  return { syncedCount, totalPending: pending.length };
};

export const exportRsvpsToCsv = () => {
  const rsvps = getStoredRsvps();
  if (rsvps.length === 0) {
    alert('Nenhuma confirmação de presença registrada até o momento.');
    return;
  }

  const headers = [
    'Data e Hora',
    'Nome Completo',
    'Presença',
    'Qtd Acompanhantes',
    'Nome do Acompanhante',
    'Total de Pessoas',
    'Recado para os Noivos',
    'Sincronizado Google Sheets',
  ];

  const escapeCsv = (str?: string | number | boolean) => {
    if (str === undefined || str === null) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = rsvps.map((r) => [
    escapeCsv(r.timestamp),
    escapeCsv(r.fullName),
    escapeCsv(r.attending ? 'Confirmado' : 'Não comparecerá'),
    escapeCsv(r.guestCount),
    escapeCsv(r.companionNames || '-'),
    escapeCsv(r.attending ? 1 + (r.guestCount || 0) : 0),
    escapeCsv(r.message || ''),
    escapeCsv(r.syncedToSheets ? 'Sim' : 'Pendente'),
  ]);

  const csvContent = [headers.map(escapeCsv).join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  // Add BOM for Excel compatibility with Portuguese accents
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `casamento-gabriela-carlos-confirmacoes-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
