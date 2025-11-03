import { CNAESimplesNacional } from '../types';

// Base de dados de informações do Simples Nacional por CNAE
// Fonte: Resolução CGSN nº 140/2018, LC 123/2006 e atualizações
// Última atualização: 2024
export const simplesNacionalData: Record<string, CNAESimplesNacional> = {
  
  // ==========================================
  // AGRICULTURA E PECUÁRIA - Anexo II
  // ==========================================
  
  '0111-3/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de arroz',
      'Produção de sementes de arroz certificadas',
      'Beneficiamento de arroz realizado fora do estabelecimento produtor'
    ]
  },
  '0111-3/02': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de milho',
      'Produção de sementes de milho certificadas'
    ]
  },
  '0111-3/03': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de trigo',
      'Produção de sementes de trigo certificadas'
    ]
  },
  '0113-0/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de cana-de-açúcar',
      'Produção de mudas de cana-de-açúcar'
    ]
  },
  '0115-6/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de soja',
      'Produção de sementes de soja certificadas'
    ]
  },
  '0121-1/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Horticultura',
      'Cultivo de hortaliças folhosas, frutosas e flores',
      'Produção de mudas de hortaliças'
    ]
  },
  '0131-8/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de laranja',
      'Produção de mudas de laranja'
    ]
  },
  '0133-4/99': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Cultivo de frutas diversas',
      'Fruticultura não especificada'
    ]
  },
  '0141-5/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Produção de sementes certificadas',
      'Melhoramento genético vegetal'
    ]
  },
  '0151-2/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Criação de bovinos para corte',
      'Produção de bezerros para recria'
    ]
  },
  '0151-2/02': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Criação de bovinos para leite',
      'Produção leiteira',
      'Cria e recria de animais para produção de leite'
    ]
  },
  '0155-5/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Criação de frangos para corte',
      'Avicultura'
    ]
  },
  '0155-5/02': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Produção de ovos',
      'Avicultura de postura'
    ]
  },
  '0159-8/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Apicultura',
      'Produção de mel e derivados',
      'Criação de abelhas'
    ]
  },
  
  // ==========================================
  // INDÚSTRIA ALIMENTÍCIA - Anexo II
  // ==========================================
  
  '1091-1/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de produtos de panificação',
      'Padarias',
      'Confeitarias com fabricação própria'
    ]
  },
  '1091-1/02': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de produtos de panificação industrial',
      'Produção de pães, bolos e biscoitos em escala industrial'
    ]
  },
  '1095-4/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de sorvetes e outros gelados comestíveis',
      'Produção de picolés e sorvetes'
    ]
  },
  '1099-6/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de massas alimentícias',
      'Produção de macarrão, lasanha e similares'
    ]
  },
  
  // ==========================================
  // INDÚSTRIA TÊXTIL E VESTUÁRIO - Anexo II
  // ==========================================
  
  '1311-1/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Preparação e fiação de fibras têxteis',
      'Fiação de algodão, lã e outras fibras'
    ]
  },
  '1412-6/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Confecção de peças do vestuário, exceto roupas íntimas',
      'Fabricação de roupas',
      'Ateliê de costura'
    ]
  },
  '1412-6/02': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Confecção de peças de vestuário infantil',
      'Fabricação de roupas para bebês e crianças'
    ]
  },
  '1412-6/03': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Confecção de roupas profissionais',
      'Fabricação de uniformes',
      'Confecção de EPIs têxteis'
    ]
  },
  '1413-4/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Confecção de roupas íntimas',
      'Fabricação de lingerie',
      'Produção de underwear'
    ]
  },
  '1531-9/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de calçados de couro',
      'Sapataria',
      'Produção de sapatos, botas e sandálias'
    ]
  },
  
  // ==========================================
  // INDÚSTRIA DE MÓVEIS E MADEIRA - Anexo II
  // ==========================================
  
  '1610-2/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Serrarias com desdobramento de madeira',
      'Beneficiamento de madeira'
    ]
  },
  '1622-6/99': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de outros artigos de carpintaria',
      'Marcenaria',
      'Fabricação de esquadrias de madeira'
    ]
  },
  '3101-2/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de móveis com predominância de madeira',
      'Marcenaria de móveis',
      'Fabricação de móveis planejados'
    ]
  },
  '3103-9/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de móveis de metal',
      'Produção de estantes, armários e móveis metálicos'
    ]
  },
  
  // ==========================================
  // INDÚSTRIA METALÚRGICA E SERRALHERIA - Anexo II
  // ==========================================
  
  '2511-0/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de estruturas metálicas',
      'Produção de galpões, coberturas e estruturas'
    ]
  },
  '2542-0/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de artigos de serralheria',
      'Produção de esquadrias de metal',
      'Serralheria',
      'Fabricação de grades, portões e estruturas metálicas'
    ]
  },
  '2543-8/00': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Fabricação de ferramentas',
      'Produção de ferramentas manuais'
    ]
  },
  
  // ==========================================
  // INDÚSTRIA GRÁFICA - Anexo II
  // ==========================================
  
  '1811-3/01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Impressão de material para uso publicitário',
      'Gráfica de panfletos, folders e materiais promocionais'
    ]
  },
  '1813-0/99': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: [
      'Impressão de material para outros usos',
      'Gráfica rápida',
      'Impressão de cartões, convites e formulários'
    ]
  },
  
  // ==========================================
  // COMÉRCIO - Anexo I
  // ==========================================
  
  '4711-3/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de mercadorias em geral',
      'Supermercados',
      'Venda de alimentos, bebidas e artigos de consumo'
    ]
  },
  '4712-1/00': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios',
      'Minimercados, mercearias e armazéns',
      'Venda de produtos alimentícios em geral'
    ]
  },
  '4721-1/02': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Padaria e confeitaria com predominância de revenda',
      'Padaria sem fabricação própria',
      'Revenda de pães e doces'
    ]
  },
  '4722-9/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de carnes - açougues',
      'Açougue',
      'Venda de carnes e derivados'
    ]
  },
  '4729-6/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Tabacaria',
      'Comércio varejista de produtos do fumo',
      'Venda de cigarros, charutos e similares'
    ]
  },
  '4741-5/00': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de tintas e materiais para pintura',
      'Loja de tintas',
      'Venda de materiais para pintura'
    ]
  },
  '4744-0/05': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de materiais de construção em geral',
      'Venda de tintas, ferragens e materiais elétricos',
      'Comércio de materiais hidráulicos'
    ]
  },
  '4751-2/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista especializado de equipamentos e suprimentos de informática',
      'Loja de informática',
      'Venda de computadores e periféricos'
    ]
  },
  '4753-9/00': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista especializado de eletrodomésticos e equipamentos de áudio e vídeo',
      'Loja de eletrodomésticos'
    ]
  },
  '4754-7/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de móveis',
      'Loja de móveis'
    ]
  },
  '4761-0/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de livros',
      'Livraria'
    ]
  },
  '4763-6/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de brinquedos e artigos recreativos',
      'Loja de brinquedos'
    ]
  },
  '4771-7/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de produtos farmacêuticos sem manipulação de fórmulas',
      'Farmácia',
      'Drogaria'
    ]
  },
  '4772-5/00': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de cosméticos, produtos de perfumaria e de higiene pessoal',
      'Loja de cosméticos',
      'Perfumaria'
    ]
  },
  '4781-4/00': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de artigos do vestuário e acessórios',
      'Loja de roupas',
      'Boutique'
    ]
  },
  '4782-2/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de calçados',
      'Sapataria (revenda)',
      'Loja de calçados'
    ]
  },
  '4789-0/05': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Comércio varejista de produtos saneantes domissanitários',
      'Loja de produtos de limpeza'
    ]
  },
  
  // ==========================================
  // RESTAURANTES E ALIMENTAÇÃO - Anexo I
  // ==========================================
  
  '5611-2/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Restaurantes e similares',
      'Serviços de alimentação',
      'Bares e lanchonetes com serviço completo'
    ]
  },
  '5611-2/03': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Lanchonetes, casas de chá, sucos e similares',
      'Serviços de lanches rápidos',
      'Cafeterias'
    ]
  },
  '5620-1/01': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: [
      'Fornecimento de alimentos preparados preponderantemente para empresas',
      'Catering',
      'Serviço de buffet'
    ]
  },
  
  // ==========================================
  // NÃO PERMITIDOS NO SIMPLES NACIONAL
  // ==========================================
  
  // SETOR FINANCEIRO
  '6421-2/00': {
    permitido: false,
    atividades: [
      'Bancos comerciais',
      'Banco de investimento',
      'Caixa econômica',
      'Instituições financeiras bancárias'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Instituições financeiras devem obrigatoriamente adotar o regime de Lucro Real'
  },
  '6422-1/00': {
    permitido: false,
    atividades: [
      'Bancos múltiplos, com carteira comercial',
      'Instituições financeiras múltiplas'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Instituições financeiras são vedadas do Simples Nacional pela LC 123/2006'
  },
  '6423-9/00': {
    permitido: false,
    atividades: [
      'Caixas econômicas',
      'Caixa Econômica Federal e similares'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Vedado pela LC 123/2006 - Art. 17, inciso VIII'
  },
  '6431-0/00': {
    permitido: false,
    atividades: [
      'Bancos múltiplos, sem carteira comercial',
      'Banco de investimento múltiplo'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Instituições financeiras não podem optar pelo Simples Nacional'
  },
  '6436-0/00': {
    permitido: false,
    atividades: [
      'Sociedades de crédito, financiamento e investimento - financeiras',
      'Financeiras',
      'Crédito direto ao consumidor'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Vedado pela LC 123/2006'
  },
  '6438-7/00': {
    permitido: false,
    atividades: [
      'Bancos de investimento',
      'Investment banking',
      'Operações de mercado de capitais'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Instituições financeiras são obrigadas ao Lucro Real'
  },
  '6461-1/00': {
    permitido: false,
    atividades: [
      'Sociedades de capitalização',
      'Planos de capitalização'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Vedado pela LC 123/2006'
  },
  '6462-0/00': {
    permitido: false,
    atividades: [
      'Seguros de vida',
      'Seguro de pessoas',
      'Planos de previdência privada'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Seguradoras devem adotar Lucro Real obrigatoriamente'
  },
  '6463-8/00': {
    permitido: false,
    atividades: [
      'Planos de saúde',
      'Seguros de saúde',
      'Planos odontológicos'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Operadoras de planos de saúde não podem optar pelo Simples Nacional'
  },
  
  // FACTORING E CRÉDITO
  '6499-9/03': {
    permitido: false,
    atividades: [
      'Sociedades de fomento mercantil - factoring',
      'Factoring',
      'Fomento comercial'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 0.65,
      cofins: 3.0,
      total_aprox: 27.65
    },
    observacoes: 'Factoring é vedado no Simples Nacional - LC 123/2006, Art. 17'
  },
  
  // ENERGIA E COMBUSTÍVEIS
  '1932-2/00': {
    permitido: false,
    atividades: [
      'Fabricação de biocombustíveis',
      'Produção de biodiesel',
      'Fabricação de etanol'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de biocombustíveis não é permitida no Simples Nacional conforme LC 123/2006'
  },
  '1920-9/01': {
    permitido: false,
    atividades: [
      'Fabricação de produtos do refino de petróleo',
      'Refinaria de petróleo',
      'Produção de derivados de petróleo'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de produtos do refino de petróleo não é permitida no Simples Nacional'
  },
  '3511-5/01': {
    permitido: false,
    atividades: [
      'Geração de energia elétrica',
      'Usinas de energia',
      'Produção de energia elétrica'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Geração de energia elétrica deve ser tributada pelo Lucro Real'
  },
  '3512-3/00': {
    permitido: false,
    atividades: [
      'Transmissão de energia elétrica',
      'Distribuição de energia',
      'Rede de transmissão'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Vedado pela LC 123/2006'
  },
  
  // INDÚSTRIA DE ARMAS E VEÍCULOS
  '2451-2/00': {
    permitido: false,
    atividades: [
      'Fabricação de armas de fogo, munições e equipamentos militares',
      'Indústria bélica',
      'Fabricação de armamentos'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de armas e munições não é permitida no Simples Nacional por questões de segurança'
  },
  '2910-7/02': {
    permitido: false,
    atividades: [
      'Fabricação de caminhões e ônibus',
      'Indústria automobilística pesada',
      'Montadora de veículos pesados'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de veículos automotores não pode optar pelo Simples Nacional'
  },
  '2920-4/00': {
    permitido: false,
    atividades: [
      'Fabricação de automóveis, camionetas e utilitários',
      'Montadora de carros',
      'Indústria automobilística'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de automóveis é vedada no Simples Nacional'
  },
  
  // IMPORTAÇÃO E EXPORTAÇÃO
  '4681-8/01': {
    permitido: false,
    atividades: [
      'Comércio atacadista de álcool carburante, biodiesel, gasolina e demais derivados de petróleo',
      'Distribuição de combustíveis',
      'Importação de combustíveis'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Importação de combustíveis não é permitida no Simples Nacional'
  },
  '4649-4/99': {
    permitido: false,
    atividades: [
      'Comércio atacadista de outros equipamentos e artigos de uso pessoal e doméstico não especificados',
      'Importação de produtos diversos'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Importação de produtos de terceiros não é permitida (exceto se for fabricante)'
  },
  
  // TELECOMUNICAÇÕES
  '6110-8/01': {
    permitido: false,
    atividades: [
      'Serviços de telefonia fixa comutada - STFC',
      'Operadora de telefonia fixa',
      'Telecomunicações fixas'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Operadoras de telecomunicações não podem optar pelo Simples Nacional'
  },
  '6120-5/01': {
    permitido: false,
    atividades: [
      'Telefonia móvel celular',
      'Operadora de celular',
      'Serviços de telefonia móvel'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Telecomunicações são vedadas do Simples Nacional'
  },
  
  // TRANSPORTE AÉREO E MARÍTIMO
  '5011-4/01': {
    permitido: false,
    atividades: [
      'Transporte marítimo de cabotagem - carga',
      'Navegação de cabotagem',
      'Transporte marítimo de mercadorias'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Transporte marítimo não é permitido no Simples Nacional'
  },
  '5111-1/00': {
    permitido: false,
    atividades: [
      'Transporte aéreo de passageiros regular',
      'Companhia aérea',
      'Aviação comercial'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Companhias aéreas devem usar Lucro Real'
  },
  '5112-9/01': {
    permitido: false,
    atividades: [
      'Serviço de táxi aéreo e locação de aeronaves com tripulação',
      'Táxi aéreo',
      'Aviação executiva'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Vedado pela LC 123/2006'
  },
  
  // COOPERATIVAS DE CRÉDITO
  '6423-9/01': {
    permitido: false,
    atividades: [
      'Bancos cooperativos',
      'Cooperativa de crédito'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 0.65,
      cofins: 3.0,
      total_aprox: 27.65
    },
    observacoes: 'Cooperativas de crédito não podem optar pelo Simples Nacional'
  },
  
  // CONSÓRCIO
  '6491-3/00': {
    permitido: false,
    atividades: [
      'Sociedades de fomento mercantil - factoring',
      'Factoring'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 0.65,
      cofins: 3.0,
      total_aprox: 27.65
    },
    observacoes: 'Factoring não é permitido no Simples Nacional'
  },
  '6619-3/99': {
    permitido: false,
    atividades: [
      'Outras atividades auxiliares dos serviços financeiros',
      'Administração de consórcios'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 0.65,
      cofins: 3.0,
      total_aprox: 27.65
    },
    observacoes: 'Serviços financeiros auxiliares não podem optar pelo Simples'
  },
  
  // LOTEAMENTO E INCORPORAÇÃO (CASOS ESPECÍFICOS)
  '6810-2/01': {
    permitido: false,
    atividades: [
      'Compra e venda de imóveis próprios',
      'Loteamento de imóveis próprios'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 0.65,
      cofins: 3.0,
      total_aprox: 27.65
    },
    observacoes: 'Loteamento de imóveis próprios é vedado no Simples Nacional'
  },
  
  // FABRICAÇÃO DE CIGARROS
  '1220-4/01': {
    permitido: false,
    atividades: [
      'Fabricação de cigarros',
      'Indústria de cigarros',
      'Produção de tabaco industrializado'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de cigarros é vedada no Simples Nacional'
  },
  '1220-4/02': {
    permitido: false,
    atividades: [
      'Fabricação de cigarrilhas e charutos',
      'Produção de charutos',
      'Fabricação de produtos do fumo'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Vedado pela LC 123/2006'
  },
  
  // BEBIDAS ALCOÓLICAS (ALGUNS CASOS)
  '1111-9/01': {
    permitido: false,
    atividades: [
      'Fabricação de aguardente de cana-de-açúcar',
      'Produção de cachaça industrializada em grande escala',
      'Destilaria de álcool'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de bebidas alcoólicas em escala industrial geralmente é vedada no Simples'
  },
  '1113-5/01': {
    permitido: false,
    atividades: [
      'Fabricação de cerveja',
      'Cervejaria industrial',
      'Produção de cerveja em larga escala'
    ],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Cervejarias de grande porte não podem optar pelo Simples Nacional'
  },
  
  // LOCAÇÃO DE IMÓVEIS PRÓPRIOS
  '6810-2/02': {
    permitido: false,
    atividades: [
      'Aluguel de imóveis próprios',
      'Locação de imóveis próprios',
      'Administração de imóveis próprios'
    ],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 0.65,
      cofins: 3.0,
      total_aprox: 27.65
    },
    observacoes: 'Aluguel de imóveis próprios não pode optar pelo Simples Nacional - LC 123/2006, Art. 17, XI'
  },
  
  // ==========================================
  // TRANSPORTE E ARMAZENAGEM - Anexo III
  // ==========================================
  '5211-7/01': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Armazéns gerais - emissão de warrant',
      'Guarda e armazenagem de mercadorias',
      'Depósito de produtos com emissão de título de crédito'
    ]
  },
  '5211-7/99': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Depósitos de mercadorias para terceiros',
      'Guarda de produtos (exceto armazéns gerais)',
      'Serviços de armazenamento'
    ]
  },
  '5320-2/02': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Serviços de entrega rápida',
      'Courier e entregas expressas',
      'Transporte de documentos e pequenas encomendas'
    ]
  },
  '4930-2/02': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Transporte rodoviário de carga',
      'Frete de mercadorias',
      'Transporte intermunicipal e interestadual'
    ]
  },
  
  '4929-9/01': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Transporte rodoviário coletivo de passageiros',
      'Ônibus intermunicipal e interestadual',
      'Serviços de transporte de pessoas'
    ]
  },
  '4923-0/02': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Serviço de táxi',
      'Transporte individual de passageiros',
      'Táxi convencional'
    ]
  },
  
  // ==========================================
  // SERVIÇOS DE LIMPEZA E VIGILÂNCIA - Anexo III
  // ==========================================
  
  '8121-4/00': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Limpeza em prédios e domicílios',
      'Serviços de faxina',
      'Limpeza de escritórios e residências'
    ]
  },
  '8011-1/01': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Atividades de vigilância e segurança privada',
      'Serviços de segurança patrimonial',
      'Monitoramento e vigilância'
    ]
  },
  '8129-0/00': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: [
      'Atividades de limpeza não especificadas',
      'Higienização e desinfecção',
      'Limpeza de veículos'
    ]
  },
  
  // ==========================================
  // TECNOLOGIA DA INFORMAÇÃO - Anexo V
  // ==========================================
  '6201-5/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Desenvolvimento de programas de computador sob encomenda',
      'Criação de software personalizado',
      'Programação e desenvolvimento de sistemas'
    ]
  },
  '6202-3/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Desenvolvimento e licenciamento de programas de computador customizáveis',
      'Software sob medida',
      'Consultoria em tecnologia da informação'
    ]
  },
  '6204-0/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Consultoria em tecnologia da informação',
      'Assessoria em TI',
      'Consultoria em sistemas'
    ]
  },
  '6209-1/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Suporte técnico, manutenção e outros serviços em tecnologia da informação',
      'Helpdesk',
      'Suporte técnico remoto'
    ]
  },
  
  // ==========================================
  // SERVIÇOS PROFISSIONAIS - Anexo V
  // ==========================================
  
  '6911-7/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Serviços advocatícios',
      'Atividades jurídicas',
      'Consultoria e assessoria jurídica',
      'Escritório de advocacia'
    ]
  },
  '6911-7/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades auxiliares da justiça',
      'Perícia judicial',
      'Tradução juramentada'
    ]
  },
  '6920-6/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de contabilidade',
      'Serviços contábeis',
      'Escrituração contábil e fiscal',
      'Escritório de contabilidade'
    ]
  },
  '6920-6/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de consultoria e auditoria contábil e tributária',
      'Auditoria contábil',
      'Consultoria fiscal'
    ]
  },
  '7020-4/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de consultoria em gestão empresarial',
      'Consultoria organizacional',
      'Assessoria em administração'
    ]
  },
  '7111-1/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Serviços de arquitetura',
      'Projeto arquitetônico',
      'Arquitetura de interiores'
    ]
  },
  '7112-0/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Serviços de engenharia',
      'Projeto de engenharia civil, elétrica, mecânica',
      'Consultoria em engenharia'
    ]
  },
  '7119-7/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Serviços de cartografia, topografia e geodésia',
      'Levantamento topográfico',
      'Georreferenciamento'
    ]
  },
  '7119-7/03': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Serviços de desenho técnico',
      'Desenho técnico industrial',
      'CAD'
    ]
  },
  '7410-2/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Design de interiores',
      'Decoração de interiores',
      'Projeto de ambientes'
    ]
  },
  '7490-1/04': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de intermediação e agenciamento de serviços e negócios',
      'Representação comercial',
      'Agenciamento'
    ]
  },
  '7311-4/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Agências de publicidade',
      'Criação publicitária',
      'Planejamento de campanhas'
    ]
  },
  '7312-2/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Agenciamento de espaços para publicidade',
      'Mídia',
      'Venda de espaços publicitários'
    ]
  },
  
  // ==========================================
  // SAÚDE - Anexo V
  // ==========================================
  
  '8630-5/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos',
      'Clínica médica',
      'Consultório médico'
    ]
  },
  '8630-5/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividade médica ambulatorial com recursos para realização de exames complementares',
      'Clínica com exames'
    ]
  },
  '8630-5/03': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividade médica ambulatorial restrita a consultas',
      'Consultório médico simples'
    ]
  },
  '8640-2/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Laboratórios de análises clínicas',
      'Laboratório clínico',
      'Exames laboratoriais'
    ]
  },
  '8640-2/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Laboratórios clínicos',
      'Análises clínicas'
    ]
  },
  '8650-0/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de enfermagem',
      'Serviços de enfermagem',
      'Cuidador de pacientes'
    ]
  },
  '8650-0/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de profissionais da nutrição',
      'Nutricionista',
      'Consultório de nutrição'
    ]
  },
  '8650-0/03': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de psicologia e psicanálise',
      'Psicólogo',
      'Consultório de psicologia'
    ]
  },
  '8650-0/04': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de fisioterapia',
      'Fisioterapeuta',
      'Clínica de fisioterapia'
    ]
  },
  '8650-0/05': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de terapia ocupacional',
      'Terapeuta ocupacional'
    ]
  },
  '8650-0/06': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de fonoaudiologia',
      'Fonoaudiólogo',
      'Terapia da fala'
    ]
  },
  '8650-0/99': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de profissionais da área de saúde não especificadas',
      'Outros profissionais da saúde'
    ]
  },
  '8660-7/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Atividades de apoio à gestão de saúde',
      'Gestão hospitalar',
      'Consultoria em saúde'
    ]
  },
  
  // ==========================================
  // EDUCAÇÃO - Anexo V
  // ==========================================
  
  '8511-2/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Educação infantil - creche',
      'Creche',
      'Berçário'
    ]
  },
  '8512-1/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Educação infantil - pré-escola',
      'Pré-escola',
      'Jardim de infância'
    ]
  },
  '8513-9/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Ensino fundamental',
      'Escola de ensino fundamental'
    ]
  },
  '8520-1/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Ensino médio',
      'Colégio'
    ]
  },
  '8541-4/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Educação profissional de nível técnico',
      'Curso técnico'
    ]
  },
  '8599-6/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Formação de condutores',
      'Auto escola',
      'CFC - Centro de Formação de Condutores'
    ]
  },
  '8599-6/03': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Treinamento em informática',
      'Curso de informática',
      'Escola de informática'
    ]
  },
  '8599-6/04': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Treinamento em desenvolvimento profissional e gerencial',
      'Cursos profissionalizantes',
      'Coaching'
    ]
  },
  '8599-6/05': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Cursos preparatórios para concursos',
      'Curso pré-vestibular'
    ]
  },
  '8592-9/01': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Ensino de dança',
      'Escola de dança',
      'Aulas de dança'
    ]
  },
  '8592-9/02': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Ensino de artes cênicas, exceto dança',
      'Aulas de teatro',
      'Escola de teatro'
    ]
  },
  '8592-9/03': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Ensino de música',
      'Escola de música',
      'Aulas de instrumentos musicais'
    ]
  },
  '8593-7/00': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: [
      'Ensino de idiomas',
      'Escola de inglês',
      'Cursos de línguas estrangeiras'
    ]
  },
  
  // ==========================================
  // CONSTRUÇÃO CIVIL - Anexo IV
  // ==========================================
  '4120-4/00': {
    permitido: true,
    anexo: 'IV',
    aliquota_min: 4.5,
    aliquota_max: 16.85,
    atividades: [
      'Construção de edifícios',
      'Obras de construção civil',
      'Edificações residenciais e comerciais'
    ],
    observacoes: 'Anexo IV - Alíquotas reduzidas para construção civil'
  },
  '4110-7/00': {
    permitido: true,
    anexo: 'IV',
    aliquota_min: 4.5,
    aliquota_max: 16.85,
    atividades: [
      'Incorporação de empreendimentos imobiliários',
      'Incorporação imobiliária',
      'Desenvolvimento de projetos imobiliários'
    ]
  },
  '4211-1/02': {
    permitido: true,
    anexo: 'IV',
    aliquota_min: 4.5,
    aliquota_max: 16.85,
    atividades: [
      'Pintura para sinalização em pistas rodoviárias e aeroportos',
      'Sinalização viária',
      'Pintura de marcações em vias'
    ]
  },
  
  // Manutenção e Reparação
  '3314-7/17': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 17.42,
    atividades: [
      'Manutenção e reparação de máquinas e equipamentos de terraplenagem',
      'Reparação de tratores (exceto agrícolas)',
      'Manutenção de escavadeiras e máquinas de pavimentação',
      'Reparo de betoneiras e equipamentos para construção'
    ]
  },
  '3321-0/00': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 17.42,
    atividades: [
      'Instalação de máquinas e equipamentos industriais',
      'Montagem de equipamentos em plantas industriais',
      'Instalação de linhas de produção'
    ]
  },
  '4520-0/01': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 17.42,
    atividades: [
      'Serviços de manutenção e reparação mecânica de veículos automotores',
      'Oficina mecânica',
      'Reparação de motores e sistemas automotivos'
    ]
  },
  '9511-8/00': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 17.42,
    atividades: [
      'Reparação e manutenção de computadores e equipamentos periféricos',
      'Conserto de computadores',
      'Manutenção de equipamentos de informática'
    ]
  }
};

