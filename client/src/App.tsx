import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Toolbar } from './components/Toolbar';
import { Tabs } from './components/Tabs';
import { SearchCNPJ } from './components/SearchCNPJ';
import { SearchCNAE } from './components/SearchCNAE';
import { ResultCardCNPJ } from './components/ResultCardCNPJ';
import { CNAEList } from './components/CNAEList';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { HistoryDrawer } from './components/HistoryDrawer';
import { SEO } from './components/SEO';
import { BrandHead } from './components/BrandHead';
import { Footer } from './components/Footer';
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
  const navigate = useNavigate();
  const location = useLocation();
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

  // Load CNPJ from URL on mount and URL changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments[1] === 'cnpj' && pathSegments[2]) {
      const cnpjFromUrl = pathSegments[2];
      if (cnpjFromUrl.length === 14) {
        // Verificar se já temos o resultado para este CNPJ
        if (!cnpjResult || cnpjResult.cnpj.replace(/\D/g, '') !== cnpjFromUrl) {
          setActiveTab('cnpj');
          handleCNPJSearch(cnpjFromUrl, false); // Não mostrar toast quando carregado da URL
        }
      }
    }
  }, [location.pathname, cnpjResult]);

  // Load CNAE from URL on mount and URL changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments[1] === 'cnae' && pathSegments[2]) {
      const cnaeFromUrl = pathSegments[2];
      if (cnaeFromUrl.length >= 2) {
        setActiveTab('cnae');
        handleCNAESearch(cnaeFromUrl);
      }
    }
  }, [location.pathname]);

  // Check offline status periodically and on network changes
  useEffect(() => {
    const checkOfflineStatus = () => {
      setIsOffline(api.getOfflineStatus());
    };
    
    // Verificar status inicial
    checkOfflineStatus();
    
    // Verificar quando a conexão muda
    const handleOnline = () => {
      setIsOffline(false);
      toast.success('Conexão restaurada!');
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      toast.error('Conexão perdida - usando dados locais');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const interval = setInterval(checkOfflineStatus, 10000); // Verificar a cada 10s
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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

  const handleCNPJSearch = async (cnpj: string, showToast: boolean = true) => {
    setIsLoading(true);
    try {
      const result = await api.getCNPJ(cnpj);
      setCnpjResult(result);
      
      if (result) {
        addToHistory('cnpj', cnpj);
        // Navegar para URL amigável
        const cleanCNPJ = cnpj.replace(/\D/g, '');
        navigate(`/cnpj/${cleanCNPJ}`);
        if (showToast) {
          toast.success('CNPJ consultado com sucesso!');
        }
      } else {
        if (showToast) {
          toast.error('CNPJ não encontrado');
        }
      }
    } catch (error) {
      if (showToast) {
        toast.error('Erro ao consultar CNPJ');
      }
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

  const handleCNAESelect = (cnaeId: string, tipo: 'classe' | 'subclasse', descricao: string, showToast: boolean = true) => {
    // Adicionar ao histórico automaticamente
    addToHistory('cnae', cnaeId);
    
    // Navegar para URL amigável
    navigate(`/cnae/${cnaeId}`);
    
    if (showToast) {
      toast.success(`${tipo} selecionado: ${descricao}`);
    }
  };

  const handleSaveCNPJFavorite = () => {
    if (!cnpjResult) return;
    
    const isAlreadyFavorite = favorites.cnpj.some(f => f.cnpj === cnpjResult.cnpj);
    
    if (isAlreadyFavorite) {
      // Remove dos favoritos
      setFavorites(prev => ({
        ...prev,
        cnpj: prev.cnpj.filter(f => f.cnpj !== cnpjResult.cnpj)
      }));
      toast.success('CNPJ removido dos favoritos!');
    } else {
      // Adiciona aos favoritos
      const newFavorite: FavoriteCNPJ = {
        cnpj: cnpjResult.cnpj,
        razao_social: cnpjResult.razao_social,
        nome_fantasia: cnpjResult.nome_fantasia,
        createdAt: new Date().toISOString()
      };
      
      setFavorites(prev => ({
        ...prev,
        cnpj: [newFavorite, ...prev.cnpj]
      }));
      
      toast.success('CNPJ salvo nos favoritos!');
    }
  };

  const handleSaveCNAEFavorite = (id: string, tipo: 'classe' | 'subclasse', descricao: string) => {
    const isAlreadyFavorite = favorites.cnae.some(f => f.id === id && f.tipo === tipo);
    
    if (isAlreadyFavorite) {
      // Remove dos favoritos
      setFavorites(prev => ({
        ...prev,
        cnae: prev.cnae.filter(f => !(f.id === id && f.tipo === tipo))
      }));
      toast.success('CNAE removido dos favoritos!');
    } else {
      // Adiciona aos favoritos
      const newFavorite: FavoriteCNAE = {
        id,
        tipo,
        descricao,
        createdAt: new Date().toISOString()
      };
      
      setFavorites(prev => ({
        ...prev,
        cnae: [newFavorite, ...prev.cnae]
      }));
      
      toast.success('CNAE salvo nos favoritos!');
    }
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BrandHead />
      
      <Toolbar
        isOffline={isOffline}
        favoritesCount={favoritesCount}
        onShowFavorites={() => setShowFavorites(true)}
        onShowHistory={() => setShowHistory(true)}
      />
      
      <div className="flex-1">
        <Routes>
        <Route path="/" element={
          <>
            <SEO
              title="Consulta CNPJ e CNAE"
              description="Consulte CNPJ e CNAE gratuitamente. Encontre informações completas de empresas brasileiras, atividades econômicas e dados da Receita Federal."
              keywords="consulta CNPJ, consulta CNAE, empresa brasileira, receita federal, atividade econômica"
              canonical="https://rcnpj.com"
              structuredData={{
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "rCnpj - Consulta CNPJ e CNAE",
                "description": "Consulte CNPJ e CNAE gratuitamente. Encontre informações completas de empresas brasileiras.",
                "url": "https://rcnpj.com",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "BRL"
                }
              }}
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
                      toast.success(`Classe selecionada: ${id}`);
                    }}
                    onSelectSubclasse={(id) => {
                      toast.success(`Subclasse selecionada: ${id}`);
                    }}
                    isLoading={isLoading}
                    onSaveCNAEFavorite={handleSaveCNAEFavorite}
                    favorites={favorites.cnae}
                  />
                )}
              </div>
            </div>
          </>
        } />
        
                 <Route path="/cnpj/:cnpj" element={
           <>
             <SEO
               title={cnpjResult ? `${cnpjResult.razao_social} - CNPJ ${cnpjResult.cnpj}` : 'Consulta CNPJ'}
               description={cnpjResult ? `Informações completas da empresa ${cnpjResult.razao_social} - CNPJ ${cnpjResult.cnpj}. Endereço, telefone, CNAE, situação cadastral e mais.` : 'Consulte CNPJ e encontre informações completas de empresas brasileiras.'}
               keywords={cnpjResult ? `${cnpjResult.razao_social}, ${cnpjResult.nome_fantasia}, CNPJ ${cnpjResult.cnpj}, empresa brasileira, consulta CNPJ` : 'consulta CNPJ, empresa brasileira'}
               canonical={`https://rcnpj.com/cnpj/${cnpjResult?.cnpj.replace(/\D/g, '') || ''}`}
               ogType="article"
               structuredData={cnpjResult ? {
                 "@context": "https://schema.org",
                 "@type": "Organization",
                 "name": cnpjResult.razao_social,
                 "alternateName": cnpjResult.nome_fantasia,
                 "taxID": cnpjResult.cnpj,
                 "address": {
                   "@type": "PostalAddress",
                   "streetAddress": `${cnpjResult.logradouro}, ${cnpjResult.numero}`,
                   "addressLocality": cnpjResult.municipio,
                   "addressRegion": cnpjResult.uf,
                   "postalCode": cnpjResult.cep
                 },
                 "telephone": cnpjResult.telefone,
                 "email": cnpjResult.email
               } : undefined}
             />
             <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
               <div className="mb-6">
                 <button
                   onClick={() => navigate('/')}
                   className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                   <span>Voltar à consulta</span>
                 </button>
               </div>
             
             {cnpjResult && (
               <div className="space-y-8">
                 <ResultCardCNPJ
                   empresa={cnpjResult}
                   onSaveFavorite={handleSaveCNPJFavorite}
                   isFavorite={favorites.cnpj.some(f => f.cnpj === cnpjResult.cnpj)}
                 />
                 
                 {/* Lista de todos os CNAEs encontrados */}
                 <CNAEList
                   cnaePrincipal={{
                     code: cnpjResult.cnae_fiscal,
                     description: cnpjResult.cnae_fiscal_descricao
                   }}
                   cnaesSecundarios={cnpjResult.cnaes_secundarios}
                 />
               </div>
             )}
           </div>
         </>
       } />
         
         <Route path="/cnae/:cnae" element={
           <>
             <SEO
               title="Consulta CNAE"
               description="Consulte CNAE e encontre códigos de atividades econômicas. Classificação Nacional de Atividades Econômicas completa e atualizada."
               keywords="consulta CNAE, atividade econômica, classificação nacional, código CNAE"
               canonical="https://rcnpj.com/cnae"
               structuredData={{
                 "@context": "https://schema.org",
                 "@type": "WebApplication",
                 "name": "Consulta CNAE",
                 "description": "Consulte CNAE e encontre códigos de atividades econômicas.",
                 "url": "https://rcnpj.com/cnae",
                 "applicationCategory": "BusinessApplication"
               }}
             />
             <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
               <div className="mb-6">
                 <button
                   onClick={() => navigate('/')}
                   className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                   <span>Voltar à consulta</span>
                 </button>
               </div>
             
                            <div className="space-y-8">
                 <SearchCNAE
                   classes={classes}
                   subclasses={subclasses}
                   onSearch={handleCNAESearch}
                   onSelectClasse={(id) => {
                     toast.success(`Classe selecionada: ${id}`);
                   }}
                   onSelectSubclasse={(id) => {
                     toast.success(`Subclasse selecionada: ${id}`);
                   }}
                   isLoading={isLoading}
                   onSaveCNAEFavorite={handleSaveCNAEFavorite}
                   favorites={favorites.cnae}
                   onCNAESelect={handleCNAESelect}
                 />
               </div>
             </div>
           </>
         } />
        </Routes>
      </div>
      
      <Footer />
      
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
