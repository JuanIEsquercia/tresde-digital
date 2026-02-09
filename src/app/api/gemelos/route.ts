import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/auth';
import { gemeloSchema } from '@/lib/schemas';

// GET - Obtener todos los gemelos
export async function GET(request: NextRequest) {
  try {
    const gemelosRef = db.collection('gemelos');
    const snapshot = await gemelosRef.orderBy('fecha', 'desc').get();

    const gemelos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ gemelos });
  } catch (error) {
    console.error('Error al obtener gemelos de Firebase:', error);
    return NextResponse.json({ error: 'Error al leer los datos' }, { status: 500 });
  }
}

// POST - Crear nuevo gemelo
export async function POST(request: NextRequest) {
  try {
    // 1. Verificar autenticación
    if (!(await verifyAuth(request))) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();

    // 2. Validar datos con Zod
    const validation = gemeloSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({
        error: 'Datos inválidos',
        details: validation.error.format()
      }, { status: 400 });
    }

    const { titulo, descripcion, iframe, ubicacion } = validation.data;

    const fecha = new Date().toISOString().split('T')[0];

    // Crear en Firestore
    const newDocRef = await db.collection('gemelos').add({
      titulo,
      descripcion,
      iframe,
      ubicacion: ubicacion || '',
      fecha,
      createdAt: new Date().toISOString()
    });

    const newGemelo = {
      id: newDocRef.id,
      titulo,
      descripcion,
      iframe,
      ubicacion: ubicacion || '',
      fecha
    };

    return NextResponse.json({ success: true, gemelo: newGemelo });
  } catch (error) {
    console.error('Error al crear gemelo en Firebase:', error);
    return NextResponse.json({
      error: 'Error al crear el gemelo'
    }, { status: 500 });
  }
}
