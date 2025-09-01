import { CNPJResponse, CNAEClasse, CNAESubclasse } from '../types';
import { mockEmpresas } from '../mock/cnpj';
import { mockClasses, mockSubclasses } from '../mock/cnae';

class API {
  private baseURL = '/api';
  private isOffline = false;
  private retryCount = 0;
  private maxRetries = 3;

  private async request<T>(endpoint: string): Promise<T | null> {
    try {
      // Verificar conectividade primeiro
      if (!navigator.onLine) {
        this.isOffline = true;
        return null;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`${this.baseURL}${endpoint}`, {
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
      console.error('Erro na API:', error);
      
      // Se for timeout ou erro de rede, tentar novamente
      const errorObj = error as Error;
      if (this.retryCount < this.maxRetries && (errorObj.name === 'AbortError' || errorObj.message.includes('fetch'))) {
        this.retryCount++;
        console.log(`Tentativa ${this.retryCount} de ${this.maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount)); // Backoff exponencial
        return this.request<T>(endpoint);
      }
      
      this.isOffline = true;
      return null;
    }
  }

  async getCNPJ(cnpj: string): Promise<CNPJResponse | null> {
    const result = await this.request<CNPJResponse>(`/cnpj/${cnpj}`);
    
    if (!result) {
      // Fallback para mock
      const cleanCNPJ = cnpj.replace(/\D/g, '');
      return mockEmpresas[cleanCNPJ] || null;
    }
    
    return result;
  }

  async getClasse(id: string): Promise<CNAEClasse | null> {
    const result = await this.request<CNAEClasse>(`/cnae/classes/${id}`);
    
    if (!result) {
      // Fallback para mock
      return mockClasses.find(c => c.id === id) || null;
    }
    
    return result;
  }

  async getSubclasse(id: string): Promise<CNAESubclasse | null> {
    const result = await this.request<CNAESubclasse>(`/cnae/subclasses/${id}`);
    
    if (!result) {
      // Fallback para mock
      return mockSubclasses.find(s => s.id === id) || null;
    }
    
    return result;
  }

  async getClasses(): Promise<CNAEClasse[]> {
    const result = await this.request<CNAEClasse[]>('/cnae/classes');
    
    if (!result) {
      // Fallback para mock
      return mockClasses;
    }
    
    return result;
  }

  async getSubclasses(): Promise<CNAESubclasse[]> {
    const result = await this.request<CNAESubclasse[]>('/cnae/subclasses');
    
    if (!result) {
      // Fallback para mock
      return mockSubclasses;
    }
    
    return result;
  }

  async clearCache(): Promise<void> {
    await this.request('/cache/clear');
  }

  getOfflineStatus(): boolean {
    return this.isOffline;
  }
}

export const api = new API();
