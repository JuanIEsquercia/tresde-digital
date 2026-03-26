'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2, Move } from 'lucide-react';

interface Tour360ViewerProps {
  url: string;
  title?: string;
}

export default function Tour360Viewer({
  url,
  title = 'Recorrido Virtual 360°',
}: Tour360ViewerProps) {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load: sólo monta el iframe cuando el contenedor entra al viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sincronizar estado de fullscreen con la API del navegador
  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const dismissOnboarding = useCallback(() => setShowOnboarding(false), []);

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900"
      style={{ aspectRatio: '16/9' }}
      onClick={dismissOnboarding}
      onTouchStart={dismissOnboarding}
    >
      {/* Skeleton — visible mientras carga */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div
              className="w-14 h-14 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"
              aria-hidden="true"
            />
            <p className="text-gray-400 text-sm">Cargando recorrido virtual…</p>
          </div>
        </div>
      )}

      {/* Onboarding overlay — desaparece al primer toque/clic */}
      {showOnboarding && loaded && (
        <div
          className="absolute inset-0 z-20 flex items-end justify-center pb-12 pointer-events-none"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/10">
            <Move className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-white text-sm font-medium tracking-wide">
              Arrastrá para explorar
            </span>
          </div>
        </div>
      )}

      {/* iframe — sólo se monta cuando entra al viewport */}
      {inView && (
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="fullscreen; vr; xr-spatial-tracking"
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      )}

      {/* Botón fullscreen */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 z-30 p-2.5 bg-black/50 hover:bg-black/75 text-white rounded-xl backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
      >
        {isFullscreen ? (
          <Minimize2 className="w-4 h-4" />
        ) : (
          <Maximize2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
