'use client';

import { useState, useEffect, useCallback } from 'react';
import { GemeloDigital } from '@/data/gemelos';

// Cache global para evitar recargas innecesarias
let gemelosCache: GemeloDigital[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 300000; // 5 minutos

export function useGemelos() {
  const [gemelos, setGemelos] = useState<GemeloDigital[]>(gemelosCache || []);
  const [isLoading, setIsLoading] = useState(!gemelosCache);
  const [error, setError] = useState<string | null>(null);

  const loadGemelos = useCallback(async () => {
    const now = Date.now();
    
    // Usar cache si está disponible y no ha expirado
    if (gemelosCache && (now - lastFetch) < CACHE_DURATION) {
      setGemelos(gemelosCache);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/gemelos', {
        cache: 'force-cache', // Usar cache del navegador
        next: { revalidate: 300 } // Revalidar cada 5 minutos
      });
      const data = await response.json();
      
      gemelosCache = data.gemelos || [];
      lastFetch = now;
      setGemelos(gemelosCache || []);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error loading gemelos:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGemelos();
  }, [loadGemelos]);

  const refresh = useCallback(() => {
    gemelosCache = null; // Limpiar cache para forzar recarga
    lastFetch = 0; // Resetear timestamp
    setGemelos([]); // Limpiar estado local inmediatamente
    loadGemelos();
  }, [loadGemelos]);

  return { gemelos, isLoading, error, refresh };
}
