'use client';

import { useState } from 'react';
import { Save, X, Edit, Trash2, Upload } from 'lucide-react';
import { GemeloDigital } from '@/data/gemelos';

interface AdminFormProps {
  gemelos: GemeloDigital[];
  onRefresh: () => void;
}

export default function AdminForm({ gemelos, onRefresh }: AdminFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    iframe: '',
    ubicacion: '',
    thumbnailUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      iframe: '',
      ubicacion: '',
      thumbnailUrl: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setError('');
    setSuccess('');
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleEdit = (gemelo: GemeloDigital) => {
    setFormData({
      titulo: gemelo.titulo,
      descripcion: gemelo.descripcion,
      iframe: gemelo.iframe,
      ubicacion: gemelo.ubicacion || '',
      thumbnailUrl: gemelo.thumbnailUrl || ''
    });
    setIsEditing(true);
    setEditingId(gemelo.id);
    setError('');
    setSuccess('');
    setSelectedFile(null);
    setPreviewUrl(gemelo.thumbnailUrl || '');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Tipo de archivo no permitido. Solo JPEG, PNG o WebP');
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('El archivo es demasiado grande (Máx 5MB)');
        return;
      }

      setSelectedFile(file);
      setError('');

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Selecciona un archivo primero');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);

      const response = await fetch('/api/upload/marca', { // Reutilizamos el endpoint de subida
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, thumbnailUrl: data.url });
        setPreviewUrl(data.url);
        setSuccess('Imagen subida correctamente');
        setSelectedFile(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Error al subir imagen');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing
        ? `/api/gemelos/${editingId}`
        : '/api/gemelos';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(isEditing ? 'Proyecto actualizado' : 'Proyecto creado');
        resetForm();
        onRefresh();
      } else {
        setError(data.error || 'Error al guardar');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/gemelos/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success) {
        setSuccess('Proyecto eliminado');
        setTimeout(() => onRefresh(), 500);
      } else {
        setError(data.error || 'Error al eliminar');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Recorridos</h1>
        <p className="text-gray-600">Gestiona tus proyectos 360</p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h2>
          {isEditing && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              Modo Edición
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Ej: Casa Moderna"
              />
            </div>

            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                id="ubicacion"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.ubicacion}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                placeholder="Ej: Córdoba, Capital"
              />
            </div>
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Descripción breve del proyecto..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portada del Proyecto (Opcional pero recomendado)
            </label>

            <div className="mb-2 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center gap-3">
              {previewUrl ? (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border">
                  <img src={previewUrl} alt="Vista previa" className="max-h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => { setPreviewUrl(''); setFormData({ ...formData, thumbnailUrl: '' }); }}
                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">
                  <p>Arrastra una imagen o haz clic para subir</p>
                </div>
              )}

              <div className="flex gap-2 w-full justify-center">
                <input
                  type="file"
                  id="coverInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('coverInput')?.click()}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Seleccionar Imagen
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Subiendo...' : 'Subir'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="iframe" className="block text-sm font-medium text-gray-700 mb-1">
              Código Iframe (Matterport/Kuula) *
            </label>
            <textarea
              id="iframe"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-xs"
              value={formData.iframe}
              onChange={(e) => setFormData({ ...formData, iframe: e.target.value })}
              placeholder="<iframe src='...'></iframe>"
            />
          </div>

          {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}
          {success && <div className="text-green-600 bg-green-50 p-3 rounded-lg text-sm">{success}</div>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Proyectos Existentes</h2>

        {gemelos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay proyectos aún.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {gemelos.map((gemelo) => (
              <div
                key={gemelo.id}
                className={`border rounded-lg p-4 flex gap-4 ${editingId === gemelo.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}
              >
                {/* Miniatura */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden border">
                  {gemelo.thumbnailUrl ? (
                    <img src={gemelo.thumbnailUrl} alt={gemelo.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-1">Sin portada</div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{gemelo.titulo}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{gemelo.descripcion}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(gemelo)}
                      className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(gemelo.id)}
                      className="text-xs px-2 py-1 bg-white border border-red-200 rounded hover:bg-red-50 text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
