import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/gemelos.json');

// PUT - Actualizar gemelo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { titulo, descripcion, iframe, ubicacion } = body;
    const { id } = params;

    // Validaciones básicas
    if (!titulo || !descripcion || !iframe) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Leer datos actuales
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Encontrar y actualizar el gemelo
    const gemeloIndex = jsonData.gemelos.findIndex((gemelo: any) => gemelo.id === id);
    
    if (gemeloIndex === -1) {
      return NextResponse.json({ error: 'Gemelo no encontrado' }, { status: 404 });
    }

    // Actualizar datos
    jsonData.gemelos[gemeloIndex] = {
      ...jsonData.gemelos[gemeloIndex],
      titulo,
      descripcion,
      iframe,
      ubicacion: ubicacion || ''
    };

    // Guardar archivo
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ success: true, gemelo: jsonData.gemelos[gemeloIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar el gemelo' }, { status: 500 });
  }
}

// DELETE - Eliminar gemelo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Leer datos actuales
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Encontrar y eliminar el gemelo
    const gemeloIndex = jsonData.gemelos.findIndex((gemelo: any) => gemelo.id === id);
    
    if (gemeloIndex === -1) {
      return NextResponse.json({ error: 'Gemelo no encontrado' }, { status: 404 });
    }

    // Eliminar del array
    jsonData.gemelos.splice(gemeloIndex, 1);

    // Guardar archivo
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar el gemelo' }, { status: 500 });
  }
}
