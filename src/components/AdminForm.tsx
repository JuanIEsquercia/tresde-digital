'use client';

import { useState } from 'react';
import { Save, X, Plus, Edit, Trash2, Eye } from 'lucide-react';
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
    ubicacion: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      iframe: '',
      ubicacion: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const handleEdit = (gemelo: GemeloDigital) => {
    setFormData({
      titulo: gemelo.titulo,
      descripcion: gemelo.descripcion,
      iframe: gemelo.iframe,
      ubicacion: gemelo.ubicacion || ''
    });
    setIsEditing(true);
    setEditingId(gemelo.id);
    setError('');
    setSuccess('');
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
        setSuccess(isEditing ? 'Proyecto actualizado correctamente' : 'Proyecto creado correctamente');
        resetForm();
        onRefresh();
      } else {
        setError(data.error || 'Error al guardar el proyecto');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/gemelos/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Proyecto eliminado correctamente');
        // Limpiar cache y refrescar
        setTimeout(() => {
          onRefresh();
        }, 500);
      } else {
        setError(data.error || 'Error al eliminar el proyecto');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona tus gemelos digitales</p>
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
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              id="titulo"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ej: Casa Moderna - Villa Carlos Paz"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Describe el proyecto..."
            />
          </div>

          <div>
            <label htmlFor="iframe" className="block text-sm font-medium text-gray-700 mb-1">
              Iframe de Matterport *
            </label>
            <textarea
              id="iframe"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              value={formData.iframe}
              onChange={(e) => setFormData({ ...formData, iframe: e.target.value })}
              placeholder="<iframe width='853' height='480' src='https://my.matterport.com/show/?m=...' frameborder='0' allowfullscreen allow='autoplay; fullscreen; web-share; xr-spatial-tracking;'></iframe>"
            />
          </div>

          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.ubicacion}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              placeholder="Ej: Villa Carlos Paz, Córdoba"
            />
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
              {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto')}
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

      {/* Lista de proyectos */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Proyectos Existentes</h2>
        
        {gemelos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay proyectos creados</p>
        ) : (
          <div className="space-y-4">
            {gemelos.map((gemelo) => (
              <div 
                key={gemelo.id} 
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  editingId === gemelo.id 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{gemelo.titulo}</h3>
                      {editingId === gemelo.id && (
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-medium rounded">
                          Editando
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{gemelo.descripcion}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {gemelo.ubicacion && (
                        <span>📍 {gemelo.ubicacion}</span>
                      )}
                      <span>📅 {new Date(gemelo.fecha).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(gemelo)}
                      disabled={isLoading}
                      className={`p-2 rounded-lg transition-colors ${
                        editingId === gemelo.id
                          ? 'text-blue-800 bg-blue-100'
                          : 'text-blue-600 hover:bg-blue-50'
                      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(gemelo.id)}
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
