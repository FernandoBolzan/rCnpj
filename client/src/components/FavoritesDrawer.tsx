import React from 'react';
import { FavoriteCNPJ, FavoriteCNAE } from '../types';
import { formatCNPJ, formatCNAE } from '../lib/format';
import { Tabs } from './Tabs';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: {
    cnpj: FavoriteCNPJ[];
    cnae: FavoriteCNAE[];
  };
  onRemoveCNPJ: (cnpj: string) => void;
  onRemoveCNAE: (id: string, tipo: string) => void;
  onSelectCNPJ: (cnpj: string) => void;
  onSelectCNAE: (id: string, tipo: string) => void;
}

export function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveCNPJ,
  onRemoveCNAE,
  onSelectCNPJ,
  onSelectCNAE
}: FavoritesDrawerProps) {
  const [activeTab, setActiveTab] = React.useState('cnpj');

  const tabs = [
    { id: 'cnpj', label: `CNPJs (${favorites.cnpj.length})` },
    { id: 'cnae', label: `CNAEs (${favorites.cnae.length})` }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Favoritos</h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'cnpj' && (
            <div className="space-y-3">
              {favorites.cnpj.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum CNPJ favoritado</p>
              ) : (
                favorites.cnpj.map((fav) => (
                  <div key={fav.cnpj} className="rounded-xl border border-gray-200 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{fav.razao_social}</h3>
                        {fav.nome_fantasia && (
                          <p className="text-sm text-gray-600">{fav.nome_fantasia}</p>
                        )}
                        <p className="text-sm text-gray-500">{formatCNPJ(fav.cnpj)}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(fav.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button
                          onClick={() => onSelectCNPJ(fav.cnpj)}
                          className="rounded-xl px-2 py-1 bg-blue-600 text-white text-xs hover:bg-blue-700 transition"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => onRemoveCNPJ(fav.cnpj)}
                          className="rounded-xl px-2 py-1 bg-red-600 text-white text-xs hover:bg-red-700 transition"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'cnae' && (
            <div className="space-y-3">
              {favorites.cnae.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum CNAE favoritado</p>
              ) : (
                favorites.cnae.map((fav) => (
                  <div key={`${fav.id}-${fav.tipo}`} className="rounded-xl border border-gray-200 p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {formatCNAE(fav.id)}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {fav.tipo}
                          </span>
                        </div>
                        <p className="text-gray-900">{fav.descricao}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(fav.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-3">
                        <button
                          onClick={() => onSelectCNAE(fav.id, fav.tipo)}
                          className="rounded-xl px-2 py-1 bg-blue-600 text-white text-xs hover:bg-blue-700 transition"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => onRemoveCNAE(fav.id, fav.tipo)}
                          className="rounded-xl px-2 py-1 bg-red-600 text-white text-xs hover:bg-red-700 transition"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
