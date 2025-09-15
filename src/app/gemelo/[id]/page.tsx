'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatterportViewer from '@/components/MatterportViewer';
import { GemeloDigital } from '@/data/gemelos';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

export default function GemeloPage() {
  const params = useParams();
  const router = useRouter();
  const [gemelo, setGemelo] = useState<GemeloDigital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      loadGemelo(params.id as string);
    }
  }, [params.id]);

  const loadGemelo = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gemelos', {
        cache: 'force-cache', // Usar cache para mejor performance
        headers: {
          'Cache-Control': 'max-age=60' // Cache por 1 minuto
        }
      });
      const data = await response.json();
      const gemeloEncontrado = data.gemelos.find((g: GemeloDigital) => g.id === id);
      
      if (gemeloEncontrado) {
        setGemelo(gemeloEncontrado);
      } else {
        setError('Gemelo digital no encontrado');
      }
    } catch {
      setError('Error al cargar el gemelo digital');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="text-gray-500">Cargando gemelo digital...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !gemelo) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="text-red-600 mb-4">{error || 'Gemelo digital no encontrado'}</div>
              <button
                onClick={() => router.push('/portfolio')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Portfolio
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Header del gemelo */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver
              </button>
            </div>
            
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                {gemelo.titulo}
              </h1>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {gemelo.descripcion}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                {gemelo.ubicacion && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {gemelo.ubicacion}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(gemelo.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Iframe de Matterport */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MatterportViewer iframe={gemelo.iframe} title={gemelo.titulo} />
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Sobre este proyecto
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Este gemelo digital fue creado utilizando tecnología Matterport de última generación, 
                permitiendo una exploración inmersiva y detallada del espacio. Puedes navegar libremente 
                por el entorno, acercarte a los detalles y experimentar el espacio como si estuvieras 
                físicamente presente.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">
                  ¿Necesitas un gemelo digital para tu proyecto?
                </h4>
                <p className="text-blue-800 text-sm mb-4">
                  Contáctanos para crear el gemelo digital perfecto para tu propiedad.
                </p>
                <button
                  onClick={() => router.push('/#contacto')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Solicitar Cotización
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
