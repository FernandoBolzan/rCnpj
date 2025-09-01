import { CNPJResponse, CNAEClasse, CNAESubclasse } from '../types';
import { mockEmpresas } from '../mock/cnpj';
import { mockClasses, mockSubclasses } from '../mock/cnae';

class API {
  private isOffline = false;
  private retryCount = 0;
  private maxRetries = 3;

  private async requestBrasilAPI<T>(endpoint: string): Promise<T | null> {
    try {
      // Verificar conectividade primeiro
      if (!navigator.onLine) {
        this.isOffline = true;
        return null;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`https://brasilapi.com.br${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 502 || response.status === 404 || response.status === 503) {
          this.isOffline = true;
          return null;
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      this.isOffline = false;
      this.retryCount = 0;
      return await response.json();
    } catch (error) {
      console.error('Erro na BrasilAPI:', error);
      
      // Se for timeout ou erro de rede, tentar novamente
      const errorObj = error as Error;
      if (this.retryCount < this.maxRetries && (errorObj.name === 'AbortError' || errorObj.message.includes('fetch'))) {
        this.retryCount++;
        console.log(`Tentativa ${this.retryCount} de ${this.maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount)); // Backoff exponencial
        return this.requestBrasilAPI<T>(endpoint);
      }
      
      this.isOffline = true;
      return null;
    }
  }

  private async requestIBGE<T>(endpoint: string): Promise<T | null> {
    try {
      if (!navigator.onLine) {
        this.isOffline = true;
        return null;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`https://servicodados.ibge.gov.br${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        this.isOffline = true;
        return null;
      }
      
      this.isOffline = false;
      return await response.json();
    } catch (error) {
      console.error('Erro na IBGE API:', error);
      this.isOffline = true;
      return null;
    }
  }

  async getCNPJ(cnpj: string): Promise<CNPJResponse | null> {
    // Verificar se cnpj é válido
    if (!cnpj || typeof cnpj !== 'string') {
      console.error('CNPJ inválido:', cnpj);
      return null;
    }
    
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Verificar se o CNPJ limpo tem 14 dígitos
    if (cleanCNPJ.length !== 14) {
      console.error('CNPJ deve ter 14 dígitos:', cleanCNPJ);
      return null;
    }
    
    // Tentar BrasilAPI primeiro
    const result = await this.requestBrasilAPI<any>(`/api/cnpj/v1/${cleanCNPJ}`);
    
    if (result) {
      // Mapear resposta da BrasilAPI para nosso formato
      return {
        cnpj: result.cnpj,
        razao_social: result.razao_social,
        nome_fantasia: result.nome_fantasia,
        descricao_situacao_cadastral: result.descricao_situacao_cadastral,
        data_inicio_atividade: result.data_inicio_atividade,
        cnae_fiscal: result.cnae_fiscal,
        cnae_fiscal_descricao: result.cnae_fiscal_descricao,
        cnaes_secundarios: result.cnaes_secundarios || [],
        logradouro: result.logradouro,
        numero: result.numero,
        bairro: result.bairro,
        municipio: result.municipio,
        uf: result.uf,
        cep: result.cep,
        ddd_telefone_1: result.ddd_telefone_1,
        tipo: result.tipo,
        porte: result.porte,
        capital_social: result.capital_social,
        natureza_juridica: result.natureza_juridica,
        email: result.email,
        telefone: result.telefone,
        inscricao_municipal: result.inscricao_municipal,
        inscricao_estadual: result.inscricao_estadual,
        quadro_socios: result.quadro_socios || [],
        quadro_administradores: result.quadro_administradores || [],
        simples_nacional: result.simples_nacional
      };
    }
    
    // Fallback para mock
    return mockEmpresas[cleanCNPJ] || null;
  }

  async getClasse(id: string): Promise<CNAEClasse | null> {
    // Para CNAE, usar IBGE API
    const result = await this.requestIBGE<any>(`/api/v2/cnae/classes/${id}`);
    
    if (result) {
      return {
        id: result.id,
        descricao: result.descricao,
        secao: result.secao,
        divisao: result.divisao,
        grupo: result.grupo
      };
    }
    
    // Fallback para mock
    return mockClasses.find(c => c.id === id) || null;
  }

  async getSubclasse(id: string): Promise<CNAESubclasse | null> {
    // Para CNAE, usar IBGE API
    const result = await this.requestIBGE<any>(`/api/v2/cnae/subclasses/${id}`);
    
    if (result) {
      return {
        id: result.id,
        descricao: result.descricao,
        classe: result.classe
      };
    }
    
    // Fallback para mock
    return mockSubclasses.find(s => s.id === id) || null;
  }

  async getClasses(): Promise<CNAEClasse[]> {
    // Para CNAE, usar IBGE API
    const result = await this.requestIBGE<any[]>('/api/v2/cnae/classes');
    
    if (result && result.length > 0) {
      return result.map(item => ({
        id: item.id,
        descricao: item.descricao,
        secao: item.secao,
        divisao: item.divisao,
        grupo: item.grupo
      }));
    }
    
    // Fallback para mock
    return mockClasses;
  }

  async getSubclasses(): Promise<CNAESubclasse[]> {
    // Para CNAE, usar IBGE API
    const result = await this.requestIBGE<any[]>('/api/v2/cnae/subclasses');
    
    if (result && result.length > 0) {
      return result.map(item => ({
        id: item.id,
        descricao: item.descricao,
        classe: item.classe
      }));
    }
    
    // Fallback para mock
    return mockSubclasses;
  }

  async clearCache(): Promise<void> {
    // Não há cache no cliente, apenas resetar estado
    this.isOffline = false;
    this.retryCount = 0;
  }

  getOfflineStatus(): boolean {
    return this.isOffline;
  }
}

export const api = new API();
