import axios from 'axios';
import { CNAEClasse, CNAESubclasse, CacheEntry } from '../types';

const IBGE_URL = process.env.IBGE_CNAE_URL || 'https://servicodados.ibge.gov.br/api/v2/cnae';
const CACHE_TTL = 3600000; // 1 hora para CNAE

class CNAEService {
  private classesCache = new Map<string, CacheEntry<CNAEClasse>>();
  private subclassesCache = new Map<string, CacheEntry<CNAESubclasse>>();
  private listCache = new Map<string, CacheEntry<any[]>>();

  private async fetchIBGE(endpoint: string): Promise<any> {
    try {
      const response = await axios.get(`${IBGE_URL}${endpoint}`, {
        timeout: 10000
      });
      return response.data;
    } catch (error) {
      console.log(`IBGE API falhou para ${endpoint}:`, error);
      throw error;
    }
  }

  async getClasse(id: string): Promise<CNAEClasse | null> {
    if (id.length !== 5) {
      throw new Error('ID da classe deve ter 5 dígitos');
    }

    // Verificar cache
    const cached = this.classesCache.get(id);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }

    try {
      const data = await this.fetchIBGE(`/classes/${id}`);
      
      const result: CNAEClasse = {
        id: data.id,
        descricao: data.descricao,
        secao: data.secao,
        divisao: data.divisao,
        grupo: data.grupo
      };

      // Salvar no cache
      this.classesCache.set(id, {
        data: result,
        timestamp: Date.now(),
        ttl: CACHE_TTL
      });

      return result;
    } catch (error) {
      return null;
    }
  }

  async getSubclasse(id: string): Promise<CNAESubclasse | null> {
    if (id.length !== 7) {
      throw new Error('ID da subclasse deve ter 7 dígitos');
    }

    // Verificar cache
    const cached = this.subclassesCache.get(id);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }

    try {
      const data = await this.fetchIBGE(`/subclasses/${id}`);
      
      const result: CNAESubclasse = {
        id: data.id,
        descricao: data.descricao,
        classe: data.classe
      };

      // Salvar no cache
      this.subclassesCache.set(id, {
        data: result,
        timestamp: Date.now(),
        ttl: CACHE_TTL
      });

      return result;
    } catch (error) {
      return null;
    }
  }

  async getClasses(): Promise<CNAEClasse[]> {
    const cacheKey = 'all_classes';
    
    // Verificar cache
    const cached = this.listCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data as CNAEClasse[];
    }

    try {
      const data = await this.fetchIBGE('/classes');
      
      const result = data.map((item: any) => ({
        id: item.id,
        descricao: item.descricao,
        secao: item.secao,
        divisao: item.divisao,
        grupo: item.grupo
      }));

      // Salvar no cache
      this.listCache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
        ttl: CACHE_TTL
      });

      return result;
    } catch (error) {
      return [];
    }
  }

  async getSubclasses(): Promise<CNAESubclasse[]> {
    const cacheKey = 'all_subclasses';
    
    // Verificar cache
    const cached = this.listCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data as CNAESubclasse[];
    }

    try {
      const data = await this.fetchIBGE('/subclasses');
      
      const result = data.map((item: any) => ({
        id: item.id,
        descricao: item.descricao,
        classe: item.classe
      }));

      // Salvar no cache
      this.listCache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
        ttl: CACHE_TTL
      });

      return result;
    } catch (error) {
      return [];
    }
  }

  clearCache(): void {
    this.classesCache.clear();
    this.subclassesCache.clear();
    this.listCache.clear();
  }
}

export const cnaeService = new CNAEService();
