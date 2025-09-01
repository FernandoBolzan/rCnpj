import axios from 'axios';
import { CNPJResponse, CacheEntry } from '../types';

const BRASILAPI_URL = process.env.BRASILAPI_URL || 'https://brasilapi.com.br';
const RECEITAWS_URL = process.env.RECEITAWS_URL || 'https://www.receitaws.com.br';
const CACHE_TTL = parseInt(process.env.CACHE_TTL_MS || '600000'); // 10 minutos

class CNPJService {
  private cache = new Map<string, CacheEntry<CNPJResponse>>();

  private normalizeCNPJ(cnpj: string): string {
    return cnpj.replace(/\D/g, '');
  }

  private isValidCNPJ(cnpj: string): boolean {
    const clean = this.normalizeCNPJ(cnpj);
    return clean.length === 14;
  }

  private async fetchBrasilAPI(cnpj: string): Promise<CNPJResponse | null> {
    try {
      const response = await axios.get(`${BRASILAPI_URL}/api/cnpj/v1/${cnpj}`, {
        timeout: 10000
      });
      
      return {
        cnpj: response.data.cnpj,
        razao_social: response.data.razao_social,
        nome_fantasia: response.data.nome_fantasia,
        descricao_situacao_cadastral: response.data.descricao_situacao_cadastral,
        data_inicio_atividade: response.data.data_inicio_atividade,
        cnae_fiscal: response.data.cnae_fiscal,
        cnae_fiscal_descricao: response.data.cnae_fiscal_descricao,
        cnaes_secundarios: response.data.cnaes_secundarios || [],
        logradouro: response.data.logradouro,
        numero: response.data.numero,
        bairro: response.data.bairro,
        municipio: response.data.municipio,
        uf: response.data.uf,
        cep: response.data.cep,
        ddd_telefone_1: response.data.ddd_telefone_1,
        // Novos campos da BrasilAPI
        tipo: response.data.tipo,
        porte: response.data.porte,
        capital_social: response.data.capital_social,
        natureza_juridica: response.data.natureza_juridica,
        motivo_situacao_cadastral: response.data.motivo_situacao_cadastral,
        data_situacao_cadastral: response.data.data_situacao_cadastral,
        data_situacao_especial: response.data.data_situacao_especial,
        situacao_especial: response.data.situacao_especial,
        email: response.data.email,
        telefone: response.data.telefone,
        efr: response.data.efr,
        pais_origem: response.data.pais_origem,
        inscricao_municipal: response.data.inscricao_municipal,
        inscricao_estadual: response.data.inscricao_estadual,
        quadro_socios: response.data.quadro_socios || [],
        quadro_administradores: response.data.quadro_administradores || [],
        simples_nacional: response.data.simples_nacional
      };
    } catch (error) {
      console.log('BrasilAPI falhou:', error);
      return null;
    }
  }

  private async fetchReceitaWS(cnpj: string): Promise<CNPJResponse | null> {
    try {
      const response = await axios.get(`${RECEITAWS_URL}/v1/cnpj/${cnpj}`, {
        timeout: 15000
      });
      
      return {
        cnpj: response.data.cnpj,
        razao_social: response.data.nome,
        nome_fantasia: response.data.fantasia,
        descricao_situacao_cadastral: response.data.situacao,
        data_inicio_atividade: response.data.abertura,
        cnae_fiscal: response.data.atividade_principal[0]?.code || '',
        cnae_fiscal_descricao: response.data.atividade_principal[0]?.text || '',
        cnaes_secundarios: response.data.atividades_secundarias?.map((a: any) => ({
          code: a.code,
          description: a.text
        })) || [],
        logradouro: response.data.logradouro,
        numero: response.data.numero,
        bairro: response.data.bairro,
        municipio: response.data.municipio,
        uf: response.data.uf,
        cep: response.data.cep,
        ddd_telefone_1: response.data.telefone
      };
    } catch (error) {
      console.log('ReceitaWS falhou:', error);
      return null;
    }
  }

  async getCNPJ(cnpj: string): Promise<CNPJResponse | null> {
    const normalized = this.normalizeCNPJ(cnpj);
    
    if (!this.isValidCNPJ(normalized)) {
      throw new Error('CNPJ inválido');
    }

    // Verificar cache
    const cached = this.cache.get(normalized);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }

    // Tentar BrasilAPI primeiro
    let result = await this.fetchBrasilAPI(normalized);
    
    // Se falhar, tentar ReceitaWS
    if (!result) {
      result = await this.fetchReceitaWS(normalized);
    }

    // Se ambas falharem, retornar null (cliente usará mock)
    if (!result) {
      return null;
    }

    // Salvar no cache
    this.cache.set(normalized, {
      data: result,
      timestamp: Date.now(),
      ttl: CACHE_TTL
    });

    return result;
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const cnpjService = new CNPJService();
