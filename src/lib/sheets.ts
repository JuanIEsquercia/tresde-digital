import { google } from 'googleapis';
import type { sheets_v4 } from 'googleapis';

// Configuración de Google Sheets
const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Verificar que todas las variables estén configuradas
if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error('❌ Variables de entorno de Google Sheets no configuradas correctamente');
  console.error('Configura las siguientes variables en tu archivo .env.local:');
  console.error('- GOOGLE_SHEETS_ID');
  console.error('- GOOGLE_SERVICE_ACCOUNT_EMAIL');
  console.error('- GOOGLE_PRIVATE_KEY');
}

// Configurar autenticación
let auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;
let sheets: sheets_v4.Sheets | null = null;

if (SHEET_ID && GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY) {
  try {
    auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    sheets = google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error al inicializar Google Sheets client:', error);
  }
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

    // Obtener todas las filas de la hoja (hasta 1000 filas para asegurar que capture todos los recorridos)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Hoja 1!A1:F1000',
      valueRenderOption: 'UNFORMATTED_VALUE', // Obtener valores sin formato para mejor rendimiento
      dateTimeRenderOption: 'FORMATTED_STRING',
    });

    const rows = response.data.values || [];
    
    console.log(`📊 Total de filas obtenidas de Google Sheets: ${rows.length}`);
    
    // Procesar todas las filas (saltar header)
    const gemelos: GemeloDigital[] = [];
    
    for (let i = 1; i < rows.length; i++) { // Saltar header (fila 0)
      const row = rows[i];
      
      // Verificar que la fila existe y tiene al menos un elemento (ID)
      if (row && Array.isArray(row) && row.length > 0 && row[0]) {
        const id = String(row[0]).trim();
        
        // Solo procesar si tiene ID válido (no vacío)
        if (id) {
          gemelos.push({
            id: id,
            titulo: String(row[1] || '').trim(),
            descripcion: String(row[2] || '').trim(),
            iframe: String(row[3] || '').trim(),
            fecha: String(row[4] || '').trim(),
            ubicacion: String(row[5] || '').trim(),
          });
        } else {
          console.log(`⚠️ Fila ${i + 1} omitida: ID vacío`);
        }
      } else {
        console.log(`⚠️ Fila ${i + 1} omitida: fila vacía o sin datos`);
      }
    }
    
    console.log(`✅ Total de recorridos procesados: ${gemelos.length}`);
    console.log(`📋 IDs de recorridos:`, gemelos.map(g => g.id));
    console.log(`📋 Títulos de recorridos:`, gemelos.map(g => g.titulo));
    
    return gemelos;
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
      range: 'Hoja 1!A:F',
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
      range: `Hoja 1!A${rowNumber}:F${rowNumber}`,
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
    
    // Obtener el sheetId de la hoja "Hoja 1"
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    
    const hoja1Sheet = spreadsheet.data.sheets?.find(s => s.properties?.title === 'Hoja 1');
    const sheetId = hoja1Sheet?.properties?.sheetId || 0;
    
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: sheetId,
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

// ========== FUNCIONES PARA MARCAS ==========

export interface Marca {
  id: string;
  nombre: string;
  logoUrl: string;
  url?: string;
  orden: number;
  fecha: string;
}

// Obtener todas las marcas (desde la hoja "Marcas")
export async function getMarcas(): Promise<Marca[]> {
  try {
    if (!sheets || !SHEET_ID) {
      console.warn('Google Sheets no configurado correctamente para marcas');
      return [];
    }

    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Marcas!A:F',
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
      });

      const rows = response.data.values || [];
      const marcas: Marca[] = [];
      
      for (let i = 1; i < rows.length; i++) { // Saltar header
        const row = rows[i];
        if (row && row[0]) { // Solo procesar filas con ID
          marcas.push({
            id: row[0] || '',
            nombre: row[1] || '',
            logoUrl: row[2] || '',
            url: row[3] || '',
            orden: Number(row[4]) || 0,
            fecha: row[5] || new Date().toISOString().split('T')[0],
          });
        }
      }
      
      // Ordenar por el campo orden
      return marcas.sort((a, b) => a.orden - b.orden);
    } catch (error: any) {
      // Si la hoja no existe o hay un error de rango, retornar array vacío
      if (error?.code === 400 || error?.message?.includes('Unable to parse range')) {
        console.log('Hoja "Marcas" aún no existe, retornando array vacío');
        return [];
      }
      throw error; // Re-lanzar otros errores
    }
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    // Si la hoja no existe, retornar array vacío
    return [];
  }
}

