export interface CNPJResponse {
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  descricao_situacao_cadastral: string;
  data_inicio_atividade: string;
  cnae_fiscal: string;
  cnae_fiscal_descricao: string;
  cnaes_secundarios: Array<{
    code: string;
    description: string;
  }>;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  ddd_telefone_1?: string;
}

export interface CNAEClasse {
  id: string;
  descricao: string;
  secao: {
    id: string;
    descricao: string;
  };
  divisao: {
    id: string;
    descricao: string;
  };
  grupo: {
    id: string;
    descricao: string;
  };
}

export interface CNAESubclasse {
  id: string;
  descricao: string;
  classe: {
    id: string;
    descricao: string;
  };
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}
