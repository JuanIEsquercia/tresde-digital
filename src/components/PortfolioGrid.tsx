'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GemeloCard from './GemeloCard';
import { useGemelos } from '@/hooks/useGemelos';

export default function PortfolioGrid() {
  const { gemelos, isLoading } = useGemelos();
  const router = useRouter();
  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
            Nuestros <span className="font-medium text-blue-600">Proyectos</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explora nuestra colección de recorridos virtuales 360. Cada proyecto representa 
            un espacio único capturado con la máxima calidad y detalle profesional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="text-gray-500">Cargando proyectos...</div>
            </div>
          ) : (
            gemelos.map((gemelo, index) => (
              <GemeloCard key={gemelo.id} gemelo={gemelo} index={index} />
            ))
          )}
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Necesitas un recorrido virtual 360 para tu proyecto?
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Trabajamos con propiedades residenciales, comerciales e industriales. 
              Cada recorrido virtual 360 se crea con tecnología de última generación 
              para garantizar la máxima calidad y precisión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/#contacto')}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Solicitar Cotización
              </button>
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}