import React from 'react';
import { HistoryEntry } from '../types';
import { Tabs } from './Tabs';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: {
    cnpj: HistoryEntry[];
    cnae: HistoryEntry[];
  };
  onSelectCNPJ: (cnpj: string) => void;
  onSelectCNAE: (term: string) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectCNPJ,
  onSelectCNAE
}: HistoryDrawerProps) {
  const [activeTab, setActiveTab] = React.useState('cnpj');

  const tabs = [
    { id: 'cnpj', label: `CNPJs (${history.cnpj.length})` },
    { id: 'cnae', label: `CNAEs (${history.cnae.length})` }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Histórico</h2>
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
            <div className="space-y-2">
              {history.cnpj.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma consulta CNPJ</p>
              ) : (
                history.cnpj.map((entry, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectCNPJ(entry.term)}
                    className="w-full text-left rounded-xl border border-gray-200 p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{entry.term}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(entry.timestamp).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(entry.timestamp).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {activeTab === 'cnae' && (
            <div className="space-y-2">
              {history.cnae.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma consulta CNAE</p>
              ) : (
                history.cnae.map((entry, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectCNAE(entry.term)}
                    className="w-full text-left rounded-xl border border-gray-200 p-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{entry.term}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(entry.timestamp).toLocaleDateString('pt-BR')} às{' '}
                          {new Date(entry.timestamp).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
