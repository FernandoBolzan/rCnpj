import { CNPJResponse } from '../types';

export const mockEmpresas: Record<string, CNPJResponse> = {
  "00000000000000": {
    cnpj: "00.000.000/0000-00",
    razao_social: "Empresa Mock de Exemplo S.A.",
    nome_fantasia: "Mock Exemplo",
    descricao_situacao_cadastral: "ATIVA",
    data_inicio_atividade: "2010-05-10",
    cnae_fiscal: "4711301",
    cnae_fiscal_descricao: "Hipermercados",
    cnaes_secundarios: [
      { code: "8621601", description: "Unidades móveis de atendimento a urgências - UTI móvel" }
    ],
    logradouro: "Rua Exemplo",
    numero: "123",
    bairro: "Centro",
    municipio: "São Paulo",
    uf: "SP",
    cep: "01000-000",
    ddd_telefone_1: "(11) 3333-3333"
  },
  "11111111111111": {
    cnpj: "11.111.111/1111-11",
    razao_social: "Clínica de UTI Móvel Ltda.",
    nome_fantasia: "UTI Móvel Express",
    descricao_situacao_cadastral: "ATIVA",
    data_inicio_atividade: "2015-03-20",
    cnae_fiscal: "8621601",
    cnae_fiscal_descricao: "Unidades móveis de atendimento a urgências - UTI móvel",
    cnaes_secundarios: [
      { code: "8690101", description: "Atendimento médico domiciliar" },
      { code: "8690901", description: "Atendimento médico em consultórios" }
    ],
    logradouro: "Av. Saúde",
    numero: "456",
    bairro: "Vila Nova",
    municipio: "Rio de Janeiro",
    uf: "RJ",
    cep: "20000-000",
    ddd_telefone_1: "(21) 4444-4444"
  },
  "22222222222222": {
    cnpj: "22.222.222/2222-22",
    razao_social: "Comércio Varejista de Alimentos Ltda.",
    nome_fantasia: "Supermercado Popular",
    descricao_situacao_cadastral: "ATIVA",
    data_inicio_atividade: "2008-11-15",
    cnae_fiscal: "4711301",
    cnae_fiscal_descricao: "Hipermercados",
    cnaes_secundarios: [
      { code: "4721101", description: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns" },
      { code: "4789001", description: "Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente" }
    ],
    logradouro: "Rua do Comércio",
    numero: "789",
    bairro: "Centro Comercial",
    municipio: "Belo Horizonte",
    uf: "MG",
    cep: "30000-000",
    ddd_telefone_1: "(31) 5555-5555"
  }
};
