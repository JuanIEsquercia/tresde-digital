'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Linkedin, MapPin, MessageCircle } from 'lucide-react';
import { datosContacto } from '@/data/gemelos';

export default function Contacto() {
  const contactItems = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: datosContacto.telefono,
      href: `https://wa.me/543794267780`
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: datosContacto.telefono,
      href: `tel:${datosContacto.telefono}`
    },
    {
      icon: Mail,
      label: 'Email',
      value: datosContacto.email,
      href: `mailto:${datosContacto.email}`
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: datosContacto.instagram,
      href: `https://instagram.com/${datosContacto.instagram.replace('@', '')}`
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Perfil Profesional',
      href: `https://${datosContacto.linkedin}`
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            <span className="font-medium text-blue-600">Contacto</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ¿Listo para crear tu gemelo digital? Estamos aquí para ayudarte 
            a transformar tu espacio en una experiencia digital inmersiva.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <p className="text-gray-700">
                Contáctanos a través de cualquiera de estos medios. 
                Responderemos a tu consulta lo antes posible.
              </p>
            </div>

            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-lg p-8"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ubicación
              </h3>
              <p className="text-gray-700">
                José Ramón Vidal 1768<br />
                Corrientes, Argentina
              </p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-gray-700">
                Trabajamos con clientes en toda Argentina, creando gemelos digitales 
                de alta calidad para diversos tipos de propiedades y espacios.
              </p>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Horarios de atención:
                </p>
                <p className="text-sm text-gray-900">
                  Lunes a Viernes: 9:00 - 18:00
                </p>
                <p className="text-sm text-gray-900">
                  Sábados: 10:00 - 14:00
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}