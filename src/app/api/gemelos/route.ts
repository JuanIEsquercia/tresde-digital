import { NextRequest, NextResponse } from 'next/server';
import { getGemelos, createGemelo, GemeloDigital } from '@/lib/sheets';

// Cache en memoria del servidor
let serverCache: GemeloDigital[] | null = null;
let serverCacheTime = 0;
const SERVER_CACHE_DURATION = 300000; // 5 minutos

// GET - Obtener todos los gemelos
export async function GET() {
  try {
    const now = Date.now();
    
    // Usar cache del servidor si está disponible
    if (serverCache && (now - serverCacheTime) < SERVER_CACHE_DURATION) {
      const response = NextResponse.json({ gemelos: serverCache });
      response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      response.headers.set('X-Cache', 'HIT');
      return response;
    }
    
    // Obtener datos frescos de Google Sheets
    const gemelos = await getGemelos();
    
    // Actualizar cache del servidor
    serverCache = gemelos;
    serverCacheTime = now;
    
    // Agregar headers de cache optimizados
    const response = NextResponse.json({ gemelos });
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    response.headers.set('X-Cache', 'MISS');
    
    return response;
  } catch (error) {
    console.error('Error al obtener gemelos:', error);
    return NextResponse.json({ error: 'Error al leer los datos de Google Sheets' }, { status: 500 });
  }
}

// POST - Crear nuevo gemelo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, descripcion, iframe, ubicacion } = body;

    // Validaciones básicas
    if (!titulo || !descripcion || !iframe) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Crear gemelo en Google Sheets
    const nuevoGemelo = await createGemelo({
      titulo,
      descripcion,
      iframe,
      ubicacion: ubicacion || ''
    });

    // Limpiar cache del servidor para forzar recarga
    serverCache = null;
    serverCacheTime = 0;

    return NextResponse.json({ success: true, gemelo: nuevoGemelo });
  } catch (error) {
    console.error('Error al crear gemelo:', error);
    return NextResponse.json({ 
      error: 'Error al crear el gemelo en Google Sheets' 
    }, { status: 500 });
  }
}
