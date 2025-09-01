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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
            Consultar CNPJ
          </label>
          <input
            id="cnpj"
            type="text"
            value={cnpj}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="00.000.000/0000-00"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !cnpj.trim()}
          className="w-full rounded-xl px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition"
        >
          {isLoading ? 'Consultando...' : 'Consultar CNPJ'}
        </button>
      </form>
    </div>
  );
}
