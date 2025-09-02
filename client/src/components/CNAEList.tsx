import React from 'react';
import { formatCNAE } from '../lib/format';

interface CNAEListProps {
  cnaePrincipal: {
    code: string;
    description: string;
  };
  cnaesSecundarios: Array<{
    code: string;
    description: string;
  }>;
}

export function CNAEList({ cnaePrincipal, cnaesSecundarios }: CNAEListProps) {
  const allCNAEs = [
    { ...cnaePrincipal, type: 'Principal' },
    ...cnaesSecundarios.map(cnae => ({ ...cnae, type: 'Secundário' }))
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">Todos os CNAEs Encontrados</h3>
          <p className="text-sm text-gray-600">
            {allCNAEs.length} atividade{allCNAEs.length > 1 ? 's' : ''} econômica{allCNAEs.length > 1 ? 's' : ''} identificada{allCNAEs.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {allCNAEs.map((cnae, index) => (
          <div 
            key={index} 
            className={`bg-white/70 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow ${
              cnae.type === 'Principal' ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {formatCNAE(cnae.code)}
                </p>
                <p className="text-sm text-gray-700">{cnae.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                cnae.type === 'Principal' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {cnae.type}
              </span>
            </div>
            
            {/* SEO-friendly content for Google indexing */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <strong>Atividade Econômica:</strong> {cnae.description} - Código CNAE: {formatCNAE(cnae.code)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <strong>Tipo:</strong> {cnae.type === 'Principal' ? 'Atividade Principal' : 'Atividade Secundária'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SEO Section for Google */}
      <div className="mt-6 p-4 bg-white/50 rounded-xl">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Informações para Indexação</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Total de CNAEs:</strong> {allCNAEs.length}</p>
          <p><strong>CNAE Principal:</strong> {formatCNAE(cnaePrincipal.code)} - {cnaePrincipal.description}</p>
          {cnaesSecundarios.length > 0 && (
            <p><strong>CNAEs Secundários:</strong> {cnaesSecundarios.length}</p>
          )}
          <p><strong>Palavras-chave:</strong> CNAE, Atividade Econômica, Classificação Nacional de Atividades Econômicas</p>
        </div>
      </div>
    </div>
  );
}
