'use client';

import { motion } from 'framer-motion';
import { Check, MessageCircle, Zap, Shield, Sparkles } from 'lucide-react';

const plans = [
    {
        name: "Plan Simple",
        description: "La base perfecta para digitalizar tu espacio con calidad profesional.",
        features: [
            "Relevamiento profesional",
            "Recorrido virtual 360°",
            "Hospedaje de tour incluido"
        ],
        highlight: false,
        icon: <Zap className="w-6 h-6" />,
        color: "from-blue-500 to-blue-600"
    },
    {
        name: "Plan Intermedio",
        description: "Máxima visibilidad. Todo lo necesario para dominar las búsquedas.",
        features: [
            "Todo lo del Plan Simple",
            "Video 360°",
            "Carga y optimización en Google Maps",
            "Etiquetas informativas"
        ],
        highlight: true,
        icon: <Sparkles className="w-6 h-6" />,
        color: "from-blue-600 to-blue-700"
    },
    {
        name: "Personalizado",
        description: "Soluciones a medida para grandes proyectos o flotas de propiedades.",
        features: [
            "Paquetes por cantidad",
            "Precios escalables",
            "Soporte prioritario",
            "Consultoría estratégica"
        ],
        highlight: false,
        icon: <Shield className="w-6 h-6" />,
        color: "from-gray-800 to-gray-900"
    }
];

export default function Planes() {
    return (
        <section id="planes" className="py-32 relative overflow-hidden bg-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-blue-600 font-bold tracking-[0.2em] text-sm uppercase mb-4">
                            Nuestros Packs
                        </h2>
                        <h3 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-none mb-8">
                            Inversión Inteligente <br />
                            <span className="text-gradient">Para Tu Espacio</span>
                        </h3>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                            Elegí el nivel de impacto que buscás para tu propiedad o negocio.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div
                                className={`h-full flex flex-col p-10 rounded-[2.5rem] transition-all duration-500 group ${plan.highlight
                                    ? 'glass-morphism shadow-[0_40px_100px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/20'
                                    : 'glass-card hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-gray-100 hover:border-blue-200'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                                        RECOMENDADO
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                        {plan.icon}
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{plan.name}</h4>
                                    <p className="text-gray-500 font-light leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="space-y-4 mb-12 flex-grow">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-start">
                                            <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-blue-600" />
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href={`https://wa.me/543794267780?text=Hola! Me interesa el ${plan.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform group-hover:-translate-y-1 ${plan.highlight
                                        ? 'bg-blue-600 text-white shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:bg-blue-500'
                                        : 'bg-gray-900 text-white hover:bg-gray-800 shadow-xl'
                                        }`}
                                >
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Contactar
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
