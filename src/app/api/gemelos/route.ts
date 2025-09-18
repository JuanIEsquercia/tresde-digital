import { NextRequest, NextResponse } from 'next/server';
import { getGemelos, createGemelo } from '@/lib/sheets';

// GET - Obtener todos los gemelos
export async function GET() {
  try {
    const gemelos = await getGemelos();
    
    // Agregar headers de cache para mejor performance
    const response = NextResponse.json({ gemelos });
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    
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

    return NextResponse.json({ success: true, gemelo: nuevoGemelo });
  } catch (error) {
    console.error('Error al crear gemelo:', error);
    return NextResponse.json({ 
      error: 'Error al crear el gemelo en Google Sheets' 
    }, { status: 500 });
  }
}
