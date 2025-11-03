import React, { useMemo } from 'react';
import { CNPJResponse } from '../types';
import { formatCNPJ, formatCNAE, formatCEP, formatTelefone } from '../lib/format';
import { RContBanner } from './RContBanner';
import { analisarSimplesNacionalEmpresa } from '../lib/simplesNacionalAnalyzer';

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
  // Analisar Simples Nacional da empresa
  const analiseSimples = useMemo(() => {
    return analisarSimplesNacionalEmpresa(
      { code: empresa.cnae_fiscal, description: empresa.cnae_fiscal_descricao },
      empresa.cnaes_secundarios
    );
  }, [empresa.cnae_fiscal, empresa.cnae_fiscal_descricao, empresa.cnaes_secundarios]);

  return (
    <>
      <RContBanner />
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold mb-2 break-words">{empresa.razao_social}</h2>
            {empresa.nome_fantasia && (
              <p className="text-blue-100 text-sm sm:text-lg break-words">"{empresa.nome_fantasia}"</p>
            )}
            <p className="text-blue-100 mt-2 sm:mt-3 font-mono text-sm sm:text-lg">
              {formatCNPJ(empresa.cnpj)}
            </p>
          </div>
          <button
            onClick={onSaveFavorite}
            className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 flex-shrink-0 ${
              isFavorite
                ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            <span className="hidden sm:inline">{isFavorite ? '❤️ Favoritado' : '⭐ Favoritar'}</span>
            <span className="sm:hidden">{isFavorite ? '❤️' : '⭐'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Informações Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${empresa.descricao_situacao_cadastral === 'ATIVA' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <h3 className="text-sm font-semibold text-gray-900">Status</h3>
            </div>
            <p className={`text-sm font-medium ${
              empresa.descricao_situacao_cadastral === 'ATIVA' ? 'text-green-700' : 'text-red-700'
            }`}>
              {empresa.descricao_situacao_cadastral}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Tipo</h3>
            <p className="text-sm text-blue-700 font-medium">
              {empresa.tipo || 'N/A'}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Porte</h3>
            <p className="text-sm text-purple-700 font-medium">
              {empresa.porte || 'N/A'}
            </p>
          </div>

          {/* Simples Nacional */}
          <div className={`p-4 rounded-2xl ${
            empresa.simples_nacional?.optante 
              ? 'bg-gradient-to-br from-orange-50 to-orange-100' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                empresa.simples_nacional?.optante ? 'bg-orange-500' : 'bg-gray-400'
              }`}></div>
              <h3 className="text-sm font-semibold text-gray-900">Simples Nacional</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                empresa.simples_nacional?.optante ? 'text-orange-700' : 'text-gray-600'
              }`}>
                {empresa.simples_nacional?.optante ? 'Optante' : 'Não Optante'}
              </span>
              {empresa.simples_nacional?.optante && empresa.simples_nacional?.data_opcao && (
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                  {new Date(empresa.simples_nacional.data_opcao).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Análise do Simples Nacional */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 p-5 rounded-2xl">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-indigo-900 mb-1">
                Análise do Simples Nacional
              </h3>
              <p className="text-xs text-indigo-700">
                Baseada nos CNAEs cadastrados da empresa
              </p>
            </div>
          </div>

          {analiseSimples.podeSerOptante ? (
            <div className="space-y-4">
              {/* Status Positivo */}
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border-2 border-green-300">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-bold text-green-900">
                    ✅ Esta empresa PODE ser optante do Simples Nacional
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    Baseado na análise dos CNAEs cadastrados
                  </p>
                </div>
              </div>

              {/* Anexo e Alíquotas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {analiseSimples.anexoPrincipal && (
                  <div className="p-3 bg-white rounded-lg border-2 border-indigo-300">
                    <div className="text-xs text-indigo-600 font-semibold mb-1">ANEXO PRINCIPAL</div>
                    <div className="text-2xl font-bold text-indigo-900">Anexo {analiseSimples.anexoPrincipal}</div>
                  </div>
                )}
                
                {analiseSimples.aliquotaMinima !== undefined && analiseSimples.aliquotaMaxima !== undefined && (
                  <div className="p-3 bg-white rounded-lg border-2 border-purple-300 col-span-2">
                    <div className="text-xs text-purple-600 font-semibold mb-1">ALÍQUOTA (SIMPLES)</div>
                    <div className="text-2xl font-bold text-purple-900">
                      {analiseSimples.aliquotaMinima}% a {analiseSimples.aliquotaMaxima}%
                    </div>
                  </div>
                )}
              </div>

              {/* Anexos Secundários */}
              {analiseSimples.anexosSecundarios.length > 0 && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300">
                  <div className="text-xs text-yellow-800 font-semibold mb-1">ANEXOS SECUNDÁRIOS</div>
                  <div className="flex gap-2 flex-wrap">
                    {analiseSimples.anexosSecundarios.map(anexo => (
                      <span key={anexo} className="px-2 py-1 bg-yellow-200 text-yellow-900 text-xs font-semibold rounded">
                        Anexo {anexo}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CNAEs Problemáticos */}
              {analiseSimples.cnaesProblematicos.length > 0 && (
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-300">
                  <div className="text-xs text-orange-800 font-semibold mb-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    CNAEs NÃO PERMITIDOS NO SIMPLES
                  </div>
                  <ul className="space-y-1.5">
                    {analiseSimples.cnaesProblematicos.map((cnae, index) => (
                      <li key={index} className="text-xs text-orange-900">
                        <span className="font-mono font-semibold">{cnae.codigo}</span> - {cnae.descricao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Observações */}
              {analiseSimples.observacoes.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <ul className="space-y-1.5">
                    {analiseSimples.observacoes.map((obs, index) => (
                      <li key={index} className="text-xs text-blue-800 flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Status Negativo */}
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-2 border-red-300">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-900 mb-1">
                    ❌ Esta empresa NÃO PODE ser optante do Simples Nacional
                  </p>
                  <p className="text-xs text-red-700">
                    {analiseSimples.motivoNaoPode}
                  </p>
                </div>
              </div>

              {/* Regime Alternativo */}
              {analiseSimples.regimeAlternativo && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-300">
                  <h4 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Regime Aplicável: {analiseSimples.regimeAlternativo.regime}
                  </h4>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <div className="text-xs text-orange-700 font-semibold mb-1">CARGA TRIBUTÁRIA APROXIMADA</div>
                    <div className="text-3xl font-bold text-orange-900">
                      {analiseSimples.regimeAlternativo.totalAprox}%
                    </div>
                  </div>
                  <p className="text-xs text-orange-700 mt-2">
                    ℹ️ Tributação pelo regime de {analiseSimples.regimeAlternativo.regime}
                  </p>
                </div>
              )}

              {/* CNAEs Problemáticos */}
              {analiseSimples.cnaesProblematicos.length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-xs text-red-800 font-semibold mb-2">CNAEs QUE IMPEDEM O SIMPLES:</div>
                  <ul className="space-y-2">
                    {analiseSimples.cnaesProblematicos.map((cnae, index) => (
                      <li key={index} className="text-xs text-red-900 p-2 bg-white rounded border border-red-200">
                        <div className="font-mono font-bold">{cnae.codigo}</div>
                        <div className="text-gray-700 mt-0.5">{cnae.descricao}</div>
                        <div className="text-red-600 mt-1 text-xs italic">{cnae.motivo}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Observações */}
              {analiseSimples.observacoes.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <ul className="space-y-1.5">
                    {analiseSimples.observacoes.map((obs, index) => (
                      <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-gray-500 mt-0.5 flex-shrink-0">•</span>
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
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
                 {empresa.complemento && ` - ${empresa.complemento}`}
               </p>
               <p className="text-sm text-gray-700">
                 {empresa.municipio}/{empresa.uf} - CEP: {formatCEP(empresa.cep)}
               </p>
               {empresa.codigo_municipio && (
                 <p className="text-xs text-gray-500 mt-1">
                   Código Município: {empresa.codigo_municipio}
                 </p>
               )}
             </div>
           </div>
         </div>

        {/* Contato e Inscrições */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(empresa.ddd_telefone_1 || empresa.telefone || empresa.email) && (
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Contato</h3>
                  {empresa.telefone && (
                    <p className="text-sm text-gray-700 mb-1">📞 {formatTelefone(empresa.telefone)}</p>
                  )}
                  {empresa.ddd_telefone_1 && (
                    <p className="text-sm text-gray-700 mb-1">📞 {formatTelefone(empresa.ddd_telefone_1)}</p>
                  )}
                  {empresa.email && (
                    <p className="text-sm text-gray-700">📧 {empresa.email}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {(empresa.inscricao_municipal || empresa.inscricao_estadual) && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Inscrições</h3>
                  {empresa.inscricao_municipal && (
                    <p className="text-sm text-gray-700 mb-1">🏛️ Municipal: {empresa.inscricao_municipal}</p>
                  )}
                  {empresa.inscricao_estadual && (
                    <p className="text-sm text-gray-700">🏛️ Estadual: {empresa.inscricao_estadual}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Informações Jurídicas e Fiscais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Data de Abertura</h3>
            <p className="text-sm text-yellow-700 font-medium">
              {empresa.data_inicio_atividade ? new Date(empresa.data_inicio_atividade).toLocaleDateString('pt-BR') : 'N/A'}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Capital Social</h3>
            <p className="text-sm text-indigo-700 font-medium">
              {empresa.capital_social ? `R$ ${parseFloat(empresa.capital_social).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'N/A'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-2">Natureza Jurídica</h3>
            <p className="text-sm text-teal-700 font-medium">
              {empresa.natureza_juridica || 'N/A'}
            </p>
          </div>
        </div>

                 {/* Informações Adicionais da BrasilAPI */}
         {(empresa.codigo_natureza_juridica || empresa.pais || empresa.data_opcao_pelo_simples || empresa.data_exclusao_simples) && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {empresa.codigo_natureza_juridica && (
               <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">Código Natureza Jurídica</h3>
                 <p className="text-sm text-indigo-700 font-medium">
                   {empresa.codigo_natureza_juridica}
                 </p>
               </div>
             )}
             
             {empresa.pais && (
               <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">País</h3>
                 <p className="text-sm text-blue-700 font-medium">
                   {empresa.pais}
                 </p>
               </div>
             )}

             {empresa.data_opcao_pelo_simples && (
               <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">Data Opção Simples</h3>
                 <p className="text-sm text-green-700 font-medium">
                   {new Date(empresa.data_opcao_pelo_simples).toLocaleDateString('pt-BR')}
                 </p>
               </div>
             )}

             {empresa.data_exclusao_simples && (
               <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">Data Exclusão Simples</h3>
                 <p className="text-sm text-red-700 font-medium">
                   {new Date(empresa.data_exclusao_simples).toLocaleDateString('pt-BR')}
                 </p>
               </div>
             )}
           </div>
         )}

         {/* Informações Adicionais da Invertexto API */}
         {(empresa.motivo_situacao_cadastral || empresa.data_situacao_cadastral || empresa.pais_origem || empresa.efr) && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {empresa.motivo_situacao_cadastral && (
               <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">Motivo da Situação</h3>
                 <p className="text-sm text-red-700 font-medium">
                   {empresa.motivo_situacao_cadastral}
                 </p>
               </div>
             )}
             
             {empresa.data_situacao_cadastral && (
               <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">Data da Situação</h3>
                 <p className="text-sm text-orange-700 font-medium">
                   {new Date(empresa.data_situacao_cadastral).toLocaleDateString('pt-BR')}
                 </p>
               </div>
             )}

             {empresa.pais_origem && (
               <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">País de Origem</h3>
                 <p className="text-sm text-green-700 font-medium">
                   {empresa.pais_origem}
                 </p>
               </div>
             )}

             {empresa.efr && (
               <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
                 <h3 className="font-semibold text-gray-900 mb-2">EFR</h3>
                 <p className="text-sm text-purple-700 font-medium">
                   {empresa.efr}
                 </p>
               </div>
             )}
           </div>
         )}



        {/* Quadro de Sócios */}
        {empresa.quadro_socios && empresa.quadro_socios.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900">Quadro de Sócios</h3>
                <p className="text-sm text-gray-600">Sócios e administradores</p>
              </div>
            </div>
            <div className="space-y-3">
              {empresa.quadro_socios.map((socio, index) => (
                <div key={index} className="bg-white/70 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">{socio.nome}</h4>
                    {socio.representante_legal && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Representante Legal
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Qualificação:</span> {socio.qualificacao}
                    </p>
                    {socio.data_entrada && (
                      <p className="text-gray-600">
                        <span className="font-medium">Entrada:</span> {new Date(socio.data_entrada).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    {socio.capital_social && (
                      <p className="text-gray-600">
                        <span className="font-medium">Capital:</span> R$ {parseFloat(socio.capital_social).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
