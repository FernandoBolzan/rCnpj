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
  simples_nacional?: {
    optante: boolean;
    data_opcao?: string;
    data_exclusao?: string;
  };
  // Novos campos da BrasilAPI
  tipo?: string;
  porte?: string;
  capital_social?: string;
  natureza_juridica?: string;
  motivo_situacao_cadastral?: string;
  data_situacao_cadastral?: string;
  data_situacao_especial?: string;
  situacao_especial?: string;
  email?: string;
  telefone?: string;
  efr?: string; // Ente Federativo Responsável
  pais_origem?: string;
  inscricao_municipal?: string;
  inscricao_estadual?: string;
  quadro_socios?: Array<{
    nome: string;
    qualificacao: string;
    pais_origem?: string;
    nome_rep_legal?: string;
    qualificacao_rep_legal?: string;
    faixa_etaria?: string;
    data_entrada?: string;
    cpf_cnpj_rep_legal?: string;
    representante_legal?: boolean;
    capital_social?: string;
  }>;
  quadro_administradores?: Array<{
    nome: string;
    qualificacao: string;
    data_entrada?: string;
    cpf_cnpj?: string;
    representante_legal?: boolean;
  }>;
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
