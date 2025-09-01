import React from 'react';
import { formatCNAE } from '../lib/format';
import { Highlight } from '../lib/highlight';

interface ResultCardCNAEProps {
  id: string;
  descricao: string;
  tipo: 'classe' | 'subclasse';
  query: string;
  onSelect: () => void;
}

export function ResultCardCNAE({
  id,
  descricao,
  tipo,
  query,
  onSelect
}: ResultCardCNAEProps) {
  return (
    <div 
      className="rounded-2xl shadow-sm border border-gray-200 p-4 bg-white hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-200"
      onClick={onSelect}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {formatCNAE(id)}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {tipo}
            </span>
          </div>
          
          <p className="text-gray-900 leading-relaxed">
            <Highlight text={descricao} query={query} />
          </p>
        </div>
      </div>
    </div>
  );
}
