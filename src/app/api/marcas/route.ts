import { NextRequest, NextResponse } from 'next/server';
import { getMarcas, createMarca, Marca } from '@/lib/sheets';

// Cache en memoria del servidor
let serverCache: Marca[] | null = null;
let serverCacheTime = 0;
const SERVER_CACHE_DURATION = 300000; // 5 minutos (Google Sheets es estable)

// GET - Obtener todas las marcas (desde la hoja "Marcas" en Google Sheets)
export async function GET() {
  try {
    const now = Date.now();
    
    // Usar cache del servidor si está disponible
    if (serverCache && (now - serverCacheTime) < SERVER_CACHE_DURATION) {
      const response = NextResponse.json({ marcas: serverCache });
      response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      response.headers.set('X-Cache', 'HIT');
      return response;
    }
    
    // Obtener datos frescos de Google Sheets (hoja "Marcas")
    const marcas = await getMarcas();
    
    // Actualizar cache del servidor
    serverCache = marcas;
    serverCacheTime = now;
    
    // Agregar headers de cache optimizados
    const response = NextResponse.json({ marcas });
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    response.headers.set('X-Cache', 'MISS');
    
    return response;
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    return NextResponse.json({ error: 'Error al leer los datos de Google Sheets' }, { status: 500 });
  }
}

// POST - Crear nueva marca (en la hoja "Marcas" separada de los gemelos)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, logoUrl, url, orden } = body;

    // Validaciones básicas
    if (!nombre || !logoUrl) {
      return NextResponse.json({ error: 'Faltan campos requeridos (nombre y logoUrl)' }, { status: 400 });
    }

    // Crear marca en Google Sheets (hoja "Marcas" - separada de gemelos)
    const nuevaMarca = await createMarca({
      nombre,
      logoUrl,
      url: url || '',
      orden: orden || 0,
    });

    // Limpiar cache del servidor para forzar recarga
    serverCache = null;
    serverCacheTime = 0;

    return NextResponse.json({ success: true, marca: nuevaMarca });
  } catch (error) {
    console.error('Error al crear marca:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ 
      error: `Error al crear la marca en Google Sheets: ${errorMessage}` 
    }, { status: 500 });
  }
}
