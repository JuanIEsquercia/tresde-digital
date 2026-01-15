import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "TresDe Digital - Recorridos Virtuales 360 de Alta Calidad",
  description: "Transformamos espacios reales en experiencias digitales inmersivas. Especialistas en recorridos virtuales 360 para propiedades residenciales, comerciales e industriales en Corrientes, Argentina.",
  keywords: "recorridos virtuales 360, matterport, realidad virtual, propiedades, inmobiliaria, arquitectura, corrientes, argentina, tours virtuales, 3d",
  authors: [{ name: "TresDe Digital" }],
  creator: "TresDe Digital",
  publisher: "TresDe Digital",
  robots: "index, follow",
  
  // Favicon - Next.js 13+ usa automáticamente app/icon.svg
  // No necesitamos configurar icons aquí, Next.js lo maneja automáticamente
  
  // Open Graph para redes sociales
  openGraph: {
    title: "TresDe Digital - Recorridos Virtuales 360 de Alta Calidad",
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
        alt: "TresDe Digital - Recorridos Virtuales 360 de Alta Calidad",
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: "summary_large_image",
    title: "TresDe Digital - Recorridos Virtuales 360",
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
    "whatsapp:title": "TresDe Digital - Recorridos Virtuales 360",
    "whatsapp:description": "🏠 Explora propiedades en 3D como si estuvieras ahí. Recorridos virtuales 360 de alta calidad en Corrientes, Argentina.",
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
