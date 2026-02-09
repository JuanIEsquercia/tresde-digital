'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MatterportViewer from '@/components/MatterportViewer';
import { GemeloDigital } from '@/data/gemelos';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';

interface GemeloClientProps {
    gemelo: GemeloDigital;
}

export default function GemeloClient({ gemelo }: GemeloClientProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-16">
                {/* Header del gemelo */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Volver
                            </button>
                        </div>

                        <div className="max-w-4xl">
                            <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
                                {gemelo.titulo}
                            </h1>

                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {gemelo.descripcion}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                {gemelo.ubicacion && (
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {gemelo.ubicacion}
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(gemelo.fecha).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Iframe de Matterport */}
                <div className="bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MatterportViewer iframe={gemelo.iframe} title={gemelo.titulo} />
                    </div>
                </div>

                {/* Información adicional */}
                <div className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                Sobre este proyecto
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Este recorrido virtual 360 fue creado utilizando tecnología de última generación,
                                permitiendo una exploración inmersiva y detallada del espacio. Puedes navegar libremente
                                por el entorno, acercarte a los detalles y experimentar el espacio como si estuvieras
                                físicamente presente.
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h4 className="font-semibold text-blue-900 mb-2">
                                    ¿Necesitas un recorrido virtual 360 para tu proyecto?
                                </h4>
                                <p className="text-blue-800 text-sm mb-4">
                                    Contáctanos para crear el recorrido virtual 360 perfecto para tu propiedad.
                                </p>
                                <button
                                    onClick={() => router.push('/#contacto')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Solicitar Cotización
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
