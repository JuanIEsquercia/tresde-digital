'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/components/AdminLogin';
import AdminForm from '@/components/AdminForm';
import AdminMarcas from '@/components/AdminMarcas';
import { GemeloDigital } from '@/data/gemelos';
import { Marca } from '@/data/marcas';
import { LogOut, Box, Building2 } from 'lucide-react';

type TabType = 'gemelos' | 'marcas';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gemelos, setGemelos] = useState<GemeloDigital[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('gemelos');
  const router = useRouter();

  // Cargar gemelos solo cuando sea necesario
  const loadGemelos = async () => {
    try {
      const response = await fetch('/api/gemelos');
      const data = await response.json();
      setGemelos(data.gemelos || []);
    } catch {
      console.error('Error al cargar gemelos');
    }
  };

  // Cargar marcas
  const loadMarcas = async () => {
    try {
      const response = await fetch('/api/marcas');
      const data = await response.json();
      setMarcas(data.marcas || []);
    } catch {
      console.error('Error al cargar marcas');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Cargar datos después del login exitoso
    loadGemelos();
    loadMarcas();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      router.push('/');
    } catch {
      console.error('Error al cerrar sesión');
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TresDe Digital</h1>
              <p className="text-sm text-gray-600">Panel de Administración</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Ver sitio web
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('gemelos')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'gemelos'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Box className="w-4 h-4" />
              Gemelos Digitales
            </button>
            <button
              onClick={() => setActiveTab('marcas')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'marcas'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Marcas
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main>
        {activeTab === 'gemelos' && (
          <AdminForm gemelos={gemelos} onRefresh={loadGemelos} />
        )}
        {activeTab === 'marcas' && (
          <AdminMarcas marcas={marcas} onRefresh={loadMarcas} />
        )}
      </main>
    </div>
  );
}
