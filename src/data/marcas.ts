export interface Marca {
  id: string;
  nombre: string;
  logoUrl: string;
  url?: string;
  orden: number;
  fecha: string;
}

export const marcas: Marca[] = [
  // Las marcas se cargarán desde Google Sheets
];
