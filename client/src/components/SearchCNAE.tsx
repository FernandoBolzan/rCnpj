import React, { useState, useEffect, useCallback, useRef } from 'react';
import { isDigits } from '../lib/format';
import { rankByQuery } from '../lib/rank';
import { CNAEClasse, CNAESubclasse } from '../types';
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
  onCNAESelect?: (cnaeId: string, tipo: 'classe' | 'subclasse', descricao: string) => void;
}

export function SearchCNAE({
  classes,
  subclasses,
  onSearch,
  onSelectClasse,
  onSelectSubclasse,
  isLoading,
  onSaveCNAEFavorite,
  favorites = [],
  onCNAESelect
}: SearchCNAEProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('subclasses');
  const [filteredSubclasses, setFilteredSubclasses] = useState<CNAESubclasse[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<CNAEClasse[]>([]);
  const [selectedClasse, setSelectedClasse] = useState<CNAEClasse | undefined>(undefined);
  const [selectedSubclasse, setSelectedSubclasse] = useState<CNAESubclasse | undefined>(undefined);
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      setShowAutocomplete(false);
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
    
    // Mostrar autocomplete quando houver resultados
    setShowAutocomplete(true);
    setSelectedIndex(-1);
  }, [query, subclasses, classes]);

  // Fechar autocomplete ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Scroll automático para o item selecionado
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showAutocomplete) return;

    const totalResults = activeTab === 'subclasses' 
      ? Math.min(filteredSubclasses.length, 10)
      : Math.min(filteredClasses.length, 10);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < totalResults - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (activeTab === 'subclasses' && filteredSubclasses[selectedIndex]) {
            handleSelectSubclasse(filteredSubclasses[selectedIndex]);
          } else if (activeTab === 'classes' && filteredClasses[selectedIndex]) {
            handleSelectClasse(filteredClasses[selectedIndex]);
          }
        }
        break;
      case 'Escape':
        setShowAutocomplete(false);
        setSelectedIndex(-1);
        break;
      case 'Tab':
        // Permitir alternar entre tabs com Tab
        e.preventDefault();
        setActiveTab(prev => prev === 'subclasses' ? 'classes' : 'subclasses');
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectSubclasse = async (subclasse: CNAESubclasse) => {
    setShowAutocomplete(false);
    setQuery('');
    
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
    
    handleShowHierarchy(classe, subclasse);
  };

  const handleSelectClasse = (classe: CNAEClasse) => {
    setShowAutocomplete(false);
    setQuery('');
    handleShowHierarchy(classe, undefined);
  };

  const handleShowHierarchy = (classe: CNAEClasse | undefined, subclasse: CNAESubclasse | undefined) => {
    setSelectedClasse(classe);
    setSelectedSubclasse(subclasse);
    setShowHierarchy(true);
    
    // Chamar onCNAESelect se fornecido
    if (onCNAESelect) {
      if (subclasse) {
        onCNAESelect(subclasse.id, 'subclasse', subclasse.descricao);
      } else if (classe) {
        onCNAESelect(classe.id, 'classe', classe.descricao);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6 sm:mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
          Consulta CNAE
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Encontre códigos e descrições de atividades econômicas
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 mb-8">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="cnae" className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              Buscar CNAE
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                id="cnae"
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && setShowAutocomplete(true)}
                placeholder="Digite código ou descrição..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                disabled={isLoading}
                autoComplete="off"
              />
              
              {/* Dropdown de autocomplete */}
              {showAutocomplete && query.trim() && (filteredSubclasses.length > 0 || filteredClasses.length > 0) && (
                <div 
                  ref={dropdownRef}
                  className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 sm:max-h-96 overflow-y-auto"
                >
                  {/* Tabs dentro do dropdown */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-2 sm:px-4 pt-2 sm:pt-3 pb-2">
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('subclasses');
                          setSelectedIndex(-1);
                        }}
                        className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          activeTab === 'subclasses'
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="hidden sm:inline">Subclasses ({filteredSubclasses.length})</span>
                        <span className="sm:hidden">Sub ({filteredSubclasses.length})</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('classes');
                          setSelectedIndex(-1);
                        }}
                        className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          activeTab === 'classes'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="hidden sm:inline">Classes ({filteredClasses.length})</span>
                        <span className="sm:hidden">Cls ({filteredClasses.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Lista de resultados */}
                  <div className="py-2">
                    {activeTab === 'subclasses' && (
                      <>
                        {filteredSubclasses.length === 0 ? (
                          <div className="px-4 py-8 text-center text-gray-500">
                            Nenhuma subclasse encontrada
                          </div>
                        ) : (
                          filteredSubclasses.slice(0, 10).map((subclasse, index) => (
                            <button
                              key={subclasse.id}
                              data-index={index}
                              onClick={() => handleSelectSubclasse(subclasse)}
                              className={`w-full px-2 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${
                                index === selectedIndex
                                  ? 'bg-gray-50 border-green-500'
                                  : 'border-transparent'
                              }`}
                            >
                              <div className="flex items-start gap-2 sm:gap-3">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                    <span className="font-mono text-xs sm:text-sm font-semibold text-green-600">
                                      {subclasse.id}
                                    </span>
                                    <span className="text-xs text-gray-500 px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded">
                                      Subclasse
                                    </span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-2">
                                    {subclasse.descricao}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                        {filteredSubclasses.length > 10 && (
                          <div className="px-4 py-2 text-center text-sm text-gray-500">
                            + {filteredSubclasses.length - 10} resultados. Continue digitando para refinar.
                          </div>
                        )}
                      </>
                    )}

                    {activeTab === 'classes' && (
                      <>
                        {filteredClasses.length === 0 ? (
                          <div className="px-4 py-8 text-center text-gray-500">
                            Nenhuma classe encontrada
                          </div>
                        ) : (
                          filteredClasses.slice(0, 10).map((classe, index) => (
                            <button
                              key={classe.id}
                              data-index={index}
                              onClick={() => handleSelectClasse(classe)}
                              className={`w-full px-2 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 transition-colors border-l-4 ${
                                index === selectedIndex
                                  ? 'bg-gray-50 border-blue-500'
                                  : 'border-transparent'
                              }`}
                            >
                              <div className="flex items-start gap-2 sm:gap-3">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                    <span className="font-mono text-xs sm:text-sm font-semibold text-blue-600">
                                      {classe.id}
                                    </span>
                                    <span className="text-xs text-gray-500 px-1.5 sm:px-2 py-0.5 bg-gray-100 rounded">
                                      Classe
                                    </span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-700 mt-1 line-clamp-2">
                                    {classe.descricao}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                        {filteredClasses.length > 10 && (
                          <div className="px-4 py-2 text-center text-sm text-gray-500">
                            + {filteredClasses.length - 10} resultados. Continue digitando para refinar.
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              💡 Dica: Digite números para buscar por código ou texto para buscar por descrição. Use as setas ↑↓ para navegar.
            </p>
          </div>
        </div>
      </div>

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
