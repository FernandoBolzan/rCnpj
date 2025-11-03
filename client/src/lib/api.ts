import { CNPJResponse, CNAEClasse, CNAESubclasse } from '../types';
import { mockEmpresas } from '../mock/cnpj';
import { mockClasses, mockSubclasses } from '../mock/cnae';

class API {
  private isOffline = false;
  private retryCount = 0;
  private maxRetries = 3;

  private async requestInvertextoAPI<T>(endpoint: string): Promise<T | null> {
    try {
      // Verificar conectividade primeiro
      if (!navigator.onLine) {
        this.isOffline = true;
        return null;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`https://api.invertexto.com${endpoint}`, {
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
      console.error('Erro na Invertexto API:', error);
      
      // Se for timeout ou erro de rede, tentar novamente
      const errorObj = error as Error;
      if (this.retryCount < this.maxRetries && (errorObj.name === 'AbortError' || errorObj.message.includes('fetch'))) {
        this.retryCount++;
        console.log(`Tentativa ${this.retryCount} de ${this.maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount)); // Backoff exponencial
        return this.requestInvertextoAPI<T>(endpoint);
      }
      
      this.isOffline = true;
      return null;
    }
  }

  private async requestBrasilAPI<T>(endpoint: string): Promise<T | null> {
    try {
      if (!navigator.onLine) {
        this.isOffline = true;
        return null;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`https://brasilapi.com.br${endpoint}`, {
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
      console.error('Erro na BrasilAPI:', error);
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
      console.error('Erro na API de CNAE:', error);
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
    
    // Consultar ambas as APIs em paralelo para obter o máximo de informações
    const [invertextoResult, brasilAPIResult] = await Promise.allSettled([
      this.requestInvertextoAPI<any>(`/v1/cnpj/${cleanCNPJ}?token=21516|qCrZ4yDkN6m8r48g9cp2nHWE44iuIJN9`),
      this.requestBrasilAPI<any>(`/api/cnpj/v1/${cleanCNPJ}`)
    ]);
    
    console.log('Resultado Invertexto:', invertextoResult);
    console.log('Resultado BrasilAPI:', brasilAPIResult);
    
    // Extrair dados de ambas as APIs
    const invertextoData = invertextoResult.status === 'fulfilled' ? invertextoResult.value : null;
    const brasilAPIData = brasilAPIResult.status === 'fulfilled' ? brasilAPIResult.value : null;
    
    if (invertextoData) {
      console.log('Resposta completa da Invertexto API:', invertextoData);
      console.log('Campos CNAE Invertexto:', {
        cnae_principal: invertextoData.cnae_principal,
        cnae_fiscal: invertextoData.cnae_fiscal,
        cnae: invertextoData.cnae,
        cnae_principal_codigo: invertextoData.cnae_principal_codigo,
        cnae_principal_descricao: invertextoData.cnae_principal_descricao,
        cnae_fiscal_descricao: invertextoData.cnae_fiscal_descricao,
        cnae_descricao: invertextoData.cnae_descricao,
        cnae_principal_nome: invertextoData.cnae_principal_nome,
        cnaes_secundarios: invertextoData.cnaes_secundarios,
        cnaes: invertextoData.cnaes,
        cnaes_secundarios_lista: invertextoData.cnaes_secundarios_lista
      });
    }
    
    if (brasilAPIData) {
      console.log('Resposta completa da BrasilAPI:', brasilAPIData);
      console.log('Campos CNAE BrasilAPI:', {
        cnae_fiscal: brasilAPIData.cnae_fiscal,
        cnae_fiscal_descricao: brasilAPIData.cnae_fiscal_descricao,
        cnaes_secundarios: brasilAPIData.cnaes_secundarios
      });
    }
    
    // Mesclar dados das duas APIs, priorizando Invertexto mas usando BrasilAPI como complemento
    const mergedData = {
      // Dados básicos - priorizar Invertexto
      cnpj: invertextoData?.cnpj || brasilAPIData?.cnpj,
      razao_social: invertextoData?.razao_social || brasilAPIData?.razao_social,
      nome_fantasia: invertextoData?.nome_fantasia || brasilAPIData?.nome_fantasia,
      
      // Status - usar BrasilAPI se Invertexto não tiver
      descricao_situacao_cadastral: invertextoData?.situacao_cadastral || 
                                   invertextoData?.descricao_situacao_cadastral || 
                                   invertextoData?.status || 
                                   brasilAPIData?.descricao_situacao_cadastral || 
                                   'ATIVA',
      
      // Data de abertura - priorizar BrasilAPI que geralmente tem essa informação
      data_inicio_atividade: brasilAPIData?.data_inicio_atividade || 
                             invertextoData?.data_inicio_atividade || 
                             invertextoData?.data_abertura,
      
      // CNAE Principal - usar BrasilAPI que tem informações mais completas
      cnae_fiscal: brasilAPIData?.cnae_fiscal || 
                   invertextoData?.cnae_principal || 
                   invertextoData?.cnae_fiscal || 
                   invertextoData?.cnae || 
                   invertextoData?.cnae_principal_codigo,
      
      cnae_fiscal_descricao: brasilAPIData?.cnae_fiscal_descricao || 
                            invertextoData?.cnae_principal_descricao || 
                            invertextoData?.cnae_fiscal_descricao || 
                            invertextoData?.cnae_descricao || 
                            invertextoData?.cnae_principal_nome,
      
             // CNAEs Secundários - BrasilAPI tem estrutura melhor
       cnaes_secundarios: brasilAPIData?.cnaes_secundarios?.map((cnae: any) => ({
         code: cnae.codigo,
         description: cnae.descricao
       })) || 
                         invertextoData?.cnaes_secundarios || 
                         invertextoData?.cnaes || 
                         invertextoData?.cnaes_secundarios_lista || 
                         [],
      
             // Endereço - mesclar dados de ambas
       logradouro: brasilAPIData?.logradouro || 
                   invertextoData?.logradouro || 
                   invertextoData?.endereco?.logradouro || 
                   invertextoData?.endereco_completo?.split(',')[0],
       
       numero: brasilAPIData?.numero || 
               invertextoData?.numero || 
               invertextoData?.endereco?.numero,
       
       bairro: brasilAPIData?.bairro || 
               invertextoData?.bairro || 
               invertextoData?.endereco?.bairro,
       
       municipio: brasilAPIData?.municipio || 
                  invertextoData?.municipio || 
                  invertextoData?.endereco?.municipio || 
                  invertextoData?.cidade,
       
       uf: brasilAPIData?.uf || 
           invertextoData?.uf || 
           invertextoData?.endereco?.uf || 
           invertextoData?.estado,
       
       cep: brasilAPIData?.cep || 
            invertextoData?.cep || 
            invertextoData?.endereco?.cep,
       
       // Complemento do endereço
       complemento: brasilAPIData?.complemento || 
                    invertextoData?.complemento || 
                    invertextoData?.endereco?.complemento,
       
       // Códigos adicionais da BrasilAPI
       codigo_municipio: brasilAPIData?.codigo_municipio,
       codigo_natureza_juridica: brasilAPIData?.codigo_natureza_juridica,
       pais: brasilAPIData?.pais,
      
      // Contato - mesclar dados
      ddd_telefone_1: brasilAPIData?.ddd_telefone_1 || 
                      invertextoData?.telefone || 
                      invertextoData?.ddd_telefone_1 || 
                      invertextoData?.contato?.telefone || 
                      invertextoData?.telefone_1,
      
      // Informações da empresa
      tipo: brasilAPIData?.tipo || 
            invertextoData?.tipo || 
            invertextoData?.tipo_empresa,
      
      porte: brasilAPIData?.porte || 
             invertextoData?.porte || 
             invertextoData?.porte_empresa,
      
      capital_social: brasilAPIData?.capital_social || 
                      invertextoData?.capital_social,
      
      natureza_juridica: brasilAPIData?.natureza_juridica || 
                        invertextoData?.natureza_juridica,
      
      email: brasilAPIData?.email || 
             invertextoData?.email || 
             invertextoData?.contato?.email,
      
      telefone: brasilAPIData?.telefone || 
                invertextoData?.telefone || 
                invertextoData?.contato?.telefone || 
                invertextoData?.telefone_1,
      
      inscricao_municipal: brasilAPIData?.inscricao_municipal || 
                          invertextoData?.inscricao_municipal,
      
      inscricao_estadual: brasilAPIData?.inscricao_estadual || 
                         invertextoData?.inscricao_estadual,
      
             // Quadro de sócios - BrasilAPI tem estrutura melhor
       quadro_socios: brasilAPIData?.qsa?.map((socio: any) => ({
         nome: socio.nome_socio,
         qualificacao: socio.qualificacao_socio,
         pais_origem: socio.pais,
         nome_rep_legal: socio.nome_rep_legal,
         qualificacao_rep_legal: socio.qualificacao_rep_legal,
         faixa_etaria: socio.faixa_etaria,
         data_entrada: socio.data_entrada,
         cpf_cnpj_rep_legal: socio.cpf_cnpj_rep_legal,
         representante_legal: socio.representante_legal,
         capital_social: socio.capital_social
       })) || 
                      brasilAPIData?.quadro_socios || 
                      invertextoData?.quadro_socios || 
                      invertextoData?.socios || 
                      invertextoData?.socios_lista || 
                      [],
      
      quadro_administradores: brasilAPIData?.quadro_administradores || 
                              invertextoData?.quadro_administradores || 
                              invertextoData?.administradores || 
                              invertextoData?.administradores_lista || 
                              [],
      
             // Simples Nacional - usar dados da BrasilAPI que são mais completos
       simples_nacional: {
         optante: brasilAPIData?.opcao_pelo_simples || 
                  invertextoData?.simples_nacional_optante || 
                  invertextoData?.simples_nacional?.optante || 
                  invertextoData?.optante_simples || 
                  false,
         data_opcao: brasilAPIData?.data_opcao_pelo_simples || 
                     invertextoData?.simples_nacional_data_opcao || 
                     invertextoData?.simples_nacional?.data_opcao || 
                     invertextoData?.data_opcao_simples,
         data_exclusao: brasilAPIData?.data_exclusao_simples || 
                       invertextoData?.simples_nacional_data_exclusao || 
                       invertextoData?.simples_nacional?.data_exclusao || 
                       invertextoData?.data_exclusao_simples
       },
      
             // Campos específicos da Invertexto
       motivo_situacao_cadastral: invertextoData?.motivo_situacao || 
                                  invertextoData?.motivo_situacao_cadastral,
       
       data_situacao_cadastral: invertextoData?.data_situacao || 
                                invertextoData?.data_situacao_cadastral,
       
       pais_origem: invertextoData?.pais_origem,
       efr: invertextoData?.efr,
       
              // Campos adicionais da BrasilAPI
       situacao_cadastral: brasilAPIData?.situacao_cadastral,
       data_opcao_pelo_simples: brasilAPIData?.data_opcao_pelo_simples,
       data_exclusao_simples: brasilAPIData?.data_exclusao_simples,
       
       // Campos adicionais da Invertexto
       cnae_principal: invertextoData?.cnae_principal,
       cnae_principal_descricao: invertextoData?.cnae_principal_descricao,
       motivo_situacao: invertextoData?.motivo_situacao,
       data_situacao: invertextoData?.data_situacao,
       pais_origem_empresa: invertextoData?.pais_origem_empresa,
       inscricao_municipal_empresa: invertextoData?.inscricao_municipal_empresa,
       inscricao_estadual_empresa: invertextoData?.inscricao_estadual_empresa
    };
    
    // Se não conseguiu dados de nenhuma API, usar mock
    if (!invertextoData && !brasilAPIData) {
      console.log('Nenhuma API retornou dados, usando mock...');
      return mockEmpresas[cleanCNPJ] || null;
    }
    
         console.log('Dados finais mapeados:', {
       cnae_fiscal: mergedData.cnae_fiscal,
       cnae_fiscal_descricao: mergedData.cnae_fiscal_descricao,
       cnaes_secundarios: mergedData.cnaes_secundarios,
       quadro_socios: mergedData.quadro_socios
     });
    
    return mergedData;
  }

  async getClasse(id: string): Promise<CNAEClasse | null> {
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
