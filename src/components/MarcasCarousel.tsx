'use client';

import { useEffect, useState } from 'react';
import { Marca } from '@/data/marcas';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';

export default function MarcasCarousel() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch('/api/marcas');
        const data = await response.json();
        const marcasRaw = data.marcas || [];

        // Filtrar duplicados
        const marcasUnicas = marcasRaw.filter((marca: Marca, index: number, self: Marca[]) =>
          index === self.findIndex((m: Marca) => m.id === marca.id)
        );

        // Duplicar marcas para efecto de loop infinito suave
        // Si hay pocas marcas, las duplicamos mas veces para llenar la pantalla
        let marcasDisplay = [...marcasUnicas];
        while (marcasDisplay.length < 10 && marcasDisplay.length > 0) {
          marcasDisplay = [...marcasDisplay, ...marcasUnicas];
        }
        // Y una vez más el set completo para el loop
        setMarcas([...marcasDisplay, ...marcasDisplay]);

      } catch (error) {
        console.error('Error al cargar marcas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarcas();
  }, []);

  useEffect(() => {
    if (!isLoading && marcas.length > 0) {
      startAnimation();
    }
  }, [isLoading, marcas]);

  const startAnimation = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: Math.max(20, marcas.length * 2),
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

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
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Estas marcas confían en nosotros
          </h2>
        </div>

        {marcas.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Próximamente agregaremos las marcas con las que trabajamos</p>
          </div>
        ) : (
          <div className="relative w-full mask-gradient">
            {/* 
                Desktop: Auto-scroll
                Mobile: Draggable + Auto-scroll
             */}
            <div className="flex overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div
                className="flex gap-8 md:gap-12"
                animate={controls}
                initial={{ x: 0 }}
                drag="x"
                dragConstraints={{ left: -1000, right: 0 }} // Simple constraints, infinite loop handles the visual 
                onDragStart={() => controls.stop()}
                onDragEnd={() => startAnimation()}
                whileHover={{ scale: 0.98 }}
              >
                {marcas.map((marca, index) => (
                  <MarcaItem key={`marca-${index}`} marca={marca} />
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}

function MarcaItem({ marca }: { marca: Marca }) {
  const content = (
    <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-blue-100">
      {marca.logoUrl ? (
        <Image
          src={marca.logoUrl}
          alt={marca.nombre}
          width={120}
          height={120}
          className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
          unoptimized
        />
      ) : (
        <span className="text-gray-400 text-sm text-center font-medium">{marca.nombre}</span>
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
        draggable="false" // Prevent native drag
      >
        {content}
      </a>
    );
  }

  return content;
}
