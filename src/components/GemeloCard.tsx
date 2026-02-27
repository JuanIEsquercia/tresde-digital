'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GemeloDigital } from '@/data/gemelos';

interface GemeloCardProps {
  gemelo: GemeloDigital;
  index: number;
}

export default function GemeloCard({ gemelo, index }: GemeloCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full block"
    >
      <Link href={`/gemelo/${gemelo.id}`} className="block h-full">
        <div className="glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)] h-full flex flex-col">
          {/* Image Preview */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {gemelo.thumbnailUrl ? (
              <Image
                src={gemelo.thumbnailUrl}
                alt={gemelo.titulo}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <ExternalLink className="w-10 h-10 text-blue-500/30" />
              </div>
            )}

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase">
                RECORRIDO 360°
              </div>
            </div>

            {/* Hover Overlay - Sólo visual, sin click interceptor */}
            <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[4px] pointer-events-none">
              <div className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-bold flex items-center shadow-2xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
                Explorar ahora
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                {gemelo.titulo}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                {gemelo.descripcion}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100/50">
              <div className="flex items-center text-xs text-gray-400">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                {gemelo.ubicacion || 'Corrientes, AR'}
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                {new Date(gemelo.fecha).getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}