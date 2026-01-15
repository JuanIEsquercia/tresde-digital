'use client';

import { useState } from 'react';
import { Play, Maximize2 } from 'lucide-react';

interface MatterportViewerProps {
  iframe: string;
  title: string;
}

export default function MatterportViewer({ iframe, title }: MatterportViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Modificar el iframe para que ocupe todo el espacio
  const optimizedIframe = iframe
    .replace(/width="[^"]*"/, 'width="100%"')
    .replace(/height="[^"]*"/, 'height="100%"')
    .replace(/style="[^"]*"/, 'style="width: 100%; height: 100%; border: none;"');

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">Recorrido Virtual 360</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Maximize2 className="w-4 h-4 mr-1" />
              {isFullscreen ? 'Salir' : 'Pantalla completa'}
            </button>
          </div>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="relative bg-gray-100 overflow-hidden">
        <div 
          className={`w-full ${isFullscreen ? 'h-screen' : 'h-[70vh] min-h-[500px]'}`}
          dangerouslySetInnerHTML={{ __html: optimizedIframe }}
        />
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Instrucciones de navegación</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Click y arrastrar:</strong> Rotar la vista</li>
              <li>• <strong>Rueda del mouse:</strong> Acercar/alejar</li>
              <li>• <strong>Click en puntos:</strong> Navegar entre espacios</li>
              <li>• <strong>Doble click:</strong> Acercar a un punto</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
