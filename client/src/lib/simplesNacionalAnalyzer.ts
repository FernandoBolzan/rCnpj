import { getSimplesNacionalInfo } from '../mock/simplesNacional';
import { CNAESimplesNacional } from '../types';

export interface AnaliseSimplesNacional {
  podeSerOptante: boolean;
  motivoNaoPode?: string;
  anexoPrincipal?: 'I' | 'II' | 'III' | 'IV' | 'V';
  anexosSecundarios: Array<'I' | 'II' | 'III' | 'IV' | 'V'>;
  aliquotaMinima?: number;
  aliquotaMaxima?: number;
  cnaesProblematicos: Array<{
    codigo: string;
    descricao: string;
    motivo: string;
  }>;
  regimeAlternativo?: {
    regime: 'Lucro Presumido' | 'Lucro Real';
    totalAprox: number;
  };
  observacoes: string[];
}

export function analisarSimplesNacionalEmpresa(
  cnaePrincipal: { code: string; description: string },
  cnaesSecundarios: Array<{ code: string; description: string }>
): AnaliseSimplesNacional {
  const observacoes: string[] = [];
  const cnaesProblematicos: Array<{ codigo: string; descricao: string; motivo: string }> = [];
  
  // Analisar CNAE principal
  const infoPrincipal = getSimplesNacionalInfo(cnaePrincipal.code);
  
  // Analisar CNAEs secundários
  const infosSecundarios = cnaesSecundarios.map(cnae => ({
    cnae,
    info: getSimplesNacionalInfo(cnae.code)
  }));
  
  // Verificar se há algum CNAE que impede o Simples Nacional
  if (!infoPrincipal.permitido) {
    return {
      podeSerOptante: false,
      motivoNaoPode: `O CNAE principal (${cnaePrincipal.code}) não é permitido no Simples Nacional.`,
      anexoPrincipal: undefined,
      anexosSecundarios: [],
      cnaesProblematicos: [{
        codigo: cnaePrincipal.code,
        descricao: cnaePrincipal.description,
        motivo: infoPrincipal.observacoes || 'Atividade vedada pela LC 123/2006'
      }],
      regimeAlternativo: infoPrincipal.regime_alternativo ? {
        regime: infoPrincipal.regime_alternativo.regime,
        totalAprox: infoPrincipal.regime_alternativo.total_aprox || 0
      } : undefined,
      observacoes: [
        'Esta empresa NÃO PODE optar pelo Simples Nacional.',
        infoPrincipal.observacoes || 'CNAE principal não permitido.'
      ]
    };
  }
  
  // Verificar CNAEs secundários problemáticos
  const secundariosProblematicos = infosSecundarios.filter(item => !item.info.permitido);
  
  if (secundariosProblematicos.length > 0) {
    secundariosProblematicos.forEach(item => {
      cnaesProblematicos.push({
        codigo: item.cnae.code,
        descricao: item.cnae.description,
        motivo: item.info.observacoes || 'Atividade vedada'
      });
    });
    
    observacoes.push(`⚠️ Atenção: ${secundariosProblematicos.length} CNAE(s) secundário(s) NÃO são permitidos no Simples Nacional.`);
    observacoes.push('A empresa pode continuar no Simples desde que não exerça estas atividades ou as remova do cadastro.');
  }
  
  // Coletar todos os anexos
  const anexos: Array<'I' | 'II' | 'III' | 'IV' | 'V'> = [];
  
  if (infoPrincipal.anexo) {
    anexos.push(infoPrincipal.anexo);
  }
  
  infosSecundarios.forEach(item => {
    if (item.info.permitido && item.info.anexo && !anexos.includes(item.info.anexo)) {
      anexos.push(item.info.anexo);
    }
  });
  
  // Determinar alíquotas (usar a faixa do anexo principal)
  const aliquotaMin = infoPrincipal.aliquota_min;
  const aliquotaMax = infoPrincipal.aliquota_max;
  
  // Verificar atividades múltiplas (mais de um anexo)
  if (anexos.length > 1) {
    observacoes.push(`Esta empresa possui atividades em ${anexos.length} anexos diferentes: ${anexos.join(', ')}.`);
    observacoes.push('A tributação será segregada por atividade conforme cada anexo.');
  }
  
  // Dicas importantes
  if (infoPrincipal.anexo === 'V') {
    observacoes.push('💡 Anexo V: Fator R pode reduzir a alíquota se a folha de pagamento for superior a 28% da receita bruta.');
  }
  
  if (infoPrincipal.anexo === 'IV') {
    observacoes.push('💡 Anexo IV: Alíquotas reduzidas para construção civil.');
  }
  
  // Aviso sobre limite de faturamento
  observacoes.push('⚠️ Limite de faturamento: R$ 4,8 milhões por ano para permanência no Simples Nacional.');
  
  return {
    podeSerOptante: true,
    anexoPrincipal: infoPrincipal.anexo,
    anexosSecundarios: anexos.filter(a => a !== infoPrincipal.anexo),
    aliquotaMinima: aliquotaMin,
    aliquotaMaxima: aliquotaMax,
    cnaesProblematicos,
    observacoes
  };
}