// Crear nueva marca
export async function createMarca(data: Omit<Marca, 'id' | 'fecha'>): Promise<Marca> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    // Verificar si la hoja "Marcas" existe, si no, crearla
    let hojaExiste = false;
    try {
      await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Marcas!A1',
      });
      hojaExiste = true;
    } catch (error: any) {
      // Si el error es 400 (bad request) o indica que la hoja no existe, crearla
      if (error?.code === 400 || error?.message?.includes('Unable to parse range')) {
        hojaExiste = false;
      } else {
        // Si es otro error, verificamos si realmente existe buscando en todas las hojas
        try {
          const spreadsheet = await sheets.spreadsheets.get({
            spreadsheetId: SHEET_ID,
          });
          const marcasSheet = spreadsheet.data.sheets?.find(s => s.properties?.title === 'Marcas');
          hojaExiste = !!marcasSheet;
        } catch {
          hojaExiste = false;
        }
      }
    }

    if (!hojaExiste) {
      // Crear la hoja si no existe
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SHEET_ID,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: 'Marcas',
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 6,
                  },
                },
              },
            }],
          },
        });
        
        // Esperar un momento para que la hoja se cree
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Agregar headers
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: 'Marcas!A1:F1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [['ID', 'Nombre', 'Logo URL', 'URL', 'Orden', 'Fecha']],
          },
        });
      } catch (createError: any) {
        // Si la hoja ya existe (error al crear), continuar
        if (!createError?.message?.includes('already exists')) {
          console.error('Error al crear hoja Marcas:', createError);
          throw createError;
        }
      }
    }

    const id = Date.now().toString();
    const fecha = new Date().toISOString().split('T')[0];
    
    const nuevaMarca: Marca = {
      id,
      fecha,
      ...data,
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Marcas!A:F',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          nuevaMarca.id,
          nuevaMarca.nombre,
          nuevaMarca.logoUrl,
          nuevaMarca.url || '',
          nuevaMarca.orden,
          nuevaMarca.fecha,
        ]],
      },
    });

    return nuevaMarca;
  } catch (error: any) {
    console.error('Error al crear marca:', error);
    const errorMessage = error?.message || 'Error desconocido';
    throw new Error(`Error al crear marca en Google Sheets: ${errorMessage}`);
  }
}

// Actualizar marca existente
export async function updateMarca(id: string, data: Partial<Marca>): Promise<Marca> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    // Obtener todas las filas de la hoja para encontrar la posición correcta
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Marcas!A:F',
      valueRenderOption: 'UNFORMATTED_VALUE',
    });

    const rows = response.data.values || [];
    let rowNumber = -1;
    
    // Buscar la fila que contiene el ID (empezando desde la fila 2, después del header)
    for (let i = 1; i < rows.length; i++) {
      if (rows[i] && rows[i][0] === id) {
        rowNumber = i + 1; // +1 porque las filas en Google Sheets empiezan en 1
        break;
      }
    }
    
    if (rowNumber === -1) {
      throw new Error('Marca no encontrada');
    }

    // Obtener la marca actual para actualizarla
    const marcas = await getMarcas();
    const marcaActual = marcas.find(m => m.id === id);
    
    if (!marcaActual) {
      throw new Error('Marca no encontrada');
    }

    const updatedMarca = { ...marcaActual, ...data };
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `Marcas!A${rowNumber}:F${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          updatedMarca.id,
          updatedMarca.nombre,
          updatedMarca.logoUrl,
          updatedMarca.url || '',
          updatedMarca.orden,
          updatedMarca.fecha,
        ]],
      },
    });

    return updatedMarca;
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    throw new Error('Error al actualizar marca en Google Sheets');
  }
}

// Eliminar marca
export async function deleteMarca(id: string): Promise<void> {
  try {
    if (!sheets || !SHEET_ID) {
      throw new Error('Google Sheets no configurado correctamente');
    }

    // Obtener todas las filas de la hoja para encontrar la posición correcta
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Marcas!A:F',
      valueRenderOption: 'UNFORMATTED_VALUE',
    });

    const rows = response.data.values || [];
    let rowNumber = -1;
    
    // Buscar la fila que contiene el ID (empezando desde la fila 2, después del header)
    for (let i = 1; i < rows.length; i++) {
      if (rows[i] && rows[i][0] === id) {
        rowNumber = i + 1; // +1 porque las filas en Google Sheets empiezan en 1
        break;
      }
    }
    
    if (rowNumber === -1) {
      throw new Error('Marca no encontrada');
    }
    
    // Obtener el sheetId de la hoja "Marcas"
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });
    
    const marcasSheet = spreadsheet.data.sheets?.find(s => s.properties?.title === 'Marcas');
    const sheetId = marcasSheet?.properties?.sheetId || 0;
    
    // Eliminar la fila (rowNumber - 1 porque startIndex es 0-based)
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: sheetId,
              dimension: 'ROWS',
              startIndex: rowNumber - 1,
              endIndex: rowNumber,
            },
          },
        }],
      },
    });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    throw new Error('Error al eliminar marca de Google Sheets');
  }
}