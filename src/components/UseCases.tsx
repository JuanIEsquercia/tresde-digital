'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { casosUso, CasoUso } from '@/data/casosUso';

export default function UseCases() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const getColorClass = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300';
            case 'orange': return 'bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-300';
            case 'green': return 'bg-green-50 text-green-600 border-green-200 hover:border-green-300';
            case 'purple': return 'bg-purple-50 text-purple-600 border-purple-200 hover:border-purple-300';
            case 'yellow': return 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:border-yellow-300';
            default: return 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300';
        }
    };

    const getIconBg = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-100 text-blue-600';
            case 'orange': return 'bg-orange-100 text-orange-600';
            case 'green': return 'bg-green-100 text-green-600';
            case 'purple': return 'bg-purple-100 text-purple-600';
            case 'yellow': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-light text-gray-900 mb-4"
                    >
                        Soluciones por <span className="font-semibold text-blue-600">Industria</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600"
                    >
                        Descubre cómo la tecnología 360 transforma la manera de vender, capacitar y documentar en tu sector específico.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {casosUso.map((caso, index) => (
                        <motion.div
                            key={caso.id}
                            layoutId={`card-${caso.id}`}
                            onClick={() => setSelectedId(caso.id)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${getColorClass(caso.color)} bg-white`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${getIconBg(caso.color)} group-hover:scale-110 transition-transform duration-300`}>
                                    <caso.Icono className="w-8 h-8" />
                                </div>
                                <div className="p-2 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{caso.titulo}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {caso.descripcionCorta}
                            </p>

                            <div className="text-sm font-medium underline decoration-transparent group-hover:decoration-current underline-offset-4 transition-all">
                                Ver detalles
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
                            />

                            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
                                {casosUso.filter(c => c.id === selectedId).map(caso => (
                                    <motion.div
                                        layoutId={`card-${caso.id}`}
                                        key={caso.id}
                                        className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative"
                                    >
                                        {/* Header with gradient based on color */}
                                        <div className={`p-8 pb-12 relative overflow-hidden ${getIconBg(caso.color).replace('text-', 'bg-opacity-10 text-')}`}>
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-current opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                                            >
                                                <X className="w-5 h-5 text-gray-600" />
                                            </button>

                                            <div className="relative z-10 flex items-center gap-4 mb-4">
                                                <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                                                    <caso.Icono className={`w-8 h-8 ${caso.color === 'blue' ? 'text-blue-600' : caso.color === 'orange' ? 'text-orange-600' : caso.color === 'green' ? 'text-green-600' : caso.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'}`} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900">{caso.titulo}</h3>
                                            </div>

                                            <p className="text-lg text-gray-700 font-medium leading-relaxed max-w-xl">
                                                {caso.descripcionLarga}
                                            </p>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 -mt-6 bg-white rounded-t-3xl relative">
                                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                                                Beneficios Clave
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                                {caso.beneficios.map((beneficio, i) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                                        key={i}
                                                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                                                    >
                                                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${caso.color === 'blue' ? 'text-blue-500' : caso.color === 'orange' ? 'text-orange-500' : caso.color === 'green' ? 'text-green-500' : 'text-gray-500'}`} />
                                                        <span className="text-gray-700 text-sm font-medium">{beneficio}</span>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                                <button
                                                    onClick={() => setSelectedId(null)}
                                                    className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                                                >
                                                    Cerrar
                                                </button>
                                                <a
                                                    href="https://wa.me/543794267780"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                                                >
                                                    <span>Solicitar Demo</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
