import { CNAEClasse, CNAESubclasse } from '../types';

export const mockClasses: CNAEClasse[] = [
  {
    id: "86216",
    descricao: "Serviços móveis de atendimento a urgências",
    secao: {
      id: "86",
      descricao: "Atividades de atenção à saúde humana integradas com assistência social, prestadas em residências coletivas e particulares"
    },
    divisao: {
      id: "86",
      descricao: "Atividades de atenção à saúde humana"
    },
    grupo: {
      id: "862",
      descricao: "Atividades de atenção à saúde não especificadas anteriormente"
    }
  },
  {
    id: "47113",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados",
    secao: {
      id: "47",
      descricao: "Comércio varejista e por atacado"
    },
    divisao: {
      id: "47",
      descricao: "Comércio varejista e por atacado"
    },
    grupo: {
      id: "471",
      descricao: "Comércio varejista em estabelecimentos não especializados"
    }
  },
  {
    id: "86901",
    descricao: "Atendimento médico domiciliar",
    secao: {
      id: "86",
      descricao: "Atividades de atenção à saúde humana integradas com assistência social, prestadas em residências coletivas e particulares"
    },
    divisao: {
      id: "86",
      descricao: "Atividades de atenção à saúde humana"
    },
    grupo: {
      id: "869",
      descricao: "Atividades de atenção à saúde não especificadas anteriormente"
    }
  },
  {
    id: "47211",
    descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns",
    secao: {
      id: "47",
      descricao: "Comércio varejista e por atacado"
    },
    divisao: {
      id: "47",
      descricao: "Comércio varejista e por atacado"
    },
    grupo: {
      id: "472",
      descricao: "Comércio varejista de produtos alimentícios, bebidas e fumo"
    }
  },
  {
    id: "86909",
    descricao: "Atendimento médico em consultórios",
    secao: {
      id: "86",
      descricao: "Atividades de atenção à saúde humana integradas com assistência social, prestadas em residências coletivas e particulares"
    },
    divisao: {
      id: "86",
      descricao: "Atividades de atenção à saúde humana"
    },
    grupo: {
      id: "869",
      descricao: "Atividades de atenção à saúde não especificadas anteriormente"
    }
  },
  {
    id: "47890",
    descricao: "Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente",
    secao: {
      id: "47",
      descricao: "Comércio varejista e por atacado"
    },
    divisao: {
      id: "47",
      descricao: "Comércio varejista e por atacado"
    },
    grupo: {
      id: "478",
      descricao: "Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente"
    }
  }
];

export const mockSubclasses: CNAESubclasse[] = [
  {
    id: "8621601",
    descricao: "Unidades móveis de atendimento a urgências - UTI móvel",
    classe: {
      id: "86216",
      descricao: "Serviços móveis de atendimento a urgências"
    }
  },
  {
    id: "4711301",
    descricao: "Hipermercados",
    classe: {
      id: "47113",
      descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados"
    }
  },
  {
    id: "8690101",
    descricao: "Atendimento médico domiciliar",
    classe: {
      id: "86901",
      descricao: "Atendimento médico domiciliar"
    }
  },
  {
    id: "8690901",
    descricao: "Atendimento médico em consultórios",
    classe: {
      id: "86909",
      descricao: "Atendimento médico em consultórios"
    }
  },
  {
    id: "4721101",
    descricao: "Minimercados, mercearias e armazéns",
    classe: {
      id: "47211",
      descricao: "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns"
    }
  },
  {
    id: "4789001",
    descricao: "Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente",
    classe: {
      id: "47890",
      descricao: "Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente"
    }
  }
];
