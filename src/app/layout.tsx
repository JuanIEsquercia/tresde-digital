import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es">
      <body className="antialiased">
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
