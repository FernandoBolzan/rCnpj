import React from 'react';
import { api } from '../lib/api';

interface ToolbarProps {
  isOffline: boolean;
  favoritesCount: number;
  onShowFavorites: () => void;
  onShowHistory: () => void;
  onClearCache: () => void;
  onExport: () => void;
  onImport: () => void;
}

export function Toolbar({
  isOffline,
  favoritesCount,
  onShowFavorites,
  onShowHistory,
  onClearCache,
  onExport,
  onImport
}: ToolbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">rCnpj</h1>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500'}`} />
            <span className={`text-sm ${isOffline ? 'text-red-600' : 'text-green-600'}`}>
              {isOffline ? 'Offline (mock)' : 'Online'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onShowFavorites}
            className="rounded-xl px-3 py-2 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition text-sm font-medium"
          >
            Favoritos ({favoritesCount})
          </button>
          
          <button
            onClick={onShowHistory}
            className="rounded-xl px-3 py-2 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition text-sm font-medium"
          >
            Histórico
          </button>
          
          <button
            onClick={onClearCache}
            className="rounded-xl px-3 py-2 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition text-sm font-medium"
          >
            Limpar Cache
          </button>
          
          <button
            onClick={onExport}
            className="rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition text-sm font-medium"
          >
            Exportar
          </button>
          
          <button
            onClick={onImport}
            className="rounded-xl px-3 py-2 bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] transition text-sm font-medium"
          >
            Importar
          </button>
        </div>
      </div>
    </div>
  );
}
