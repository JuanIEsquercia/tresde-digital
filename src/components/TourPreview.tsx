'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Cargado sólo en el cliente — sin SSR — para evitar errores con iframe/fullscreen API
const Tour360Viewer = dynamic(() => import('./Tour360Viewer'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-2xl bg-gray-800 animate-pulse"
      style={{ aspectRatio: '16/9' }}
      aria-label="Cargando visor 360°"
    />
  ),
});

// ── Configuración ──────────────────────────────────────────────────────────────
// Reemplazá esta URL por la de tu tour real de Matterport (u otro visor 360°)
const TOUR_URL = 'https://my.matterport.com/show/?m=x2MQcmSuH7f';
// ──────────────────────────────────────────────────────────────────────────────

export default function TourPreview() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50" aria-labelledby="tour-preview-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6 mx-auto" />
          <h2
            id="tour-preview-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight"
          >
            Explorá un recorrido{' '}
            <span className="font-semibold text-blue-600">real</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Así experimentan tus clientes el espacio antes de visitarlo.
            Navegá libremente en 360° desde cualquier dispositivo.
          </p>
        </motion.div>

        {/* Visor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Tour360Viewer
            url={TOUR_URL}
            title="Tour Virtual 360° · TresDe Digital"
          />
        </motion.div>

        {/* Nota de contexto */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-5"
        >
          Tour de demostración. Cada recorrido es personalizado para tu espacio.
        </motion.p>
      </div>
    </section>
  );
}
