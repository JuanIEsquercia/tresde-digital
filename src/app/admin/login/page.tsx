'use client';

import AdminLogin from '@/components/AdminLogin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        // Redirigir al dashboard después del login
        router.push('/admin');
        router.refresh(); // Actualizar rutas para que el middleware reconozca la cookie
    };

    return <AdminLogin onLogin={handleLogin} />;
}
