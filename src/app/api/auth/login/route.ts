import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    // Verificar que la variable de entorno esté configurada
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ 
        error: 'Configuración del servidor incompleta. Contacta al administrador.' 
      }, { status: 500 });
    }

    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      // Crear cookie de sesión
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 horas
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Error en la autenticación' }, { status: 500 });
  }
}

