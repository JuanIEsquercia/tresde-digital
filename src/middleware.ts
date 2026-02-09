import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Proteger rutas de administración
    if (path.startsWith('/admin')) {
        // Permitir acceso a la página de login
        if (path === '/admin/login') {
            // Si ya está logueado, redirigir al panel
            const authCookie = request.cookies.get('admin-auth');
            if (authCookie && authCookie.value === 'true') {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
            return NextResponse.next();
        }

        // Verificar cookie de autenticación para el resto de /admin
        const authCookie = request.cookies.get('admin-auth');
        if (!authCookie || authCookie.value !== 'true') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
