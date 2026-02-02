'use client';

import { motion } from 'framer-motion';
import GemeloCard from './GemeloCard';
import { useGemelos } from '@/hooks/useGemelos';

export default function Portfolio() {
  const { gemelos, isLoading } = useGemelos();
  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Línea decorativa */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6 mx-auto"></div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            <span className="font-extralight">Nuestros</span> <span className="font-semibold text-blue-600 tracking-wide">Proyectos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Cada recorrido virtual 360 es una experiencia única que captura la esencia 
            y los detalles de cada espacio con precisión profesional.
          </p>
          <a
            href="/portfolio"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Ver Todos los Proyectos
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="text-gray-500">Cargando proyectos...</div>
            </div>
          ) : (
            gemelos.slice(0, 12).map((gemelo, index) => (
              <GemeloCard key={gemelo.id} gemelo={gemelo} index={index} />
            ))
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-xl p-8 max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿Interesado en nuestros servicios?
            </h3>
            <p className="text-gray-700 mb-6">
              Contáctanos para crear el recorrido virtual 360 perfecto para tu proyecto.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Contactar Ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}