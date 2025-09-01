import React from 'react';
import { CNPJResponse } from '../types';
import { formatCNPJ, formatCNAE } from '../lib/format';

interface ResultCardCNPJProps {
  empresa: CNPJResponse;
  onSaveFavorite: () => void;
  isFavorite: boolean;
}

export function ResultCardCNPJ({
  empresa,
  onSaveFavorite,
  isFavorite
}: ResultCardCNPJProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{empresa.razao_social}</h2>
            {empresa.nome_fantasia && (
              <p className="text-blue-100 text-lg">"{empresa.nome_fantasia}"</p>
            )}
            <p className="text-blue-100 mt-3 font-mono text-lg">
              {formatCNPJ(empresa.cnpj)}
            </p>
          </div>
          <button
            onClick={onSaveFavorite}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 ${
              isFavorite
                ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            {isFavorite ? '❤️ Favoritado' : '⭐ Favoritar'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Status e Datas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${empresa.descricao_situacao_cadastral === 'ATIVA' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <h3 className="font-semibold text-gray-900">Status</h3>
            </div>
            <p className={`text-sm font-medium ${
              empresa.descricao_situacao_cadastral === 'ATIVA' ? 'text-green-700' : 'text-red-700'
            }`}>
              {empresa.descricao_situacao_cadastral}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Início Atividade</h3>
            <p className="text-sm text-blue-700 font-medium">
              {new Date(empresa.data_inicio_atividade).toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Situação</h3>
            <p className="text-sm text-purple-700 font-medium">
              {empresa.descricao_situacao_cadastral}
            </p>
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Endereço</h3>
              <p className="text-sm text-gray-700 mb-1">
                {empresa.logradouro}, {empresa.numero} - {empresa.bairro}
              </p>
              <p className="text-sm text-gray-700">
                {empresa.municipio}/{empresa.uf} - CEP: {empresa.cep}
              </p>
            </div>
          </div>
        </div>

        {/* Contato */}
        {empresa.ddd_telefone_1 && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Contato</h3>
                <p className="text-sm text-gray-700">{empresa.ddd_telefone_1}</p>
              </div>
            </div>
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Data de Abertura</h3>
            <p className="text-sm text-yellow-700 font-medium">
              {new Date(empresa.data_inicio_atividade).toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">CNAE Principal</h3>
            <p className="text-sm text-indigo-700 font-medium">
              {formatCNAE(empresa.cnae_fiscal)}
            </p>
          </div>
        </div>

        {/* CNAE Principal */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">CNAE Principal</h3>
              <p className="text-sm font-medium text-blue-700 mb-1">
                {formatCNAE(empresa.cnae_fiscal)}
              </p>
              <p className="text-sm text-gray-700">{empresa.cnae_fiscal_descricao}</p>
            </div>
          </div>
        </div>

        {/* CNAEs Secundários */}
        {empresa.cnaes_secundarios.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">CNAEs Secundários</h3>
                <p className="text-sm text-gray-600">Atividades econômicas adicionais</p>
              </div>
            </div>
            <div className="space-y-3">
              {empresa.cnaes_secundarios.map((cnae, index) => (
                <div key={index} className="bg-white/70 p-3 rounded-xl border border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {formatCNAE(cnae.code)}
                  </p>
                  <p className="text-sm text-gray-600">{cnae.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
