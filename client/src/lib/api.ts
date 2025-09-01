import { CNPJResponse, CNAEClasse, CNAESubclasse } from '../types';
import { mockEmpresas } from '../mock/cnpj';
import { mockClasses, mockSubclasses } from '../mock/cnae';

class API {
  private baseURL = '/api';
  private isOffline = false;

  private async request<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      
      if (!response.ok) {
        if (response.status === 502 || response.status === 404) {
          this.isOffline = true;
          return null;
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      this.isOffline = false;
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
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
