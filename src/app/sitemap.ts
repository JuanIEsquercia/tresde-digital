import { MetadataRoute } from 'next';
import { getDb } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tresde.site';

    // Páginas estáticas
    const routes = [
        '',
        '/portfolio',
        '/admin',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Páginas dinámicas de proyectos (Gemelos)
    let gemelosRoutes: MetadataRoute.Sitemap = [];

    try {
        const db = getDb();
        const snapshot = await db.collection('gemelos').get();

        gemelosRoutes = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                url: `${baseUrl}/gemelo/${doc.id}`,
                lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(data.fecha),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            };
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }

    return [...routes, ...gemelosRoutes];
}
