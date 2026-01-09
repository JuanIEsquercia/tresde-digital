'use client';

import { useEffect, useState } from 'react';
import { Marca } from '@/data/marcas';
import Image from 'next/image';

export default function MarcasCarousel() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch('/api/marcas');
        const data = await response.json();
        setMarcas(data.marcas || []);
      } catch (error) {
        console.error('Error al cargar marcas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarcas();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">Cargando marcas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Marcas que confían en nosotros
          </h2>
          <p className="text-gray-600">Trabajamos con las mejores empresas</p>
        </div>

        {marcas.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Próximamente agregaremos las marcas con las que trabajamos</p>
          </div>
        ) : (
          /* Carrusel */
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-8 md:gap-12">
              {/* Primera pasada */}
              {marcas.map((marca) => (
                <MarcaItem key={marca.id} marca={marca} />
              ))}
              {/* Segunda pasada para efecto infinito */}
              {marcas.map((marca) => (
                <MarcaItem key={`${marca.id}-duplicate`} marca={marca} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function MarcaItem({ marca }: { marca: Marca }) {
  const content = (
    <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg shadow-sm p-4 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-105">
      {marca.logoUrl ? (
        <Image
          src={marca.logoUrl}
          alt={marca.nombre}
          width={120}
          height={120}
          className="max-w-full max-h-full object-contain"
          unoptimized
        />
      ) : (
        <span className="text-gray-400 text-sm text-center">{marca.nombre}</span>
      )}
    </div>
  );

  if (marca.url) {
    return (
      <a
        href={marca.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
