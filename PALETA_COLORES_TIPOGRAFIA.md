# Paleta de Colores y Tipografía - TresDe Digital

## 🎨 Paleta de Colores

### Colores Principales

#### Azul (Color Principal / Accent)
- **Azul 400** (`blue-400`): `#60A5FA`
  - Uso: Títulos destacados, acentos, gradientes
  - Ejemplo: "de Alta Calidad" en Hero, líneas decorativas

- **Azul 500** (`blue-500`): `#3B82F6`
  - Uso: Elementos interactivos, hover states, líneas decorativas
  - Ejemplo: Gradientes, efectos hover

- **Azul 600** (`blue-600`): `#2563EB`
  - Uso: Botones principales, enlaces hover, títulos destacados
  - Ejemplo: Botones CTA, "Contacto", "Proyectos"

- **Azul 700** (`blue-700`): `#1D4ED8`
  - Uso: Estados hover de botones azules
  - Ejemplo: Hover de botones principales

- **Azul 100** (`blue-100`): `#DBEAFE`
  - Uso: Fondos de iconos, elementos destacados
  - Ejemplo: Iconos de contacto, badges

### Grises (Neutros)

#### Gris Oscuro (Fondos)
- **Gris 900** (`gray-900`): `#111827`
  - Uso: Fondos oscuros, texto en fondos claros
  - Ejemplo: Hero background, Footer background

- **Gris 800** (`gray-800`): `#1F2937`
  - Uso: Fondos oscuros intermedios
  - Ejemplo: Gradientes en Hero y Footer

#### Gris Medio
- **Gris 700** (`gray-700`): `#374151`
  - Uso: Texto secundario en fondos claros
  - Ejemplo: Descripciones, información adicional

- **Gris 600** (`gray-600`): `#4B5563`
  - Uso: Texto secundario
  - Ejemplo: Subtítulos, información de contacto

- **Gris 500** (`gray-500`): `#6B7280`
  - Uso: Texto terciario, placeholders
  - Ejemplo: Textos de carga, estados inactivos

- **Gris 400** (`gray-400`): `#9CA3AF`
  - Uso: Texto deshabilitado, iconos secundarios
  - Ejemplo: Texto en Footer, elementos inactivos

#### Gris Claro (Fondos)
- **Gris 200** (`gray-200`): `#E5E7EB`
  - Uso: Bordes, separadores
  - Ejemplo: Bordes de cards, separadores de sección

- **Gris 100** (`gray-100`): `#F3F4F6`
  - Uso: Fondos sutiles
  - Ejemplo: Hover states, fondos de inputs

- **Gris 50** (`gray-50`): `#F9FAFB`
  - Uso: Fondos de secciones, cards
  - Ejemplo: Background de Portfolio, MarcasCarousel

### Blanco y Negro
- **Blanco** (`white`): `#FFFFFF`
  - Uso: Fondos principales, texto en fondos oscuros
  - Ejemplo: Header, cards, texto en Hero

- **Negro** (implícito en gray-900): `#000000` / `#111827`
  - Uso: Texto principal, elementos destacados

### Colores de Scrollbar
- **Scrollbar Track**: `#F5F5F5` (gris muy claro)
- **Scrollbar Thumb**: `#737373` (gris medio)
- **Scrollbar Thumb Hover**: `#171717` (casi negro)

## 📝 Tipografía

