'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                TresDe Digital
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#inicio"
                className="text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Inicio
              </a>
              <Link
                href="/portfolio"
                className="text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Portfolio
              </Link>
              <a
                href="#contacto"
                className="text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Contacto
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-gray-200">
              <a
                href="#inicio"
                className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <Link
                href="/portfolio"
                className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <a
                href="#contacto"
                className="block px-3 py-2 text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}