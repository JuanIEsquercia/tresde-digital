import {
    Building2,
    Factory,
    Store,
    Landmark,
    GraduationCap,
    HardHat,
    LucideIcon
} from 'lucide-react';

export interface CasoUso {
    id: string;
    titulo: string;
    descripcionCorta: string;
    descripcionLarga: string;
    Icono: LucideIcon;
    beneficios: string[];
    color: string;
}

export const casosUso: CasoUso[] = [
    {
        id: 'real-estate',
        titulo: 'Real Estate & Inmobiliarias',
        descripcionCorta: 'Acelera ventas y alquileres permitiendo visitas 24/7 desde cualquier lugar del mundo.',
        descripcionLarga: 'Transforma la experiencia de compra y alquiler. Los recorridos virtuales permiten a los potenciales clientes "caminar" por la propiedad sin moverse de su casa, filtrando visitas innecesarias y captando compradores realmente interesados.',
        Icono: Building2,
        color: 'blue',
        beneficios: [
            'Visitas remotas 24/7 sin coordinación de agenda.',
            'Filtrado de curiosos: Solo visitas presenciales de calidad.',
            'Diferenciación de marca en portales inmobiliarios.',
            'Mayor confianza y transparencia para el comprador.'
        ]
    },
    {
        id: 'industria',
        titulo: 'Industria & Plantas',
        descripcionCorta: 'Documentación técnica, capacitación de personal y visitas virtuales para inversores.',
        descripcionLarga: 'Digitaliza tus instalaciones para optimizar procesos. Ideal para inducción de seguridad (HSE), planificación de mantenimiento remoto y presentación de infraestructura a socios globales sin gastos de viaje.',
        Icono: Factory,
        color: 'orange',
        beneficios: [
            'Capacitación de personal en entornos de riesgo cero.',
            'Etiquetado de activos y maquinaria (Mattertags).',
            'Auditorías remotas y planificación de obras.',
            'Reducción drástica de costos de viaje.'
        ]
    },
    {
        id: 'retail',
        titulo: 'Retail & Comercios',
        descripcionCorta: 'Lleva tu tienda física al mundo digital y publica directamente en Google Street View.',
        descripcionLarga: 'No es solo una foto 360, es una experiencia de compra inmersiva. Conecta tu recorrido con Google Maps para mejorar tu SEO local y permite que los clientes descubran tu ambiente y productos antes de salir de casa.',
        Icono: Store,
        color: 'green',
        beneficios: [
            'Integración directa con Google Street View.',
            'Mayor visibilidad en búsquedas locales (SEO).',
            'Etiquetas interactivas con enlaces a e-commerce.',
            'Generación de confianza para nuevos visitantes.'
        ]
    },
    {
        id: 'cultura',
        titulo: 'Museos & Educación',
        descripcionCorta: 'Preservación del patrimonio y acceso universal a la cultura y el conocimiento.',
        descripcionLarga: 'Rompe las barreras físicas y económicas. Permite que escuelas y personas de todo el mundo visiten exposiciones, sitios históricos o campus educativos. Enriquece la visita con audio, video y texto explicativo en cada punto de interés.',
        Icono: Landmark,
        color: 'purple',
        beneficios: [
            'Acceso universal e inclusivo a la cultura.',
            'Preservación digital histórica de alta fidelidad.',
            'Experiencias educativas gamificadas.',
            'Atracción de turismo internacional.'
        ]
    },
    {
        id: 'construccion',
        titulo: 'Construcción & Arquitectura',
        descripcionCorta: 'Seguimiento de obra inmersivo y documentación de hitos constructivos.',
        descripcionLarga: 'Mantén a todos los stakeholders informados con un registro visual preciso del avance de obra. Revisa instalaciones antes de cerrar paredes y techos, creando un archivo "As-Built" indiscutible para futuros mantenimientos.',
        Icono: HardHat,
        color: 'yellow',
        beneficios: [
            'Registro histórico de avance de obra.',
            'Documentación de instalaciones ocultas.',
            'Resolución rápida de disputas.',
            'Colaboración remota entre arquitectos e ingenieros.'
        ]
    }
];