### Fuente Principal
**Inter** (Google Fonts)
- **URL**: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`
- **Fallback**: `system-ui, sans-serif`
- **Pesos disponibles**: 300, 400, 500, 600, 700

### Jerarquía Tipográfica

#### Títulos Principales (Hero)
- **Tamaño**: `text-4xl sm:text-5xl lg:text-7xl` (2.25rem - 4.5rem)
- **Peso**: `font-light` (300) / `font-semibold` (600)
- **Color**: `text-white` / `text-blue-400`
- **Tracking**: `tracking-tight` / `tracking-wide`
- **Ejemplo**: "Gemelos Digitales de Alta Calidad"

#### Títulos de Sección (H2)
- **Tamaño**: `text-3xl sm:text-4xl lg:text-5xl` (1.875rem - 3rem)
- **Peso**: `font-light` (300) / `font-semibold` (600)
- **Color**: `text-gray-900` / `text-blue-600`
- **Tracking**: `tracking-tight` / `tracking-wide`
- **Ejemplo**: "Nuestros Proyectos", "Contacto"

#### Subtítulos (H3)
- **Tamaño**: `text-2xl` (1.5rem)
- **Peso**: `font-medium` (500) / `font-semibold` (600)
- **Color**: `text-gray-900`
- **Ejemplo**: "Información de Contacto"

#### Texto de Párrafo
- **Tamaño**: `text-lg` (1.125rem) / `text-base` (1rem) / `text-sm` (0.875rem)
- **Peso**: `font-light` (300) / `font-normal` (400)
- **Color**: `text-gray-600` / `text-gray-700` / `text-gray-200`
- **Line-height**: `leading-relaxed` (1.75) / `leading-normal` (1.5)

#### Texto Pequeño
- **Tamaño**: `text-sm` (0.875rem) / `text-xs` (0.75rem)
- **Peso**: `font-normal` (400) / `font-medium` (500)
- **Color**: `text-gray-500` / `text-gray-400` / `text-gray-600`

#### Botones y CTAs
- **Tamaño**: `text-base` (1rem)
- **Peso**: `font-medium` (500)
- **Color**: `text-white` (en botones azules)
- **Background**: `bg-blue-600` → `bg-blue-700` (hover)

### Características Tipográficas

- **Antialiasing**: `antialiased` (mejora la renderización)
- **Font Smoothing**: `-webkit-font-smoothing: antialiased` y `-moz-osx-font-smoothing: grayscale`
- **Line Height**: Generalmente `1.6` o `leading-relaxed` (1.75)

## 🎯 Uso de Colores por Componente

### Header
- **Fondo**: `bg-white/95` (blanco con transparencia)
- **Borde**: `border-gray-200`
- **Texto**: `text-gray-900`
- **Hover**: `text-blue-600`

### Hero
- **Fondo**: `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900`
- **Texto Principal**: `text-white`
- **Texto Destacado**: `text-blue-400`
- **Acentos**: Gradientes azules con opacidad

### Portfolio
- **Fondo**: `bg-gray-50`
- **Títulos**: `text-gray-900` / `text-blue-600`
- **Texto**: `text-gray-600`
- **Cards**: `bg-white`

### Contacto
- **Fondo**: `bg-white`
- **Títulos**: `text-gray-900` / `text-blue-600`
- **Cards**: `bg-gray-50` / `bg-white`
- **Iconos**: `bg-blue-100` → `bg-blue-500` (hover)
- **Texto**: `text-gray-700` / `text-gray-600`

### Footer
- **Fondo**: `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900`
- **Texto**: `text-white` / `text-gray-400`
- **Acentos**: `text-blue-500/30` (líneas decorativas)

### MarcasCarousel
- **Fondo**: `bg-gray-50`
- **Títulos**: `text-gray-900`
- **Cards**: `bg-white`

## 📐 Espaciado y Sizing

### Espaciado de Secciones
- **Padding Vertical**: `py-24` (6rem / 96px)
- **Padding Horizontal**: `px-4 sm:px-6 lg:px-8`

### Anchos Máximos
- **Contenedor Principal**: `max-w-7xl` (80rem / 1280px)

### Bordes y Radios
- **Border Radius**: `rounded-lg` (0.5rem) / `rounded-xl` (0.75rem) / `rounded-full` (9999px)
- **Bordes**: `border-gray-200` / `border-gray-100`

## 💡 Notas de Diseño

1. **Gradientes**: Se usan principalmente en fondos oscuros (Hero, Footer) con transiciones suaves
2. **Transparencias**: Se usa `opacity` y `/95`, `/30`, etc. para efectos de blur y transparencia
3. **Sombras**: `shadow-sm`, `shadow-md`, `shadow-xl` para profundidad
4. **Hover States**: Transiciones suaves con `transition-colors duration-200/300`
5. **Líneas Decorativas**: Gradientes azules con transparencia para separadores visuales
