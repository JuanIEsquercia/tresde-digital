'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { datosContacto } from '@/data/gemelos';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      {/* Línea decorativa sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">TresDe Digital</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Especialistas en la creación de gemelos digitales de alta calidad 
              para propiedades residenciales, comerciales e industriales.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-medium">Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Gemelos Digitales Residenciales</li>
              <li>Espacios Comerciales</li>
              <li>Propiedades Industriales</li>
              <li>Consultoría en Digitalización</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-medium">Contacto</h4>
            <div className="space-y-3 text-sm">
              {/* WhatsApp */}
              <a
                href="https://wa.me/543794267780"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {datosContacto.telefono}
              </a>
              
              {/* Teléfono */}
              <a
                href={`tel:${datosContacto.telefono}`}
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                {datosContacto.telefono}
              </a>
              
              {/* Email */}
              <a
                href={`mailto:${datosContacto.email}`}
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 mr-2" />
                {datosContacto.email}
              </a>
              
              {/* Instagram */}
              <a
                href={`https://instagram.com/${datosContacto.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 mr-2" />
                {datosContacto.instagram}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-sm text-gray-400">
            © 2024 TresDe Digital. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}