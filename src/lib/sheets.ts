import { google, sheets_v4 } from 'googleapis';

// Configuración de Google Sheets
const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Verificar que todas las variables estén configuradas
if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error('Variables de entorno de Google Sheets no configuradas correctamente');
}

// Configurar autenticación
let auth: google.auth.GoogleAuth | null = null;
let sheets: sheets_v4.Sheets | null = null;

try {
  auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  
  sheets = google.sheets({ version: 'v4', auth });
} catch (error) {
  console.error('Error al inicializar Google Sheets client:', error);
}

export interface GemeloDigital {
  id: string;
  titulo: string;
  descripcion: string;
  iframe: string;
  fecha: string;
  ubicacion?: string;
}

// Obtener todos los gemelos
export async function getGemelos(): Promise<GemeloDigital[]> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'A:F',
    });

    const rows = response.data.values || [];
    
    // Saltar la primera fila (headers) y convertir a objetos
    return rows.slice(1).map((row: string[]) => ({
      id: row[0] || '',
      titulo: row[1] || '',
      descripcion: row[2] || '',
      iframe: row[3] || '',
      fecha: row[4] || '',
      ubicacion: row[5] || '',
    })).filter(gemelo => gemelo.id);
  } catch (error) {
    console.error('Error al obtener gemelos:', error);
    throw new Error('Error al obtener datos de Google Sheets');
  }
}

// Crear nuevo gemelo
export async function createGemelo(data: Omit<GemeloDigital, 'id' | 'fecha'>): Promise<GemeloDigital> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    const id = Date.now().toString();
    const fecha = new Date().toISOString().split('T')[0];
    
    const newGemelo: GemeloDigital = {
      id,
      fecha,
      ...data,
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          newGemelo.id,
          newGemelo.titulo,
          newGemelo.descripcion,
          newGemelo.iframe,
          newGemelo.fecha,
          newGemelo.ubicacion || '',
        ]],
      },
    });

    return newGemelo;
  } catch (error) {
    console.error('Error al crear gemelo:', error);
    throw new Error('Error al crear gemelo en Google Sheets');
  }
}

// Actualizar gemelo existente
export async function updateGemelo(id: string, data: Partial<GemeloDigital>): Promise<GemeloDigital> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    const gemelos = await getGemelos();
    const gemeloIndex = gemelos.findIndex(g => g.id === id);
    
    if (gemeloIndex === -1) {
      throw new Error('Gemelo no encontrado');
    }

    const updatedGemelo = { ...gemelos[gemeloIndex], ...data };
    const rowNumber = gemeloIndex + 2;
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `A${rowNumber}:F${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          updatedGemelo.id,
          updatedGemelo.titulo,
          updatedGemelo.descripcion,
          updatedGemelo.iframe,
          updatedGemelo.fecha,
          updatedGemelo.ubicacion || '',
        ]],
      },
    });

    return updatedGemelo;
  } catch (error) {
    console.error('Error al actualizar gemelo:', error);
    throw new Error('Error al actualizar gemelo en Google Sheets');
  }
}

// Eliminar gemelo
export async function deleteGemelo(id: string): Promise<void> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    const gemelos = await getGemelos();
    const gemeloIndex = gemelos.findIndex(g => g.id === id);
    
    if (gemeloIndex === -1) {
      throw new Error('Gemelo no encontrado');
    }

    const rowNumber = gemeloIndex + 2;
    
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: 0,
              dimension: 'ROWS',
              startIndex: rowNumber - 1,
              endIndex: rowNumber,
            },
          },
        }],
      },
    });
  } catch (error) {
    console.error('Error al eliminar gemelo:', error);
    throw new Error('Error al eliminar gemelo de Google Sheets');
  }
}