import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TourPreview from '@/components/TourPreview';
import UseCases from '@/components/UseCases';
import Portfolio from '@/components/Portfolio';
import Calculadora from '@/components/Calculadora';
// import Testimonios from '@/components/Testimonios'; // oculto hasta tener testimonios reales
import MarcasCarousel from '@/components/MarcasCarousel';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TourPreview />
        <UseCases />
        <Calculadora />
        <Portfolio />
        {/* <Testimonios /> — oculto hasta tener testimonios reales */}
        <MarcasCarousel />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}