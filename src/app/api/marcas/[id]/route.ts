import { NextRequest, NextResponse } from 'next/server';
import { updateMarca, deleteMarca } from '@/lib/sheets';

// PUT - Actualizar marca
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { nombre, logoUrl, url, orden } = body;
    const { id } = await params;

    // Validaciones básicas
    if (!nombre || !logoUrl) {
      return NextResponse.json({ error: 'Faltan campos requeridos (nombre y logoUrl)' }, { status: 400 });
    }

    // Actualizar en Google Sheets
    const marcaActualizada = await updateMarca(id, {
      nombre,
      logoUrl,
      url: url || '',
      orden: orden || 0,
    });

    return NextResponse.json({ success: true, marca: marcaActualizada });
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    return NextResponse.json({ 
      error: 'Error al actualizar la marca en Google Sheets' 
    }, { status: 500 });
  }
}

// DELETE - Eliminar marca
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Eliminar de Google Sheets
    await deleteMarca(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    return NextResponse.json({ 
      error: 'Error al eliminar la marca de Google Sheets' 
    }, { status: 500 });
  }
}
