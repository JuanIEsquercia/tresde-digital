import { z } from 'zod';

export const gemeloSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  iframe: z.string().min(10, 'El código del iframe es requerido').includes('<iframe', { message: 'Debe contener una etiqueta iframe' }),
  ubicacion: z.string().optional(),
});

export const marcaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  logoUrl: z.string().url('Debe ser una URL válida').min(1, 'La URL del logo es requerida'),
  url: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  orden: z.number().int().min(0).default(0),
});

export type GemeloInput = z.infer<typeof gemeloSchema>;
export type MarcaInput = z.infer<typeof marcaSchema>;
