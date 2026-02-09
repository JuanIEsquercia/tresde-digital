export interface GemeloDigital {
  id: string;
  titulo: string;
  descripcion: string;
  iframe: string;
  fecha: string;
  ubicacion?: string;
  thumbnailUrl?: string;
}

export const gemelosDigitales: GemeloDigital[] = [
  {
    id: "1",
    titulo: "Casa Moderna - Villa Carlos Paz",
    descripcion: "Recorrido virtual 360 de una casa moderna con diseño contemporáneo, ubicada en Villa Carlos Paz. Incluye todos los espacios interiores y exteriores.",
    iframe: "https://my.matterport.com/show/?m=example1",
    fecha: "2024-01-15",
    ubicacion: "Villa Carlos Paz, Córdoba"
  },
  {
    id: "2",
    titulo: "Oficina Corporativa - Buenos Aires",
    descripcion: "Espacio de trabajo moderno con diseño open space, salas de reuniones y áreas comunes. Perfecto para empresas que buscan un ambiente profesional.",
    iframe: "https://my.matterport.com/show/?m=example2",
    fecha: "2024-01-10",
    ubicacion: "Buenos Aires, Argentina"
  },
  {
    id: "3",
    titulo: "Showroom Automotriz",
    descripcion: "Espacio de exhibición para vehículos con diseño minimalista y funcional. Incluye área de recepción y salas de atención al cliente.",
    iframe: "https://my.matterport.com/show/?m=example3",
    fecha: "2024-01-05",
    ubicacion: "Rosario, Santa Fe"
  }
];

export const datosContacto = {
  telefono: "+54 9 3794 267780",
  email: "jiesquercia@gmail.com",
  instagram: "@tresde_digital",
  linkedin: "linkedin.com/in/tresde"
};
