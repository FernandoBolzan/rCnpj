import React from 'react';
import { CNAEClasse, CNAESubclasse } from '../types';
import { formatCNAE } from '../lib/format';
import { getSimplesNacionalInfo } from '../mock/simplesNacional';
import { RContBanner } from './RContBanner';

interface CNAEHierarchyProps {
  classe?: CNAEClasse;
  subclasse?: CNAESubclasse;
  onClose: () => void;
  onSaveFavorite?: (id: string, tipo: 'classe' | 'subclasse', descricao: string) => void;
  isFavorite?: boolean;
}

export function CNAEHierarchy({ classe, subclasse, onClose, onSaveFavorite, isFavorite }: CNAEHierarchyProps) {
  // Verificar se temos dados válidos
  if (!classe && !subclasse) {
    return null;
  }

  // Obter informações do Simples Nacional
  const cnaeId = subclasse?.id || classe?.id || '';
  const simplesInfo = getSimplesNacionalInfo(cnaeId);

  // Verificar se a classe tem todas as propriedades necessárias
  const hasCompleteHierarchy = classe && classe.secao && classe.divisao && classe.grupo;

  // Se temos uma subclasse mas não temos a classe correspondente, mostrar apenas a subclasse
  if (subclasse && !classe) {
    const hierarchy = [
      { level: 'Subclasse', id: subclasse.id, descricao: subclasse.descricao }
    ];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl max-w-full sm:max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
          <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
                Hierarquia CNAE
              </h2>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Fechar"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-1">
            <div className="space-y-3 sm:space-y-4">
              {hierarchy.map((item, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3 md:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs sm:text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                        {item.level}
                      </span>
                      {item.id && (
                        <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                          {formatCNAE(item.id)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-900 leading-relaxed break-words">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informações do Simples Nacional para subclasse sem classe */}
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informações do Simples Nacional
            </h3>

            {simplesInfo.permitido ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-green-800">Permitido no Simples Nacional</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {simplesInfo.anexo && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-medium mb-1">ANEXO</div>
                      <div className="text-lg font-bold text-blue-900">Anexo {simplesInfo.anexo}</div>
                    </div>
                  )}
                  
                  {simplesInfo.aliquota_min && simplesInfo.aliquota_max && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 font-medium mb-1">ALÍQUOTA</div>
                      <div className="text-lg font-bold text-purple-900">
                        {simplesInfo.aliquota_min}% a {simplesInfo.aliquota_max}%
                      </div>
                    </div>
                  )}
                </div>

                {simplesInfo.atividades && simplesInfo.atividades.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 font-medium mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      ATIVIDADES
                    </div>
                    <ul className="space-y-1.5">
                      {simplesInfo.atividades.map((atividade, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>{atividade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {simplesInfo.observacoes && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xs text-yellow-800">
                      <strong>⚠️ Observação:</strong> {simplesInfo.observacoes}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Status Não Permitido */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-900 mb-1">
                        Não permitido no Simples Nacional
                      </div>
                      {simplesInfo.observacoes && (
                        <div className="text-xs text-red-700">
                          {simplesInfo.observacoes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Regime Alternativo */}
                {simplesInfo.regime_alternativo && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="text-sm font-semibold text-orange-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Regime Tributário: {simplesInfo.regime_alternativo.regime}
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {simplesInfo.regime_alternativo.irpj !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">IRPJ</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.irpj}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.csll !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">CSLL</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.csll}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.pis !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">PIS</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.pis}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.cofins !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">COFINS</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.cofins}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.iss !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">ISS</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.iss}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.total_aprox !== undefined && (
                        <div className="p-2 bg-orange-100 rounded border-2 border-orange-300">
                          <div className="text-xs text-orange-700 mb-0.5 font-semibold">TOTAL APROX.</div>
                          <div className="text-base font-bold text-orange-900">{simplesInfo.regime_alternativo.total_aprox}%</div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-orange-700 mt-3">
                      ℹ️ Alíquotas aproximadas. Podem variar conforme lucro e faturamento.
                    </p>
                  </div>
                )}

                {/* Atividades para CNAEs não permitidos */}
                {simplesInfo.atividades && simplesInfo.atividades.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 font-medium mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      ATIVIDADES
                    </div>
                    <ul className="space-y-1.5">
                      {simplesInfo.atividades.map((atividade, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-gray-500 mt-0.5">•</span>
                          <span>{atividade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>💼 Consulte um contador:</strong> As informações do Simples Nacional podem variar conforme a receita bruta anual e outras particularidades da empresa.
              </p>
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

  // Montar hierarquia com os dados disponíveis
  const hierarchy = [];
  
  if (hasCompleteHierarchy && classe) {
    hierarchy.push({ level: 'Seção', id: classe.secao?.id || '', descricao: classe.secao?.descricao || '' });
    hierarchy.push({ level: 'Divisão', id: classe.divisao?.id || '', descricao: classe.divisao?.descricao || '' });
    hierarchy.push({ level: 'Grupo', id: classe.grupo?.id || '', descricao: classe.grupo?.descricao || '' });
    hierarchy.push({ level: 'Classe', id: classe.id, descricao: classe.descricao });
  } else if (classe) {
    // Se não tem hierarquia completa, mostrar apenas a classe
    hierarchy.push({ level: 'Classe', id: classe.id, descricao: classe.descricao });
  }
  
  if (subclasse) {
    hierarchy.push({ level: 'Subclasse', id: subclasse.id, descricao: subclasse.descricao });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Hierarquia CNAE
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Estrutura completa da classificação
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 180px)' }}>
          <RContBanner />
          
          <div className="space-y-2 sm:space-y-3">
            {hierarchy.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full border">
                        {item.level}
                      </span>
                      {item.id && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {formatCNAE(item.id)}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-900 leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Informações do Simples Nacional */}
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Informações do Simples Nacional
            </h3>

            {simplesInfo.permitido ? (
              <div className="space-y-3">
                {/* Status de Permissão */}
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-green-800">Permitido no Simples Nacional</span>
                </div>

                {/* Anexo e Alíquota */}
                <div className="grid grid-cols-2 gap-3">
                  {simplesInfo.anexo && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs text-blue-600 font-medium mb-1">ANEXO</div>
                      <div className="text-lg font-bold text-blue-900">Anexo {simplesInfo.anexo}</div>
                    </div>
                  )}
                  
                  {simplesInfo.aliquota_min && simplesInfo.aliquota_max && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 font-medium mb-1">ALÍQUOTA</div>
                      <div className="text-lg font-bold text-purple-900">
                        {simplesInfo.aliquota_min}% a {simplesInfo.aliquota_max}%
                      </div>
                    </div>
                  )}
                </div>


                {/* Observações */}
                {simplesInfo.observacoes && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xs text-yellow-800">
                      <strong>⚠️ Observação:</strong> {simplesInfo.observacoes}
                    </div>
                  </div>
                )}

                {/* Atividades - Sempre mostrar */}
                {simplesInfo.atividades && simplesInfo.atividades.length > 0 && (
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-xs text-indigo-700 font-semibold mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      ATIVIDADES PERMITIDAS
                    </div>
                    <ul className="space-y-1.5">
                      {simplesInfo.atividades.map((atividade, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-indigo-600 mt-0.5 flex-shrink-0">✓</span>
                          <span>{atividade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Status Não Permitido */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-900 mb-1">
                        Não permitido no Simples Nacional
                      </div>
                      {simplesInfo.observacoes && (
                        <div className="text-xs text-red-700">
                          {simplesInfo.observacoes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Regime Alternativo */}
                {simplesInfo.regime_alternativo && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="text-sm font-semibold text-orange-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Regime Tributário: {simplesInfo.regime_alternativo.regime}
                    </h4>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {simplesInfo.regime_alternativo.irpj !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">IRPJ</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.irpj}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.csll !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">CSLL</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.csll}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.pis !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">PIS</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.pis}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.cofins !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">COFINS</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.cofins}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.iss !== undefined && (
                        <div className="p-2 bg-white rounded border border-orange-200">
                          <div className="text-xs text-gray-600 mb-0.5">ISS</div>
                          <div className="text-sm font-bold text-orange-900">{simplesInfo.regime_alternativo.iss}%</div>
                        </div>
                      )}
                      {simplesInfo.regime_alternativo.total_aprox !== undefined && (
                        <div className="p-2 bg-orange-100 rounded border-2 border-orange-300 col-span-2 sm:col-span-3">
                          <div className="text-xs text-orange-700 mb-0.5 font-semibold">TOTAL APROX.</div>
                          <div className="text-lg font-bold text-orange-900">{simplesInfo.regime_alternativo.total_aprox}%</div>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-orange-700 mt-3">
                      ℹ️ Alíquotas aproximadas. Podem variar conforme lucro e faturamento.
                    </p>
                  </div>
                )}

                {/* Atividades para CNAEs não permitidos */}
                {simplesInfo.atividades && simplesInfo.atividades.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 font-medium mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      ATIVIDADES
                    </div>
                    <ul className="space-y-1.5">
                      {simplesInfo.atividades.map((atividade, index) => (
                        <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-gray-500 mt-0.5">•</span>
                          <span>{atividade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>💼 Consulte um contador:</strong> As informações do Simples Nacional podem variar conforme a receita bruta anual e outras particularidades da empresa.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {onSaveFavorite && (subclasse || classe) && (
              <button
                onClick={() => {
                  if (subclasse) {
                    onSaveFavorite(subclasse.id, 'subclasse', subclasse.descricao);
                  } else if (classe) {
                    onSaveFavorite(classe.id, 'classe', classe.descricao);
                  }
                }}
                className={`flex-1 rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition ${
                  isFavorite 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                {isFavorite ? '❤️ Favoritado' : '⭐ Favoritar'}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 rounded-xl px-4 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 active:scale-[0.98] transition"
            >
              Entendi!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