// Regras de categorização automática por setor (baseado nos primeiros dígitos)
const categorizacaoPorSetor: Record<string, CNAESimplesNacional> = {
  // AGRICULTURA, PECUÁRIA E SERVIÇOS RELACIONADOS (01-03)
  '01': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Produção agropecuária', 'Cultivo e criação de animais'],
    observacoes: 'Atividades agropecuárias geralmente se enquadram no Anexo II'
  },
  '02': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Produção florestal', 'Cultivo de florestas'],
    observacoes: 'Atividades de produção florestal - Anexo II'
  },
  '03': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Pesca e aquicultura', 'Criação de peixes'],
    observacoes: 'Atividades de pesca e aquicultura - Anexo II'
  },
  
  // INDÚSTRIAS EXTRATIVAS (05-09)
  '05': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Extração de carvão mineral'],
    observacoes: 'Indústria extrativa - Anexo II'
  },
  '06': {
    permitido: false,
    atividades: ['Extração de petróleo e gás natural'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Extração de petróleo e gás não é permitida no Simples Nacional'
  },
  '07': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Extração de minerais metálicos'],
    observacoes: 'Extração mineral - Anexo II'
  },
  '08': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Extração de minerais não-metálicos'],
    observacoes: 'Extração mineral - Anexo II'
  },
  '09': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividades de apoio à extração de minerais'],
    observacoes: 'Serviços de apoio à mineração - Anexo III'
  },
  
  // INDÚSTRIAS DE TRANSFORMAÇÃO (10-33)
  '10': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos alimentícios'],
    observacoes: 'Indústria de alimentos - Anexo II'
  },
  '11': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de bebidas'],
    observacoes: 'Indústria de bebidas - Anexo II (exceto bebidas alcoólicas de grande porte)'
  },
  '12': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos do fumo'],
    observacoes: 'Indústria de fumo - Anexo II (verificar restrições específicas)'
  },
  '13': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos têxteis'],
    observacoes: 'Indústria têxtil - Anexo II'
  },
  '14': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Confecção de artigos do vestuário e acessórios'],
    observacoes: 'Confecção - Anexo II'
  },
  '15': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Preparação de couros e fabricação de artefatos de couro, artigos de viagem e calçados'],
    observacoes: 'Indústria de couro e calçados - Anexo II'
  },
  '16': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos de madeira'],
    observacoes: 'Indústria de madeira - Anexo II'
  },
  '17': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de celulose, papel e produtos de papel'],
    observacoes: 'Indústria de papel - Anexo II'
  },
  '18': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Impressão e reprodução de gravações'],
    observacoes: 'Gráficas e impressão - Anexo II'
  },
  '19': {
    permitido: false,
    atividades: ['Fabricação de coque, produtos derivados do petróleo e biocombustíveis'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Refino de petróleo e biocombustíveis não são permitidos no Simples Nacional'
  },
  '20': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos químicos'],
    observacoes: 'Indústria química - Anexo II'
  },
  '21': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos farmoquímicos e farmacêuticos'],
    observacoes: 'Indústria farmacêutica - Anexo II'
  },
  '22': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos de borracha e de material plástico'],
    observacoes: 'Indústria de plásticos e borracha - Anexo II'
  },
  '23': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos de minerais não-metálicos'],
    observacoes: 'Indústria de minerais - Anexo II'
  },
  '24': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Metalurgia'],
    observacoes: 'Metalurgia - Anexo II'
  },
  '25': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos de metal, exceto máquinas e equipamentos'],
    observacoes: 'Indústria metalúrgica - Anexo II'
  },
  '26': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de equipamentos de informática, produtos eletrônicos e ópticos'],
    observacoes: 'Indústria de eletrônicos - Anexo II'
  },
  '27': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de máquinas, aparelhos e materiais elétricos'],
    observacoes: 'Indústria elétrica - Anexo II'
  },
  '28': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de máquinas e equipamentos'],
    observacoes: 'Fabricação de máquinas - Anexo II'
  },
  '29': {
    permitido: false,
    atividades: ['Fabricação de veículos automotores, reboques e carrocerias'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Fabricação de veículos automotores não é permitida no Simples Nacional'
  },
  '30': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de outros equipamentos de transporte'],
    observacoes: 'Fabricação de equipamentos de transporte - Anexo II'
  },
  '31': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de móveis'],
    observacoes: 'Indústria de móveis - Anexo II'
  },
  '32': {
    permitido: true,
    anexo: 'II',
    aliquota_min: 4.5,
    aliquota_max: 30.0,
    atividades: ['Fabricação de produtos diversos'],
    observacoes: 'Indústrias diversas - Anexo II'
  },
  '33': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Manutenção, reparação e instalação de máquinas e equipamentos'],
    observacoes: 'Serviços de manutenção - Anexo III'
  },
  
  // ELETRICIDADE E GÁS (35)
  '35': {
    permitido: false,
    atividades: ['Eletricidade, gás e outras utilidades'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Geração e distribuição de energia não são permitidas no Simples Nacional'
  },
  
  // ÁGUA, ESGOTO E GESTÃO DE RESÍDUOS (36-39)
  '36': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Captação, tratamento e distribuição de água'],
    observacoes: 'Serviços de água - Anexo III'
  },
  '37': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Esgoto e atividades relacionadas'],
    observacoes: 'Serviços de esgoto - Anexo III'
  },
  '38': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Coleta, tratamento e disposição de resíduos; recuperação de materiais'],
    observacoes: 'Gestão de resíduos - Anexo III'
  },
  '39': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Descontaminação e outros serviços de gestão de resíduos'],
    observacoes: 'Serviços ambientais - Anexo III'
  },
  
  // CONSTRUÇÃO (41-43)
  '41': {
    permitido: true,
    anexo: 'IV',
    aliquota_min: 4.5,
    aliquota_max: 16.85,
    atividades: ['Construção de edifícios'],
    observacoes: 'Construção civil - Anexo IV com alíquotas reduzidas'
  },
  '42': {
    permitido: true,
    anexo: 'IV',
    aliquota_min: 4.5,
    aliquota_max: 16.85,
    atividades: ['Obras de infraestrutura'],
    observacoes: 'Obras de infraestrutura - Anexo IV'
  },
  '43': {
    permitido: true,
    anexo: 'IV',
    aliquota_min: 4.5,
    aliquota_max: 16.85,
    atividades: ['Serviços especializados para construção'],
    observacoes: 'Serviços de construção - Anexo IV'
  },
  
  // COMÉRCIO (45-47)
  '45': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: ['Comércio e reparação de veículos automotores e motocicletas'],
    observacoes: 'Comércio de veículos - Anexo I para comércio, Anexo III para serviços'
  },
  '46': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: ['Comércio por atacado'],
    observacoes: 'Comércio atacadista - Anexo I (exceto importação de terceiros)'
  },
  '47': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: ['Comércio varejista'],
    observacoes: 'Comércio varejista - Anexo I'
  },
  
  // TRANSPORTE, ARMAZENAGEM E CORREIO (49-53)
  '49': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Transporte terrestre'],
    observacoes: 'Transporte rodoviário - Anexo III'
  },
  '50': {
    permitido: false,
    atividades: ['Transporte aquaviário'],
    regime_alternativo: {
      regime: 'Lucro Presumido',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Transporte marítimo não é permitido no Simples Nacional'
  },
  '51': {
    permitido: false,
    atividades: ['Transporte aéreo'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Transporte aéreo não é permitido no Simples Nacional'
  },
  '52': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Armazenamento e atividades auxiliares dos transportes'],
    observacoes: 'Armazenagem - Anexo III'
  },
  '53': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Correio e outras atividades de entrega'],
    observacoes: 'Serviços de entrega - Anexo III'
  },
  
  // ALOJAMENTO E ALIMENTAÇÃO (55-56)
  '55': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: ['Alojamento'],
    observacoes: 'Hotéis e pousadas - Anexo I'
  },
  '56': {
    permitido: true,
    anexo: 'I',
    aliquota_min: 4.0,
    aliquota_max: 19.0,
    atividades: ['Alimentação'],
    observacoes: 'Restaurantes e alimentação - Anexo I'
  },
  
  // INFORMAÇÃO E COMUNICAÇÃO (58-63)
  '58': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Edição e edição integrada à impressão'],
    observacoes: 'Editoração - Anexo V'
  },
  '59': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades cinematográficas, produção de vídeos e programas de TV'],
    observacoes: 'Produção audiovisual - Anexo V'
  },
  '60': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades de rádio e de televisão'],
    observacoes: 'Radiodifusão - Anexo V'
  },
  '61': {
    permitido: false,
    atividades: ['Telecomunicações'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 9.0,
      pis: 1.65,
      cofins: 7.6,
      total_aprox: 33.25
    },
    observacoes: 'Operadoras de telecomunicações não podem optar pelo Simples Nacional'
  },
  '62': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades dos serviços de tecnologia da informação'],
    observacoes: 'TI e desenvolvimento de software - Anexo V'
  },
  '63': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades de prestação de serviços de informação'],
    observacoes: 'Serviços de informação - Anexo V'
  },
  
  // ATIVIDADES FINANCEIRAS (64-66)
  '64': {
    permitido: false,
    atividades: ['Atividades de serviços financeiros'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Instituições financeiras são vedadas do Simples Nacional - LC 123/2006, Art. 17'
  },
  '65': {
    permitido: false,
    atividades: ['Seguros, resseguros, previdência complementar e planos de saúde'],
    regime_alternativo: {
      regime: 'Lucro Real',
      irpj: 15.0,
      csll: 20.0,
      pis: 0.65,
      cofins: 4.0,
      total_aprox: 39.65
    },
    observacoes: 'Seguradoras e planos de saúde não podem optar pelo Simples Nacional'
  },
  '66': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades auxiliares dos serviços financeiros, seguros, previdência complementar e planos de saúde'],
    observacoes: 'Serviços auxiliares financeiros - Anexo V (exceto factoring)'
  },
  
  // ATIVIDADES IMOBILIÁRIAS (68)
  '68': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades imobiliárias'],
    observacoes: 'Imobiliárias e corretagem - Anexo V (exceto locação de imóveis próprios)'
  },
  
  // ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS (69-75)
  '69': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades jurídicas, de contabilidade e de auditoria'],
    observacoes: 'Advocacia, contabilidade - Anexo V'
  },
  '70': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades de sedes de empresas e de consultoria em gestão empresarial'],
    observacoes: 'Consultoria empresarial - Anexo V'
  },
  '71': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Serviços de arquitetura e engenharia; testes e análises técnicas'],
    observacoes: 'Engenharia e arquitetura - Anexo V'
  },
  '72': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Pesquisa e desenvolvimento científico'],
    observacoes: 'P&D - Anexo V'
  },
  '73': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Publicidade e pesquisa de mercado'],
    observacoes: 'Marketing e publicidade - Anexo V'
  },
  '74': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Outras atividades profissionais, científicas e técnicas'],
    observacoes: 'Serviços profissionais - Anexo V'
  },
  '75': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividades veterinárias'],
    observacoes: 'Veterinária - Anexo III'
  },
  
  // ATIVIDADES ADMINISTRATIVAS (77-82)
  '77': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Aluguéis não-imobiliários e gestão de ativos intangíveis'],
    observacoes: 'Locação de bens móveis - Anexo III'
  },
  '78': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Seleção, agenciamento e locação de mão-de-obra'],
    observacoes: 'Agenciamento de mão de obra - Anexo III'
  },
  '79': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Agências de viagens, operadores turísticos e serviços de reservas'],
    observacoes: 'Turismo e viagens - Anexo III'
  },
  '80': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividades de vigilância, segurança e investigação'],
    observacoes: 'Vigilância e segurança - Anexo III'
  },
  '81': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Serviços para edifícios e atividades paisagísticas'],
    observacoes: 'Limpeza, jardinagem - Anexo III'
  },
  '82': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Serviços de escritório, de apoio administrativo e outros serviços prestados às empresas'],
    observacoes: 'Serviços administrativos - Anexo III'
  },
  
  // EDUCAÇÃO (85)
  '85': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Educação'],
    observacoes: 'Serviços educacionais - Anexo V'
  },
  
  // SAÚDE E SERVIÇOS SOCIAIS (86-88)
  '86': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades de atenção à saúde humana'],
    observacoes: 'Saúde humana - Anexo V'
  },
  '87': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades de atenção à saúde humana integradas com assistência social'],
    observacoes: 'Saúde e assistência - Anexo V'
  },
  '88': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Serviços de assistência social sem alojamento'],
    observacoes: 'Assistência social - Anexo V'
  },
  
  // ARTES, CULTURA, ESPORTE E RECREAÇÃO (90-93)
  '90': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades artísticas, criativas e de espetáculos'],
    observacoes: 'Arte e cultura - Anexo V'
  },
  '91': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividades ligadas ao patrimônio cultural e ambiental'],
    observacoes: 'Museus e patrimônio - Anexo III'
  },
  '92': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividades de exploração de jogos de azar e apostas'],
    observacoes: 'Jogos e apostas - Anexo III'
  },
  '93': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividades esportivas e de recreação e lazer'],
    observacoes: 'Esportes e recreação - Anexo III'
  },
  
  // OUTRAS ATIVIDADES DE SERVIÇOS (94-96)
  '94': {
    permitido: true,
    anexo: 'V',
    aliquota_min: 15.5,
    aliquota_max: 30.5,
    atividades: ['Atividades de organizações associativas'],
    observacoes: 'Associações - Anexo V'
  },
  '95': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Reparação e manutenção de equipamentos de informática e comunicação e de objetos pessoais e domésticos'],
    observacoes: 'Serviços de reparação - Anexo III'
  },
  '96': {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Outras atividades de serviços pessoais'],
    observacoes: 'Serviços pessoais - Anexo III'
  },
  
  // SERVIÇOS DOMÉSTICOS E ORGANISMOS INTERNACIONAIS (97-99)
  '97': {
    permitido: false,
    atividades: ['Serviços domésticos'],
    observacoes: 'Não aplicável ao Simples Nacional'
  },
  '99': {
    permitido: false,
    atividades: ['Organismos internacionais e outras instituições extraterritoriais'],
    observacoes: 'Não aplicável ao Simples Nacional'
  }
};

