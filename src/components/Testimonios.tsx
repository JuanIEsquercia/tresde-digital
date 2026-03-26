'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonios, type Testimonio } from '@/data/testimonios';

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// Paleta de fondos para avatares con iniciales (determinista por índice)
const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-sky-600',
];

// ── Sub-componentes ───────────────────────────────────────────────────────────

function TestimonioCard({
  testimonio,
  index,
}: {
  testimonio: Testimonio;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
    >
      {/* Quote icon */}
      <Quote
        className="w-8 h-8 text-blue-200 mb-5 flex-shrink-0"
        aria-hidden="true"
        strokeWidth={1.5}
      />

      {/* Cita */}
      <blockquote className="flex-1 text-gray-700 text-[0.95rem] leading-relaxed italic mb-6">
        &ldquo;{testimonio.cita}&rdquo;
      </blockquote>

      {/* Métrica opcional */}
      {testimonio.metrica && (
        <div className="mb-6 py-3 px-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
          <span className="block text-2xl font-bold text-blue-600 leading-none">
            {testimonio.metrica.valor}
          </span>
          <span className="text-xs text-blue-500 font-medium mt-0.5 block">
            {testimonio.metrica.descripcion}
          </span>
        </div>
      )}

      {/* Separador */}
      <div className="border-t border-gray-100 pt-5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {testimonio.avatar ? (
            <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-100">
              <Image
                src={testimonio.avatar}
                alt={`Foto de ${testimonio.nombre}`}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
          ) : (
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold ring-2 ring-blue-100 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
              aria-hidden="true"
            >
              {initials(testimonio.nombre)}
            </div>
          )}

          {/* Nombre, cargo, empresa */}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {testimonio.nombre}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {testimonio.cargo} · {testimonio.empresa}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function Testimonios() {
  if (testimonios.length === 0) return null;

  return (
    <section
      className="py-20 sm:py-24 bg-white"
      aria-labelledby="testimonios-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-6 mx-auto" />
          <h2
            id="testimonios-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight"
          >
            Lo que dicen{' '}
            <span className="font-semibold text-blue-600">nuestros clientes</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Resultados reales de empresas y emprendedores que confiaron en TresDe Digital.
          </p>
        </motion.div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <TestimonioCard key={t.id} testimonio={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
