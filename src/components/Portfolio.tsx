'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GemeloCard from './GemeloCard';
import { useGemelos } from '@/hooks/useGemelos';
import { INDUSTRIAS, type IndustriaVertical } from '@/data/gemelos';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

type Filtro = IndustriaVertical | 'todas';

const FILTROS: { value: Filtro; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  ...INDUSTRIAS,
];

export default function Portfolio() {
  const { gemelos, isLoading } = useGemelos();
  const [filtroActivo, setFiltroActivo] = useState<Filtro>('todas');

  const gemelosFiltrados = filtroActivo === 'todas'
    ? gemelos
    : gemelos.filter((g) => g.industria === filtroActivo);

  return (
    <section id="portfolio" className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-[0.2em] text-sm uppercase mb-4 block"
          >
            Explora nuestro trabajo
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Proyectos <span className="text-blue-600">Destacados</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            Soluciones innovadoras de realidad virtual que transforman la manera en que experimentas el mundo físico.
          </p>
        </motion.div>

        {/* Chips de filtro */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {FILTROS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFiltroActivo(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  filtroActivo === f.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-[2rem]"></div>
            ))
          ) : gemelosFiltrados.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">
              No hay proyectos en esta categoría aún.
            </div>
          ) : (
            gemelosFiltrados.slice(0, 12).map((gemelo, index) => (
              <GemeloCard key={gemelo.id} gemelo={gemelo} index={index} />
            ))
          )}
        </motion.div>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 relative group"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative glass-morphism rounded-[3rem] p-12 sm:p-20 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

            <h3 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
              ¿Listo para dar el salto digital?
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Únete a las empresas líderes que ya están utilizando gemelos digitales para revolucionar su industria.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#contacto"
                className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-2xl hover:-translate-y-1"
              >
                Empezar proyecto
              </a>
              <a
                href="/portfolio"
                className="px-10 py-4 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:-translate-y-1"
              >
                Ver más ejemplos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}