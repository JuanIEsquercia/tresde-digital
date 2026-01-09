import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Función para calcular hash del archivo (para detectar duplicados)
async function calculateFileHash(buffer: Buffer): Promise<string> {
  return crypto.createHash('md5').update(buffer).digest('hex');
}

// Función para verificar si un archivo con el mismo hash ya existe
async function findExistingFile(uploadDir: string, fileHash: string): Promise<string | null> {
  try {
    if (!existsSync(uploadDir)) {
      return null;
    }
    
    const files = await readdir(uploadDir);
    
    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      const fileBuffer = await readFile(filePath);
      const existingHash = await calculateFileHash(fileBuffer);
      
      if (existingHash === fileHash) {
        return file; // Archivo duplicado encontrado
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo' }, { status: 400 });
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Tipo de archivo no permitido. Solo se permiten: JPEG, PNG, WebP, SVG' 
      }, { status: 400 });
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'El archivo es demasiado grande. Tamaño máximo: 5MB' 
      }, { status: 400 });
    }

    // Convertir File a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Calcular hash del archivo para detectar duplicados
    const fileHash = await calculateFileHash(buffer);

    // Verificar si usar Cloudinary o almacenamiento local
    const useCloudinary = !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );

    if (useCloudinary) {
      // Usar Cloudinary para producción
      const { v2: cloudinary } = await import('cloudinary');
      
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Folder específico para este proyecto (no se mezcla con otros proyectos)
      const cloudinaryFolder = 'tresde-portfolio/marcas';

      // Verificar si la imagen ya existe en Cloudinary (usando el hash como public_id)
      try {
        const existingImage = await cloudinary.api.resource(`${cloudinaryFolder}/${fileHash}`);
        if (existingImage) {
          // Imagen duplicada encontrada, retornar URL existente
          return NextResponse.json({ 
            success: true, 
            url: existingImage.secure_url,
            fileName: existingImage.public_id,
            isDuplicate: true
          });
        }
      } catch (error: any) {
        // Si el error es 404 (no encontrado), continuar con la subida
        // Si es otro error, lo ignoramos y continuamos
        if (error?.http_code !== 404) {
          console.warn('Error al buscar imagen existente en Cloudinary:', error.message);
        }
      }

      // Subir a Cloudinary (solo para logos de marca de este proyecto)
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: cloudinaryFolder,
            public_id: fileHash,
            overwrite: false,
            resource_type: 'auto',
            // Optimizaciones para logos
            transformation: [
              { quality: 'auto:good' },
              { fetch_format: 'auto' }
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        uploadStream.end(buffer);
      }) as any;

      return NextResponse.json({ 
        success: true, 
        url: uploadResult.secure_url,
        fileName: uploadResult.public_id
      });
    } else {
      // Usar almacenamiento local para desarrollo
      const uploadDir = path.join(process.cwd(), 'public', 'marcas');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Verificar si el archivo ya existe (duplicado)
      const existingFile = await findExistingFile(uploadDir, fileHash);
      if (existingFile) {
        // Archivo duplicado encontrado, retornar URL existente
        return NextResponse.json({ 
          success: true, 
          url: `/marcas/${existingFile}`,
          fileName: existingFile,
          isDuplicate: true
        });
      }

      // Generar nombre único para el archivo
      const timestamp = Date.now();
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}-${fileHash.substring(0, 8)}-${originalName}`;
      const filePath = path.join(uploadDir, fileName);

      // Guardar archivo
      await writeFile(filePath, buffer);

      // Retornar la URL pública de la imagen
      const publicUrl = `/marcas/${fileName}`;

      return NextResponse.json({ 
        success: true, 
        url: publicUrl,
        fileName 
      });
    }
  } catch (error) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json({ 
      error: 'Error al subir el archivo' 
    }, { status: 500 });
  }
}
