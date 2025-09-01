import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Toolbar } from './components/Toolbar';
import { Tabs } from './components/Tabs';
import { SearchCNPJ } from './components/SearchCNPJ';
import { SearchCNAE } from './components/SearchCNAE';
import { ResultCardCNPJ } from './components/ResultCardCNPJ';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { HistoryDrawer } from './components/HistoryDrawer';
import { api } from './lib/api';
import { storage } from './lib/storage';
import { 
  CNPJResponse, 
  CNAEClasse, 
  CNAESubclasse, 
  FavoriteCNPJ, 
  FavoriteCNAE, 
  HistoryEntry 
} from './types';

const STORAGE_KEYS = {
  FAVORITES_CNPJ: 'rcnpj_favorites_cnpj',
  FAVORITES_CNAE: 'rcnpj_favorites_cnae',
  HISTORY_CNPJ: 'rcnpj_history_cnpj',
  HISTORY_CNAE: 'rcnpj_history_cnae',
  CACHE_CLASSES: 'rcnpj_cache_classes',
  CACHE_SUBCLASSES: 'rcnpj_cache_subclasses'
};

function App() {
  const [activeTab, setActiveTab] = useState('cnpj');
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // CNPJ state
  const [cnpjResult, setCnpjResult] = useState<CNPJResponse | null>(null);
  
  // CNAE state
  const [classes, setClasses] = useState<CNAEClasse[]>([]);
  const [subclasses, setSubclasses] = useState<CNAESubclasse[]>([]);
  
  // Favorites state
  const [favorites, setFavorites] = useState<{
    cnpj: FavoriteCNPJ[];
    cnae: FavoriteCNAE[];
  }>({
    cnpj: storage.get(STORAGE_KEYS.FAVORITES_CNPJ, []),
    cnae: storage.get(STORAGE_KEYS.FAVORITES_CNAE, [])
  });
  
  // History state
  const [history, setHistory] = useState<{
    cnpj: HistoryEntry[];
    cnae: HistoryEntry[];
  }>({
    cnpj: storage.get(STORAGE_KEYS.HISTORY_CNPJ, []),
    cnae: storage.get(STORAGE_KEYS.HISTORY_CNAE, [])
  });
  
  // Drawers state
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load cached CNAE data on mount
  useEffect(() => {
    const cachedClasses = storage.get<CNAEClasse[]>(STORAGE_KEYS.CACHE_CLASSES, []);
    const cachedSubclasses = storage.get<CNAESubclasse[]>(STORAGE_KEYS.CACHE_SUBCLASSES, []);
    

    
    if (cachedClasses.length > 0) {
      setClasses(cachedClasses);
    }
    if (cachedSubclasses.length > 0) {
      setSubclasses(cachedSubclasses);
    }
  }, []);

  // Check offline status periodically
  useEffect(() => {
    const checkOfflineStatus = () => {
      setIsOffline(api.getOfflineStatus());
    };
    
    const interval = setInterval(checkOfflineStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    storage.set(STORAGE_KEYS.FAVORITES_CNPJ, favorites.cnpj);
    storage.set(STORAGE_KEYS.FAVORITES_CNAE, favorites.cnae);
  }, [favorites]);

  // Save history to localStorage
  useEffect(() => {
    storage.set(STORAGE_KEYS.HISTORY_CNPJ, history.cnpj);
    storage.set(STORAGE_KEYS.HISTORY_CNAE, history.cnae);
  }, [history]);

  const addToHistory = (type: 'cnpj' | 'cnae', term: string) => {
    const newEntry: HistoryEntry = {
      term,
      timestamp: new Date().toISOString()
    };
    
    const currentHistory = history[type];
    const updatedHistory = [newEntry, ...currentHistory.filter(h => h.term !== term)].slice(0, 20);
    
    setHistory(prev => ({
      ...prev,
      [type]: updatedHistory
    }));
  };

  const handleCNPJSearch = async (cnpj: string) => {
    setIsLoading(true);
    try {
      const result = await api.getCNPJ(cnpj);
      setCnpjResult(result);
      
      if (result) {
        addToHistory('cnpj', cnpj);
        toast.success('CNPJ consultado com sucesso!');
      } else {
        toast.error('CNPJ não encontrado');
      }
    } catch (error) {
      toast.error('Erro ao consultar CNPJ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCNAESearch = async (query: string) => {
    try {
      // Load CNAE lists if not already loaded
      if (classes.length === 0 || subclasses.length === 0) {
        const [classesData, subclassesData] = await Promise.all([
          api.getClasses(),
          api.getSubclasses()
        ]);
        
        // Verificar se os dados foram carregados corretamente
        if (classesData.length > 0 && subclassesData.length > 0) {
          setClasses(classesData);
          setSubclasses(subclassesData);
          
          // Cache the data
          storage.set(STORAGE_KEYS.CACHE_CLASSES, classesData);
          storage.set(STORAGE_KEYS.CACHE_SUBCLASSES, subclassesData);
        }
      }
      
      addToHistory('cnae', query);
    } catch (error) {
      toast.error('Erro ao carregar dados CNAE');
    }
  };

  const handleSaveCNPJFavorite = () => {
    if (!cnpjResult) return;
    
    const newFavorite: FavoriteCNPJ = {
      cnpj: cnpjResult.cnpj,
      razao_social: cnpjResult.razao_social,
      nome_fantasia: cnpjResult.nome_fantasia,
      createdAt: new Date().toISOString()
    };
    
    const isAlreadyFavorite = favorites.cnpj.some(f => f.cnpj === cnpjResult.cnpj);
    
    if (isAlreadyFavorite) {
      toast.error('CNPJ já está nos favoritos');
      return;
    }
    
    setFavorites(prev => ({
      ...prev,
      cnpj: [newFavorite, ...prev.cnpj]
    }));
    
    toast.success('CNPJ salvo nos favoritos!');
  };

  const handleSaveCNAEFavorite = (id: string, tipo: 'classe' | 'subclasse', descricao: string) => {
    const newFavorite: FavoriteCNAE = {
      id,
      tipo,
      descricao,
      createdAt: new Date().toISOString()
    };
    
    const isAlreadyFavorite = favorites.cnae.some(f => f.id === id && f.tipo === tipo);
    
    if (isAlreadyFavorite) {
      toast.error('CNAE já está nos favoritos');
      return;
    }
    
    setFavorites(prev => ({
      ...prev,
      cnae: [newFavorite, ...prev.cnae]
    }));
    
    toast.success('CNAE salvo nos favoritos!');
  };

  const handleRemoveCNPJFavorite = (cnpj: string) => {
    setFavorites(prev => ({
      ...prev,
      cnpj: prev.cnpj.filter(f => f.cnpj !== cnpj)
    }));
    toast.success('CNPJ removido dos favoritos');
  };

  const handleRemoveCNAEFavorite = (id: string, tipo: string) => {
    setFavorites(prev => ({
      ...prev,
      cnae: prev.cnae.filter(f => !(f.id === id && f.tipo === tipo))
    }));
    toast.success('CNAE removido dos favoritos');
  };

  const handleClearCache = async () => {
    try {
      await api.clearCache();
      storage.remove(STORAGE_KEYS.CACHE_CLASSES);
      storage.remove(STORAGE_KEYS.CACHE_SUBCLASSES);
      setClasses([]);
      setSubclasses([]);
      toast.success('Cache limpo com sucesso!');
    } catch (error) {
      toast.error('Erro ao limpar cache');
    }
  };

  const handleExport = () => {
    const data = {
      favorites,
      history,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rcnpj-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Dados exportados com sucesso!');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (data.favorites && data.history) {
            setFavorites(data.favorites);
            setHistory(data.history);
            toast.success('Dados importados com sucesso!');
          } else {
            toast.error('Arquivo inválido');
          }
        } catch (error) {
          toast.error('Erro ao importar arquivo');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const tabs = [
    { id: 'cnpj', label: 'Consulta CNPJ' },
    { id: 'cnae', label: 'Consulta CNAE' }
  ];

  const favoritesCount = favorites.cnpj.length + favorites.cnae.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar
        isOffline={isOffline}
        favoritesCount={favoritesCount}
        onShowFavorites={() => setShowFavorites(true)}
        onShowHistory={() => setShowHistory(true)}
        onClearCache={handleClearCache}
        onExport={handleExport}
        onImport={handleImport}
      />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="mt-8">
          {activeTab === 'cnpj' && (
            <div className="space-y-8">
              <SearchCNPJ
                onSearch={handleCNPJSearch}
                onResult={setCnpjResult}
                isLoading={isLoading}
              />
              
              {cnpjResult && (
                <ResultCardCNPJ
                  empresa={cnpjResult}
                  onSaveFavorite={handleSaveCNPJFavorite}
                  onViewCNAE={(code) => {
                    setActiveTab('cnae');
                    // TODO: Implement CNAE detail view
                  }}
                  isFavorite={favorites.cnpj.some(f => f.cnpj === cnpjResult.cnpj)}
                />
              )}
            </div>
          )}
          
          {activeTab === 'cnae' && (
            <SearchCNAE
              classes={classes}
              subclasses={subclasses}
              onSearch={handleCNAESearch}
              onSelectClasse={(id) => {
                // Função mantida para compatibilidade, mas não é mais usada
                toast.success(`Classe selecionada: ${id}`);
              }}
              onSelectSubclasse={(id) => {
                // Função mantida para compatibilidade, mas não é mais usada
                toast.success(`Subclasse selecionada: ${id}`);
              }}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
      
      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemoveCNPJ={handleRemoveCNPJFavorite}
        onRemoveCNAE={handleRemoveCNAEFavorite}
        onSelectCNPJ={(cnpj) => {
          setShowFavorites(false);
          setActiveTab('cnpj');
          handleCNPJSearch(cnpj);
        }}
        onSelectCNAE={(id, tipo) => {
          setShowFavorites(false);
          setActiveTab('cnae');
          // TODO: Implement CNAE detail view
          toast.success(`${tipo} selecionado: ${id}`);
        }}
      />
      
      <HistoryDrawer
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onSelectCNPJ={(cnpj) => {
          setShowHistory(false);
          setActiveTab('cnpj');
          handleCNPJSearch(cnpj);
        }}
        onSelectCNAE={(term) => {
          setShowHistory(false);
          setActiveTab('cnae');
          // TODO: Implement CNAE search with term
          toast.success(`Termo selecionado: ${term}`);
        }}
      />
    </div>
  );
}

export default App;