// Função auxiliar para formatar CNAE no padrão correto
function formatCNAEId(cnaeId: string): string[] {
  // Remove espaços
  let cleaned = cnaeId.trim().replace(/\s+/g, '');
  
  const formats: string[] = [];
  
  // Adiciona o formato original
  formats.push(cleaned);
  
  // Se já tem hífen e barra, retorna
  if (cleaned.includes('-') && cleaned.includes('/')) {
    return formats;
  }
  
  // Tenta formatar para o padrão XXXX-X/XX
  // Exemplos: 0111301 -> 0111-3/01
  //           47291 -> 4729-1
  
  if (cleaned.length === 7) {
    // Formato de 7 dígitos: XXXXXYY -> XXXX-X/YY
    const formatted = `${cleaned.substring(0, 4)}-${cleaned.charAt(4)}/${cleaned.substring(5)}`;
    formats.push(formatted);
  } else if (cleaned.length === 5) {
    // Formato de 5 dígitos: XXXXX -> XXXX-X
    const formatted = `${cleaned.substring(0, 4)}-${cleaned.charAt(4)}`;
    formats.push(formatted);
  } else if (cleaned.length === 6) {
    // Formato de 6 dígitos pode ser XXXX-XX -> tenta XXXX-X/X
    const formatted = `${cleaned.substring(0, 4)}-${cleaned.charAt(4)}/${cleaned.charAt(5)}`;
    formats.push(formatted);
  }
  
  return formats;
}

