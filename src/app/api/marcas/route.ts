import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';
import { marcaSchema } from '@/lib/schemas';

// GET - Obtener todas las marcas
export async function GET() {
  try {
    const marcasRef = db.collection('marcas');
    const snapshot = await marcasRef.orderBy('orden', 'asc').get();

    const marcas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ marcas });
  } catch (error) {
    console.error('Error al obtener marcas de Firebase:', error);
    return NextResponse.json({ error: 'Error al leer los datos' }, { status: 500 });
  }
}

// POST - Crear nueva marca
export async function POST(request: NextRequest) {
  try {
    // 1. Verificar autenticación
    if (!(await verifyAuth(request))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();

    // 2. Validar datos con Zod
    const validation = marcaSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        error: 'Datos inválidos',
        details: validation.error.format()
      }, { status: 400 });
    }

    const { nombre, logoUrl, url, orden } = validation.data;

    const fecha = new Date().toISOString().split('T')[0];

    // Crear en Firestore
    const newDocRef = await db.collection('marcas').add({
      nombre,
      logoUrl,
      url: url || '',
      orden: orden || 0,
      fecha,
      createdAt: new Date().toISOString()
    });

    const nuevaMarca = {
      id: newDocRef.id,
      nombre,
      logoUrl,
      url: url || '',
      orden: orden || 0,
      fecha
    };

    return NextResponse.json({ success: true, marca: nuevaMarca });
  } catch (error) {
    console.error('Error al crear marca en Firebase:', error);
    return NextResponse.json({
      error: 'Error al crear la marca'
    }, { status: 500 });
  }
}
