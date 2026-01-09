'use client';

import { useState } from 'react';
import { Save, X, Edit, Trash2, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import { Marca } from '@/data/marcas';

interface AdminMarcasProps {
  marcas: Marca[];
  onRefresh: () => void;
}

export default function AdminMarcas({ marcas, onRefresh }: AdminMarcasProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    logoUrl: '',
    url: '',
    orden: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(''); // Separado para vista previa

  const resetForm = () => {
    setFormData({
      nombre: '',
      logoUrl: '',
      url: '',
      orden: 0
    });
    setIsEditing(false);
    setEditingId(null);
    setError('');
    setSuccess('');
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleEdit = (marca: Marca) => {
    setFormData({
      nombre: marca.nombre,
      logoUrl: marca.logoUrl,
      url: marca.url || '',
      orden: marca.orden
    });
    setIsEditing(true);
    setEditingId(marca.id);
    setError('');
    setSuccess('');
    setSelectedFile(null);
    setPreviewUrl(marca.logoUrl); // Vista previa del logo actual
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validar que logoUrl no sea un data URL (base64)
    if (formData.logoUrl.startsWith('data:')) {
      setError('Por favor sube la imagen primero haciendo click en el botón "Subir", o ingresa una URL válida');
      setIsLoading(false);
      return;
    }

    // Validar que logoUrl sea una URL válida
    if (!formData.logoUrl || (!formData.logoUrl.startsWith('http') && !formData.logoUrl.startsWith('/'))) {
      setError('Por favor ingresa una URL válida o sube una imagen');
      setIsLoading(false);
      return;
    }

    try {
      const url = isEditing 
        ? `/api/marcas/${editingId}` 
        : '/api/marcas';
      
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
        setSuccess(isEditing ? 'Marca actualizada correctamente' : 'Marca creada correctamente');
        resetForm();
        onRefresh();
      } else {
        setError(data.error || 'Error al guardar la marca');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta marca?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/marcas/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Marca eliminada correctamente');
        setTimeout(() => {
          onRefresh();
        }, 500);
      } else {
        setError(data.error || 'Error al eliminar la marca');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        setError('Tipo de archivo no permitido. Solo se permiten: JPEG, PNG, WebP, SVG');
        return;
      }

      // Validar tamaño (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError('El archivo es demasiado grande. Tamaño máximo: 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');
      
      // Mostrar vista previa del archivo seleccionado (NO guardar en logoUrl todavía)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result); // Solo para vista previa, no para guardar
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Por favor selecciona un archivo');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', selectedFile);

      const response = await fetch('/api/upload/marca', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        // Guardar la URL de Cloudinary/local en logoUrl (NO el data URL)
        setFormData({ ...formData, logoUrl: data.url });
        setPreviewUrl(data.url); // Actualizar vista previa con la URL real
        setSuccess('Imagen subida correctamente');
        setSelectedFile(null);
        // Limpiar el input file para evitar duplicados
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Error al subir la imagen');
      }
    } catch {
      setError('Error de conexión al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleOrderChange = async (id: string, direction: 'up' | 'down') => {
    const marca = marcas.find(m => m.id === id);
    if (!marca) return;

    const currentIndex = marcas.findIndex(m => m.id === id);
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === marcas.length - 1) return;

    const newOrder = direction === 'up' 
      ? marca.orden - 1 
      : marca.orden + 1;

    try {
      const response = await fetch(`/api/marcas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...marca,
          orden: newOrder,
        }),
      });

      if (response.ok) {
        onRefresh();
      }
    } catch {
      setError('Error al cambiar el orden');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Marcas</h1>
        <p className="text-gray-600">Administra las marcas que aparecen en el carrusel</p>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Marca' : 'Nueva Marca'}
          </h2>
          {isEditing && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              Modo Edición
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Marca *
            </label>
            <input
              type="text"
              id="nombre"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Empresa XYZ"
            />
          </div>

          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Logo de la Marca *
            </label>
            
            {/* Opción 1: Subir archivo */}
            <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subir imagen desde tu computadora
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  id="fileInput"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
                  onChange={handleFileChange}
                  className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Subiendo...' : 'Subir'}
                  </button>
                )}
              </div>
              {selectedFile && (
                <p className="text-xs text-gray-500 mt-2">
                  Archivo seleccionado: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            {/* Opción 2: URL */}
            <div className="mb-2">
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                O ingresa una URL del logo
              </label>
              <input
                type="url"
                id="logoUrl"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.logoUrl}
                onChange={(e) => {
                  const url = e.target.value;
                  setFormData({ ...formData, logoUrl: url });
                  // Si es una URL válida (no data URL), actualizar vista previa
                  if (url && !url.startsWith('data:')) {
                    setPreviewUrl(url);
                  }
                }}
                placeholder="https://ejemplo.com/logo.png o /marcas/logo.png"
              />
            </div>
            
            <p className="text-xs text-gray-500 mt-1">
              Puedes subir una imagen desde tu computadora (se subirá a Cloudinary) o ingresar una URL. 
              {selectedFile && !formData.logoUrl.startsWith('http') && !formData.logoUrl.startsWith('/') && (
                <span className="text-orange-600 font-medium"> ⚠️ Debes hacer click en "Subir" antes de guardar la marca.</span>
              )}
            </p>
            
            {/* Vista previa */}
            {(previewUrl || formData.logoUrl) && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Vista previa:</p>
                <div className="w-32 h-32 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center">
                  <img
                    src={previewUrl || formData.logoUrl}
                    alt="Vista previa"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = '<span class="text-gray-400 text-xs">Error al cargar imagen</span>';
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL del Sitio Web (opcional)
            </label>
            <input
              type="url"
              id="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://ejemplo.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Si se proporciona, el logo será clickeable y llevará a este sitio
            </p>
          </div>

          <div>
            <label htmlFor="orden" className="block text-sm font-medium text-gray-700 mb-1">
              Orden de Visualización
            </label>
            <input
              type="number"
              id="orden"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.orden}
              onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Las marcas se ordenan de menor a mayor. Usa números para controlar el orden.
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
              {success}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar Marca' : 'Crear Marca')}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de marcas */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Marcas Existentes</h2>
        
        {marcas.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay marcas creadas</p>
        ) : (
          <div className="space-y-4">
            {marcas.map((marca, index) => (
              <div 
                key={marca.id} 
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  editingId === marca.id 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 flex items-center gap-4">
                    {/* Controles de orden */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleOrderChange(marca.id, 'up')}
                        disabled={index === 0 || isLoading}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Mover arriba"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOrderChange(marca.id, 'down')}
                        disabled={index === marcas.length - 1 || isLoading}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Mover abajo"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Logo preview */}
                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-200">
                      {marca.logoUrl ? (
                        <img
                          src={marca.logoUrl}
                          alt={marca.nombre}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">Sin logo</span>
                      )}
                    </div>

                    {/* Información */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{marca.nombre}</h3>
                        {editingId === marca.id && (
                          <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-medium rounded">
                            Editando
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>📊 Orden: {marca.orden}</span>
                        {marca.url && (
                          <a
                            href={marca.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            🔗 Ver sitio
                          </a>
                        )}
                        <span>📅 {new Date(marca.fecha).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(marca)}
                      disabled={isLoading}
                      className={`p-2 rounded-lg transition-colors ${
                        editingId === marca.id
                          ? 'text-blue-800 bg-blue-100'
                          : 'text-blue-600 hover:bg-blue-50'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(marca.id)}
                      disabled={isLoading}
                      className={`p-2 rounded-lg transition-colors ${
                        isLoading 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
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