// Função para obter informações do Simples Nacional
export function getSimplesNacionalInfo(cnaeId: string): CNAESimplesNacional {
  // Tentar diferentes formatos do ID
  const possibleFormats = formatCNAEId(cnaeId);
  
  console.log('🔍 Buscando CNAE:', {
    original: cnaeId,
    formatos_testados: possibleFormats
  });
  
  // 1. Tentar buscar com cada formato possível na base específica
  for (const format of possibleFormats) {
    const info = simplesNacionalData[format];
    if (info) {
      console.log('✅ CNAE encontrado na base específica:', format);
      return info;
    }
  }
  
  // 2. Se não encontrou, usar categorização automática por setor (primeiros 2 dígitos)
  const cleaned = cnaeId.trim().replace(/\D/g, '');
  const setorCode = cleaned.substring(0, 2);
  
  const categoriaPorSetor = categorizacaoPorSetor[setorCode];
  
  if (categoriaPorSetor) {
    console.log('📊 Usando categorização automática por setor:', setorCode);
    return {
      ...categoriaPorSetor,
      observacoes: `${categoriaPorSetor.observacoes || ''}\n\n⚠️ Informações gerais do setor. Para dados específicos deste CNAE, consulte um contador.`
    };
  }
  
  // 3. Fallback final: assumir comércio/serviço genérico (mais comum)
  console.log('⚠️ Usando fallback genérico para CNAE:', cnaeId);
  return {
    permitido: true,
    anexo: 'III',
    aliquota_min: 6.0,
    aliquota_max: 33.0,
    atividades: ['Atividade comercial ou de serviços'],
    observacoes: '⚠️ Informações genéricas. Este CNAE específico não está em nossa base de dados. Recomendamos FORTEMENTE consultar um contador da RCont para verificar o enquadramento correto, anexo e alíquotas aplicáveis.'
  };
}

