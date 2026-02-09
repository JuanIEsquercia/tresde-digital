'use client';

import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { GemeloDigital } from '@/data/gemelos';

interface GemeloCardProps {
  gemelo: GemeloDigital;
  index: number;
}

export default function GemeloCard({ gemelo, index }: GemeloCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-blue-200 hover:-translate-y-2 w-full backdrop-blur-sm"
    >
      {/* Image Preview */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden group">
        {gemelo.thumbnailUrl ? (
          <img
            src={gemelo.thumbnailUrl}
            alt={gemelo.titulo}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10"></div>
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-white/40 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center mb-3 mx-auto shadow-sm">
                <ExternalLink className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Vista 360°</p>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <a
            href={`/gemelo/${gemelo.id}`}
            className="inline-flex items-center px-6 py-2.5 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Explorar
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 tracking-tight leading-tight">
            {gemelo.titulo}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-light">
            {gemelo.descripcion}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
            {gemelo.ubicacion && (
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                <MapPin className="w-3 h-3 mr-1.5 text-blue-500" />
                <span className="font-medium">{gemelo.ubicacion}</span>
              </div>
            )}
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
              <Calendar className="w-3 h-3 mr-1.5 text-blue-500" />
              <span className="font-medium">
                {new Date(gemelo.fecha).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long'
                })}
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}