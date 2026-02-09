import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';
import { gemeloSchema } from '@/lib/schemas';

// PUT - Actualizar gemelo
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación
    if (!(await verifyAuth(request))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = await params;

    // 2. Validar datos (parciales)
    const validation = gemeloSchema.partial().safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        error: 'Datos inválidos',
        details: validation.error.format()
      }, { status: 400 });
    }

    const { titulo, descripcion, iframe, ubicacion } = validation.data;

    // Actualizar en Firestore
    await db.collection('gemelos').doc(id).update({
      titulo,
      descripcion,
      iframe,
      ubicacion: ubicacion || '',
      updatedAt: new Date().toISOString()
    });

    const gemeloActualizado = {
      id,
      titulo,
      descripcion,
      iframe,
      ubicacion
    };

    return NextResponse.json({ success: true, gemelo: gemeloActualizado });
  } catch (error) {
    console.error('Error al actualizar gemelo en Firebase:', error);
    return NextResponse.json({
      error: 'Error al actualizar el gemelo'
    }, { status: 500 });
  }
}

// DELETE - Eliminar gemelo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación
    if (!(await verifyAuth(request))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;

    // Eliminar de Firestore
    await db.collection('gemelos').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar gemelo en Firebase:', error);
    return NextResponse.json({
      error: 'Error al eliminar el gemelo'
    }, { status: 500 });
  }
}
