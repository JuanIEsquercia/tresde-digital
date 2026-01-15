'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Gradiente de transición suave al final */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 opacity-60"></div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Línea decorativa superior */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-8 mx-auto"></div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight">
            <span className="block font-extralight">Recorridos Virtuales 360</span>
            <span className="block text-blue-400 font-semibold tracking-wide mt-2">de Alta Calidad</span>
          </h1>
          
          {/* Línea decorativa inferior */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent mt-8 mx-auto"></div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Transformamos espacios reales en experiencias digitales inmersivas. 
            Nuestros recorridos virtuales 360 permiten explorar propiedades de manera virtual 
            con la máxima calidad y detalle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/portfolio"
              className="group inline-flex items-center px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 hover:text-gray-900 transition-all duration-300 font-medium shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
            >
              <span className="mr-2">Ver Portfolio</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://wa.me/543794267780"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-3 border-2 border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-white transition-all duration-300 font-medium hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 cursor-pointer group"
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm mb-3 font-light tracking-wide">Explorar</span>
          <div className="relative">
            <ArrowDown size={20} className="group-hover:scale-110 transition-transform duration-200" />
            <div className="absolute -top-1 -left-1 w-6 h-6 border border-blue-400/30 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}