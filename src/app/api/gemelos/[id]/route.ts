import { NextRequest, NextResponse } from 'next/server';
import { updateGemelo, deleteGemelo } from '@/lib/sheets';

// PUT - Actualizar gemelo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { titulo, descripcion, iframe, ubicacion } = body;
    const { id } = await params;

    // Validaciones básicas
    if (!titulo || !descripcion || !iframe) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Actualizar en Google Sheets
    const gemeloActualizado = await updateGemelo(id, {
      titulo,
      descripcion,
      iframe,
      ubicacion: ubicacion || ''
    });

    return NextResponse.json({ success: true, gemelo: gemeloActualizado });
  } catch (error) {
    console.error('Error al actualizar gemelo:', error);
    return NextResponse.json({ 
      error: 'Error al actualizar el gemelo en Google Sheets' 
    }, { status: 500 });
  }
}

// DELETE - Eliminar gemelo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Eliminar de Google Sheets
    await deleteGemelo(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar gemelo:', error);
    return NextResponse.json({ 
      error: 'Error al eliminar el gemelo de Google Sheets' 
    }, { status: 500 });
  }
}
