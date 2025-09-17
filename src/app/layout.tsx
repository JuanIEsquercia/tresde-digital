import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "TresDe Digital - Gemelos Digitales de Alta Calidad",
  description: "Transformamos espacios reales en experiencias digitales inmersivas. Especialistas en gemelos digitales para propiedades residenciales, comerciales e industriales en Corrientes, Argentina.",
  keywords: "gemelos digitales, matterport, realidad virtual, propiedades, inmobiliaria, arquitectura, corrientes, argentina, tours virtuales, 3d",
  authors: [{ name: "TresDe Digital" }],
  creator: "TresDe Digital",
  publisher: "TresDe Digital",
  robots: "index, follow",
  
  // Favicon
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  
  // Open Graph para redes sociales
  openGraph: {
    title: "TresDe Digital - Gemelos Digitales de Alta Calidad",
    description: "🏠 Transformamos espacios reales en experiencias digitales inmersivas. Explora propiedades como si estuvieras ahí. 📍 Corrientes, Argentina",
    type: "website",
    locale: "es_AR",
    url: "https://tresde.site",
    siteName: "TresDe Digital",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "TresDe Digital - Gemelos Digitales de Alta Calidad",
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: "summary_large_image",
    title: "TresDe Digital - Gemelos Digitales",
    description: "🏠 Transformamos espacios reales en experiencias digitales inmersivas. Explora propiedades como si estuvieras ahí.",
    images: ["/og-image.svg"],
    creator: "@tresde_digital",
  },
  
  // Metadatos adicionales
  alternates: {
    canonical: "https://tresde.site",
  },
  
  // Para WhatsApp y otras apps
  other: {
    "whatsapp:title": "TresDe Digital - Gemelos Digitales",
    "whatsapp:description": "🏠 Explora propiedades en 3D como si estuvieras ahí. Gemelos digitales de alta calidad en Corrientes, Argentina.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
