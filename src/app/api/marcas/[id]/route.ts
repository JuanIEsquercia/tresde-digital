import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';
import { marcaSchema } from '@/lib/schemas';

// PUT - Actualizar marca
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
    const validation = marcaSchema.partial().safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        error: 'Datos inválidos',
        details: validation.error.format()
      }, { status: 400 });
    }

    const { nombre, logoUrl, url, orden } = validation.data;

    // Actualizar en Firestore
    const db = getDb();
    await db.collection('marcas').doc(id).update({
      nombre,
      logoUrl,
      url: url || '',
      orden: orden || 0,
      updatedAt: new Date().toISOString()
    });

    const marcaActualizada = {
      id,
      nombre,
      logoUrl,
      url,
      orden
    };

    return NextResponse.json({ success: true, marca: marcaActualizada });
  } catch (error) {
    console.error('Error al actualizar marca en Firebase:', error);
    return NextResponse.json({
      error: 'Error al actualizar la marca'
    }, { status: 500 });
  }
}

// DELETE - Eliminar marca
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
    const db = getDb();
    await db.collection('marcas').doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar marca en Firebase:', error);
    return NextResponse.json({
      error: 'Error al eliminar la marca'
    }, { status: 500 });
  }
}
