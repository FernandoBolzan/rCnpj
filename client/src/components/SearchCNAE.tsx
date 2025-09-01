import React, { useState, useEffect, useCallback } from 'react';
import { isDigits } from '../lib/format';
import { rankByQuery } from '../lib/rank';
import { CNAEClasse, CNAESubclasse } from '../types';
import { Tabs } from './Tabs';
import { ResultCardCNAE } from './ResultCardCNAE';
import { CNAEHierarchy } from './CNAEHierarchy';

interface SearchCNAEProps {
  classes: CNAEClasse[];
  subclasses: CNAESubclasse[];
  onSearch: (query: string) => void;
  onSelectClasse: (id: string) => void;
  onSelectSubclasse: (id: string) => void;
  isLoading: boolean;
  onSaveCNAEFavorite?: (id: string, tipo: 'classe' | 'subclasse', descricao: string) => void;
  favorites?: { id: string; tipo: string }[];
}

export function SearchCNAE({
  classes,
  subclasses,
  onSearch,
  onSelectClasse,
  onSelectSubclasse,
  isLoading,
  onSaveCNAEFavorite,
  favorites = []
}: SearchCNAEProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('subclasses');
  const [filteredSubclasses, setFilteredSubclasses] = useState<CNAESubclasse[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<CNAEClasse[]>([]);
  const [selectedClasse, setSelectedClasse] = useState<CNAEClasse | undefined>(undefined);
  const [selectedSubclasse, setSelectedSubclasse] = useState<CNAESubclasse | undefined>(undefined);
  const [showHierarchy, setShowHierarchy] = useState(false);

  // Debounce para busca textual
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (value.trim()) {
            onSearch(value);
          }
        }, 400);
      };
    })(),
    [onSearch]
  );

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  // Carregar dados CNAE se não estiverem carregados
  useEffect(() => {
    if (classes.length === 0 || subclasses.length === 0) {
      onSearch('');
    }
  }, [classes.length, subclasses.length, onSearch]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredSubclasses([]);
      setFilteredClasses([]);
      return;
    }

    // Verificar se os dados estão carregados
    if (classes.length === 0 || subclasses.length === 0) {
      return;
    }

    if (isDigits(query)) {
      // Busca por código
      const filteredSubclasses = subclasses.filter(s => s.id.startsWith(query));
      const filteredClasses = classes.filter(c => c.id.startsWith(query));
      
      setFilteredSubclasses(filteredSubclasses);
      setFilteredClasses(filteredClasses);
    } else {
      // Busca textual
      const rankedSubclasses = rankByQuery(subclasses, s => s.descricao, query);
      const rankedClasses = rankByQuery(classes, c => c.descricao, query);
      
      setFilteredSubclasses(rankedSubclasses);
      setFilteredClasses(rankedClasses);
    }
  }, [query, subclasses, classes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleShowHierarchy = (classe: CNAEClasse | undefined, subclasse: CNAESubclasse | undefined) => {
    setSelectedClasse(classe);
    setSelectedSubclasse(subclasse);
    setShowHierarchy(true);
  };

  const tabs = [
    { id: 'subclasses', label: `Subclasses (${filteredSubclasses.length})` },
    { id: 'classes', label: `Classes (${filteredClasses.length})` }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Consulta CNAE
        </h1>
        <p className="text-gray-600 text-lg">
          Encontre códigos e descrições de atividades econômicas
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="cnae" className="block text-lg font-semibold text-gray-900 mb-3">
              Buscar CNAE
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="cnae"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Digite código ou descrição..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              💡 Dica: Digite números para buscar por código ou texto para buscar por descrição
            </p>
          </div>
        </div>
      </div>

      {query.trim() && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="mt-6 space-y-4">
            {activeTab === 'subclasses' && (
              <div>
                {filteredSubclasses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhuma subclasse encontrada</p>
                ) : (
                  <div className="grid gap-3">
                    {filteredSubclasses.map((subclasse) => (
                      <ResultCardCNAE
                        key={subclasse.id}
                        id={subclasse.id}
                        descricao={subclasse.descricao}
                        tipo="subclasse"
                        query={query}
                        onSelect={async () => {
                          // Primeiro tentar encontrar na lista de classes já carregadas
                          let classe = classes.find(c => c.id === subclasse.classe.id) || undefined;
                          
                          // Se não encontrar, carregar a classe individualmente
                          if (!classe) {
                            try {
                              const api = (await import('../lib/api')).api;
                              const classeResult = await api.getClasse(subclasse.classe.id);
                              classe = classeResult || undefined;
                            } catch (error) {
                              console.error('Erro ao carregar classe:', error);
                            }
                          }
                          
                          if (classe) {
                            handleShowHierarchy(classe, subclasse);
                          } else {
                            // Se não conseguir carregar a classe, mostrar apenas a subclasse
                            handleShowHierarchy(undefined, subclasse);
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'classes' && (
              <div>
                {filteredClasses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhuma classe encontrada</p>
                ) : (
                  <div className="grid gap-3">
                    {filteredClasses.map((classe) => (
                      <ResultCardCNAE
                        key={classe.id}
                        id={classe.id}
                        descricao={classe.descricao}
                        tipo="classe"
                        query={query}
                        onSelect={() => handleShowHierarchy(classe, undefined)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {showHierarchy && (
        <CNAEHierarchy
          classe={selectedClasse || undefined}
          subclasse={selectedSubclasse || undefined}
          onClose={() => setShowHierarchy(false)}
          onSaveFavorite={onSaveCNAEFavorite}
          isFavorite={
            selectedClasse 
              ? favorites.some(f => f.id === selectedClasse.id && f.tipo === 'classe')
              : selectedSubclasse 
                ? favorites.some(f => f.id === selectedSubclasse.id && f.tipo === 'subclasse')
                : false
          }
        />
      )}
    </div>
  );
}
