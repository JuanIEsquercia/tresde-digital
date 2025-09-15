'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <div className="space-y-2 text-sm text-gray-400">
              <p>+54 9 11 1234-5678</p>
              <p>contacto@tresde.com</p>
              <p>@tresde_digital</p>
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