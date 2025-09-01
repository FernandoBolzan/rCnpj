import React from 'react';
import { CNAEClasse, CNAESubclasse } from '../types';
import { formatCNAE } from '../lib/format';

interface CNAEHierarchyProps {
  classe?: CNAEClasse;
  subclasse?: CNAESubclasse;
  onClose: () => void;
}

export function CNAEHierarchy({ classe, subclasse, onClose }: CNAEHierarchyProps) {
  // Verificar se temos dados válidos
  if (!classe && !subclasse) {
    return null;
  }

  // Verificar se a classe tem todas as propriedades necessárias
  if (classe && (!classe.secao || !classe.divisao || !classe.grupo)) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Hierarquia CNAE
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">
              Dados da classe incompletos para mostrar a hierarquia.
            </p>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full rounded-xl px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-[0.98] transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Se temos uma subclasse mas não temos a classe correspondente, mostrar apenas a subclasse
  if (subclasse && !classe) {
    const hierarchy = [
      { level: 'Subclasse', id: subclasse.id, descricao: subclasse.descricao }
    ];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Hierarquia CNAE
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              {hierarchy.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {item.level}
                      </span>
                      {item.id && (
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {formatCNAE(item.id)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-900 leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full rounded-xl px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-[0.98] transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hierarchy = subclasse && classe ? [
    { level: 'Seção', id: classe.secao?.id || '', descricao: classe.secao?.descricao || '' },
    { level: 'Divisão', id: classe.divisao?.id || '', descricao: classe.divisao?.descricao || '' },
    { level: 'Grupo', id: classe.grupo?.id || '', descricao: classe.grupo?.descricao || '' },
    { level: 'Classe', id: classe.id, descricao: classe.descricao },
    { level: 'Subclasse', id: subclasse.id, descricao: subclasse.descricao }
  ] : classe ? [
    { level: 'Seção', id: classe.secao?.id || '', descricao: classe.secao?.descricao || '' },
    { level: 'Divisão', id: classe.divisao?.id || '', descricao: classe.divisao?.descricao || '' },
    { level: 'Grupo', id: classe.grupo?.id || '', descricao: classe.grupo?.descricao || '' },
    { level: 'Classe', id: classe.id, descricao: classe.descricao }
  ] : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Hierarquia CNAE
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {hierarchy.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.level}
                    </span>
                    {item.id && (
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {formatCNAE(item.id)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-900 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full rounded-xl px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-[0.98] transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
