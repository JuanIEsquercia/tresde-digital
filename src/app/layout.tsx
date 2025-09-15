import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "TresDe Digital - Gemelos Digitales de Alta Calidad",
  description: "Transformamos espacios reales en experiencias digitales inmersivas. Especialistas en gemelos digitales para propiedades residenciales, comerciales e industriales.",
  keywords: "gemelos digitales, matterport, realidad virtual, propiedades, inmobiliaria, arquitectura",
  authors: [{ name: "TresDe Digital" }],
  openGraph: {
    title: "TresDe Digital - Gemelos Digitales de Alta Calidad",
    description: "Transformamos espacios reales en experiencias digitales inmersivas.",
    type: "website",
    locale: "es_AR",
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
