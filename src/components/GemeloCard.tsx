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
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300 w-full"
    >
      {/* Image Preview */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ExternalLink className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-700 font-medium">Gemelo Digital</p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={`/gemelo/${gemelo.id}`}
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Explorar
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {gemelo.titulo}
          </h3>
          
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {gemelo.descripcion}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            {gemelo.ubicacion && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {gemelo.ubicacion}
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(gemelo.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long'
              })}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}