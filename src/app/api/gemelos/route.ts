import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/gemelos.json');

// GET - Obtener todos los gemelos
export async function GET() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    // Agregar headers de cache para mejor performance
    const response = NextResponse.json(jsonData);
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer los datos' }, { status: 500 });
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

    // Leer datos actuales
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Crear nuevo gemelo
    const nuevoGemelo = {
      id: Date.now().toString(), // ID único basado en timestamp
      titulo,
      descripcion,
      iframe,
      fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      ubicacion: ubicacion || ''
    };

    // Agregar al array
    jsonData.gemelos.unshift(nuevoGemelo); // Agregar al inicio

    // Guardar archivo
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ success: true, gemelo: nuevoGemelo });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el gemelo' }, { status: 500 });
  }
}
