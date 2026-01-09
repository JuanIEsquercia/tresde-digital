# Configuración de Cloudinary para Logos de Marca

Este proyecto usa Cloudinary **únicamente para almacenar los logos de las marcas** que aparecen en el carrusel.

## Pasos para configurar Cloudinary

1. **Crear una cuenta en Cloudinary** (si no tienes una):
   - Ve a https://cloudinary.com/users/register/free
   - Crea una cuenta gratuita (incluye 25GB de almacenamiento y 25GB de ancho de banda)

2. **Obtener las credenciales**:
   - Una vez registrado, ve a tu Dashboard: https://cloudinary.com/console
   - En la sección "Account Details" encontrarás:
     - **Cloud Name**: Tu nombre de nube
     - **API Key**: Tu clave de API
     - **API Secret**: Tu secreto de API (mantén esto privado)

3. **Configurar las variables de entorno**:
   - Crea un archivo `.env.local` en la raíz del proyecto (junto a `package.json`)
   - Agrega las siguientes variables:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

4. **Instalar las dependencias**:
   ```bash
   npm install
   ```

5. **Reiniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## ¿Cómo funciona?

- **Con Cloudinary configurado**: Los logos se suben automáticamente a Cloudinary en la carpeta `tresde-portfolio/marcas/`
  - ✅ **No necesitas crear la carpeta manualmente**: Cloudinary la crea automáticamente cuando subas la primera imagen
  - ✅ **Aislado de otros proyectos**: Todas las imágenes de este proyecto se guardan en `tresde-portfolio/marcas/`, no se mezclarán con otros proyectos
- **Sin Cloudinary configurado**: Los logos se guardan localmente en `public/marcas/` (solo para desarrollo)

## Notas importantes

- ⚠️ **Nunca subas el archivo `.env.local` a Git** (ya está en `.gitignore`)
- ✅ Los logos se optimizan automáticamente al subirlos
- ✅ Se detectan duplicados para evitar subir la misma imagen dos veces
- ✅ El sistema funciona tanto con Cloudinary como sin él (modo desarrollo local)

## Solución de problemas

Si tienes problemas al subir logos:

1. Verifica que las variables de entorno estén correctamente configuradas
2. Asegúrate de que `cloudinary` esté instalado: `npm list cloudinary`
3. Revisa la consola del servidor para ver errores específicos
4. Verifica que tu cuenta de Cloudinary esté activa
