import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/firebase';
import GemeloClient from '@/components/GemeloClient';
import { GemeloDigital } from '@/data/gemelos';

// Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getGemelo(id: string): Promise<GemeloDigital | null> {
  try {
    const db = getDb();
    const doc = await db.collection('gemelos').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    } as GemeloDigital;
  } catch (error) {
    console.error('Error fetching gemelo:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const gemelo = await getGemelo(id);

  if (!gemelo) {
    return {
      title: 'Proyecto no encontrado - TresDe Digital',
      description: 'El recorrido virtual que buscas no está disponible.'
    };
  }

  const images = gemelo.thumbnailUrl
    ? [{ url: gemelo.thumbnailUrl, width: 1200, height: 630, alt: gemelo.titulo }]
    : [];

  return {
    title: `${gemelo.titulo} - Recorrido Virtual 360 | TresDe Digital`,
    description: gemelo.descripcion,
    openGraph: {
      title: `${gemelo.titulo} - Recorrido Virtual 360`,
      description: gemelo.descripcion,
      images: images,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${gemelo.titulo} - Recorrido Virtual 360`,
      description: gemelo.descripcion,
      images: images,
    }
  };
}

export default async function GemeloPage({ params }: PageProps) {
  const { id } = await params;
  const gemelo = await getGemelo(id);

  if (!gemelo) {
    notFound();
  }

  return <GemeloClient gemelo={gemelo} />;
}
