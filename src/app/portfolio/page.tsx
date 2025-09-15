import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import Footer from '@/components/Footer';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
}
