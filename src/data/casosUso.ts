import {
    Building2,
    Factory,
    Store,
    Landmark,
    HardHat,
    Home,
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
        titulo: 'Inmobiliarias & Venta',
        descripcionCorta: 'Acelera las ventas y evita visitas innecesarias mostrando la propiedad como si estuvieran ahí.',
        descripcionLarga: 'Transforma la experiencia de compra. No es lo mismo ver fotos que "caminar" la casa desde el celular. Filtra a los curiosos y quedate solo con los clientes que realmente están interesados, ahorrando tiempo y nafta en visitas que no cierran.',
        Icono: Building2,
        color: 'blue',
        beneficios: [
            'Visitas disponibles las 24 horas, sin coordinar llaves.',
            'Menos curiosos, más clientes reales.',
            'Tu inmobiliaria se destaca del resto en los portales.',
            'Genera confianza total mostrando cada rincón.'
        ]
    },
    {
        id: 'airbnb',
        titulo: 'Airbnb & Temporarios',
        descripcionCorta: 'Destacate en plataformas y dale seguridad a tus huéspedes de que lo que ven es real.',
        descripcionLarga: 'En el mundo del alquiler temporal, la confianza lo es todo. Un recorrido 360 elimina las dudas de "¿será como en las fotos?" y te ayuda a justificar el precio. Ideal para resaltar amenities, la distribución de las camas y el equipamiento real del departamento.',
        Icono: Home,
        color: 'rose',
        beneficios: [
            'Más reservas al generar mayor confianza.',
            'Menos preguntas repetitivas sobre distribución.',
            'Expectativas claras = Mejores reseñas (5 estrellas).',
            'Material de lujo para tu Instagram y redes.'
        ]
    },
    {
        id: 'industria',
        titulo: 'Industria & Fábricas',
        descripcionCorta: 'Capacitación, seguridad y recorridos para socios sin moverte de la oficina.',
        descripcionLarga: 'Digitaliza tu planta para mostrarla al mundo o para uso interno. Es una herramienta clave para inducciones de seguridad (saber dónde están los matafuegos o salidas antes de pisar la fábrica) y para mostrar tu infraestructura a inversores sin pagar viáticos.',
        Icono: Factory,
        color: 'orange',
        beneficios: [
            'Capacitación de personal en entorno seguro (HSE).',
            'Etiquetas interactivas en máquinas e instalaciones.',
            'Auditorías remotas sin traslados.',
            'Ahorro enorme en viajes y logística.'
        ]
    },
    {
        id: 'retail',
        titulo: 'Locales & Comercios',
        descripcionCorta: 'Abrí las puertas de tu negocio en Google Maps y atraé visitas desde el buscador.',
        descripcionLarga: 'No es solo una foto, es invitar a la gente a entrar. Al conectar el recorrido con Google Street View, mejorás tu posicionamiento en el mapa. Ideal para restaurantes, showrooms y locales de diseño que quieren mostrar "la experiencia" de estar ahí.',
        Icono: Store,
        color: 'green',
        beneficios: [
            'Aparecé destacado en Google Maps.',
            'El cliente conoce el lugar antes de ir.',
            'Podés etiquetar productos con link a compra (e-commerce).',
            'Imagen moderna y profesional de tu marca.'
        ]
    },
    {
        id: 'cultura',
        titulo: 'Museos & Educación',
        descripcionCorta: 'Llevá el patrimonio y el conocimiento a cualquier escuela o casa del país.',
        descripcionLarga: 'Democratizá el acceso a la cultura. Permití que escuelas rurales o personas que no pueden viajar recorran el museo o el sitio histórico. Podés agregar audios, videos y textos explicativos en cada obra para que la visita sea 100% educativa.',
        Icono: Landmark,
        color: 'purple',
        beneficios: [
            'Acceso inclusivo para todos.',
            'Preservación digital del patrimonio (archivo histórico).',
            'Experiencias interactivas para alumnos.',
            'Atrae turismo mostrando un adelanto de la visita.'
        ]
    },
    {
        id: 'construccion',
        titulo: 'Construcción & Avance',
        descripcionCorta: 'Olvidate de romper paredes buscando un caño. Documentá todo antes de tapar.',
        descripcionLarga: 'La mejor forma de mostrarle al dueño cómo avanza la obra sin que tenga que ir todos los días. Además, generás un archivo visual de dónde pasan los caños y cables antes de cerrar las paredes. El día de mañana, si hay una pérdida, sabés exactamente dónde picar.',
        Icono: HardHat,
        color: 'slate',
        beneficios: [
            'Registro visual de la obra para evitar dudas.',
            'Sabés exactamente dónde pasan los caños.',
            'Evitá romper de más en futuros arreglos.',
            'Ideal para arquitectos que quieren reportar fácil.'
        ]
    }
];
