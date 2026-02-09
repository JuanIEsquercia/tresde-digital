import { NextRequest } from 'next/server';

export async function verifyAuth(request: NextRequest): Promise<boolean> {
    const authCookie = request.cookies.get('admin-auth');
    return !!authCookie && authCookie.value === 'true';
}
