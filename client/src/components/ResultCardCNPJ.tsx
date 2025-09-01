import React from 'react';
import { CNPJResponse } from '../types';
import { formatCNPJ, formatCNAE } from '../lib/format';

interface ResultCardCNPJProps {
  empresa: CNPJResponse;
  onSaveFavorite: () => void;
  onViewCNAE: (code: string) => void;
  isFavorite: boolean;
}

export function ResultCardCNPJ({
  empresa,
  onSaveFavorite,
  onViewCNAE,
  isFavorite
}: ResultCardCNPJProps) {
  return (
    <div className="rounded-2xl shadow-sm border border-gray-200 p-4 md:p-5 bg-white">
      <div className="space-y-4">
        {/* Cabeçalho */}
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{empresa.razao_social}</h2>
              {empresa.nome_fantasia && (
                <p className="text-gray-600 mt-1">Nome Fantasia: {empresa.nome_fantasia}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                CNPJ: {formatCNPJ(empresa.cnpj)}
              </p>
            </div>
            <button
              onClick={onSaveFavorite}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                isFavorite
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isFavorite ? '✓ Favorito' : '★ Salvar'}
            </button>
          </div>
        </div>

        {/* Informações básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Situação</h3>
            <p className={`text-sm px-2 py-1 rounded-full inline-block ${
              empresa.descricao_situacao_cadastral === 'ATIVA'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {empresa.descricao_situacao_cadastral}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Início de Atividade</h3>
            <p className="text-sm text-gray-600">
              {new Date(empresa.data_inicio_atividade).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Endereço</h3>
          <p className="text-sm text-gray-600">
            {empresa.logradouro}, {empresa.numero} - {empresa.bairro}
          </p>
          <p className="text-sm text-gray-600">
            {empresa.municipio}/{empresa.uf} - CEP: {empresa.cep}
          </p>
        </div>

        {/* Contato */}
        {empresa.ddd_telefone_1 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Contato</h3>
            <p className="text-sm text-gray-600">{empresa.ddd_telefone_1}</p>
          </div>
        )}

        {/* CNAE Principal */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">CNAE Principal</h3>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {formatCNAE(empresa.cnae_fiscal)}
              </p>
              <p className="text-sm text-gray-600">{empresa.cnae_fiscal_descricao}</p>
            </div>
            <button
              onClick={() => onViewCNAE(empresa.cnae_fiscal)}
              className="rounded-xl px-3 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Ver detalhes
            </button>
          </div>
        </div>

        {/* CNAEs Secundários */}
        {empresa.cnaes_secundarios.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">CNAEs Secundários</h3>
            <div className="space-y-2">
              {empresa.cnaes_secundarios.map((cnae, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCNAE(cnae.code)}
                    </p>
                    <p className="text-sm text-gray-600">{cnae.description}</p>
                  </div>
                  <button
                    onClick={() => onViewCNAE(cnae.code)}
                    className="rounded-xl px-3 py-2 bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition"
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
