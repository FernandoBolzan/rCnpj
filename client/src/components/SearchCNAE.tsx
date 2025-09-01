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
}

export function SearchCNAE({
  classes,
  subclasses,
  onSearch,
  onSelectClasse,
  onSelectSubclasse,
  isLoading
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
      <div className="space-y-6">
        <div>
          <label htmlFor="cnae" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar CNAE
          </label>
          <input
            id="cnae"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Digite código ou descrição..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {query.trim() && (
          <div>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            
            <div className="mt-4 space-y-3">
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
      </div>
      
      {showHierarchy && (
        <CNAEHierarchy
          classe={selectedClasse || undefined}
          subclasse={selectedSubclasse || undefined}
          onClose={() => setShowHierarchy(false)}
        />
      )}
    </div>
  );
}
