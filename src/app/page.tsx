import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UseCases from '@/components/UseCases';
import Portfolio from '@/components/Portfolio';
import MarcasCarousel from '@/components/MarcasCarousel';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <UseCases />
        <Portfolio />
        <MarcasCarousel />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}