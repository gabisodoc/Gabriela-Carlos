import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Provider with required Workspace scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

// In-memory token cache (DO NOT store in localStorage or sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const SPREADSHEET_TITLE = 'Casamento Gabriela & Carlos - Lista de Presenças';
const SPREADSHEET_ID_STORAGE_KEY = 'wedding_sheets_id';

export interface RsvpRecord {
  id: string;
  timestamp: string;
  fullName: string;
  attending: boolean;
  guestCount: number;
  companionNames?: string;
  message?: string;
  syncedToSheets?: boolean;
}

// Initialize Auth listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Não foi possível obter o token de acesso da conta Google.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Erro ao conectar com o Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Get stored spreadsheet ID or set it
export const getStoredSpreadsheetId = (): string | null => {
  return localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
};

export const setStoredSpreadsheetId = (id: string) => {
  localStorage.setItem(SPREADSHEET_ID_STORAGE_KEY, id);
};

export const SHEET_HEADERS = [
  'Data e Hora',
  'Nome Completo',
  'Presença',
  'Qtd Acompanhantes',
  'Nome do Acompanhante',
  'Total de Pessoas',
  'Recado para os Noivos',
  'Canal de Envio',
];

// Helper to ensure header row is formatted with the latest columns
export const ensureSheetHeaders = async (accessToken: string, spreadsheetId: string) => {
  try {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Confirmados!A1:H1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [SHEET_HEADERS],
        }),
      }
    );
  } catch (err) {
    console.warn('Falha ao atualizar cabeçalho da planilha:', err);
  }
};

// Find existing spreadsheet in user's Drive or create a new one
export const findOrCreateSpreadsheet = async (
  accessToken: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string; createdNew: boolean }> => {
  const existingId = getStoredSpreadsheetId();

  // If we already have an ID stored, verify it still exists
  if (existingId) {
    try {
      const verifyRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${existingId}?fields=spreadsheetId,spreadsheetUrl,properties.title`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (verifyRes.ok) {
        const data = await verifyRes.json();
        await ensureSheetHeaders(accessToken, data.spreadsheetId);
        return {
          spreadsheetId: data.spreadsheetId,
          spreadsheetUrl: data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
          createdNew: false,
        };
      }
    } catch {
      // Continue to search by name or create
    }
  }

  // Search Drive for file with same name
  try {
    const query = encodeURIComponent(
      `name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
    );
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        const found = searchData.files[0];
        setStoredSpreadsheetId(found.id);
        await ensureSheetHeaders(accessToken, found.id);
        return {
          spreadsheetId: found.id,
          spreadsheetUrl: found.webViewLink || `https://docs.google.com/spreadsheets/d/${found.id}/edit`,
          createdNew: false,
        };
      }
    }
  } catch (err) {
    console.warn('Busca de planilha no Drive falhou, tentando criar nova:', err);
  }

  // Create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: 'Confirmados',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Falha ao criar planilha no Google Sheets: ${errText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  setStoredSpreadsheetId(spreadsheetId);

  // Set header row with elegant column labels
  await ensureSheetHeaders(accessToken, spreadsheetId);

  return {
    spreadsheetId,
    spreadsheetUrl,
    createdNew: true,
  };
};

// Append an RSVP row to the Google Sheet
export const appendRsvpToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  rsvp: RsvpRecord
): Promise<boolean> => {
  const presenceText = rsvp.attending ? 'Confirmado' : 'Não comparecerá';
  const attendeesDesc =
    !rsvp.attending
      ? '0'
      : rsvp.guestCount === 0
      ? 'Somente o titular'
      : `Titular + ${rsvp.guestCount} acompanhante(s)`;
  const totalPeople = rsvp.attending ? 1 + (rsvp.guestCount || 0) : 0;

  const row = [
    rsvp.timestamp,
    rsvp.fullName,
    presenceText,
    attendeesDesc,
    rsvp.companionNames || '-',
    totalPeople.toString(),
    rsvp.message || '-',
    'Site do Casamento',
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Confirmados!A:H:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [row],
      }),
    }
  );

  return res.ok;
};

// Read rows from the sheet
export const fetchRsvpsFromSheet = async (
  accessToken: string,
  spreadsheetId: string
): Promise<string[][]> => {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Confirmados!A2:G`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.values || [];
};
