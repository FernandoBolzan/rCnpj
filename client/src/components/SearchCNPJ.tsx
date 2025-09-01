import React, { useState } from 'react';
import { formatCNPJ, stripNonDigits } from '../lib/format';
import { CNPJResponse } from '../types';

interface SearchCNPJProps {
  onSearch: (cnpj: string) => void;
  onResult: (result: CNPJResponse | null) => void;
  isLoading: boolean;
}

export function SearchCNPJ({ onSearch, onResult, isLoading }: SearchCNPJProps) {
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = stripNonDigits(value);
    
    if (cleanValue.length <= 14) {
      const formatted = cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      setCnpj(formatted);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCNPJ = stripNonDigits(cnpj);
    
    if (cleanCNPJ.length !== 14) {
      setError('CNPJ deve ter 14 dígitos');
      return;
    }
    
    onSearch(cleanCNPJ);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Consulta CNPJ
        </h1>
        <p className="text-gray-600 text-lg">
          Consulte dados de empresas brasileiras de forma rápida e gratuita
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cnpj" className="block text-lg font-semibold text-gray-900 mb-3">
              Digite o CNPJ
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="cnpj"
                type="text"
                value={cnpj}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="00.000.000/0000-00"
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="mt-3 flex items-center space-x-2 text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !cnpj.trim()}
            className="w-full rounded-2xl px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Consultando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Consultar CNPJ</span>
              </div>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 Dica: Digite apenas os números ou use a formatação automática
          </p>
        </div>
      </div>
    </div>
  );
}
