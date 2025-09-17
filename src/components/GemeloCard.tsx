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
      <div className="relative aspect-video bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
              <ExternalLink className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
            </div>
            <p className="text-sm text-gray-700 font-medium">Gemelo Digital</p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/85 to-blue-800/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <a
            href={`/gemelo/${gemelo.id}`}
            className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-md text-blue-600 rounded-xl font-medium hover:bg-white hover:shadow-lg transition-all duration-300 border border-white/20"
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