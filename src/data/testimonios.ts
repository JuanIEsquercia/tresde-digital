export interface Testimonio {
  id: string;
  nombre: string;
  cargo: string;
  empresa: string;
  cita: string;
  /** Ruta relativa a /public, ej: "/testimonios/juan.jpg". Si es null se muestran iniciales. */
  avatar: string | null;
  /** Métrica de resultado opcional */
  metrica?: {
    valor: string;
    descripcion: string;
  };
}

export const testimonios: Testimonio[] = [
  {
    id: '1',
    nombre: 'Martina Roldán',
    cargo: 'Directora',
    empresa: 'Roldán Propiedades',
    cita: 'Desde que implementamos los recorridos virtuales de TresDe, las consultas por nuestras propiedades aumentaron notablemente. Los clientes llegan a las visitas mucho más decididos.',
    avatar: null,
    metrica: {
      valor: '+40%',
      descripcion: 'más consultas calificadas',
    },
  },
  {
    id: '2',
    nombre: 'Gabriel Insaurralde',
    cargo: 'Gerente General',
    empresa: 'Hotel Río Grande',
    cita: 'El tour virtual de nuestras habitaciones y salones de eventos es una herramienta de ventas increíble. Los clientes corporativos confirman eventos sin necesidad de visita previa.',
    avatar: null,
    metrica: {
      valor: '3x',
      descripcion: 'más reservas de salones',
    },
  },
  {
    id: '3',
    nombre: 'Lucía Benítez',
    cargo: 'Propietaria',
    empresa: 'La Casa de Lucía (Airbnb)',
    cita: 'Mi propiedad pasó a destacarse entre cientos de publicaciones. El recorrido virtual genera confianza desde el primer momento y redujo a cero las cancelaciones por "diferencia con las fotos".',
    avatar: null,
    metrica: {
      valor: '100%',
      descripcion: 'de ocupación en temporada alta',
    },
  },
];
